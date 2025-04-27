type FriendCard = {
    name: string;
    interests: string[];
    similarFriends: number;
  };
  
  const MockFriends: FriendCard[] = [
    {
      name: "Pooja Garlapati",
      interests: ["emo", "blues", "anime", "outdoor"],
      similarFriends: 3,
    },
    {
      name: "Lily Yang",
      interests: ["romance", "outdoorsy", "compsci", "outdoor"],
      similarFriends: 3,
    },
    {
      name: "Cameron Bly",
      interests: ["romance", "outdoorsy", "compsci", "outdoor"],
      similarFriends: 5,
    },
    {
      name: "Lizeth Rodriguez",
      interests: ["romance", "outdoorsy", "compsci", "outdoor"],
      similarFriends: 4,
    },
    {
        name: "Hermyone Green",
        interests: ["romance", "outdoorsy", "compsci", "outdoor"],
        similarFriends: 2,
      },
  ];
  
  function Friendcard() {
    const handleClick = (name: string) => {
      alert(`Added ${name}`);
    };
  
    return (
      <>
        {MockFriends.map((friend, index) => (
          <div key={index} className="bg-gray-100 mt-3 m-5 rounded-md p-3 shadow-md">
            <div className="flex justify-between items-center">
              <p className="font-bold text-xl">{friend.name}</p>
              <button
                className="rounded-md text-sm font-semibold bg-purple-400 hover:bg-purple-300 p-2"
                onClick={() => handleClick(friend.name)}
              >
                Add Friend
              </button>
            </div>
  
            <div className="mt-2">
              <p className="font-semibold">Interests:</p>

              <div className="columns-4">
                {friend.interests.map((interest, idx) => (
                  <p  className="rounded-lg bg-gray-200 text-center mb-4 hover:bg-gray-300 pointer" key={idx}>{interest}</p>

                ))}

              </div>


            </div>
  
            <div className="mt-2">


              <p className="text-sm text-gray-700">
                {friend.similarFriends} mutual friends
              </p>

            </div>
          </div>
        ))}
      </>
    );
  }
  
  export default Friendcard;
  