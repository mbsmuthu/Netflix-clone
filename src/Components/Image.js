import React from 'react'

function Image({src, className, onClick, key}) {
  return (
    <img src={src} className={className} onClick={onClick} key={key} />
  )
}

export default Image