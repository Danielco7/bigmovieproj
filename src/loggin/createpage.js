import React, { useEffect, useState } from 'react';
import { getAll,updateObj} from '../utils';
import logo from '../kisspng-roll-film-logo-cinema-roll-5abe468859c0a0.4946769715224193363676.png';

const url = "http://localhost:8000/api/Users"

function Create({history}) {
    const [user, setsignupUser] = useState({ username: "", password: "" })
    
    const Changepassword =async()=>{
        
        const { data } = await getAll(url)
        const usertobefound = data.find(function (eachuser) {
            return eachuser.username === user.username;
        });
        if (usertobefound==undefined) {
            alert("the username you try to reach doesnot exists in our system please try another")
        }else{
            if(usertobefound.password==''){
                
                if (user.password.length<6) alert("your password is too short please make sure its over 6 letters");
                else{
                    let NewUser=usertobefound;
                    NewUser.password = user.password;
                    const id=NewUser._id

                    const { data:data2 } = await updateObj(url,id,NewUser)
                        alert('your update has been saved!');
                        Goback()
                }
            }else alert("it seems that the username you try to reach is allready taken by somone else and its not a new user anymore")
        }
    }

    const Goback=()=>  history.push(`/`); 
    
    return <div className='logginbody'>
        <img src={logo} className='logo'/>

        <br />
        Username: <input name='username' onChange={e => setsignupUser({ ...user, username: e.target.value })}></input> <br />
        Password: <input name='password' onChange={e => setsignupUser({ ...user, password: e.target.value })}></input> <br />
        <button onClick={Changepassword}>create</button>
        <button onClick={Goback}>cancel</button>
    </div>;
}

export default Create;
