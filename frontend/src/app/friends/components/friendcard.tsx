
//hooks
import { useEffect, useState } from "react";

//firestore
import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export type FriendData = {
  name: string;
  interests: string[];
  id: string;
};

type FriendCardProps = {
  friends: FriendData[];
  currentUserId: string;
  removeFromList: (id: string) => void;
  isFriendTest: boolean; //REMOVE LATER
};

const FriendCard = ({ 
  friends, currentUserId, removeFromList, isFriendTest }:
  FriendCardProps) => {

  const [friendDataList, setFriendDataList] = useState<FriendData[]>([]);

  useEffect(() => {

    const fetchFriendData = async () => {

      const newList = await Promise.all(

        friends.map(async (friend) => {

          const snap = await getDoc(doc(db, "users", friend.id));
          const data = snap.data();

          return {
            id: snap.id,
            name: data?.displayName || "Unknown",
            interests: data?.interests || [],
          };

        })
      );
      setFriendDataList(newList);
    };

    fetchFriendData();
  }, [friends]);


  const handleAddClick = async (UserId: string) => {


    try {
      const targetRef = doc(db, "users", UserId);
      const currentRef = doc(db, "users", currentUserId);

      await setDoc(doc(db, "users", currentUserId, "friends", UserId), {
        userid: targetRef,
        status: "pending",
      });

      await setDoc(doc(db, "users", UserId, "friends", currentUserId), {
        userid: currentRef,
        status: "requested",
      });

      alert("Friend request sent!");

    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const handleRemoveClick = async (UserId: string) => {
    try {
      await deleteDoc(doc(db, "users", currentUserId, "friends", UserId));
      await deleteDoc(doc(db, "users", UserId, "friends", currentUserId));

      removeFromList(UserId);
      alert("Friend request removed!");
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  return (
    <>
      {friendDataList.map((friend) => (
        <div
          key={friend.id}
          className="bg-gray-100 mt-3 m-5 rounded-md p-3 shadow-md"
        >
          <div className="flex justify-between items-center">
            <p className="font-bold text-xl">{friend.name}</p>

           
            {!isFriendTest ? (

              <button className="rounded-md text-sm font-semibold bg-purple-400 hover:bg-purple-300 p-2"onClick={() => handleAddClick(friend.id)}>
                Add Friend
              </button>


            ) : (


              <button className="rounded-md text-sm font-semibold bg-red-400 hover:bg-red-300 p-2 ml-2" onClick={() => handleRemoveClick(friend.id)}>

                Remove

              </button>
            )}

          </div>

          <div className="mt-2">

            <p className="font-semibold">Interests:</p>

            <div className="columns-4">

              {friend.interests.map((interest, idx) => (
                
                <p className="rounded-lg bg-gray-200 text-center mb-4 hover:bg-gray-300 pointer" key={idx} >
                  {interest}
                </p>

              ))}

            </div>
          </div>

          <div className="mt-2">
            <p className="text-sm text-gray-700">3 mutual friends</p>
          </div>


        </div>
      ))}
    </>
  );
};

export default FriendCard;
