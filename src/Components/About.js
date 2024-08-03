import React, {useContext} from 'react'
import NoteContext from '../Context/noteContext';

const About  = () => {

  const user = useContext(NoteContext); 

  console.log(user);
  return (
    <div>
        <h2>About</h2>
        <p>This is About page of Notebook </p>
    </div>
  )
}

export default About;