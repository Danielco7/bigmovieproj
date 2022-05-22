import React, { useEffect, useState } from 'react';
import { getAll,addObj,updateObj,deleteObj} from '../../utils';
import User from './user';
import EditUser from './edituser';
import AddUser from './adduser';
import users from '../../imgs/workers.jpg'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore,{Navigation,Pagination} from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

const usersurl = "http://localhost:8000/api/Users"

function UsersPage(props) {
    const [Users, setusers] = useState({})
    const [usertoedit, setuser] = useState({})
    const [checkusers, setcheckusers] = useState(false)
    const [checkedit, setcheckedit] = useState(false)
    const [checknewuser, setchecknewuser] = useState(false)


    useEffect(() => {
        async function getusers() {
             const { data } = await getAll(usersurl)
             data.splice(0,2)
             console.log(data);
            await setusers(data)
            await setcheckusers(true)
     }
         getusers()
     }, [])
     useEffect(() => {
        return function cleanUp(){
            setusers()
            setuser()
            setcheckusers()
            setchecknewuser()
            setcheckedit()
        }
    }, [])

     async function allusers() {
         await setcheckusers(true)
         await setcheckedit(false)
        await setchecknewuser(false)
    }

    async function adduser() {
        await setcheckusers(false)
         await setcheckedit(false)
        await setchecknewuser(true)
    }
    async function Edit(e) {
        await setuser(e)
        await setcheckedit(true)
        await setcheckusers(false)

    }
    async function Update(e) {
        const { data } = await updateObj(usersurl,e._id,e)

        // await setuser(e)
        // await setcheckedit(true)
        // await setcheckusers(false)

    }
    async function Add(e) {
        const { data2 } = await addObj(usersurl,e)
        const { data } = await getAll(usersurl)
             data.splice(0,1)
        await setusers(data)
        await setcheckusers(true)
        await setchecknewuser(false)
        await setcheckedit(false)

    }
    async function Delete(e) {
        const { data2 } = await deleteObj(usersurl,e._id)
        const { data } = await getAll(usersurl)
             data.splice(0,1)
            await setusers(data)

    }

    return <div >



<div className="container" >
        <img src={users} alt="logo" id='imgbackground'/>
        <h1 id='titlee'>Users</h1>
        <div>{checknewuser?<button onClick={allusers} className="btnn">all users</button>:null}
        {checkedit?<button onClick={allusers} className="btnn">all users</button>:null}
        {checkusers? <button onClick={adduser} className="btnn">add user</button>:null}
        </div>
        
        </div>



    <br></br>
    {checkusers?
    <div >
<Swiper
      spaceBetween={40}
      slidesPerView={5}
      centeredSlides
      centeredSlidesBounds
      freeMode={true}
      slidesOffsetBefore= {70}
		  slidesOffsetAfter= {70}
      navigation
      watchSlidesVisibility={true}
      breakpoints={{
        320 : {
            width: 320,
            slidesPerView: 1,
          },
          481 : {
            width: 320,
            slidesPerView: 1,
          },
        640: {
          width: 481,
          slidesPerView: 2,
        },
        768: {
          width: 740,
          slidesPerView: 2,
        },
      }}>
      {Users.map((user, index) => {
      return <SwiperSlide key={index}>
<User counter={index} key={index} user={user} Edit={Edit} Delete={Delete}/>
      </SwiperSlide>
    })}</Swiper>
         </div>:null}
         {checkedit?<EditUser user={usertoedit} update={Update} cancel={allusers}/>:null}
         {checknewuser?<AddUser  add={Add} cancel={allusers}/>:null}
    
</div>;
}
export default UsersPage;
