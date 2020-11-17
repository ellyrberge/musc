import { fetchPlaylists, fetchTracks, savePlaylist, updatePlaylistTracks, editPlaylistTitle, deletePlaylist} from "./playlists-api";
import { createServer } from "miragejs";

let server;

beforeEach(() => {
    server = createServer({
      routes() {
        this.namespace = "api";
        this.logging = false;
  
        this.get("/playlists/", (schema, request) => {
          return [
            {
                id: 0,
                title: "Playlist 1",
                tracks: []
            },
            {
                id: 1,
                title: "Playlist 2",
                tracks: []
            }

          ];
        });
        this.get("/tracks", (schema, request) => {
            return [
                {
                    "title": "She Moves in Her Own Way",
                    "artist": "The Kooks",
                    "duration": "1004114",
                    "playlistId": "0",
                    "id": 0
                },
                {
                    "title": "Paper Planes",
                    "artist": "M.I.A.",
                    "duration": "1254296",
                    "playlistId": "1",
                    "id": 2
                },
            ];
        });
        
        this.post("/playlists", (schema, request) => {
            return Object.assign(JSON.parse(request.requestBody), { id: 3 });
        });

        this.post("/playlists/:id/tracks", (schema, request) => {
            return Object.assign(JSON.parse(request.requestBody), { id: 5 });
        });
        this.put("/playlists/:id", (schema, request) => {
            return Object.assign(JSON.parse(request.requestBody), {
              title: "New Playlist Title",
            });
        });
        this.delete("/playlists/:id", (schema, request) => {
          if(request.params.id === "2"){
            return "deleted"
          } else {
            return "no playlist"
          }
      });
      },
    });
  });
  
  afterEach(() => {
    server.shutdown();
  });

  test("fetchPlaylists()", () => {
    return fetchPlaylists().then((data) => {
      expect(data).toEqual([
        {
            id: 0,
            title: "Playlist 1",
            tracks: []
        },
        {
            id: 1,
            title: "Playlist 2",
            tracks: []
        }

      ]);
    });
  });
  test("fetchTracks()", () => {
    return fetchTracks().then((data) => {
      expect(data).toEqual([
        {
            "title": "She Moves in Her Own Way",
            "artist": "The Kooks",
            "duration": "1004114",
            "playlistId": "0",
            "id": 0
        },
        {
            "title": "Paper Planes",
            "artist": "M.I.A.",
            "duration": "1254296",
            "playlistId": "1",
            "id": 2
        },
    ]);
    });
});

test("savePlaylist() when changing name", () => {
    return savePlaylist({ title: "Playlist 2", tracks: []}).then((data) => {
      expect(data).toEqual({ id: 3, title: "Playlist 2", tracks: [] });
    });
});

test("updatePlaylistTrack() when adding a track", () => {
    return updatePlaylistTracks({ title: "Song 1", artist: "Artist 1", duration: "10234", playlistId: "1"}).then((issue) => {
      expect(issue).toEqual({ title: "Song 1", artist: "Artist 1", duration: "10234", playlistId: "1", id:5});
    });
});

test("editPlaylistTitle() when editing playlist title", () => {
    return editPlaylistTitle({ id: 0, title: "Playlist 1", tracks:[]}).then((issue) => {
      expect(issue).toEqual({ id: 0, title: "New Playlist Title", tracks:[]});
    });
});

test("deletePlaylist() deletes playlist", () => {
  return deletePlaylist(1).then((data) => {
    expect(data._bodyInit).toEqual("no playlist");
  });
});

test("deletePlaylist() playlist with incorrect id fails", () => {
  return deletePlaylist(2).then((data) => {
    expect(data._bodyInit).toEqual("deleted");
  });
});