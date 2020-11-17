import React from "react";
import {
  render,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import IssueDetails from "./IssueDetails";
import { MemoryRouter, Route } from "react-router-dom";
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
        this.get("/playlists/:id", (schema, request) => {
            return {
                id: 0,
                title: "Playlist 1",
                tracks: []
            }
        });
        this.get("/playlists/:id/tracks", (schema, request) => {
            return [
                {
                  "title": "She Moves in Her Own Way",
                  "artist": "The Kooks",
                  "duration": "1004114",
                  "playlistId": "1",
                  "id": 15
                }
            ]
        });
        this.get("/playlists/:id/tracks", (schema, request) => {
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
            ]
        });
      },
    });
  });
  
  afterEach(() => {
    server.shutdown();
  });