import React from 'react';
import Image from './Image';

function PopularMovies({posters1, handlePopularImageClick, popular}) {
  return (
    <>
        <p className="app-section">Popular This Week</p>
        <div className="poster-container">
          {posters1.map((poster, index) => (
            <Image
              src={`https://image.tmdb.org/t/p/w500/${poster}`}
              className="app-poster"
              onClick={() => handlePopularImageClick(index, popular)}
            ></Image>
          ))}
        </div>
    </>
  )
}

export default PopularMovies