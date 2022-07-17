import { useContext, useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import './style.scss';
import { ThemeContext } from '../../contexts/Theme';

const Footer = () => {
  const [track, setTrack] = useState<{ external_urls?: { spotify: string } }>({});
  const { theme } = useContext(ThemeContext);

  const getRandomSong = async () => {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(
          process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: process.env.REACT_APP_REFRESH_TOKEN as string,
      }),
    });
    const token = (await tokenResponse.json())['access_token'];

    const savedTrackResponse = await fetch(
      'https://api.spotify.com/v1/me/tracks?' +
        new URLSearchParams({
          limit: '1',
          offset: Math.floor(Math.random() ** 1.5 * 452).toString(),
        }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const returnedTrack = await savedTrackResponse.json();
    return returnedTrack.items[0].track;
  };

  useEffect(() => {
    getRandomSong()
      .then((retTrack) => setTrack(retTrack))
      .catch((err) => console.error('Error getting Spotify Track', err));
  }, []);

  return (
    <footer className='center'>
      <div className='center music-holder'>
        <iframe
          id='spotify-embed'
          title='spotify-embed'
          src={
            track.external_urls
              ? `https://open.spotify.com/embed${new URL(track.external_urls.spotify).pathname}?utm_source=generator${
                  theme === 'dark' ? '&theme=0' : ''
                }`
              : ''
          }
          width='30%'
          height='80'
          frameBorder='0'
          allowFullScreen
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        ></iframe>
        <p id='spotify'>
          <a
            href='https://open.spotify.com/user/solomon123-ca?si=cf08eafdbe404d38'
            target='_blank'
            rel='noopener noreferrer'
          >
            more music <i className='fa-brands fa-spotify' style={{ marginLeft: 5 }}></i>
          </a>
        </p>
      </div>
      <div>
        <p style={{ marginBottom: 5 }}>&#169; 2022 | Muhammad Sohail </p>
        <p>
          made with <span style={{ fontSize: 12 }}>♡</span> in montréal
        </p>
      </div>
    </footer>
  );
};

export default Footer;
