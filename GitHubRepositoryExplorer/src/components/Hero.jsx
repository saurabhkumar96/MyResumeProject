import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import {useGithubApi} from '../hooks/useFetch';



const Hero = () => {
    const handleClick = ()=>{
        const ans = useGithubApi()
        console.log(ans)
    }
    return (
        <div>
            <Box
                component="form"
                sx={{ '& > :not(style)': { m:1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                className='flex justify-center'
            >

                <TextField id="outlined-basic" label="Repository-Search" variant="outlined" />
                <Button onClick={handleClick} variant="contained">Search</Button>
            </Box>

            
        </div>
    )
}

export default Hero