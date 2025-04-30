//import { DocumentReference } from "firebase/firestore";

//structure of card. including their own id to pass in their document information
export type FriendData = {
  name: string;
  interests: string[];
  id: string;
};



type FriendCardProps = {
  friends: FriendData[];
  currentUserId: string;
};



const FriendCard = (
  { friends, currentUserId }: FriendCardProps) => {


  const handleClick = async (UserId: string) => {

    const { doc, setDoc } = await import("firebase/firestore");
    const { db } = await import("@/config/firebase");


    try {
      const targetRef = doc(db, "users", UserId);

      await setDoc(doc(db, "users", currentUserId, "friends", UserId), {
        userid: targetRef,
        status: "pending",
      });
      alert("Friend request sent!");
    } catch (error) {
      console.error("Error adding friend:", error);
    }
    
  };

  return (
    <>
      {friends.map((friend, index) => (
        <div
          key={index}
          className="bg-gray-100 mt-3 m-5 rounded-md p-3 shadow-md"
        >
          <div className="flex justify-between items-center">
            <p className="font-bold text-xl">{friend.name}</p>
            <button
              className="rounded-md text-sm font-semibold bg-purple-400 hover:bg-purple-300 p-2"
              onClick={() => handleClick(friend.id)}
            >
              Add Friend
            </button>
          </div>

          <div className="mt-2">
            <p className="font-semibold">Interests:</p>
            <div className="columns-4">
              {friend.interests.map((interest, idx) => (
                <p
                  className="rounded-lg bg-gray-200 text-center mb-4 hover:bg-gray-300 pointer"
                  key={idx}
                >
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
