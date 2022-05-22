import React, { useEffect, useState } from 'react';

function Newsubs(props) {

    const [Movie, setMovie] = useState({})
    const [MovieInput, setMovieInput] = useState("")
    const [movieerr, setmovieErr] = useState("")
    const [DateInput, setDateInput] = useState("")
    const [dateerr, setdateErr] = useState("")

   const handlechange=async(e)=> {
        setMovieInput(e.target.value)
        setMovie({ ...Movie, movieId: e.target.value })
    }
   const Check_And_Send=async(e)=> {
        let movieError = "";
        let dateError = "";
        
        if (!MovieInput) {
            movieError = "Movie field is required";
        }
        if (!DateInput ) {
            dateError = "Date field is required ";
        }
        
        if (movieError || dateError ) {
            setmovieErr(movieError)
            setdateErr(dateError)
         return false
        }
        props.addsub(Movie)

    }
   const Cancel=async(e)=> {
       props.cancel(e)

   }
    return <div>
        
        Movie:<select className='AddMovieInput' onChange={handlechange}>
         <option disabled selected value>select an option</option>
            {props.movies.map( (x,y) => 
            <option key={y} value={x._id} >{x.name}</option> )}</select>
            <br></br>

        Date: <input className='AddMovieInput' type={"date"} onChange={e =>{setMovie({ ...Movie, date: e.target.value })
        setDateInput(e.target.value)}} /><br></br>
        <span className="text-danger">{movieerr}</span> <span className="text-danger">{dateerr}</span> <br></br>
        <div className='moviecontainer'>
        <button className='membersbuttons' onClick={Check_And_Send}>add</button>
        <button className='membersbuttons' onClick={Cancel}>cencle</button>
        </div>
    </div>
}
export default Newsubs
