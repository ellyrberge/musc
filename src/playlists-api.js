export async function fetchPlaylists () {
    return fetch(`playlists`).then((response) => {
      return response.json();
    });
}

export function savePlaylist(data){
    return fetch(`playlists`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response)=>{
        return response.json();
    })
}

export function updatePlaylistTracks(data){
    return fetch(`/playlists/`+ Number(data.playlistId)+`/tracks`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response)=>{
        return response.json();
    })
}


export function editPlaylistTitle(data){
    return fetch(`/playlists/`+ Number(data.id), {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    }).then((response)=>{
        return response.json();
    })
}

export async function fetchTracks(){
    return fetch(`/tracks`).then((response) => {
        return response.json();
    });
}

export function deletePlaylist(id) {
    return fetch(`/playlists/${id}`, {
      method: "DELETE",
    });
}
