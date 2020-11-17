export async function fetchPlaylists () {
    return fetch("/api/playlists").then((response) => {
      return response.json();
    });
}

export function savePlaylist(data){
    return fetch("/api/playlists", {
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
    return fetch(`/api/playlists/${Number(data.playlistId)}/tracks`, {
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
    return fetch(`/api/playlists/${Number(data.id)}`, {
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
    return fetch(`/api/tracks`).then((response) => {
        return response.json();
    });
}

export function deletePlaylist(id) {
    return fetch(`/api/playlists/${id}`, {
      method: "DELETE",
    });
}
