import logo from './logo.svg';
import './App.scss';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './contexts/Theme';
import Header from './components/Header';
import { Buffer } from 'buffer';

const App = () => {
  const { theme } = useContext(ThemeContext);
  const [track, setTrack] = useState<any>({});

  window.onscroll = () => {
    const header = document.getElementsByTagName('header')[0];
    if (window.scrollY >= header.offsetHeight / 2) header.classList.add('active');
    else header.classList.remove('active');
  };

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
          offset: Math.floor(Math.random() * 452).toString(),
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
    getRandomSong().then((retTrack) => setTrack(retTrack));
  }, []);

  return (
    <div className={`page ${theme} center`}>
      <Header showMain={true} />
      <main className='content center'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Song of the day is {track.name}!</p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
        <iframe
          style={{ borderRadius: 12, minWidth: 300, marginTop: 50 }}
          src={
            track.external_urls
              ? `${track.external_urls.spotify.replace('.com/track', '.com/embed/track')}?utm_source=generator`
              : ''
          }
          width='30%'
          height='80'
          frameBorder='0'
          allowFullScreen
          allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        ></iframe>
      </main>
    </div>
  );
};

export default App;
