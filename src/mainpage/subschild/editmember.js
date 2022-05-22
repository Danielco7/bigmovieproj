import React, { useEffect, useState } from 'react';
function EditMember(props) {
    const [Member, setMember] = useState(props.member)
    const [name, setname] = useState('')
    const [nameErr, setnameErr] = useState('')
    const [email, setemail] = useState('')
    const [emailErr, setemailErr] = useState('')
    const [city, setcity] = useState('')
    const [cityErr, setcityErr] = useState('')

    useEffect(() => {
        const getmembers = async()=> {
             setname(props.member.name)
             setemail(props.member.email)
             setcity(props.member.city)
     }
     
         getmembers()
     }, [])

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
        } props.update(Member)
      }

      const Cancel = async() => props.cancel()

      
    return <div className='AddMovie' >
    Name:<input className='AddMovieInput' defaultValue={props.member.name} onChange={e => {setMember({ ...Member, name: e.target.value })
    setname(e.target.value)}} /> <br></br>
    <span className="text-danger">{nameErr}</span> <br></br>

    Email: <input className='AddMovieInput' defaultValue={props.member.email} onChange={e => {setMember({ ...Member, email: e.target.value })
    setemail(e.target.value)}}/><br></br>
    <span className="text-danger">{emailErr}</span><br></br>

    City: <input className='AddMovieInput' defaultValue={props.member.city} onChange={e => {setMember({ ...Member, city: e.target.value })
    setcity(e.target.value)}}/><br></br>
    <span className="text-danger">{cityErr}</span><br></br>
    <div className='AddMoviecontainer'>
    <button className='AddMovieButtons' onClick={Check_And_Send}>Update</button>
    <button className='AddMovieButtons' onClick={Cancel}>cancel</button>
    </div>
        </div>
}
export default EditMember
