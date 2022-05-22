import React, { useEffect, useState } from 'react';
function AddMember(props) {
    const [Member, setMember] = useState(props.member)
    const [name, setname] = useState('')
    const [nameErr, setnameErr] = useState('')
    const [email, setemail] = useState('')
    const [emailErr, setemailErr] = useState('')
    const [city, setcity] = useState('')
    const [cityErr, setcityErr] = useState('')


     const Check_And_Send =async()=> {
        let nameError = "";
        let emailError = "";
        let cityError = "";
        if (!name) {
            nameError = "Name field is required";
        }
        if (!email ) {
            emailError = "Email field is required ";
        }
        if (!city) {
            cityError = "City field is required";
        }
        
        if (nameError || emailError || cityError ) {
            setnameErr(nameError)
            setemailErr(emailError)
            setcityErr(cityError)
         return false
        }
                 props.add(Member)
      }

      const Cancel=async()=> props.cancel()
    return <div className='AddMovie' >
      <h1> New Member: </h1>

    Name:<input className='AddMovieInput' onChange={e => {setMember({ ...Member, name: e.target.value })
    setname(e.target.value)}} /> <br></br>
    <span className="text-danger">{nameErr}</span> <br></br>

    Email: <input className='AddMovieInput' onChange={e => {setMember({ ...Member, email: e.target.value })
    setemail(e.target.value)}}/><br></br>
    <span className="text-danger">{emailErr}</span><br></br>

    City: <input className='AddMovieInput' onChange={e => {setMember({ ...Member, city: e.target.value })
    setcity(e.target.value)}}/><br></br>
    <span className="text-danger">{cityErr}</span><br></br>
    <div className='AddMoviecontainer'>
    <button className='AddMovieButtons' onClick={Check_And_Send}>Update</button>
    <button className='AddMovieButtons' onClick={Cancel}>cancel</button>
    </div>
    </div>
}
    
export default AddMember
