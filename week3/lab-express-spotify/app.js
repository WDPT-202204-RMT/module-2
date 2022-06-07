require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body['access_token']))
  .catch((error) =>
    console.log('Something went wrong when retrieving an access token', error)
  );

// Our routes go here:
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/artist-search', (req, res) => {
  //console.log(req.query);
  const { artist } = req.query;
  console.log(artist);
  spotifyApi
    .searchArtists(artist)
    .then((data) => {
      const artists = data.body.artists.items.map((banana) => {
        return {
          id: banana.id,
          name: banana.name,
          image:
            banana.images.length > 0
              ? banana.images[0].url
              : 'https://www.worldartfoundations.com/wp-content/uploads/2022/04/placeholder-image.png',
        };
      });
      res.render('artist-search-results', { artists: artists });
    })
    .catch((err) =>
      console.log('The error while searching artists occurred: ', err)
    );
});

app.get('/albums/:artistId', (req, res) => {
  const { artistId } = req.params;
  console.log(artistId);
  spotifyApi.getArtistAlbums(artistId).then(
    function (data) {
      const albums = data.body.items.map((album) => {
        return {
          id: album.id,
          name: album.name,
          image:
            album.images.length > 0
              ? album.images[0].url
              : 'https://www.worldartfoundations.com/wp-content/uploads/2022/04/placeholder-image.png',
        };
      });
      res.render('albums', { albums: albums });
    },
    function (err) {
      console.error(err);
    }
  );
});

app.get('/tracks/:id', (req, res) => {
  //const { id } = req.params;

  spotifyApi.getAlbumTracks(req.params.id).then(
    function (data) {
      res.render('tracks', { hello: data.body.items });
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
});

app.listen(3000, () =>
  console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊')
);
