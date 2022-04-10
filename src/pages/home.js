import React, { useEffect, useState } from 'react';
// import { getAuthFromUser } from './services/last-fm';
import { getTopArtist, getTopTracks } from '../services/last-fm';
// import LastFM from 'last-fm';
import { BsSearch } from "react-icons/bs";
import numeral from 'numeral';
import { AiFillPlayCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';


function Home() {
  const [topArtist, setTopArtist] = useState()
  const [topTracks, setTopTracks] = useState()

  const titleStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    webkitLineClap: '2',
    webkitBoxOrient: 'vertical'
  }


  useEffect(() => {
    (async () => {
      await getTopArtist().then(res => {
        setTopArtist(res.artists)
      })

      await getTopTracks().then(res => {
        setTopTracks(res.tracks)
      })
    })()

    const scrollArtis = document.querySelector("#scroll-artists");

    scrollArtis.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollArtis.scrollLeft += evt.deltaY;
    });

    const scrollTrack = document.querySelector("#scroll-tracks");

    scrollTrack.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollTrack.scrollLeft += evt.deltaY;
    });

  }, [])

  return (
    <>
      <div className=' flex flex-row items-center justify-between mt-12'>
        <div className=' text-xl font-bold tracking-wide text-white drop-shadow-md '>Top Artists</div>
        <Link to='/artists' className=' text-xl font-bold tracking-wide text-white drop-shadow-md '>See All</Link>

      </div>
      <div className=' p-2 mt-4 relative flex flex-row items-start justify-start gap-2 flex-nowrap overflow-x-scroll without-scrollbar' id='scroll-artists'>
        {topArtist?.artist.map((item, i) => {
          return (
            <a href={item.url} target="_blank" key={i} className=' z-20 w-full md:w-52 h-52 shrink-0 bg-transparent backdrop-blur-2xl shadow-lg rounded-xl outline outline-1 outline-offset-0 outline-gray-200 flex flex-col justify-start items-stretch p-4'>
              <img src={item.image[0]['#text']} className="w-full h-24 object-cover rounded-t-lg"></img>
              <div className='font-bold text-white mt-2'>{item.name}</div>
              <div className='text-white flex flex-row items-center justify-start gap-2'><AiFillPlayCircle /> {numeral(item.playcount).format('0,0')} </div>
            </a>
          )
        })}

      </div>
      <div className=' flex flex-row items-center justify-between mt-12'>
        <div className=' text-xl font-bold tracking-wide text-white drop-shadow-md '>Top Tracks</div>
        <Link to='/tracks' className=' text-xl font-bold tracking-wide text-white drop-shadow-md '>See All</Link>

      </div>
      <div className=' p-2 mt-4 relative flex flex-row items-start justify-start gap-2 flex-nowrap overflow-x-scroll without-scrollbar' id='scroll-tracks'>
        {topTracks?.track?.map((item, i) => {
          return (
            <a href={item.url} target="_blank" key={i} className=' z-20 w-full md:w-52 h-52 shrink-0 bg-transparent backdrop-blur-2xl shadow-lg rounded-xl outline outline-1 outline-offset-0 outline-gray-200 flex flex-col justify-start items-stretch p-4'>
              <img src={item.image[0]['#text']} className="w-full h-24 object-cover rounded-t-lg"></img>
              <div className='font-bold text-white mt-2' style={titleStyle}>{item.name}</div>
              <div className='text-white flex flex-row items-center justify-start gap-2'><AiFillPlayCircle /> {numeral(item.playcount).format('0,0')} </div>
            </a>
          )
        })}
      </div>
    </>
  );
}

export default Home;
