import { FaSistrix } from "react-icons/fa";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    });
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

  return (
    <div className="App">
      <div className="app-header">
        <div className="app-header-left">
          <img
            src="https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F08%2Fmost-used-netflix-icon-boss-baby-info-tw.jpg?w=960&cbr=1&q=90&fit=max"
            className="app-main-logo"
          />

          <p className="app-header-tab">Home</p>
          <p className="app-header-tab">TV Shows</p>
          <p className="app-header-tab">Movies</p>
          <p className="app-header-tab">Latest</p>
          <p className="app-header-tab">My List</p>
        </div>

        <div className="app-header-right">
          
            <Link to="/search"><FaSistrix size={25} className="app-header-icon" /></Link>
          
          <MdOutlineNotificationsNone size={30} className="app-header-icon" />
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            className="app-display-pic"
          />
        </div>
      </div>

      <div className="app-body">
        <div className="movie-section">
          <div className="movie-details">
            <p className="movie-title">{movie}</p>
            <p className="movie-overview">{overview}</p>
          </div>

          <img
            src={`https://image.tmdb.org/t/p/w1280/${backdrop}`}
            className="background-image"
          />
        </div>
        <p className="app-section">Trending This Week</p>
        <div className="poster-container">
          {posters.map((poster, index) => (
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster}`}
              

              className="app-poster"
              onClick={() => handleTrendingImageClick(index)}
            ></img>
          ))}
        </div>

        <p className="app-section">Popular This Week</p>
        <div className="poster-container">
          {posters1.map((poster, index) => (
            <img
              src={`https://image.tmdb.org/t/p/w500/${poster}`}
              className="app-poster"
              onClick={() => handlePopularImageClick(index, popular)}
            ></img>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
