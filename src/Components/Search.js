import React, { useLayoutEffect, useReducer, useMemo} from "react";
import {NavLink} from "react-router-dom"
import useDebounce from "./useDebounce";
import Image from "./Image"
import MovieSection from "./MovieSection";
import SearchPoster from "./SearchPoster";
import VirtualKeyboard from "./VirtualKeyboard";

/* useMemo is used when a child component doesnot want to re-render when a parent updates */
let searchMovieArray = [];

function Search() {


  
  // const inputRef = useRef();

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

  useLayoutEffect(() => {
    
    
    const fetchData = () => {
      
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${debouncedSearch}&include_adult=false&api_key=7ec4884b96e76644607befd3b7391e70`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          searchMovieArray = data.results;
          handleSearchImageClick(0)
          

        //   setPosters(data.results.map((movie) => movie.poster_path));
        dispatch({type:"SET_POSTERS", payload:searchMovieArray.map(movie => movie.poster_path)});
        }).catch((error)=>{console.error(error)})
        };
    
    if (debouncedSearch) fetchData();
    
  }, [debouncedSearch]);

  

  const handleInputChange = (data) => {
    console.log(data)
    dispatch({type:"SET_SEARCH_VALUE", payload:data})
  }
  const handleSearchImageClick = (index) => {
    dispatch({type:"SET_MOVIE_NAME", payload:searchMovieArray[index].original_title ||
    searchMovieArray[index].original_name})
    dispatch({type:"SET_MOVIE_BACKDROP_PATH", payload:searchMovieArray[index].backdrop_path})
    dispatch({type:"SET_MOVIE_OVERVIEW", payload:searchMovieArray[index].overview})
   
  };

  const MemoVirtualKeyboard = useMemo(()=>{
    return <VirtualKeyboard handleInputChange={handleInputChange}/>
  },[])

  

  return (
    
    <div className="movie-search">
     <div className="search-header">
    
    
    
      {MemoVirtualKeyboard}

      
     </div>
      
     
     <NavLink to="/"><p className="app-header-tab">Home</p></NavLink>
      {state.search && state.backdrop && (
        <div className="app-body">
          <MovieSection movie={state.movie} overview={state.overview} backdrop={state.backdrop}/>
        </div>
      )}

      <SearchPoster posters={state.posters} handleSearchImageClick={handleSearchImageClick} />
    </div>
  );
}

export default Search;


