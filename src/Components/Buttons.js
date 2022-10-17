import React,{useRef, useImperativeHandle, forwardRef} from 'react'

const Buttons = forwardRef((props, ref)=> {
    const playRef = useRef();

    useImperativeHandle(ref, ()=>({
        focusPlay:()=>{
            playRef.current.focus();
        }
    }))
  return (
    <>
          <div className="movie-buttons">
              <button className="movie-btn" ref={playRef}>Play</button>
              <button className="movie-btn">More Info</button>
              <button className="movie-btn">Watch together</button>
            </div>
    </>
  )
})

export default Buttons