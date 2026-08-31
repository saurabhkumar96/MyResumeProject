// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { useEffect, useRef, useState } from 'react';
// import { useGithubApi } from '../hooks/useFetch';
// import { Link } from 'react-router';
// import { showAllRepoLanugage } from '../services/githubapi';


// const Hero = () => {
//     const { getPerPageRepo } = useGithubApi();

//     const [repoNames, setRepoNames] = useState([]);
//     const [username, setUsername] = useState(() => { return localStorage.getItem('githubUsername') || ''; });
//     const [search, setSearch] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [current, setCurrent] = useState(1);
//     const [allLanugage, setAllLanguage] = useState([])


//     useEffect(() => {

//         let isMounted = true;

//         const fetchRepositories = async () => {
//             try {
//                 setIsLoading(true);
//                 setError(null);

//                 const response = await getPerPageRepo(current, username);

//                 if (isMounted) {
//                     setRepoNames(Array.isArray(response) ? response : []);
//                 }
//             } catch (err) {
//                 if (isMounted) {
//                     setError(
//                         err?.message || 'Failed to fetch repositories'
//                     );
//                     setRepoNames([]);
//                 }
//             } finally {
//                 if (isMounted) {
//                     setIsLoading(false);
//                 }
//             }
//         };

//         fetchRepositories();

//         return () => {
//             isMounted = false;
//         };


//     }, [current]);

//     useEffect(() => {
//         localStorage.setItem('githubUsername', username);
//     }, [username]);

//     useEffect(() => {
//         showAllRepoLanugage()
//             .then((res) => {
//                 setAllLanguage(res)
//             })
//             .catch((err) => console.log(`something is error - ${err.message}`))
//     }, [])

//     const filteredRepos = repoNames.filter((repo) =>
//         String(repo).toLowerCase().includes(search.toLowerCase())
//     );

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         let isMounted = true;

//         const fetchRepositories = async () => {
//             try {
//                 setIsLoading(true);
//                 setError(null);

//                 const response = await getPerPageRepo(current, username);

//                 if (isMounted) {
//                     setRepoNames(Array.isArray(response) ? response : []);
//                 }
//             } catch (err) {
//                 if (isMounted) {
//                     setError(
//                         err?.message || 'Failed to fetch repositories'
//                     );
//                     setRepoNames([]);
//                 }
//             } finally {
//                 if (isMounted) {
//                     setIsLoading(false);
//                 }
//             }
//         };

//         fetchRepositories();

//         return () => {
//             isMounted = false;
//         };
//     };

//     const handlePrevious = () => {
//         setCurrent((previous) => Math.max(previous - 1, 1));
//     };

//     const handleNext = () => {
//         setCurrent((previous) => previous + 1);
//     };

//     return (
//         <div>
//             <Box
//                 component="form"
//                 onSubmit={handleSubmit}
//                 sx={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     gap: 2,
//                     margin: 2,
//                 }}
//             >
//                 <TextField
//                     id="username"
//                     label="Username"
//                     variant="outlined"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />

//                 <TextField
//                     id="repository-search"
//                     label="Repository Search"
//                     variant="outlined"
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />

//                 <Button type="submit" variant="contained" >
//                     Search
//                 </Button>
//             </Box>

//             {error && (
//                 <p className="text-center text-red-500">
//                     {error}
//                 </p>
//             )}

//             <div className="flex justify-center items-center gap-4 my-4">
//                 <Button
//                     type="button"
//                     variant="contained"
//                     onClick={handlePrevious}
//                     disabled={current === 1 || isLoading}
//                 >
//                     Prev
//                 </Button>

//                 <span>Page {current}</span>

//                 <Button
//                     type="button"
//                     variant="contained"
//                     onClick={handleNext}
//                     disabled={isLoading}
//                 >
//                     Next
//                 </Button>
//             </div>

//             {isLoading ? (
//                 <p className="text-center">
//                     Loading repositories...
//                 </p>
//             ) : (
//                 <div>
//                     <div className="flex justify-center gap-5">
//                         <table className="border-collapse border border-gray-400">
//                             <thead>
//                                 <tr>
//                                     <th className="border border-gray-400 px-4 py-2">
//                                         Repository Name
//                                     </th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 {filteredRepos.length > 0 ? (
//                                     filteredRepos.map((repo, index) => (
//                                         <tr key={`${repo}-${index}`}>
//                                             <td className="border border-gray-400 px-4 py-2">
//                                                 <Link to={`/repository/${repo}`}>{repo}</Link>

//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td className="border border-gray-400 px-4 py-2">
//                                             No repositories found
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                         <div>
//                             {
//                                 allLanugage.map((lanuguage) => (
//                                     <div>{lanuguage}</div>
//                                 ))
//                             }
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Hero;







import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useEffect, useState } from 'react';
import { useGithubApi } from '../hooks/useFetch';
import { Link } from 'react-router';
import { showAllRepoLanugage } from '../services/githubapi';

