import React, {useState} from 'react'
import SearchResults from './SearchResults.js'
import {Search} from 'react-bootstrap-icons'



export default function SearchComponent({addTrack}){
    const[term, setTerm] = useState("");
    const[searchTerm, setSearchTerm] = useState("")
    const [error, setError] = useState(false);



    function handleTermChange(event){
        setTerm(event.target.value);
    }
    function handleSubmit(event){
        event.preventDefault();
        const encodedTerm = encodeURIComponent(term)
        setSearchTerm(term) 
        if(encodedTerm === ""){
            setError(true);
        } else {
            setError(false)
            setTerm("");
        }
        
    }
    return(
        <>
            <> 
            <div className="d-flex justify-content-center search-bar-placement">
                <form onSubmit = {handleSubmit} className="form-inline mt-3 mr-5 ">
                    <div className="form-control-wrap">
                        <input 
                        className="form-control pr-1 pl-1 pt-0 pb-0" 
                        type="search" 
                        placeholder="search..." 
                        aria-label="Search"
                        value = {term}
                        onChange = {handleTermChange}
                        ></input>
                    </div>
                    <button type = "submit" className="btn my-2 my-sm-0 search_button">
                        <Search/>
                    </button>
                </form>
            </div>
            <div className = "d-flex justify-content-end mr-5 pr-5 error-message">{error && (<div>Please enter input</div>)}</div>
            </>
            <SearchResults term = {searchTerm} addTrack={addTrack}></SearchResults>
        </>
    );
}