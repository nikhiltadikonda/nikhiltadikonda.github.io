import { useState, useEffect } from 'react';
import axios from 'axios';
import { GitHubRepo } from '../types';

interface UseGitHubProjectsResult {
  projects: GitHubRepo[] | null;
  loading: boolean;
  error: Error | null;
}

export const useGitHubProjects = (): UseGitHubProjectsResult => {
  const [projects, setProjects] = useState<GitHubRepo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_GITHUB_API_URL;
    if (!apiUrl) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    axios
      .get<GitHubRepo[]>(apiUrl, { timeout: 8000 })
      .then((response) => {
        if (isMounted) {
          // Sort by most recently updated
          const sorted = response.data
            .sort((a, b) => {
              const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0;
              const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0;
              return dateB - dateA;
            });

          setProjects(sorted);
          setError(null);
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
          setError(err);
          console.warn('Failed to load GitHub repositories:', err);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { projects, loading, error };
};

export default useGitHubProjects;
