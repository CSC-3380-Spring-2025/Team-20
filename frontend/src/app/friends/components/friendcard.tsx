

//hooks 
import { useEffect, useState } from "react";

//db
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { FriendData } from "../type/friendtype";

// basic architecture for friendata

//idea. use events functionality by creating a prop type for friends 

type FriendCardProps = {
  friends: FriendData[];
  UserId: string;
  removeFromList: (id: string) => void;
  isFriend: boolean;
};



const FriendCard = (
  { friends, UserId, removeFromList, isFriend}: FriendCardProps) => {


  const [friendDataList, setFriendDataList] = useState<FriendData[]>([]);

  useEffect(() => {

    

    const fetchFriendData = async () => {

      if (friends.length === 0) {setFriendDataList([]); return;}

      const newList = await Promise.all(

        friends.map(async (friend) => {

          const userSnap = await getDoc(doc(db, "users", friend.id));
          const userData = userSnap.data();

          const friendSnap = await getDoc( doc(db, "users", UserId, "friends", friend.id));
          const friendMeta = friendSnap.exists() ? friendSnap.data() : {};



          return {
            id: userSnap.id,
            name: userData?.displayName || "Unknown",
            interests: userData?.interests || [],
            profileImage: userData?.profileImage || "",
            status: friendMeta?.status || "",
            initiator: friendMeta?.initiatorId || "",
          };
        })
      );

      setFriendDataList(newList);
    };

    fetchFriendData();

  }, [friends, UserId]);

  //FOUR MAIN FUNCTIONS
  //Accept    DONE
  //Decline   DONE
  //Add       DONE
  //Remove --> TODO

  const handleAcceptClick = async (userId: string) => {


    try {

      await setDoc(doc(db, "users", UserId, "friends", userId), {userid: userId, status: "accepted"});
      await setDoc(doc(db, "users", userId, "friends", UserId), { userid: UserId, status: "accepted"});

      removeFromList(userId);


    } catch {
      console.log("FRIENDCARD: Accept");
    }
  };

  const handleDeclineClick = async (userId: string) => {

    try {

      await setDoc(doc(db, "users", UserId, "friends", userId), { userid: userId, status: "declined"});
      await setDoc(doc(db, "users", userId, "friends", UserId), { userid: UserId, status: "declined"});

      removeFromList(userId);

      
    } catch {
      console.log("FRIENDCARD: Decline");
    }
  };



  const handleAddClick = async (userId: string) => {
    try {

      await setDoc(doc(db, "users", UserId, "friends", userId), { userid: userId, status: "pending", initiatorId: UserId});

      await setDoc(doc(db, "users", userId, "friends", UserId), { userid: UserId, status: "pending", initiatorId: UserId});

     
      removeFromList(userId);


    } catch {
      console.log("FRIENDCARD: Add");
    }
  };



  return (
    <>
      {friendDataList.length === 0 ? (

        <p className="mt-3 ml-1 text-slate-800">No friends listed</p>

      ) : (


        friendDataList.map((friend) => (

          <div key={friend.id} className="bg-gray-100 mt-3 m-5 rounded-md p-3 shadow-md">
            <div className="flex justify-between items-center">



              <div className="flex items-center gap-3">

                {friend.profileImage && (
                  <img src={friend.profileImage} alt={`${friend.name}'s profile`} className="w-12 h-12 rounded-full object-cover"/>
                )}

                <p className="font-bold text-xl">{friend.name}</p>

              </div>






              {!isFriend ? (

                //if they are friends then show option to add friend
                <button className="rounded-md text-sm font-semibold transition duration-200 bg-purple-900 text-white hover:bg-purple-600 p-2" onClick={() => handleAddClick(friend.id)}>
                  Add Friend
                </button>


              ) : friend.status === "pending" ? (

                //if they are the current user then it should disable accept/decline only recipient should see it
                friend.initiator === UserId ? (
                  <span className="text-gray-500 font-semibold">Pending</span>
                ) : (
                    //recipients response
                  
                  <div>

                    <button className="rounded-md text-sm font-semibold bg-red-400 hover:bg-red-300 p-2 ml-2" onClick={() => handleDeclineClick(friend.id)}>
                      Decline
                    </button>

                    <button className="rounded-md text-sm font-semibold bg-purple-900 text-white hover:bg-purple-300 p-2 ml-2" onClick={() => handleAcceptClick(friend.id)}>
                      Accept
                    </button>

                  </div>
                )

              ) : (
                //then if they are friends then it shows the green tag
                <span className="text-green-500 font-semibold">Friends</span>

              )}
            </div>

            <div className="mt-2">

              <p className="font-semibold">Interests:</p>
              <div className="columns-4">

                {friend.interests.map((interest, idx) => (
                  <p key={idx} className="rounded-lg bg-gray-200 text-center mb-4 hover:bg-gray-300 cursor-pointer" >
                    {interest}
                  </p>
                ))}

              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default FriendCard;
