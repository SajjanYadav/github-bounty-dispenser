"use client";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

const RepoIssuesPage = () => {
  const router = useRouter();
  const { repoName } = router.query;
  const { data: session } = useSession();
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchIssues = async () => {
      if (repoName && session?.accessToken) {
        try {
          const response = await axios.get(`https://api.github.com/repos/${repoName}/issues`, {
            headers: {
              Authorization: `token ${session.accessToken}`,
            },
          });
          setIssues(response.data);
        } catch (error) {
          console.error("Error fetching issues", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchIssues();
  }, [repoName, session]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Issues for {repoName}</h1>
      {issues.length > 0 ? (
        <div className="space-y-4">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="p-4 bg-white border border-gray-300 rounded shadow-md"
            >
              <h4 className="text-lg font-semibold">{issue.title}</h4>
              <p className="text-sm text-gray-600">{issue.body}</p>
              <a href={issue.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-2 block">
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p>No issues found</p>
      )}
    </div>
  );
};

export default RepoIssuesPage;
