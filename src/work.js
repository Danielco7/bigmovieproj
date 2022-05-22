import React, { useEffect, useLayoutEffect, useState } from 'react';
import { getAll} from './utils';
const url1 = "http://localhost:8000/api/Users"
const urlmembers = "http://localhost:8000/api/Members"
const urlsubs = "http://localhost:8000/api/Subs"

function Create({ match ,history}) {
    
     async function showmember1() {
        const { data } = await getAll(url1)
            console.log(data);
        
    }
    async function showmember2() {
        const { data } = await getAll(urlmembers)
            console.log(data);
    }
    async function showmember3() {
        const { data } = await getAll(urlsubs)
            console.log(data);
    }
    return <div>
    <br />
    
    <button onClick={showmember1}> users</button>
    <button onClick={showmember2}> members</button>
    <button onClick={showmember3}> subs</button>
</div>;
}

export default Create;