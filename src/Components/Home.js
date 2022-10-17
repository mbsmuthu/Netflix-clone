
import { React, useState, useEffect, useMemo, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import Image from "./Image";
import Tabs from "./Tabs";
import TrendingMovies from "./TrendingMovies";
import PopularMovies from "./PopularMovies";
import MovieSection from "./MovieSection";
import AppHeader from "./AppHeader";

/*useState Hook is used to set the initial state and further update the state.
It causes the component to re-render on state update. It is equivalent to setState in
class components.

useEffect is used to capture side-effects and also used to remove any subscriptions if present*/

export const MovieContext = createContext();


let trending = [];
let popular = [];

function Home() {
  const [movie, setMovie] = useState([]);
  const [posters, setPosters] = useState([]);
  const [backdrop, setBackdrop] = useState([]);
  const [overview, setOverview] = useState([]);
  const [posters1, setPosters1] = useState([]);


  useEffect(() => {
    Promise.all([
      fetch(
        "https://api.themoviedb.org/3/trending/all/week?api_key=7ec4884b96e76644607befd3b7391e70"
      ).then((response) => response.json()),
      fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=7ec4884b96e76644607befd3b7391e70"
      ).then((response) => response.json()),
    ]).then((data) => {
      trending = data[0].results;
      popular = data[1].results;
      setPosters(trending.map((movie) => movie.poster_path));
      setPosters1(popular.map((movie) => movie.poster_path));
      handleTrendingImageClick(0);
    }).catch(error=>console.error(error));
  }, []);

  const handleTrendingImageClick = (index) => {
    // setArrIndex(index);
    setMovie(trending[index].original_title || trending[index].original_name);
    setOverview(trending[index].overview);
    setBackdrop(trending[index].backdrop_path);
  };

  const handlePopularImageClick = (index, popular) => {
    // setArrIndex(index);
    setMovie(popular[index].original_title || popular[index].original_name);
    setOverview(popular[index].overview);
    setBackdrop(popular[index].backdrop_path);
  };

  const MemoTabs = useMemo(()=>{
    return <Tabs/>
  },[])

  return (
    <div className="App">
      <div className="header">
          <AppHeader MemoTabs={MemoTabs}/>
          <MovieContext.Provider value={movie}>
              <MovieSection overview={overview} backdrop={backdrop}/>
          </MovieContext.Provider>
          
      </div>
     
      <div className="app-body">
        
        <TrendingMovies posters={posters} handleTrendingImageClick={handleTrendingImageClick}/>
        <PopularMovies posters1={posters1} handlePopularImageClick={handlePopularImageClick} popular={popular}/>
      </div>
    </div>
  );
}

export default Home;
