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
import FriendCard, { FriendData } from "./components/friendcard";


export default function Friends() {

  const { user } = useAuth();
  const router = useRouter();

  const [friends, setFriends] = useState<FriendData[]>([]);

  const removeFromList = (id: string) => {
    setFriends((prevState) => 
      prevState.filter((friend) =>
         friend.id !== id)
    );
  };

  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const docSnap = await getDocs(collection(db, "users"));
        const users: FriendData[] = [];

        docSnap.forEach((doc) => {
          const userData = doc.data();


          if (doc.id !== user?.uid) {
            users.push({
              name: userData.displayName || "User has not added a name",
              interests: userData.interests || [],
              id: doc.id,
            });
          }

        });

        setFriends(users);

      } catch  {

        alert("Can't fetch the data");
      }
    };

    if (user?.uid) fetchUsers();
    
  }, [user]);

  if (!user) {
    return (
      <div>
        <h2>You need to log in to access this page.</h2>
        <button
          className="bg-purple-400 border-r-5 font-serif"
          onClick={() => router.push("/auth/login")}
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <>
      <Header />

      <button className="p-3 bg-pink-400 rounded-md mt-2" onClick={() => router.push("/friendstest")}>
        Go Test Friends
      </button>

      <div className="ml-5 mt-10 mb-10 text-3xl font-bold">Find Friends</div>

     
      <FriendCard friends={friends} currentUserId={user.uid} removeFromList={removeFromList} isFriendTest={false}  />


    </>
  );
}
