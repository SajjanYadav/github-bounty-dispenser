// "use client";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import {BackgroundGradient} from "../../../components/ui/background-gradient";



// export default function Home() {
//   const { data: session } = useSession();
//   const [repos, setRepos] = useState<any[]>([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchRepos = async () => {
//       if (session?.accessToken) {
//         try {
//           const response = await axios.get("https://api.github.com/user/repos", {
//             headers: {
//               Authorization: `token ${session.accessToken}`,
//             },
//           });
//           setRepos(response.data);
//         } catch (error) {
//           console.error("Error fetching repositories", error);
//         }
//       }
//     };

//     fetchRepos();
//   }, [session]);

//   const handleRepoClick = (repoName: string) => {
//     router.push(`/repos/${repoName}`);
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Main Content */}
//       <div className="flex-1">
//         <main className="p-6 bg-gray-100">
//           {!session ? (
//             <p>Not signed in</p>
//           ) : (
//             <div className="mt-6">
//               <h3 className="text-xl font-bold mb-4">Your GitHub Repositories:</h3>
//               <div className="space-y-4">
//                 {repos.map((repo) => (
//                   <BackgroundGradient
//                     key={repo.id}
//                     className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900 border border-gray-300 shadow-md"
//                   >
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h4 className="text-lg font-semibold text-black dark:text-neutral-200">{repo.name}</h4>
//                         <p className="text-sm text-gray-600 dark:text-neutral-400">{repo.description}</p>
//                       </div>
//                       <div className="flex space-x-4">
//                         <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//                           <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
//                           <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-1 text-sm font-medium text-white backdrop-blur-3xl">
//                             <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
//                               Visit
//                             </a>
//                           </span>
//                         </button>
//                         <button
//                           className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
//                           onClick={() => handleRepoClick(repo.full_name)}
//                         >
//                           <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
//                           <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
//                             Issues
//                           </span>
//                         </button>
//                       </div>
//                     </div>
//                   </BackgroundGradient>
//                 ))}
//               </div>
//             </div>
//           )}
//         </main>

//         <footer className="bg-blue-500 text-white p-4 text-center">
//           &copy; {new Date().getFullYear()} Github Bounty Dispenser. All rights reserved.
//         </footer>
//       </div>
//     </div>
//   );
// }

"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/moving-border"; // Updated import

export default function Home() {
  const { data: session } = useSession();
  const [repos, setRepos] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRepos = async () => {
      if (session?.accessToken) {
        try {
          const response = await axios.get("https://api.github.com/user/repos", {
            headers: {
              Authorization: `token ${session.accessToken}`,
            },
          });
          setRepos(response.data);
        } catch (error) {
          console.error("Error fetching repositories", error);
        }
      }
    };

    fetchRepos();
  }, [session]);

  useEffect(() => {
    if ((session === null) && router) {
      router.push("/");
    }
  }, [session, router]);

  const handleRepoClick = (repoName: string) => {
    router.push(`/repos/${repoName}`);
  };

  return (
    <div style={{backgroundColor: "rgb(4,7,29)"}} className="min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1">
        <main className="p-6 bg-[rgba(4,7,34,0.9)]">
          {!session ? (
            <p>Not signed in</p>
          ) : (
            <div className="mt-6 ">
              <h3 className="text-xl font-bold mb-4">Your <span className="text-purple">Github Repositories:</span></h3>
              <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10"> {/* Grid layout for two columns */}
                {repos.map((repo, index) => (
                  <Button
                    key={repo.id}
                    duration={Math.floor(Math.random() * 10000) + 10000 }
                    borderRadius="1.75rem"
                    style={{
                      background: "rgb(4,7,29)",
                      backgroundColor: "linear-gradient(90deg, rgba(2,7,29,1) 0%, rgba(12,14,35,1) 100%)",
                      borderRadius: `calc(1.75rem * 0.96)`,
                    }}
                    className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
                  >
                    <div className="flex flex-col w-3/4 p-3 py-6 md:p-5 lg:p-10 gap-2 overflow-hidden">
                      <div className="flex-1">
                        <h1 className="text-start text-xl md:text-2xl font-bold">
                          {repo.name}
                        </h1>
                        <p className="text-start text-white-100 mt-3 font-semibold truncate">
                          {repo.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col w-1/4 justify-between items-end p-2">
                      <button className="relative inline-flex h-12 w-full overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 mb-2">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                            Visit
                          </a>
                        </span>
                      </button>
                      <button
                        className="relative inline-flex h-12 w-full overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                        onClick={() => handleRepoClick(repo.full_name)}
                      >
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                          Issues
                        </span>
                      </button>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </main>

        <footer className="bg-blue-500 text-white p-4 text-center">
          &copy; {new Date().getFullYear()} Github Bounty Dispenser. All rights reserved.
        </footer>
      </div>
    </div>
  );
}


