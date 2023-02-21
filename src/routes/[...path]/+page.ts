import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export let prerender = false;

export const load = (e => {
  throw error(404, 'Not Found');
}) satisfies PageLoad;
