"use client";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


import Header from "@/components/header";
import FriendCard, { FriendData } from "./components/friendcard";

import {getDocs, collection} from "firebase/firestore";
import { db } from "@/config/firebase";



// const mockFriends = [
//   {
//     name: "Pooja Garlapati",
//     interests: ["emo", "blues", "anime", "outdoor"],
//     id: "pooja123",
//   },
//   {
//     name: "Lily Yang",
//     interests: ["romance", "outdoorsy", "compsci", "outdoor"],
//     id: "lily456",
//   },
//   {
//     name: "Cameron Bly",
//     interests: ["romance", "outdoorsy", "compsci", "outdoor"],
//     id: "cameron789",
//   },
// ];

export default function Friends() {
  const { user } = useAuth();
  const router = useRouter();

  const [friends, setFriends] = useState<FriendData[]>([]);


  useEffect(() => {
  
    //setFriends(mockFriends);
    const fetchUsers = async () => {
      //implement try catch

      try {
        const docSnap = await getDocs(collection(db, "users"));

        const users: FriendData[] = [];

        docSnap.forEach((doc) => {
          const userData = doc.data();
          if (doc.id !== user?.uid) {
            users.push({
              name: userData.name || "User has Not added Name",
              interests: userData.interests || [],
              id: doc.id,
            })
          }
        });

        setFriends(users);

      }catch {
        console.log("cant retrieve users");
      }

     
      
    }

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

      <button className="p-3 bg-pink-400 rounded-md mt-2 " onClick={() => router.push("/friendstest")}>Go Test Friends</button>
      <div className="ml-5 mt-10 mb-10 text-3xl font-bold"> Find Friends</div>
      <FriendCard friends={friends} currentUserId={user.uid} />
    </>
  );
}
