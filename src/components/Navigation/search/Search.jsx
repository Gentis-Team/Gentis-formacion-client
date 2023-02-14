import React, {useState} from 'react'
import { TextField } from '@mui/material'

const Search = () => {
  const [query, setQuery] = useState("");

  return (
    <React.Fragment>
      <TextField
              label='Search'
              fullWidth
              sx={{ mt: '1rem', backgroundColor: 'white' }}
              placeholder="Search by title, e.g. Bird"
              value={query}
              onChange={({ target }) => setQuery(target.value)}            
      />
    </React.Fragment>
  )
}

export default Search