import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField } from '@mui/material'

const App = () => {
  return (
    <div >
      <Box sx={{ display: 'flex', alignItems: 'flex-end', cursor:"pointer" }}>
      <TextField id="standard-basic" label="search" variant="standard" />
      <SearchIcon />
      </Box>
      <div className='text-red-500 bg-gray-500'>dis</div>
    </div>
  )
}

export default App