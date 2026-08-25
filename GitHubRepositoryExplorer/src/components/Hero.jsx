import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Hero = () => {
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
                <Button variant="contained">Search</Button>
            </Box>

            
        </div>
    )
}

export default Hero