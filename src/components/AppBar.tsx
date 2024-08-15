"use client"
import { useSession } from "next-auth/react"
import PrimaryButton from "./PrimaryButton"

export default function() {
    const {data: session} = useSession();

    return (
        <>
            <div className="flex flex-row justify-between px-6 py-4 ">
                <div className="text-3xl font-bold flex items-center">
                    Bounty Dispenser
                </div>
                
                <div className="flex gap-x-4 items-center">
                    {session && (
                        <div className="flex items-center">
                            <img 
                                src={session.user?.image || ""} 
                                alt="" 
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                    )}
                    <PrimaryButton/>
                </div>
            </div>
        </>
    )

}
