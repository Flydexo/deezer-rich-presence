const express = require('express');
const app = express();
const port = 3001;
let DZ = require('node-deezer');
let deezer = new DZ();
const opn = require('opn');
const RPC = require('discord-rpc');
const config = require('./config');
const clientId = config.clientId;
const client = new RPC.Client({transport: 'ipc'});
const lol = require('./rpc');
let wait = 1000;

app.get('', (req, res) => {
  res.send('Hello World!')
  const code = req.query.code;
  let appId = '446602';
  let appSecret = 'c7c6203002bc945513e295d4bde2f9ef';

  if (code) {
    let err = req.query.error_reason;
    deezer.createSession(appId, appSecret, code, function (err, result) {
        function dede(){
          deezer.request(result.accessToken,
            {
              resource: 'user/me/history',
              method: 'get',
            },
            function done (err, result) {
              if (err) console.log(err);
              const song = result.data[0];
              const trackInfos = {
                name: song.title,
                start: song.timestamp,
                end: song.timestamp+song.duration,
                explicit: song.explicit,
                artist: song.artist.name,
              };
              console.log(song.duration, song.title);
              wait = song.duration * 100;
              return lol.run(client, clientId, trackInfos);
            }
          );
          console.log(wait);
          setTimeout(dede, wait);
        }
        dede();
    });
  }
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

let appId = '446602'; // from developers.deezer.com
let redirectUrl = 'http://localhost:3001'; // somewhere in your app, see below
let perms = ['listening_history'];
let loginUrl = deezer.getLoginUrl(appId, redirectUrl, perms);
opn(loginUrl);