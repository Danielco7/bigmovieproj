// import { setegid } from 'process';
import React, { useEffect, useState } from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
function AddUser(props) {
    const [user, setUser] = useState({})
    const [subscheck, setsubscheck] = useState(false)
    const [moviescheck, setmoviescheck] = useState(false)
    const [dissablesubs, setdissubs] = useState(false)
    const [dissablemovie, setdismovie] = useState(false)
    const [Permissions, setprem] = useState([])
    const [Subs_Counter, setSubs_Counter] = useState(0)
    const [Movie_Counte, setMovie_Counte] = useState(0)
    const [fname, setfname] = useState('')
    const [fnameErr, setfnameErr] = useState('')
    const [Lname, setLname] = useState('')
    const [LnameErr, setLnameErr] = useState('')
    const [username, setusername] = useState('')
    const [usernameErr, setusernameErr] = useState('')
    const [date, setdate] = useState(false)

    useEffect(() => {
        const getdate = async()=> {
            let today = new Date();
            let dd = today.getDate();
            let mm = today.getMonth() + 1;
            let yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            } 
            today = yyyy + '-' + mm + '-' + dd;
            setdate(today)
     }
         getdate()
     }, [])


    const handleChange = async(e) => {
        const array=Permissions;
        if (e.target.checked) array.push(e.target.name)
        else {
            const index = array.indexOf(e.target.name);
            if (index === -1) {
            } else array.splice(index, 1)}
            setprem(array)
        }

   const Check_And_Send = async()=> {
        let fnameError = "";
        let LnameError = "";
        let usernameError = "";
        if (!fname) {
          fnameError = "first Name field is required";
        }
        if (!Lname ) {
            LnameError = "Last Name field is required ";
        }
        if (!username) {
            usernameError = "UserName field is required";
        }
        if (fnameError || LnameError || usernameError) {
            setfnameErr(fnameError)
            setLnameErr(LnameError)
            setusernameErr(usernameError)
         return false
        }
        user.premissions=Permissions
                user.admin=false
                user.created=date
                user.password=''
                props.add(user)
      }
        
        const Check_View_Subs = async(e) => {
            let counter=Subs_Counter
            const array=Permissions;
            if (e.target.checked===true) {
                counter+=1;
                setSubs_Counter(counter)
            }else{
                counter-=1;
                setSubs_Counter(counter)
            }
            if (counter==0) {
                setdissubs(false)
                setsubscheck(false)
                const index = array.indexOf('View Subscriptions');
                if (index === -1) console.error("checkbox was unchecked but had not been registered as checked before");
                else array.splice(index, 1)}
                else{
                    setdissubs(true)
                    setsubscheck(true)
                    const found = array.find(function (element) {
                        return element === 'View Subscriptions';
                    });
                    if (found==undefined) array.push('View Subscriptions')
                    setprem(array)
                }
                handleChange(e)
            }
            const subschecks = async(e) => {
                setsubscheck(e.target.checked)
                handleChange(e)
            }
            const Check_View_Movie = async(e) => {
                let counter=Movie_Counte
                const array=Permissions;
                if (e.target.checked===true) {
                    counter+=1;
                     setMovie_Counte(counter)
                }else{
                    counter=counter-1;
                     setMovie_Counte(counter)
                }
                if (counter==0) {
                    setdismovie(false)
                    setmoviescheck(false)
                    const index = array.indexOf('View Movies');
                    if (index === -1) console.error("checkbox was unchecked but had not been registered as checked before");
                    else array.splice(index, 1)}
                    else{
                        setdismovie(true)
                        setmoviescheck(true)
                        const found = array.find(function (element) {
                            return element === 'View Movies';
                        });
                        if (found==undefined) array.push('View Movies')
                        setprem(array)
                    }
                    handleChange(e)
                }
                const movieschecks = async(e) => {
                    setmoviescheck(e.target.checked)
                    handleChange(e)
    }

     
    const Cancel = async() => props.cancel()

    return <div className='AddMovie' style={{height:"740px"}}>

      <h1> New User: </h1>
      First Name:<input className='AddMovieInput'  onChange={e => {setUser({ ...user, fname: e.target.value })
      setfname(e.target.value)}} /> <br></br>
      <span className="text-danger">{fnameErr}</span> <br></br>

      Last Name: <input className='AddMovieInput'  onChange={e => {setUser({ ...user, Lname: e.target.value })
      setLname(e.target.value)}}/><br></br>
      <span className="text-danger">{LnameErr}</span><br></br>

      UserName: <input className='AddMovieInput'  onChange={e => {setUser({ ...user, username: e.target.value })
      setusername(e.target.value)}}/><br></br>
      <span className="text-danger">{usernameErr}</span><br></br>

      Permissions: <br></br>
      <input  type={"checkbox"} name={"View Subscriptions"}  onChange={subschecks} checked={subscheck} disabled={dissablesubs} />View Subscriptions <br></br>
      <input  type={"checkbox"} name={"Create Subscriptions"} onChange={Check_View_Subs} />Create Subscriptions <br></br>
      <input  type={"checkbox"} name={"Delete Subscriptions"} onChange={Check_View_Subs} />Delete Subscriptions <br></br>
      <input  type={"checkbox"} name={"Update Subscription"} onChange={Check_View_Subs} />Update Subscription <br></br>
      <input  type={"checkbox"} name={"View Movies"}  onChange={movieschecks} checked={moviescheck} disabled={dissablemovie}/>View Movies <br></br>
      <input  type={"checkbox"} name={"Create Movies"} onChange={Check_View_Movie} />Create Movies <br></br>
      <input  type={"checkbox"} name={"Delete Movies"} onChange={Check_View_Movie} />Delete Movies <br></br>
      <input  type={"checkbox"} name={"Update Movie"} onChange={Check_View_Movie} />Update Movie <br></br><br></br>
      <div className='AddMoviecontainer'>
      <button className='AddMovieButtons' onClick={Check_And_Send}>Add</button>
      <button className='AddMovieButtons' onClick={Cancel}>cancel</button>
      </div>

</div>
}
export default AddUser;
