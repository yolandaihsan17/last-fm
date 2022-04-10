import React, { useEffect, useRef, useState } from 'react';
// import { getAuthFromUser } from './services/last-fm';
import { getTopArtist, searchArtist } from '../services/last-fm';
// import LastFM from 'last-fm';
import { BsSearch, BsFillMusicPlayerFill, BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import numeral from 'numeral';
import { AiFillPlayCircle } from "react-icons/ai";
import Spinner from '../components/spinner';


function Artists() {
  const [artistList, setArtistList] = useState()
  const [searchMode, setSearchMode] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const currentPage = useRef(1)

  const titleStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    webkitLineClap: '2',
    webkitBoxOrient: 'vertical'
  }

  useEffect(() => {
    getArtists()
  }, [])

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  async function getArtists() {
    setLoading(true)
    await getTopArtist(currentPage.current).then(res => {
      setArtistList(res.artists)
      setLoading(false)
    })
  }

  const processChanges = debounce(() => search());

  async function search() {
    const value = document.getElementById('search-value').value
    if (value) {
      setLoading(true)
      setSearchMode(true)
      const result = await searchArtist(value, currentPage.current)
      setArtistList(result.results.artistmatches)
      setLoading(false)
    } else {
      setSearchMode(false)
      currentPage.current = 1
      getArtists()
    }
  }

  function next() {
    currentPage.current += 1
    if (searchMode) {
      search()
    } else {
      getArtists()
    }
  }

  function previous() {
    currentPage.current -= 1
    if (searchMode) {
      search()
    } else {
      getArtists()
    }
  }


  return (
    <>
      <div className=' flex flex-row items-center justify-between mt-12'>

        <div className=' text-xl font-bold tracking-wide text-white drop-shadow-md '>Top Artists</div>
        <div className=' w-1/2 flex flex-row items-center justify-start bg-white/70 rounded-xl shadow-md '>
          <BsSearch className='mx-4 text-yellow-600' />
          <input id='search-value' type={'text'} onInput={processChanges} className=' bg-transparent w-full px-4 py-2 rounded-lg focus:outline-none text-sky-800 tracking-wider'></input>
        </div>
      </div>

      {searchMode && <div className=' text-sm italic text-white '>showing result for "{document.getElementById('search-value').value}"</div>}


      <div className=' p-2 mt-4 relative flex flex-row items-start justify-between gap-4 flex-wrap'>
        {artistList?.artist.map((item, i) => {
          return (
            <a href={item.url} target="_blank" key={i} className=' z-20 w-full md:w-52 h-52 shrink-0 bg-transparent backdrop-blur-2xl shadow-lg rounded-xl outline outline-1 outline-offset-0 outline-gray-200 flex flex-col justify-start items-stretch p-4'>
              <img src={item.image[0]['#text']} className="w-full h-24 object-cover rounded-t-lg"></img>
              <div className='font-bold text-white mt-2' style={titleStyle}>{item.name}</div>
              <div className='text-white flex flex-row items-center justify-start gap-2'>
                {searchMode ? <BsFillMusicPlayerFill /> : <AiFillPlayCircle />}
                {numeral(searchMode ? item.listeners : item.playcount).format('0,0')} </div>
            </a>
          )
        })}

        <div className=' flex flex-row items-start justify-end gap-8 w-full py-16'>
          <button onClick={previous} disabled={currentPage.current === 1 || isLoading} className=' h-12 bg-yellow-500 text-white w-32 px-4 py-2 rounded-full font-bold flex flex-row items-center justify-center disabled:bg-gray-200 disabled:text-gray-400'>
            {!isLoading ? <>
              <BsChevronCompactLeft />
              <div className='-mt-1'>previous</div>
            </> :
              <Spinner />
            }

          </button>
          <button onClick={next} disabled={isLoading} className=' h-12 bg-yellow-500 text-white w-32 px-4 py-2 rounded-full font-bold flex flex-row items-center justify-center'>
            {!isLoading ? <>
              <div className='-mt-1'>next</div>
              <BsChevronCompactRight />
            </> :
              <Spinner />
            }
          </button>
        </div>

      </div>
    </>
  );
}

export default Artists;
