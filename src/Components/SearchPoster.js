import React from 'react';
import Image from './Image';

function SearchPoster({posters, handleSearchImageClick}) {
  return (
    <>
        <p className="app-section">Search results</p>
      <div className="poster-search-container">
        {posters.map(
          (poster, index) =>
            poster != null && (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${poster}`}
                key={poster}
                className="app-poster"
                onClick={() => handleSearchImageClick(index)}
                
              ></Image>
            )
        )}
      </div>
    </>
  )
}

export default SearchPoster