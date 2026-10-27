import { useState, useEffect } from "react";
import { PROJECTS as CURATED_PROJECTS } from "../data/portfolio";

const GITHUB_USERNAME = "krishnanegi-06";
const CACHE_KEY = "kn_github_repos_cache";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Safely fetches public GitHub repository metadata without exposing tokens.
 * Caches responses in sessionStorage to avoid unnecessary API requests and rate limits.
 * Gracefully falls back to curated project data if offline or rate-limited.
 */
export function useGitHubSync() {
  const [projects, setProjects] = useState(CURATED_PROJECTS);
  const [syncStatus, setSyncStatus] = useState("idle"); // 'idle' | 'syncing' | 'synced' | 'fallback'
  const [lastSyncTime, setLastSyncTime] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function syncRepositories() {
      // 1. Check local session cache
      try {
        const cachedRaw = sessionStorage.getItem(CACHE_KEY);
        if (cachedRaw) {
          const { data, timestamp } = JSON.parse(cachedRaw);
          if (Date.now() - timestamp < CACHE_TTL_MS && Array.isArray(data)) {
            applyRepoMetadata(data);
            if (isMounted) {
              setSyncStatus("synced");
              setLastSyncTime(new Date(timestamp));
            }
            return;
          }
        }
      } catch (e) {
        // Cache read failed (e.g., private browsing mode), proceed to fetch
      }

      // 2. Fetch fresh public data
      try {
        if (isMounted) setSyncStatus("syncing");
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API returned ${response.status}`);
        }

        const repos = await response.json();
        if (Array.isArray(repos) && isMounted) {
          applyRepoMetadata(repos);
          setSyncStatus("synced");
          const now = new Date();
          setLastSyncTime(now);

          // Save to session cache
          try {
            sessionStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ data: repos, timestamp: Date.now() })
            );
          } catch (e) {
            // Ignore cache write errors
          }
        }
      } catch (err) {
        // Defensive fallback: Curated projects remain active with zero interruption
        if (isMounted) {
          setSyncStatus("fallback");
        }
      }
    }

    function applyRepoMetadata(repos) {
      if (!Array.isArray(repos)) return;
      const repoMap = new Map();
      repos.forEach((r) => {
        repoMap.set(r.name.toLowerCase(), r);
      });

      setProjects((currentProjects) =>
        currentProjects.map((p) => {
          // Extract repo name from repoUrl (e.g., https://github.com/krishnanegi-06/1fi-sde-intern-assignment -> 1fi-sde-intern-assignment)
          const repoName = p.repoUrl.split("/").pop()?.toLowerCase();
          const match = repoName ? repoMap.get(repoName) : null;

          if (match) {
            return {
              ...p,
              stars: match.stargazers_count ?? 0,
              forks: match.forks_count ?? 0,
              pushedAt: match.pushed_at,
              defaultBranch: match.default_branch,
              githubVerified: true,
            };
          }
          return p;
        })
      );
    }

    syncRepositories();

    return () => {
      isMounted = false;
    };
  }, []);

  return { projects, syncStatus, lastSyncTime };
}
