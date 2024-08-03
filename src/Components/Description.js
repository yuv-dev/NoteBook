import React from 'react'
import "../App.css";


const Description = (props) => {
  return (
    <p className='app-description'>{props.description}</p>
  )
}

export default Description