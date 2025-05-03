"use client";

//hooks
import { useState, useEffect } from "react";

//auth and router
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

//db
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

//components
import FriendCard from "@/friends/components/friendcard";
import Header from "@/components/header";
import { FriendData } from "@/friends/type/friendtype";



export default function FriendsTest() {


  const [pendingFriends, setPendingFriends] = useState<FriendData[]>([]);
  const [acceptedFriends, setAcceptedFriends] = useState<FriendData[]>([]);

  const { user } = useAuth();
  const router = useRouter();



  useEffect(() => {
    if (!user) return;

    const fetchFriendData = async () => {
     
      try {


        const userSnap = await getDocs(collection(db, "users"));

        const pending: FriendData[] = [];
        const accepted: FriendData[] = [];


        for (const userDoc of userSnap.docs) {


          if ( userDoc.id === user.uid) continue;

          const docRef = doc(db, "users",  userDoc.id, "friends", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {

            const friend  = docSnap.data();
            const newPerson = userDoc.data();

            const friendEntry: FriendData = {
              name: newPerson.displayName || "No Name added yet",
              interests: newPerson.interests || [],
              id:  userDoc.id,
              profileImage: newPerson.profileImage || "",
              status: friend.status,
              initiator: newPerson.initiatorId,
            };


            if (friend.status === "pending") {

              pending.push(friendEntry);

            } else if (friend.status === "accepted") {

              accepted.push(friendEntry);

            }

          }
        }

        setPendingFriends(pending);
        setAcceptedFriends(accepted);


      } catch  {
        console.log("FRIENDTEST: USEEFFECT");
      }
    };

    fetchFriendData();

    
  }, [user]);

  const removeFromList = (id: string) => {
    setPendingFriends((prev) => prev.filter((friend) => friend.id !== id));
  };


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

      <div className="p-4">



      <div className="flex justify-between items-center mb-6">

        <h2 className="text-4xl font-extrabold text-gray-800"> Friends</h2>  

        <button  className="p-3 bg-yellow-400 rounded-md text-md font-bold shadow hover:bg-yellow-300 transition duration-200" onClick={() => router.push("/friends")}>
          Back to Friends
        </button>



      
    
      
        </div>

        <FriendCard friends={acceptedFriends} UserId={user.uid}  removeFromList={() => {}} isFriend={true}/>

        <h1 className=" text-xl font-bold p-4 bg-gray-300 rounded mt-10">Requests</h1>
        <FriendCard friends={pendingFriends}  UserId={user.uid}  removeFromList={removeFromList} isFriend={true}/>
        
         
       

      </div>
</>
);
}
          
          
