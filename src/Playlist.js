import React, { useEffect, useState, useContext } from 'react';
import {useParams} from 'react-router-dom';
import { DataStoreContext} from "./contexts";
import {Pencil } from 'react-bootstrap-icons';
import {useHistory} from 'react-router-dom';




export default function Playlist({editPlaylist}){
    const {tracks, playlistById} = useContext(DataStoreContext);
    const [playlistTracks, setPlaylistTracks] = useState([])
    const [playlistTitle, setPlaylistTitle] = useState("")
    const history = useHistory();


    const {id} = useParams();

    useEffect(() => {
        setPlaylistTracks(tracks.filter((track) =>{
            return track.playlistId === id 
        }))
        setPlaylistTitle(playlistById[id].title)
    
    },[id, tracks, playlistById])

    function handleTitleChange(event){
        setPlaylistTitle(event.target.value)
    }
    function handleSubmit(event){
        event.preventDefault();
        editPlaylist(playlistById[id], playlistTitle, playlistTracks)
        setPlaylistTitle(playlistTitle)
        history.push("/");
    }
    return(
        <>
        <div className = "mt-5">
            <form onSubmit = {handleSubmit}>
                <input className = "mb-5 ml-2 playlist-title" placeholder={playlistTitle} value = {playlistTitle}
                onChange = {handleTitleChange}></input>
                <button className="btn edit_button"><Pencil/></button>
            </form>
            <table className="table">
            <thead>
                <tr className ="table_header">
                    <th scope="col">Title</th>
                    <th scope="col">Artist</th>
                    <th scope="col">Duration</th>
                </tr>

            </thead>
            <tbody>
                {
                    playlistTracks.map((song)=>{
                        let ms = Number(song.duration);
                        let min = Math.floor((ms/1000/60));
                        let sec = Math.floor((ms/1000) % 60);
                        return(
                            <tr className = "table_row" key = {song.id}> 
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td >{min}:{sec}</td>
                            </tr>
                         )
                    })
                }
            </tbody>
            </table>
            
        </div>
    </>
    )
}