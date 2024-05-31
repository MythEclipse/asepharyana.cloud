'use client'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DasboardPage() {
    const {data: session,status}:{data:any; status:string;} = useSession();
    const router = useRouter();
    useEffect(()=>{
        if (status === "unauthenticated" ){
            router.push("/login");
        } else{
            if (session !== undefined &&session?.user.role !== "admin"){
                router.push("/");
            }
        
        }
    },[router, session, session?.user.role, status])
    return (
        <div className="flex items-center">
            <h1>Dashboard</h1>
        </div>
    )
}