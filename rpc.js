module.exports.run = (client, clientId, trackInfos) => {
    client.on('ready', () => {
        client.setActivity({
          state: `Listenning ${trackInfos.name}`,
          details: `${trackInfos.artist}`,
          startTimestamp: trackInfos.timestamp,
          endTimestamp: trackInfos.end,
          partyId: 'dede',
          largeImageKey: "deezer",
        
        });
    });
    client.login({ clientId });
}