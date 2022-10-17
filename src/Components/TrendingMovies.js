import React from 'react';
import Image from './Image';

function TrendingMovies({posters, handleTrendingImageClick}) {
  return (
    <>
          <p className="app-section">Trending This Week</p>
        <div className="poster-container">
          {posters.map((poster, index) => (
            <Image
              src={`https://image.tmdb.org/t/p/w500/${poster}`}
              

              className="app-poster"
              onClick={() => handleTrendingImageClick(index)}
            ></Image>
          ))}
        </div>
    </>
  )
}

export default TrendingMovies