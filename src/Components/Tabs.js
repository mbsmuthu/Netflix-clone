import React, { useEffect, useRef } from 'react'

function Tabs() {
    const homeRef = useRef();
    useEffect(()=>{
        console.log(homeRef.current);
    },[])
  return (<div className="tabs">
            <p className="app-header-tab" ref={homeRef}>Home</p>
            <p className="app-header-tab">TV Shows</p>
           {console.log("Tab render")} <p className="app-header-tab">Movies</p>
            <p className="app-header-tab">Latest</p>
            <p className="app-header-tab">My List</p>
          
          </div>
    
  )
}

export default Tabs