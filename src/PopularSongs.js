import React, {useEffect, useState} from 'react';
import {fetchChart} from './music-api';



export default function PopularSongs(){
    const [chart, setChart] = useState([]);
    useEffect(()=> {
        fetchChart().then((data) =>{
            setChart(data.tracks.track)     
        })
    }, []);
    
    let myuniqueidcounter = 0;
    function uniqueId() {
        myuniqueidcounter += 1
        return myuniqueidcounter;
    }
    return(
        <div className = "row mt-5 mb-3 pop-songs-container" data-testid="popSongs">
            {chart.map((song) => {
                return (
                    <div className = "col-4" data-testid = "popularSongList" key = {uniqueId()}>
                        <div className="card mb-3" >
                            <a href={song.url} className = "card-text">
                                <div className="card-img-top album_card" > {song.name}</div>
                            </a>
                                <div className="card-body">
                                    <h3 className="card-track">{song.artist.name}</h3>
                                    <p className="card-text card-artist">listeners - {song.listeners}</p>
                                </div>
                        </div>
                    </div>
                )
                
            })
        }   
        </div>
    );
}