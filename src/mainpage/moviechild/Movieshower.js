import React, { useEffect, useState } from 'react';
import Subs from './subs';
const urlsubs = "http://localhost:8000/api/Subs"
const urlmembers = "http://localhost:8000/api/Members"

function ShowMovie(props) {
    const [Checksubs, setChecksubs] = useState(false)

    useEffect(() => {
        return function cleanUp(){
        }
    }, [])


 const showsubs= () =>{  setChecksubs(!Checksubs)}

 const ShowMember=async(e)=>  props.displaymember(e)

 const Cancel=async(e)=>  props.cancel(e)


    return <div >
        <div className='undo' onClick={Cancel}><svg width="40" height="40" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M58.625 30.7083H17.9057L32.682 15.932L28.7346 11.9846L7.21924 33.5L28.7346 55.0154L32.682 51.068L17.9057 36.2917H58.625V30.7083Z" fill="white"/>
</svg></div>

    <h3>{props.movie.name}</h3>{props.movie.premired.split('T')[0]}<br></br>
     <img src={props.movie.image}/> <br></br><br></br>
    <h2>{props.movie.genres}</h2><br></br>
   <h3 onClick={showsubs} className='subbutton'>Subscriptions watched</h3> 
    {Checksubs?props.user.admin?<Subs user={props.user} movie={props.movie} membertoshow={ShowMember}/>:props.subs==="View Subscriptions"?<Subs user={props.user} movie={props.movie}/>:null:null}
    </div>
}
export default ShowMovie
