"use client"

//import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import FriendCard from "./components/friendcard";

//type Friend = {
  //id: string;
  //name: string;
  //photoURL: string;
//};

export default function Friends() {

    //const [userCard, setUsercard] = useState<Friend | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    if (!user) {
        return (
          <div>
            <h2>You need to log in to access this page.</h2>
            <button 
              className="bg-purple-400 rounded-md font-serif px-4 py-2 mt-4" 
              onClick={() => router.push("/auth/login")}
            >
              Return to Login
            </button>
          </div>
        );
    }

    const handleAddFriend = async () => {
      
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
     
      if (userDocSnap.exists()) {
        alert( userDocSnap.data());
          //TODO : setup adding it to user's own data
      } else {
        alert("Can't get document!");
      }
    };



    return (
        <>
          <Header/>
          <div className="ml-5 mt-10 mb-10 text-3xl font-bold">Find Friends</div>
          
          <button  className="ml-5 bg-green-400 rounded-md font-serif px-4 py-2 mb-5"  onClick={handleAddFriend}>
            Add Friend
          </button>

          <FriendCard/>
        </> 
    );
}
