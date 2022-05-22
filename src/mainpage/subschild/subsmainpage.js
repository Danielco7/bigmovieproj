import React, { useEffect, useState } from 'react';
import { getAll,addObj,deleteObj,updateObj} from '../../utils';
import Member from './members';
import EditMember from './editmember';
import AddMember from './addmember';
import members from '../../imgs/istockphoto-1132715308-612x612.jpg'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore,{Navigation,Pagination} from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

const urlmembers = "http://localhost:8000/api/Members"
const urlsubs = "http://localhost:8000/api/Subs"

function SubsPage(props) {
    const [Members, setMembers] = useState({})
    const [BackUpMembersArry, setBackUpMembersArry] = useState({})
    const [membertoedit, setmembertoedit] = useState({})
    const [checkallmembers, setcheckallmembers] = useState(false)
    const [checkaddmember, setcheckaddmember] = useState(false)
    const [checkeditmember, setcheckeditmember] = useState(false)
    const [Check_Create_Subscription_Permission, setCheck_Create_Subscription_Permission] = useState('')

    useEffect(() => {
        const getmembers = async() => {
             const { data } = await getAll(urlmembers)
             setMembers(data)
             setBackUpMembersArry(data)
             setcheckallmembers(true)
     }
     const checkpossibility = async() => {
         const addbutton = props.user.premissions.find(function (element) {
             return element === "Create Subscriptions";
         });
         setCheck_Create_Subscription_Permission(addbutton)
     }
     checkpossibility()
         getmembers()
     }, [])

     useEffect(() => {
        return function cleanUp(){
            setMembers()
            setmembertoedit()
            setcheckallmembers()
            setcheckeditmember()
            setCheck_Create_Subscription_Permission()
        }
    }, [])

    const allmembers = async() => {
        setcheckaddmember(false)
        setcheckallmembers(true)
        setcheckeditmember(false)

    }
    const addmember = async() => {
        setcheckaddmember(true)
        setcheckallmembers(false)
        setcheckeditmember(false)
        setMembers(BackUpMembersArry)

 }
    const addnewmember = async(e) => {
        setcheckaddmember(false)
        setcheckallmembers(true)
        const { data1 } = await addObj(urlmembers,e)
        const { data } = await getAll(urlmembers)
        setMembers(data)
        setBackUpMembersArry(data)

}

     const Delete = async(e) => {
         const  { data } = await getAll(urlsubs)
         const filtered =data.find(meb => meb.memberId === e._id)
         if (filtered!=undefined) {
             const { data:data2 } = await deleteObj(urlsubs,filtered._id)
         }
         const { data:data3 } = await deleteObj(urlmembers,e._id)
         const { data:data4 } = await getAll(urlmembers)
            setMembers(data4)
    
    }

     const Editthismember = async(e) => {
        setmembertoedit(e);
        setcheckallmembers(false)
        setcheckaddmember(false)
        setcheckeditmember(true)
        setMembers(BackUpMembersArry)
    }

    const updatemember = async(e) => {
        const { data:data1 } = await updateObj(urlmembers,e._id,e)
        const { data } = await getAll(urlmembers)
        setMembers(data)
        setcheckallmembers(true)
        setcheckaddmember(false)
        setcheckeditmember(false)
    }

    const showmovie = async(e) => props.Movie_To_Show(e)


    const Serch=async(e)=> {
        if (e.target.value.length>0) {
            const array=BackUpMembersArry
            const small=array.map((name) => name.name.toLowerCase()).filter(name => name.includes(e.target.value))
            const res = array.filter(item => small.includes(item.name.toLowerCase()));
             setMembers(res);
        }else setMembers(BackUpMembersArry)
    }

    return<div className='divvv'>

<div className="container" >
        <img src={members} alt="logo" id='imgbackground'/>
        <h1 id='titlee'>Members</h1>
        <div>{checkaddmember?<button onClick={allmembers} className="btnn">all members</button>:null}
        {checkeditmember?<button onClick={allmembers} className="btnn">all members</button>:null}
        {checkallmembers?props.user.admin? <button onClick={addmember} className="btnn">add member</button>:Check_Create_Subscription_Permission==="Create Subscriptions"? <button onClick={addmember} className="btnn">add member</button>:null:null}
        </div>
        {checkallmembers?<div className="flexbox">
  <div className="search">
    <div>
      <input type="text" placeholder={'Search Member'}onChange={Serch}required/>
    </div>
  </div>
</div>:null}
        </div>
        <br></br>
        {checkallmembers?
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
          width: 540,
          slidesPerView: 2,
        },
      }}
      
    >
    {Members.map((member, index) => {
      return <SwiperSlide key={index}>
      <Member counter={index} key={index} member={member} user={props.user}  Delete={Delete} Edit={Editthismember} displaymovie={showmovie}/>
     </SwiperSlide>
                })}</Swiper>
    
        </div>:null}
             {checkaddmember?<AddMember cancel={allmembers} add={addnewmember} />:null}
             {checkeditmember?<EditMember cancel={allmembers} update={updatemember} member={membertoedit} />:null}
    </div>
}

export default SubsPage;
