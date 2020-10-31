import React from 'react';

export default function Search(){
    return(
        <>
        <form className="form-inline mt-3 mr-5">
            <div className="form-control-wrap"><input className="form-control pr-5 pl-5 pt-0 pb-0" type="search" placeholder="search..." aria-label="Search"></input></div>
        </form>
        </>
    );
}
