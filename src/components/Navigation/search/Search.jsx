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
              borderRadius: "1rem",
              backgroundColor: "white",
              boxShadow: "none",
              fontSize: ".8rem",
              fontFamily: "Open Sans",
              clearIconMargin: "3px 8px 0 0",
              zIndex: 2,
            }}
          />
    </React.Fragment>
  )
}

export default Search