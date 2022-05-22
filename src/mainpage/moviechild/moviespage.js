import React, { useEffect, useState,useRef } from 'react';
import { useWindowScroll } from "react-use";
import { getAll,addObj,deleteObj,updateObj} from '../../utils';
import '../../css/moviepage.css';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore,{Navigation,Pagination} from 'swiper';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import Movie from './movie';
import AddMovie from './addmovie';
import EditMovie from './editmovie';
import ShowMovie from './Movieshower';
import logo from '../../—Pngtree—the background of the movie_869718.png';

// import Movieurl from '../../api/movies'


SwiperCore.use([Navigation,Pagination]);
function MoviesPage(props) {
    const [Movies, setMovies] = useState({})
    const [MovieToShow, setMovieToShow] = useState({})
    const [BackUpMoviesArry, setBackUpMoviesArry] = useState({})
    const [Movietoedit, setMovietoedit] = useState({})
    const [DisplayAllMovies, setDisplayAllMovies] = useState(true)
    const [DisplayAddMoviePage, setDisplayAddMoviePage] = useState(false)
    const [DisplayEditMoviePage, setDisplayEditMoviePage] = useState(false)
    const [Check_Create_Movie_Permission, setCheck_Create_Movie_Permission] = useState('')
    const { x, y } = useWindowScroll();
    const [scrolled, setScrolled] = useState(0);
    const moviesection=useRef(null)




    const urlmovie = "http://localhost:8000/api/Movies"

    useEffect(() => {
        let counter=0
        const checkdisplay=async()=> {
            if (props.moviedisplay.length>0) {
            const { data } = await getAll(urlmovie)
            const filtered =data.find(meb => meb.name === props.moviedisplay)
              setMovieToShow(filtered);
             counter=1
            }
        }
       const getmovies=async()=> {
            const { data } = await getAll(urlmovie)
            setMovies(data)
            setBackUpMoviesArry(data)
           if (counter===0) {
                setDisplayAllMovies(true)
           }
    }
    const checkpossibility=async()=> {
        const addbutton = props.user.premissions.find(function (element) {
            return element === "Create Movies";
        });
        setCheck_Create_Movie_Permission(addbutton)
    }
    checkdisplay()
    checkpossibility()
    getmovies()
    }, [])

    useEffect(() => {
        return function cleanUp(){
            setMovies()
            setBackUpMoviesArry()
            setDisplayAllMovies()
            setCheck_Create_Movie_Permission()
        }
    }, [])


    const allmovies=async()=> {
        setDisplayAddMoviePage(false)
        setDisplayAllMovies(true)
        setDisplayEditMoviePage(false)
        setMovieToShow('');


    }


    const addmovie=async()=> {
        setMovieToShow(false)
        setDisplayAddMoviePage(true)
        setDisplayAllMovies(false)
        setDisplayEditMoviePage(false)
        setMovies(BackUpMoviesArry)
    }
    const addnewmovie=async(e)=> {
        setDisplayAddMoviePage(false)
        setDisplayAllMovies(true)
        if (props.user.username=='onlineguest') {
        let newmoviearray=  Movies;
        let newmoviearray2= [];
        const getmovies=async()=> { 
          newmoviearray2 =newmoviearray.push(2);
        console.log(newmoviearray);
        }
        getmovies()
        setMovies(newmoviearray)
        setBackUpMoviesArry(e)
      }else{

        const { data:data1 } = await addObj(urlmovie,e)
        const { data } = await getAll(urlmovie) 
        setMovies(data)
      }

 }
 const Delete=async(e,value2)=> {
   if (props.user.username=='onlineguest') {
    const newmoviearray=Movies;
    newmoviearray.splice(value2, 1)
    setMovies(newmoviearray)
    setBackUpMoviesArry(e)
    setMovieToShow('');
  }else{
    console.log(e._id);
     const { data:data1 } = await deleteObj(urlmovie,e._id)
     const { data } = await getAll(urlmovie)
     setMovies(data)
    }

}
const Serch=async(e)=> {
    if (e.target.value.length>0) {
        console.log(e.target.value);
        const array=BackUpMoviesArry
        const small=array.map((name) => name.name.toLowerCase()).filter(name => name.includes(e.target.value))
        console.log(small);
        const res = array.filter(item => small.includes(item.name.toLowerCase()));
         setMovies(res);
    }else setMovies(BackUpMoviesArry)
}

const Editthismovie=async(e)=> {
    setMovietoedit(e);
    setDisplayAllMovies(false)
    setDisplayAddMoviePage(false)
    setDisplayEditMoviePage(true)
    setMovieToShow('')
    setMovies(BackUpMoviesArry)
}
const updatemovie= async(e)=> {
    const { data:data1 } = await updateObj(urlmovie,e._id,e)
    const { data } = await getAll(urlmovie)
    setMovies(data)
    setDisplayAllMovies(true)
    setDisplayAddMoviePage(false)
    setDisplayEditMoviePage(false)
}
const membertoshow= async(e)=> props.showmember(e)

const imgclick=async(e)=> {
    setMovieToShow(e);
  }
 
    
    return <div className='moviepage'>
      <div className="container">
        <img src={logo} alt="logo" id='imgbackground'/>
        <h1 id='titlee'>Movies</h1>
        <div>{DisplayAddMoviePage?<button onClick={allmovies} className="btnn">all movies</button>:null}
        {DisplayEditMoviePage?<button onClick={allmovies} className="btnn">all movies</button>:null}
        {DisplayAllMovies?props.user.admin? <button onClick={addmovie} className="btnn">add movie</button>:Check_Create_Movie_Permission==="Create Movies"? <button onClick={addmovie} className="btnn">add movie</button>:null:null}
        </div>
        {DisplayAllMovies?<div className="flexbox">
  <div className="search">
    <div>
      <input type="text" placeholder={'Search Movie'} onChange={Serch}required />
    </div>
  </div>
</div>:null}
        </div>
        {MovieToShow.name!==undefined?<ShowMovie cancel={allmovies} update={updatemovie} displaymember={membertoshow} movie={MovieToShow} user={props.user} subs={props.subs}/>:null}
        {DisplayAllMovies?
        <div className=' innerswiper' >
            {Movies.length > 0 ? <div id='slider123'>  
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
        {Movies.map((movie, index) => {
            return <SwiperSlide key={index}>
        <Movie counter={index} key={index} movie={movie} user={props.user} subs={props.subs} Delete={Delete} Edit={Editthismovie} displaymember={membertoshow} imgclicker={imgclick} />
        </SwiperSlide>
    })}
    </Swiper> </div>  :
               <h2>No Movies</h2>
     }
             </div>:null}
             {DisplayAddMoviePage?<AddMovie cancel={allmovies} add={addnewmovie} />:null}
             {DisplayEditMoviePage?<EditMovie cancel={allmovies} update={updatemovie} movie={Movietoedit} />:null}
             
        
    </div>;
}
export default MoviesPage;