"use client"
import Image  from "next/image";
import github from ".//../../public/github.svg"
import { signIn, signOut, useSession } from "next-auth/react";


export default function() {

    const { data: session } = useSession();


    return (
        <>
            {!session 
                ? (
                    <button 
                        onClick={() => signIn("github")}
                        type="button" 
                        className="flex gap-x-2 items-center text-gray-900  bg-white border border-gray-300 focus:outline-none
                        hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 
                         dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 
                        dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        {/* <Github/> */}
                        <Image
                            src={github}
                            alt="github icon"
                            width={25}
                            height={25}
                        />
                        <p className="text-lg">
                            Sign In
                        </p>
                    </button>
                ): (
                    <button 
                        onClick={() => signOut()}
                        type="button" 
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                        Sign Out
                    </button>
                )

            }       
        </>
    )
}