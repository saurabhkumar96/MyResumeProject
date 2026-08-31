import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useRef, useState } from 'react';
import { useGithubApi } from '../hooks/useFetch';
import { Link } from 'react-router';
import { showAllRepoLanugage } from '../services/githubapi';


const Hero = () => {
    const { getPerPageRepo } = useGithubApi();

    const [repoNames, setRepoNames] = useState([]);
    const [username, setUsername] = useState(() => { return localStorage.getItem('githubUsername') || ''; });
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [current, setCurrent] = useState(1);
    const [allLanugage, setAllLanguage] = useState([])


    useEffect(() => {

        let isMounted = true;

        const fetchRepositories = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await getPerPageRepo(current, username);

                if (isMounted) {
                    setRepoNames(Array.isArray(response) ? response : []);
                }
            } catch (err) {
                if (isMounted) {
                    setError(
                        err?.message || 'Failed to fetch repositories'
                    );
                    setRepoNames([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchRepositories();

        return () => {
            isMounted = false;
        };


    }, [current]);

    useEffect(() => {
        localStorage.setItem('githubUsername', username);
    }, [username]);

    useEffect(() => {
        showAllRepoLanugage()
            .then((res) => {
                setAllLanguage(res)
            })
            .catch((err) => console.log(`something is error - ${err.message}`))
    }, [])

    const filteredRepos = repoNames.filter((repo) =>
        String(repo).toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isMounted = true;

        const fetchRepositories = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await getPerPageRepo(current, username);

                if (isMounted) {
                    setRepoNames(Array.isArray(response) ? response : []);
                }
            } catch (err) {
                if (isMounted) {
                    setError(
                        err?.message || 'Failed to fetch repositories'
                    );
                    setRepoNames([]);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchRepositories();

        return () => {
            isMounted = false;
        };
    };

    const handlePrevious = () => {
        setCurrent((previous) => Math.max(previous - 1, 1));
    };

    const handleNext = () => {
        setCurrent((previous) => previous + 1);
    };

    return (
        <div>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    margin: 2,
                }}
            >
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                    id="repository-search"
                    label="Repository Search"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Button type="submit" variant="contained" >
                    Search
                </Button>
            </Box>

            {error && (
                <p className="text-center text-red-500">
                    {error}
                </p>
            )}

            <div className="flex justify-center items-center gap-4 my-4">
                <Button
                    type="button"
                    variant="contained"
                    onClick={handlePrevious}
                    disabled={current === 1 || isLoading}
                >
                    Prev
                </Button>

                <span>Page {current}</span>

                <Button
                    type="button"
                    variant="contained"
                    onClick={handleNext}
                    disabled={isLoading}
                >
                    Next
                </Button>
            </div>

            {isLoading ? (
                <p className="text-center">
                    Loading repositories...
                </p>
            ) : (
                <div>
                    <div className="flex justify-center gap-5">
                        <table className="border-collapse border border-gray-400">
                            <thead>
                                <tr>
                                    <th className="border border-gray-400 px-4 py-2">
                                        Repository Name
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredRepos.length > 0 ? (
                                    filteredRepos.map((repo, index) => (
                                        <tr key={`${repo}-${index}`}>
                                            <td className="border border-gray-400 px-4 py-2">
                                                <Link to={`/repository/${repo}`}>{repo}</Link>

                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="border border-gray-400 px-4 py-2">
                                            No repositories found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div>
                            {
                                allLanugage.map((lanuguage) => (
                                    <div>{lanuguage}</div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;
