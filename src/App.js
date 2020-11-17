import React, { useEffect, useState }  from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nav from "./Nav.js";
import SearchComponent from "./SearchComponent.js";
import PopularSongs from "./PopularSongs.js";
import { fetchPlaylists, deletePlaylist, fetchTracks, editPlaylistTitle } from './playlists-api';
import { DataStoreContext} from "./contexts";
import Playlist from './Playlist.js'
import ErrorPage from './ErrorPage.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






function App() {
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [playlistById, setPlaylistById] = useState()
  const notifyAdd = () => toast("track added to playlist.");
  const notifyDelete = () => toast("track deleted from playlist.");
  const notifyEdit = () => toast("playlist title edited.");
  const notifyAddPlaylist= () => toast("playlist added.");




  useEffect(() => {
      Promise.all([fetchPlaylists(), fetchTracks()]).then(([playlists, tracks]) => {
        setPlaylists(playlists);
        setTracks(tracks)
        
        const playlistId = {};

        playlists.forEach((data) => {
         playlistId[data.id] = data;
        });

        setPlaylistById(playlistId);
      });
  }, []);

  function addPlaylist(newPlaylist){
    setPlaylists(playlists.concat(newPlaylist));
    notifyAddPlaylist();
  }

  function addTrack(newTrack){
    const newT = tracks.concat(newTrack);
    setTracks(newT);
    notifyAdd();
  }
  function destroyPlaylist (deletePlaylistId){
    deletePlaylist(deletePlaylistId);
    const filteredPlaylists = playlists.filter((playlist) => {
      return playlist.id !== deletePlaylistId;
    })
    setPlaylists(filteredPlaylists) 
    notifyDelete();
  }

  function editPlaylist(playlistToEdit, newTitle, newTracks){
    editPlaylistTitle({
      id: playlistToEdit.id,
      title: newTitle,
      tracks: newTracks
    }).then((updatedPlaylist) => {
      const updatedPlaylists = playlists.map((playlist) => {
        if (playlist.id === updatedPlaylist.id) {
          return updatedPlaylist;
        } else {
          return playlists;
        }
      });
      setPlaylists(updatedPlaylists)
      notifyEdit();
    })
  }
  return (
    <DataStoreContext.Provider value = {{playlists, tracks, playlistById}}>
      <Router>
      <div className = "container-fluid">
        <div className = "row">
          <div className = "col-1 side_nav">
            <Nav addPlaylist = {addPlaylist} destroyPlaylist={destroyPlaylist}/>
          </div>
          <main className = "col-11">
            <Switch>
              <Route path="/" exact={true} title = "Musc">
                <ToastContainer data-testid = "notification" />
                <PopularSongs></PopularSongs>
              </Route>
              <Route path="/playlists/:id/tracks" exact={true} title = "Playlist Tracks">
                <Playlist editPlaylist={editPlaylist} ></Playlist>
              </Route>
              <Route path="/search" exact={true} title = "Search">
                <SearchComponent addTrack={addTrack} data-testid ="search"/>
              </Route>
              <Route path="/*" exact={true}>
                <ErrorPage/>
              </Route>
            </Switch>
          </main>
        
        </div>
      </div>
    </Router>
    </DataStoreContext.Provider>
    
   
  );
}

export default App;
