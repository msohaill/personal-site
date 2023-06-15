import { Buffer } from 'buffer';
import {
  PUBLIC_CLIENT_ID as CLIENT_ID,
  PUBLIC_CLIENT_SECRET as CLIENT_SECRET,
  PUBLIC_REFRESH_TOKEN as REFRESH_TOKEN,
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

export const basename = (name: string) => name.split(/[\\/]/).reverse()[0];

export const getRandomSong = async () => {
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
    }),
  });
  const token = (await tokenResponse.json())['access_token'];

  const savedTrackResponse = await fetch(
    'https://api.spotify.com/v1/me/tracks?' +
      new URLSearchParams({
        market: 'CA',
        limit: '1',
        offset: Math.floor(Math.random() ** 2 * 598).toString(),
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
