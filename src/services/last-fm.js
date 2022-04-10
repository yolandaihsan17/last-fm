import axios from 'axios'

export async function getTopArtist(page = 1) {
  return axios.get(`http://ws.audioscrobbler.com/2.0/?method=chart.getTopArtists&api_key=${process.env.REACT_APP_API_KEY}&format=json&page=${page}`)
    .then(response => { return response.data })
}

export async function getTopTracks(page = 1) {
  return axios.get(`http://ws.audioscrobbler.com/2.0/?method=chart.getTopTracks&api_key=${process.env.REACT_APP_API_KEY}&format=json&page=${page}`)
    .then(response => { return response.data })
}

export async function searchArtist(name, page = 1) {
  return axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${name}&api_key=${process.env.REACT_APP_API_KEY}&format=json&page=${page}`)
    .then(response => { return response.data })
}

export async function searchTrack(title, page = 1) {
  return axios.get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${title}&api_key=${process.env.REACT_APP_API_KEY}&format=json&page=${page}`)
    .then(response => { return response.data })
}