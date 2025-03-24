import { Buffer } from 'buffer';
import {
  PUBLIC_CLIENT_ID as ClientId,
  PUBLIC_CLIENT_SECRET as ClientSecret,
  PUBLIC_REFRESH_TOKEN as RefreshToken,
  PUBLIC_SONG_COUNT as SongCount,
} from '$env/static/public';

export const shuffleArray = <T>(arr: T[]) => {
  let i = arr.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
};

export const getRandomSong = async () => {
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${ClientId}:${ClientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: RefreshToken,
    }),
  });
  const token = (await tokenResponse.json())['access_token'];

  const savedTrackResponse = await fetch(
    'https://api.spotify.com/v1/me/tracks?' +
      new URLSearchParams({
        market: 'CA',
        limit: '1',
        offset: Math.floor(Math.random() ** 2 * Number(SongCount)).toString(),
      }),
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  const returnedTrack = await savedTrackResponse.json();
  return returnedTrack.items[0].track;
};
