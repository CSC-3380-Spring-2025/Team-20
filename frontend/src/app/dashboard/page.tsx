"use client";

import { useAuth } from "../context/auth-context";
import UserCard from "../components/userCard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function  Dashboard() {
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/auth/login");
        }

    }, [user, router]);

    if (!user){
        return <p>Head to Login</p>
    }

    return (
        <main>
            <div className="p-6">
                <p className="text-2xl font-bold mb-4">Dashboard</p>
                <UserCard/>
            </div>
        </main>
    );

}