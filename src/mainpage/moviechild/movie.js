import React, { useEffect, useState } from 'react';
import Subs from './subs';
import {CSSTransition} from 'react-transition-group';
import ShowMovie from './Movieshower';
const urlsubs = "http://localhost:8000/api/Subs"

function Movie(props) {
    const [CheckUpadteButton, setCheckUpadteButton] = useState('')
    const [CheckDeleteButton, setCheckDeleteButton] = useState('')
    const [Checksubs, setChecksubs] = useState(false)

    useEffect(() => {
        async function getmovies() {
            const Updatebutton = props.user.premissions.find(function (element) {
                return element === "Update Movie";
            });
            setCheckUpadteButton(Updatebutton)
            const Deletebutton = props.user.premissions.find(function (element) {
                return element === "Delete Movies";
            });
            setCheckDeleteButton(Deletebutton)
           
     }
         getmovies()
     }, [])
     const Edit=async()=>  props.Edit(props.movie)
     
     const Delete=async()=>  props.Delete(props.movie,props.counter)

     const ShowMember=async(e)=>  props.displaymember(e)

     const showsubs= () =>{  setChecksubs(!Checksubs)}

     const ShowMovie=async()=>  props.imgclicker(props.movie)

    
    return <div className='movies' >
        <h3 className='header'>{props.movie.name}</h3>
        <div className='imgcont'>
        <img className='imges' src={props.movie.image} onClick={ShowMovie}/>
        </div> <br></br>
        <div className='moviecontiner'>
        <p>{props.movie.genres}</p>
           <div className='moviecontainer'>
        {props.user.admin? <button className='moviebuttons' onClick={Edit}>edit</button>:CheckUpadteButton==="Update Movie"? <button onClick={Edit}>edit</button>:null}
        {props.user.admin? <button className='moviebuttons' onClick={() => {
            if (window.confirm("Delete this movie?")) {Delete()}
          }}
        >
        delete</button>:CheckDeleteButton==="Delete Movies"? <button onClick={() => {
            if (window.confirm("Delete this movie?")) {Delete()}
          }}>delete</button>:null}
           </div>
        </div>
        
        
    </div>
    }
    export default Movie