const Hero = () => {
    const { getPerPageRepo } = useGithubApi();

    const [repoNames, setRepoNames] = useState([]);
    const [username, setUsername] = useState(
        () => localStorage.getItem('githubUsername') || ''
    );
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [current, setCurrent] = useState(1);
    const [allLanugage, setAllLanguage] = useState([]);

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

        if (username) {
            fetchRepositories();
        }

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
                setAllLanguage(res);
            })
            .catch((err) =>
                console.log(`Something went wrong - ${err.message}`)
            );
    }, []);

    const filteredRepos = repoNames.filter((repo) =>
        String(repo)
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);
            setError(null);
            setCurrent(1);

            const response = await getPerPageRepo(1, username);

            setRepoNames(Array.isArray(response) ? response : []);
        } catch (err) {
            setError(
                err?.message || 'Failed to fetch repositories'
            );
            setRepoNames([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrevious = () => {
        setCurrent((previous) =>
            Math.max(previous - 1, 1)
        );
    };

    const handleNext = () => {
        setCurrent((previous) => previous + 1);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white px-4 py-10">

            {/* HEADER */}

            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-10">

                    <div className="flex justify-center mb-4">
                        <div className="bg-white/10 p-4 rounded-2xl">
                            <GitHubIcon sx={{ fontSize: 45 }} />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight">
                        GitHub Repository Explorer
                    </h1>

                    <p className="text-gray-400 mt-3">
                        Search GitHub repositories and explore their languages
                    </p>

                </div>


                {/* SEARCH CARD */}

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8">

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >

                        <TextField
                            label="GitHub Username"
                            variant="outlined"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            sx={{
                                minWidth: 250,
                                backgroundColor: 'white',
                                borderRadius: 1,
                            }}
                        />

                        <TextField
                            label="Search Repository"
                            variant="outlined"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            sx={{
                                minWidth: 250,
                                backgroundColor: 'white',
                                borderRadius: 1,
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SearchIcon />}
                            disabled={isLoading || !username}
                            sx={{
                                px: 4,
                                fontWeight: 'bold',
                            }}
                        >
                            Search
                        </Button>

                    </Box>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-center">

                        {error}

                    </div>

                )}


                {/* PAGINATION */}

                <div className="flex justify-center items-center gap-5 mb-8">

                    <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<ArrowBackIcon />}
                        onClick={handlePrevious}
                        disabled={current === 1 || isLoading}
                    >
                        Previous
                    </Button>

                    <div className="bg-slate-800 border border-slate-700 px-5 py-2 rounded-xl font-semibold">

                        Page {current}

                    </div>

                    <Button
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        onClick={handleNext}
                        disabled={isLoading}
                    >
                        Next
                    </Button>

                </div>


                {/* LOADING */}

                {isLoading ? (

                    <div className="flex flex-col justify-center items-center py-20 gap-4">

                        <CircularProgress />

                        <p className="text-gray-400">
                            Fetching repositories...
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                        {/* REPOSITORIES */}

                        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

                            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-800">

                                <div>

                                    <h2 className="text-xl font-bold">
                                        Repositories
                                    </h2>

                                    <p className="text-sm text-gray-400 mt-1">
                                        {filteredRepos.length} repositories found
                                    </p>

                                </div>

                            </div>


                            <div className="divide-y divide-slate-800">

                                {filteredRepos.length > 0 ? (

                                    filteredRepos.map((repo, index) => (

                                        <Link
                                            key={`${repo}-${index}`}
                                            to={`/repository/${repo}`}
                                            className="block px-6 py-5 hover:bg-slate-800 transition duration-200"
                                        >

                                            <div className="flex items-center justify-between">

                                                <div className="flex items-center gap-4">

                                                    <div className="w-10 h-10 flex items-center justify-center bg-blue-500/10 text-blue-400 rounded-lg">

                                                        <GitHubIcon />

                                                    </div>

                                                    <div>

                                                        <h3 className="font-semibold text-lg">

                                                            {repo}

                                                        </h3>

                                                        <p className="text-sm text-gray-400">

                                                            Click to explore repository

                                                        </p>

                                                    </div>

                                                </div>

                                                <span className="text-gray-500 text-xl">

                                                    →

                                                </span>

                                            </div>

                                        </Link>

                                    ))

                                ) : (

                                    <div className="text-center py-16">

                                        <GitHubIcon
                                            sx={{
                                                fontSize: 50,
                                                color: '#64748b',
                                            }}
                                        />

                                        <h3 className="text-lg font-semibold mt-4">

                                            No repositories found

                                        </h3>

                                        <p className="text-gray-400 mt-2">

                                            Try searching for another repository

                                        </p>

                                    </div>

                                )}

                            </div>

                        </div>


                        {/* LANGUAGES */}

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit">

                            <h2 className="text-xl font-bold mb-2">

                                Languages

                            </h2>

                            <p className="text-sm text-gray-400 mb-5">

                                Technologies used in repositories
                            </p>


                            {allLanugage.length > 0 ? (

                                <div className="flex flex-wrap gap-3">

                                    {allLanugage.map(
                                        (language, index) => (

                                            <div
                                                key={`${language}-${index}`}
                                                className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-lg text-sm hover:bg-slate-700 transition"
                                            >

                                                {language}

                                            </div>

                                        )
                                    )}

                                </div>

                            ) : (

                                <p className="text-gray-500 text-sm">

                                    No language data available

                                </p>

                            )}

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
};

export default Hero;
