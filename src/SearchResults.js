import React, { useEffect, useState } from 'react';
import {fetchSearch} from './music-api';
import Table from "./Table.js"


export default function SearchResults({term, addTrack}){
    const [searchResults, setSearchResults] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    
    
    useEffect(() => {
        fetchSearch(term).then((data) =>{
            if(data.results === undefined){
                setIsEmpty(true)
            }else{
                setSearchResults(data.results.trackmatches.track)
                setIsEmpty(false)
            }
        })
       
        
    }, [term]);
    return(
        <>
            <h1 className="ml-5 mb-5 mt-5"> 
                <span className = "result_title_header">showing results for</span>
            {isEmpty ? <>...</> : 
                 (<><span className = "result_title_term"> {term}</span></>)
                }
            </h1>
            {isEmpty ? <></> : <Table fmTracks = {searchResults} addTrack={addTrack}></Table>}
        </>
    );
}
