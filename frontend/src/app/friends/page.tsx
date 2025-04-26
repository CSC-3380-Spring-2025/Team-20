"use client"
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
//check 12 
import FriendCard from "./components/friendcard";
export default function Friends() {

    const {user} = useAuth();
    const router = useRouter();


    if (!user) {

        return (
          <div>

            <h2>You need to log in to access this page.</h2>

            <button className="bg-purple-400 border-r-5 font-serif" onClick={() => router.push("/auth/login")}
            >
                Return to Login
            </button>

          </div>
        );
    }

    return (


       <>

       <Header/>

       <div className="ml-5 mt-10 mb-10 text-3xl font-bold"> Find Friends</div>



       <FriendCard/>

    
     
       </> 
    );
};

