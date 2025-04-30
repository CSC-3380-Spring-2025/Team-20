"use client"

import { useState, useEffect } from "react";

import { useAuth } from "@/context/auth-context";

import { useRouter } from "next/navigation";

import {collection, getDocs, doc, getDoc} from "firebase/firestore";
import { db } from "@/config/firebase";

import FriendCard,{FriendData} from "@/friends/components/friendcard";
import Header from "@/components/header";

export default function FriendsTest() {

    const {user} = useAuth();
    const router = useRouter();

    const[people, setPeople] = useState<FriendData[]>([]);

    useEffect(() => {
        if (!user) return;


        //handeling fetching the pending users added
        //handle to take snapchot, store friends data and then traverse
        //must handle case to see if they are already in the db as a friend, then ignore (condition to continue)
        //then check if it's pending or accepted

        //case 1. filter all the friends you are currently having
        //case 2. check whether they are existing people
        //case 3. check if that existing person if the card is a pending or accepted friend
        //case 4. if all other cases, push into list

        const fetchFriendRequests = async () => {
            const userSnap = await getDocs(collection(db, "users"));
            const requestQueue: FriendData[] = [];


      
            for (const userDoc of userSnap.docs) {
              
      
              
              if (userDoc.id=== user.uid){
                continue;
              } 
      
              const docRef = doc(db, "users", userDoc.id, "friends", user.uid);
              const docSnap = await getDoc(docRef);
      
              if (docSnap.exists()) {
                const friendData = docSnap.data();
      
                
                if (friendData.userid?.id === user.uid) {
                  const newFriendData = userDoc.data();
      

                  requestQueue.push({
                    name: newFriendData.name,
                    interests: newFriendData.interests,
                    id: userDoc.id,
                  });

                }
              }
            }
      
            setPeople(requestQueue);
          };
      
          fetchFriendRequests();
        }, [user]);



    //always have this on every page.tsx!!! we want no one to bypass this
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
        <Header/>


        <div>
            <h1 className="text-xl p-4 bg-slate-600">Friend Requests</h1>

            <FriendCard friends={people} currentUserId={user.uid}/>



        </div>
        </>


    );
}


