import React, { useEffect, useState } from 'react';

function User(props) {
    
    useEffect(() => {
        async function getdate() {
     }
         getdate()
     }, [])  
     
     async function Edit() {
        props.Edit(props.user)
    }
    async function Delete() {
        props.Delete(props.user)
        
    }

    return <div className='Memebrs'>
        <h4>Name: {`${props.user.fname} ${props.user.Lname}`}</h4>
        <h4>User Name: {props.user.username}</h4>
        <div className='moviecontainer'>
          <button className='membersbuttons' onClick={Edit}>edit</button>
          <button className='membersbuttons' onClick={() => {
            if (window.confirm("Delete this user?")) {Delete()}
          }}>delete</button>
        </div>
        <h4>Permissions:</h4> <ul>{props.user.premissions.map((elem, index) => <li key={index}>{elem } </li>)}</ul>

                            
            </div>
        
    }
    

    export default User

