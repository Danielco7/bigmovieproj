import React, { useEffect, useState } from 'react';

function EditUser(props) {
    const [user, setUser] = useState(props.user)
    const [button2, setbutton2] = useState(false)
    const [button3, setbutton3] = useState(false)
    const [button4, setbutton4] = useState(false)
    const [button6, setbutton6] = useState(false)
    const [button7, setbutton7] = useState(false)
    const [button8, setbutton8] = useState(false)
    const [check, setcheck] = useState(false)
    const [subscheck, setsubscheck] = useState(false)
    const [moviescheck, setmoviescheck] = useState(false)
    const [dissablesubs, setdissubs] = useState(false)
    const [dissablemovie, setdismovie] = useState(false)
    const [Permissions, setprem] = useState(user.premissions)
    const [fname, setfname] = useState('')
    const [fnameErr, setfnameErr] = useState('')
    const [Lname, setLname] = useState('')
    const [LnameErr, setLnameErr] = useState('')
    const [username, setusername] = useState('')
    const [usernameErr, setusernameErr] = useState('')
    const [Subs_Counter, setSubs_Counter] = useState(0)
    const [Movie_Counte, setMovie_Counte] = useState(0)


    useEffect(() => {
    const chek1 = user.premissions.find(function (element) {
        return element === "View Subscriptions";
    });
    if ( chek1!==undefined) {
        setsubscheck(true)
        setdissubs(true)
    }
    const chek2 = user.premissions.find(function (element) {
        return element === "Create Subscriptions";
    });
    if ( chek2!==undefined) {
        setbutton2(true)
    }
    const chek3 = user.premissions.find(function (element) {
        return element === "Delete Subscriptions";
    });
    if ( chek3!==undefined) {
        setbutton3(true)
    }
    const chek4 = user.premissions.find(function (element) {    
        return element === "Update Subscription";
    });
    if ( chek4!==undefined) {
        setbutton4(true)
    }
    const chek5 = user.premissions.find(function (element) {   
        return element === "View Movies";
    });
    if ( chek5!==undefined) {
        setmoviescheck(true)
        setdismovie(true)

    }
    const chek6 = user.premissions.find(function (element) {  
        return element === "Create Movies";
    });
    if ( chek6!==undefined) {
        setbutton6(true)
    }
    const chek7 = user.premissions.find(function (element) { 
        return element === "Delete Movies";
    });
    if ( chek7!==undefined) {
        setbutton7(true)
    }
    const chek8 = user.premissions.find(function (element) {
        return element === "Update Movie";
    });
    if ( chek8!==undefined) {
        setbutton8(true)
    }
    setcheck(true)
    let filteredsubs = user.premissions.filter(elem => elem=="Update Subscription"||elem=="Delete Subscriptions"||elem=="Create Subscriptions")
    setSubs_Counter(filteredsubs.length)

    let filteredmovie = user.premissions.filter(elem => elem=="Update Movie"||elem=="Delete Movies"||elem=="Create Movies")
    setMovie_Counte(filteredmovie.length)

    setfname(user.fname)
    setLname(user.Lname)
    setusername(user.username)






    }, [])
    async function handleChange(e) {
        const array=Permissions;
        if (e.target.checked) {
            array.push(e.target.name)
        } else {
            const index = array.indexOf(e.target.name);
            if (index === -1) {
            } else {
                array.splice(index, 1)}
            }
            setprem(array)
            
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

    async function Cancel() {
        props.cancel()
        
    }
    const Edit = async()=> {
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
        props.update(user)
        props.cancel()
      }
    
    
    return <div style={{minHeight:"100vh"}} >{check?<div  className='AddMovie' style={{height:"740px"}}>
        <h1> Edit User: {props.user.fname} {props.user.Lname} </h1>
         First Name:<input className='AddMovieInput' defaultValue={props.user.fname} name={'fname'} onChange={e => {setUser({ ...user, fname: e.target.value })
        setfname(e.target.value)}} /> <br></br>
      <span className="text-danger">{fnameErr}</span> <br></br>
         
    Last Name: <input className='AddMovieInput' defaultValue={props.user.Lname} name={'Lname'} onChange={e => {setUser({ ...user, Lname: e.target.value })
    setLname(e.target.value)}}/><br></br>
      <span className="text-danger">{LnameErr}</span><br></br>

    User Name: <input className='AddMovieInput' defaultValue={props.user.username} name={'username'} onChange={e => {setUser({ ...user, username: e.target.value })
    setusername(e.target.value)}}/><br></br>
      <span className="text-danger">{usernameErr}</span><br></br>
    Permissions: <br></br>
    <input type={"checkbox"} name={"View Subscriptions"}  onChange={subschecks} checked={subscheck} disabled={dissablesubs} />View Subscriptions <br></br>
    <input type={"checkbox"} name={"Create Subscriptions"} defaultChecked={button2} onChange={Check_View_Subs} />Create Subscriptions <br></br>
    <input type={"checkbox"} name={"Delete Subscriptions"} defaultChecked={button3} onChange={Check_View_Subs} />Delete Subscriptions <br></br>
    <input type={"checkbox"} name={"Update Subscription"} defaultChecked={button4} onChange={Check_View_Subs} />Update Subscription <br></br>
    <input type={"checkbox"} name={"View Movies"}  onChange={movieschecks} checked={moviescheck} disabled={dissablemovie}/>View Movies <br></br>
    <input type={"checkbox"} name={"Create Movies"} defaultChecked={button6} onChange={Check_View_Movie} />Create Movies <br></br>
    <input type={"checkbox"} name={"Delete Movies"} defaultChecked={button7} onChange={Check_View_Movie} />Delete Movies <br></br>
    <input type={"checkbox"} name={"Update Movie"} defaultChecked={button8} onChange={Check_View_Movie} />Update Movie <br></br><br></br>

  <div className='AddMoviecontainer'>
    <button className='AddMovieButtons' onClick={Edit}>Update</button>
    <button className='AddMovieButtons' onClick={Cancel}>cancel</button>
  </div>
  </div>
:null}
      </div>
  
}

export default EditUser