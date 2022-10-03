import React, { useEffect, useReducer } from "react";
import useDebounce from "./useDebounce";
let searchMovieArray = [];

function Search() {
//   const [movie, setMovie] = useState([]);
//   const [posters, setPosters] = useState([]);
//   const [overview, setOverview] = useState([]);
//   const [backdrop, setBackdrop] = useState([]);

//   const [search, setSearch] = useState("");

const initialState = {
    movie:[],
    posters:[],
    overview:[],
    backdrop:[],
    search:""
}

const reducer =(state, action)=>{
    switch(action.type){
        case "SET_MOVIE_NAME":
            return {...state, movie:action.payload};
        case "SET_SEARCH_VALUE":
            return {...state, search:action.payload};
        case "SET_MOVIE_BACKDROP_PATH":
            return {...state, backdrop:action.payload};
        case "SET_MOVIE_OVERVIEW":
            return {...state, overview:action.payload};
        case "SET_POSTERS":
            return {...state, posters:action.payload};
        case "default":
            return state;
    }
}
const [state, dispatch] = useReducer(reducer, initialState)

  const debouncedSearch = useDebounce(state.search, 500);

  useEffect(() => {
    const fetchData = () => {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${debouncedSearch}&api_key=7ec4884b96e76644607befd3b7391e70`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          searchMovieArray = data.results;

        //   setPosters(data.results.map((movie) => movie.poster_path));
        dispatch({type:"SET_POSTERS", payload:searchMovieArray.map(movie => movie.poster_path)})
        });
    };
    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  const handleSearchImageClick = (index) => {
    dispatch({type:"SET_MOVIE_NAME", payload:searchMovieArray[index].original_title ||
    searchMovieArray[index].original_name})
    dispatch({type:"SET_MOVIE_BACKDROP_PATH", payload:searchMovieArray[index].backdrop_path})
    dispatch({type:"SET_MOVIE_OVERVIEW", payload:searchMovieArray[index].overview})
      
   
    
    
  };

  

  return (

    <div>
      <input
        type="search"
        onChange={(e) => dispatch({type:"SET_SEARCH_VALUE", payload:e.target.value})}
        placeholder="Search for movies"
        className="app-header-searchbar"
      ></input>
      <p>{state.search}</p>

      {searchMovieArray.length > 0 && (
        <div className="app-body">
          <div className="movie-section">
            <div className="movie-details">
              <p className="movie-title">{state.movie}</p>
              <p className="movie-overview">{state.overview}</p>
            </div>

            <img
              src={`https://image.tmdb.org/t/p/w1280/${state.backdrop}`}
              className="background-image"
            />
          </div>
        </div>
      )}

      <p className="app-section">Search results</p>
      <div className="poster-search-container">
        {state.posters.map(
          (poster, index) =>
            poster != null && (
              <img
                src={`https://image.tmdb.org/t/p/w500/${poster}`}
                className="app-poster"
                onClick={() => handleSearchImageClick(index)}
                
              ></img>
            )
        )}
      </div>
    </div>
  );
}

export default Search;
