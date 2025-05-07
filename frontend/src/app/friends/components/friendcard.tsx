

//hooks 
import { useEffect, useState } from "react";

//db
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { FriendData } from "../type/friendtype";
import MiniProfile from "./miniProfile";

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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupFriend, setPopupFriend] = useState<FriendData | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [events, setEvents] = useState<any[]>([]); // replace `any` with correct type if known

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };


  useEffect(() => {

    

    const fetchFriendData = async () => {

      if (friends.length === 0) {
        setFriendDataList([]); 
        return;
      }

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
      <MiniProfile isPopupOpen={isPopupOpen} onPopupClose={handlePopupClose} friendInfo={popupFriend} events={events}/>
  
      {friendDataList.length === 0 ? (
        <p className="mt-3 ml-1 text-slate-800">No friends listed</p>
      ) : (

        friendDataList.map((friend) => (
          <div key={friend.id} className="bg-gray-100 mt-3 m-5 rounded-md p-3 shadow-md">

            <div className="flex justify-between items-center">
            
              <div className="flex items-center gap-3">

                {friend.profileImage && (
                  <img src={friend.profileImage} alt={`${friend.name}'s profile`} className="w-12 h-12 rounded-full object-cover"
                      onClick={() => {
                        const friendEvents = events.filter((event) => event.creatorId === friend.id);
                        setEvents(friendEvents); 
                        setPopupFriend(friend);
                        setIsPopupOpen(true);
                      }}
                  />

                )}

                <p className="font-bold text-xl">{friend.name}</p>
              </div>
  
             
              {!isFriend ? (

                <button className="rounded-md text-sm font-semibold transition duration-200 bg-purple-900 text-white hover:bg-purple-600 p-2" onClick={() => handleAddClick(friend.id)}>
                  Add Friend
                </button>


              ) : friend.status === "pending" ? (

                friend.initiator === UserId ? (
                  <span className="text-gray-500 font-semibold">Pending</span>

                ) : (
                  <div className="flex gap-2">

                    <button className="rounded-md text-sm font-semibold bg-red-400 hover:bg-red-300 p-2" onClick={() => handleDeclineClick(friend.id)}>
                      Decline
                    </button>


                    <button  className="rounded-md text-sm font-semibold bg-purple-900 text-white hover:bg-purple-300 p-2" onClick={() => handleAcceptClick(friend.id)}>
                      Accept
                    </button>

                  </div>
                )
              ) : (
                <span className="text-green-500 font-semibold">Friends</span>
              )}
            </div>
  
           
            <div className="mt-2">

              <p className="font-semibold mb-1">Interests: </p>

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
