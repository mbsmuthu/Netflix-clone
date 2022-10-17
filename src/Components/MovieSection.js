import React,{useEffect, useRef} from 'react';
import Image from './Image';
import Buttons from './Buttons';
import {MovieContext} from "./Home"

function MovieSection({overview, backdrop}) {
    const buttonRef = useRef(null);
    useEffect(()=>{
        buttonRef.current.focusPlay();
    },[])

  return (
    <>
        <div className="movie-section">
          <div className="movie-details">
            <MovieContext.Consumer>
            {movie=>{
                return <p className="movie-title">{movie}</p>
            }}
            </MovieContext.Consumer>
            
            <p className="movie-overview">{overview}</p>
          <Buttons ref={buttonRef}></Buttons>
          </div>

          <Image
            src={`https://image.tmdb.org/t/p/w1280/${backdrop}`}
            className="background-image"
          />
        </div>
    </>
  )
}

export default MovieSection