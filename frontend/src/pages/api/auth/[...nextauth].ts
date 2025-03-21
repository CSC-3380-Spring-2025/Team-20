//export the next auth constructor
//initalize next auth stuff

import NextAuth from "next-auth";
//handles all Google logic
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
    providers: [
      GoogleProvider({
        //move it out when done
        clientId:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET, 
      }),
    ],
   
  });