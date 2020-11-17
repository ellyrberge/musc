import {NavLink} from "react-router-dom";
import {useHistory} from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { savePlaylist } from './playlists-api';
import { Plus, X } from 'react-bootstrap-icons';
import Modal from "./Modal";
import { DataStoreContext} from "./contexts";




export default function Nav({addPlaylist, destroyPlaylist}){
    const {playlists} = useContext(DataStoreContext);
    const [modalShown, setModalShown] = useState(false);
    const [error, setError] = useState(false);
    const history = useHistory();
    const [name, setName] = useState("");

    
    function openModal(){
      setModalShown(true);
    }
    function handleSubmit(event){
        event.preventDefault()
        if(name === ""){
            setError(true);
        } else {   
            setError(false);
            setModalShown(false);
            savePlaylist(
            {
                title: name,
                tracks: [],
            }).then((newPlaylist) =>{
                return add(newPlaylist)        

            });
        }

    }

    function add(newP){
        addPlaylist(newP)
        history.push("/");
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDelete(issueToDelete){
        destroyPlaylist(issueToDelete);
        history.push("/");
    }
    

    return(
        <>
        { modalShown && <Modal
        data-test-id = "modal"
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
                            <label htmlFor="name" className="nav_header">PLAYLIST NAME</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={handleNameChange}
                                    className="form-control add-playlist-input"
                                    data-testid = "name"
                                />
                        </div>
                        <button className="btn add-playlist-submit" data-testid="add-playlist-button">add</button>
                      </form>
                      <div className= "d-flex error-message">{error && (<div>Please enter input</div>)}</div>

                    </div>
               </div>
           </div>
          );
        }}
        />}
        <div className = "mt-3 d-flex">
              <img className= "ml-2 logo_image" src="logo.png" alt="logo" data-testid="logo-image"></img><span className="ml-2 logo" data-testid = "brand-title">musc</span>
        </div>
        <nav>
            <NavLink
                className = "nav-link selected nav_header mt-5 mb-3"
                exact to="/" 
                activeStyle={{
                    color:"#4024CB"
                }}
                data-testid = "home-button"
            >
                HOME
            </NavLink>
            <NavLink
                className = "nav-link selected nav_header mb-3"
                exact to="/search" 
                activeStyle={{
                    color:"#4024CB"
                }}
                data-testid = "search-button"
            >
                SEARCH
            </NavLink>
            <div className = "nav_header d-flex justify-content-between">
                <div data-testid = "playlist-title">PLAYLISTS</div>
                <button className="mr-2 btn nav-button-playlist" data-testid = "add-playlist-button" onClick={openModal}><Plus/></button>
            </div>
            <div className = "flex-column">
                {playlists.map((playlist) => {
                    let id = playlist.id;
                    return (
                        <div className = "d-flex justify-content-between" key ={id}>

                        <NavLink
                            key = {playlist.id}
                            className = "nav-link selected nav_item"
                            to = {`/playlists/${id}/tracks`}
                            activeStyle={{
                                color: "#4024CB"
                            }}
                            value = {playlist.id}
                            data-testid = "playlist-name"
                        >
                                {playlist.title}
                            
                        </NavLink>
                        <button className="btn nav-delete-playlist" onClick={() => handleDelete(playlist.id)}><X/></button>
                        </div>

                    )
                
                } )}
            </div>
        </nav>
        </>
    );
}