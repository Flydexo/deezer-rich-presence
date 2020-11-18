const express = require('express');
const app = express();
const port = 3000;
let DZ = require('node-deezer');
let deezer = new DZ();
const opn = require('opn');
const RPC = require('discord-rpc');
const clientId = '778594949221449730';
const client = new RPC.Client({transport: 'ipc'});
const lol = require('./rpc');
let wait = 10000;

app.get('', (req, res) => {
  res.send('Hello World!')
  const code = req.query.code;
  console.log(code);
  let appId = '446602';
  let appSecret = 'c7c6203002bc945513e295d4bde2f9ef';

  if (code) {
    let err = req.query.error_reason;
    console.log('result');
    deezer.createSession(appId, appSecret, code, function (err, result) {
      console.log(result);
        function dede(){
          deezer.request(result.accessToken,
            {
              resource: 'user/me/history',
              method: 'get',
            },
            function done (err, result) {
              if (err) console.log(err);
              console.log(result.data[0]);
              const song = result.data[0];
              const trackInfos = {
                name: song.title,
                start: song.timestamp,
                end: song.timestamp+song.duration,
                explicit: song.explicit,
                artist: song.artist.name,
              };
              wait = song.duration * 1000;
              console.log(wait);
              return lol.run(client, clientId, trackInfos);
            }
          );
          setTimeout(dede, wait);
        }
        dede();
    });
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

let appId = '446602'; // from developers.deezer.com
let redirectUrl = 'http://localhost:3000'; // somewhere in your app, see below
let perms = ['listening_history'];
let loginUrl = deezer.getLoginUrl(appId, redirectUrl, perms);
opn(loginUrl);