"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Vortex } from "@/components/ui/vortex";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && router) {
      router.push("/dashboard/repos");
    }
  }, [session, router]);

  return (
    <div className="w-full h-screen overflow-hidden overflow-y-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <div className="flex flex-col items-center text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
            Github Bounty Dispenser
          </h1>
          <p className="text-white text-xl md:text-2xl max-w-lg mb-6">
            Welcome to the Github Bounty Dispenser! This platform helps you dispense bounties to those who solve your issues on Github.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => signIn("github")} 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]">
              Sign In
            </button>
            <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 transition duration-200 rounded-lg text-white">
              Watch trailer
            </button>
          </div>
        </div>
      </Vortex>
    </div>
  );
};

export default Page;
