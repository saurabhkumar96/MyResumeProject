import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useGithubApi } from '../hooks/useFetch';

const Hero = () => {
    const { getRepos } = useGithubApi();

    const [reponame, setReponame] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const getReposs = async () => {
            try {
                setIsLoading(true)
                const res = await getRepos();
                // if(!res.ok) throw new Error("Fail to fetch data")
                setReponame(res);
            } catch (error) {
                setError(error.message)
            } finally {
                setIsLoading(false)
            }
        };

        getReposs();
    }, [getRepos]);

    const filteredRepos = reponame.filter((repo) =>
        repo.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <Box
                component="form"
                onSubmit={(e) => e.preventDefault()}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    margin: 2,
                }}
            >
                <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="Repository-Search"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Button type="submit" variant="contained">
                    Search
                </Button>
            </Box>

            <div className="flex justify-center">
                <table className="border-collapse border border-gray-400 w-2">
                    <thead>
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">
                                Repository Name
                            </th>

                        </tr>
                    </thead>

                    <tbody>
                        {filteredRepos.map((repo, index) => (
                            <tr key={index}>
                                <td className="border border-gray-400 px-4 py-2">
                                    {repo}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Hero;
