import React, {useState, useContext} from "react";
import { Plus, X } from 'react-bootstrap-icons';
import {updatePlaylistTracks} from './playlists-api';
import Modal from "./Modal";
import { DataStoreContext} from "./contexts";
import {useHistory} from 'react-router-dom';



export default function Table ({fmTracks, addTrack}){
   const [modalShown, setModalShown] = useState(false);
   const {playlists} = useContext(DataStoreContext);
   const [selectedPlaylistId, setSelectedPlaylistId] = useState("1");
   const [title, setTitle] = useState("");
   const [artist, setArtist] = useState("");
   const [duration, setDuration] = useState("");
   const history = useHistory();

   

    function handleSubmit(event){
        event.preventDefault()   
        setModalShown(false);
        updatePlaylistTracks({   
                title: title,
                artist:artist,
                duration: duration,
                playlistId: selectedPlaylistId
                
        }).then((data) => {
            addTrack(data)
            history.push("/");

        })
    }
    
   function handlePlaylistChange(event){
        const {value} = event.target;
        const selectedPlaylistId = value === '1' ? value : Number(value);
        setSelectedPlaylistId(selectedPlaylistId);
    }

   function openModal(song){
        setModalShown(true);
        setTitle(song.name);
        setArtist(song.artist);
        setDuration(song.listeners);
   }

 
   return (
    <>
    { modalShown && 
    <Modal
        onClose = {setModalShown}
        status = {modalShown}
        render = {({onClose}) => {
        return(
            <div className="overlay"> 
               <div className="content">
                    <button className = "btn modal-close-button float-right" onClick={onClose}>
                      <X/>
                    </button>
                    <div>
                      <form onSubmit = {handleSubmit}>
                        <div className="form-group">
                        <select 
                                className = "form-control add-playlist-input" 
                                value={selectedPlaylistId} 
                                onChange={handlePlaylistChange}
                                >
                                {
                                    playlists.map((playlist) => {
                                        return (<option key={playlist.id} value={playlist.id}>{playlist.title}</option>);
                                    })
                                }
                        </select>
                        </div>
                        <button type="submit" className="btn add-playlist-submit" data-testid="add-playlist-button">add</button>
                      </form>
                    </div>
               </div>
           </div>
          );
        }}
    />}
     <table className="table">
     <thead>
            <tr className ="table_header">
                <th scope="col">Title</th>
                <th scope="col">Artist</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
            </tr>

            </thead>
            <tbody>
                {
                    fmTracks.map((song)=>{
                        let ms = Number(song.listeners);
                        let min = Math.floor((ms/1000/60));
                        let sec = Math.floor((ms/1000) % 60);
                        return(
                                <tr className = "table_row" key={`${song.name}/${min}/${sec}`}> 
                                    <td>{song.name}</td>
                                    <td>{song.artist}</td>
                                    <td></td>
                                    <td >{min}:{sec}</td>
                                    <td>             
                                        <button className="mr-2 btn nav-button-playlist" onClick={() => openModal(song)}><Plus/></button>
                                    </td>
                                </tr>
                         )
                    })
                        
                }
            </tbody>
            </table>
        </>

   );
}