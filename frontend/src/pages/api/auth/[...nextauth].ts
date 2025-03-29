//export the next auth constructor
//initalize next auth stuff

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
    providers: [
      GoogleProvider({
        //move it out when done
        clientId:process.env.GOOGLE_CLIENT_ID as string,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET as string, 
      }),
    ],
   
  });