import { useAuth } from "../../context/auth-context";
import Image from "next/image";


export function GoogleButton({ text = "Continue with Google" }: { text?: string })  {

    const {signInWithGoogle} = useAuth();

    return(
        <>
            <button onClick={signInWithGoogle} className="flex items-center justify-center w-auto bg-white text-black font-bold py-2 px-8 border border-black rounded-lg mt-3 hover:bg-gray-200">
                <Image src="https://www.svgrepo.com/show/475656/google-color.svg"  alt="Google logo"  width={15}   height={20}  />
                <span className="ml-2">{text}</span>
            </button>
        </>
    )

    
}