import React, { useState, useEffect } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


const Search = (props) => {
  return (
    <React.Fragment>
      <ReactSearchAutocomplete
            {...props}
            fuseOptions={{ keys: ["name", "category"] }} // Search on both fields
            resultStringKeyName="name" // String to display in the results
            placeholder="Cerca cursos"
            styling={{
              height: "34px",
              borderRadius: "10px",
              border:' 2px solid #BED730',
              backgroundColor: "white",
              boxShadow: "none",
              fontSize: "12px",
              fontFamily: "Arial",
              clearIconMargin: "3px 8px 0 0",
              zIndex: 2,
            }}
          />
    </React.Fragment>
  )
}

export default Search