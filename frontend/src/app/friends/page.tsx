"use client";


//hooks 
import { useState, useEffect } from "react";

//auth and routing
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";


//firestore
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/config/firebase";

//components 
import Header from "@/components/header";
import FriendCard from "./components/friendcard";
import { FriendData } from "./type/friendtype";


export default function Friends() {

  const { user } = useAuth();
  const router = useRouter();

  const [friends, setFriends] = useState<FriendData[]>([]);


  //filter out friend based on their id similar to linked list (make node.prev = node.next to completely remove)
  const removeFromList = (id: string) => {
    setFriends((prevState) => 
      prevState.filter((friend) =>
         friend.id !== id)
    );
  };


  useEffect(() => {

    //fetch users, make sure to add snapshot of user's and friends and then store them in the user
    const fetchUsers = async () => {

      try {

        
        const docSnap = await getDocs(collection(db, "users"));
        const friendsSnap = await getDocs(collection(db, "users", user!.uid, "friends"));
        const users: FriendData[] = [];

        
        const excludedIds: Record<string, { status: string; initiatorId?: string }> = {};
        friendsSnap.forEach((doc) => {
          const data = doc.data();
          excludedIds[doc.id] = {
            status: data.status,
            initiatorId: data.initiatorId
          };
        });

  
  
        docSnap.forEach((doc) => {

          const userData = doc.data();
          const FriendId = doc.id;

  
          if (
            FriendId !== user?.uid &&
            (!excludedIds[FriendId] || excludedIds[FriendId].status === "declined")
          ) {

            users.push({
              name: userData.displayName,
              interests: userData.interests || [],
              id: FriendId,
              profileImage: userData.profileImage ,
              status: excludedIds[FriendId]?.status,
              initiator: excludedIds[FriendId]?.initiatorId

            });


          }
        });
  
        setFriends(users);

      } catch {
        alert("FRIENDS: UseEffect");
      }
    };
  
    if (user?.uid) fetchUsers();

  }, [user]);
  

  if (!user) {
    return (
      <div>
        <h2>You need to log in to access this page.</h2>
        <button className="transition duration-200 bg-purple-400 border-r-5 font-serif" onClick={() => router.push("/auth/login")} >
          Return to Login
        </button>
      </div>
    );
  }

  return (
<>
  <Header />

  <div className="w-full px-6 py-8  shadow-md">

    <div className="flex justify-between items-center mt-8">

      <h2 className="text-4xl font-extrabold text-gray-800"> Find New Friends</h2>


      <button className="p-3 bg-yellow-400 rounded-md text-md font-bold shadow hover:bg-yellow-300 transition duration-200" onClick={() => router.push("/friendstest")} >
        Friends and Requests
      </button>


    </div>

    <div className="border-t-4 border-dotted border-yellow-400 my-6"></div>

  
    

      <FriendCard friends={friends} UserId={user.uid} removeFromList={removeFromList} isFriend={false} />
      


  </div>
</>

  );
}
