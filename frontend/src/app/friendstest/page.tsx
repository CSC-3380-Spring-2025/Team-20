"use client";

//hooks
import { useState, useEffect } from "react";

//auth and routing
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";


//firestore
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

//components
import FriendCard, { FriendData } from "@/friends/components/friendcard";
import Header from "@/components/header";

export default function FriendsTest() {
  const { user } = useAuth();
  const router = useRouter();

  const [pendingFriends, setPendingFriends] = useState<FriendData[]>([]);
  const [acceptedFriends, setAcceptedFriends] = useState<FriendData[]>([]);


  useEffect(() => {
    if (!user) return;

    
    const fetchFriendData = async () => {


      try {


        const userSnap = await getDocs(collection(db, "users"));

        const pendingList: FriendData[] = [];
        const acceptedList: FriendData[] = [];

        for (const userDoc of userSnap.docs) {


          if (userDoc.id === user.uid) continue;

          const docRef = doc(db, "users", userDoc.id, "friends", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {

            const friendData = docSnap.data();
            const newFriendData = userDoc.data();

            if (friendData.status === "pending") {

              pendingList.push({ 
                name: newFriendData.displayName || "No Name added yet",
                interests: newFriendData.interests || [],
                 id: userDoc.id,
              });

            } else if (friendData.status === "accepted") {

              acceptedList.push({
                name: newFriendData.displayName || "No Name added yet",
                interests: newFriendData.interests || [],
                id: userDoc.id,
              });

            }
          }
        }

        setPendingFriends(pendingList);
        setAcceptedFriends(acceptedList);

      } catch {
        console.error("Error fetching friends:");
      }
    };

    fetchFriendData();
  }, [user]);

  const removeFromList = (id: string) => {
    setPendingFriends((prevState) => 
      prevState.filter((friend) => 
        friend.id !== id
    ));
  };

 
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
      <div>

        <h1 className="text-xl p-4 bg-slate-600">Friend Requests</h1>


        <FriendCard friends={pendingFriends} currentUserId={user.uid} removeFromList={removeFromList} isFriendTest={true} />


        <h1 className="text-xl p-4 bg-slate-600 mt-8">Friends</h1>

        <FriendCard friends={acceptedFriends} currentUserId={user.uid} removeFromList={() => {}} isFriendTest={true}/>


      </div>
    </>
  );
}
