export function fetchChart(){
    return fetch('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=52440ad91751e6bd7f5543a3fa845a5e&format=json')
    .then((response) => {
         return response.json();
    })
}

export function fetchSearch(term){
    return fetch('http://ws.audioscrobbler.com/2.0/?method=track.search&track='+term+'&api_key=52440ad91751e6bd7f5543a3fa845a5e&format=json')
    .then((response) => {
        return response.json();
    }).catch((error) => {
        console.error('Error:', error);
    })

}

export async function fetchSong(title, artist){
    return fetch('http://ws.audioscrobbler.com/2.0/?method=track.getInfo&track='+title+'&artist='+artist+'&api_key=52440ad91751e6bd7f5543a3fa845a5e&format=json')
    .then((response) => {
        return response.json();
    });
}