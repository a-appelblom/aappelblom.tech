const INSTAGRAM_ACCESS_TOKEN = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_TOKEN_EXPIRY_DATE = import.meta.env.VITE_INSTAGRAM_TOKEN_EXPIRY_DATE;
const VERCEL_ACCESS_TOKEN = import.meta.env.VITE_VERCEL_ACCESS_TOKEN;
const VERCEL_PROJECT_ID = import.meta.env.VITE_VERCEL_PROJECT_ID;
const REDEPLOY_URL = import.meta.env.VITE_VERCEL_REDEPLOY_URL;
const GET_TOKEN_URL = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

export async function get() {
	const postsUrl = `https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
	const response = await fetch(postsUrl);
	const data = await response.json();

	const tokenExpires = parseInt(INSTAGRAM_TOKEN_EXPIRY_DATE as string, 10);
	const today = Date.now();
	const expired = today > tokenExpires;

	console.log(expired);
	if (expired) {
		updateInstagramToken();
	}

	return {
		body: {
			posts: data.data,
			paging: data.paging
		}
	};
}

export async function updateInstagramToken() {
	// get the new token from instagram
	const newTokenResponse = await fetch(GET_TOKEN_URL);
	const newToken = await newTokenResponse.json();

	if (!newToken.access_token) {
		return;
	}

	const baseVercelProjectURL = `https://api.vercel.com/v8/projects/${VERCEL_PROJECT_ID}`;
	const response = await fetch(baseVercelProjectURL + '/env', {
		headers: {
			'content-type': 'application/json',
			Authorization: 'Bearer ' + VERCEL_ACCESS_TOKEN
		}
	});
	const data = await response.json();

	// Get and update the Token and expiry ENV at vercel
	if (!data) return;
	// Get env id's
	const accessToken = data.envs.find((env) => env.key === 'VITE_INSTAGRAM_ACCESS_TOKEN');
	const expiry = data.envs.find((env) => env.key === 'VITE_INSTAGRAM_TOKEN_EXPIRY_DATE');
	console.log(accessToken, expiry.id);

	// Update the ENV
	if (accessToken && expiry) {
		const accessUpdateResponse = await fetch(baseVercelProjectURL + '/env/' + accessToken.id, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				Authorization: 'Bearer ' + VERCEL_ACCESS_TOKEN
			},
			body: JSON.stringify({
				value: newToken.access_token
			})
		});
		const expiryUpdateResponse = await fetch(baseVercelProjectURL + '/env/' + expiry.id, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				Authorization: 'Bearer ' + VERCEL_ACCESS_TOKEN
			},
			body: JSON.stringify({
				// value: Date.now() + newToken.expires_in * 1000 - 1000 * 60 * 60 * 24 * 7
				value: `${Date.now() + 1000 * 60 * 10}`
			})
		});
		// console.log('___________________________________________________________');
		console.log(accessUpdateResponse, expiryUpdateResponse);

		// Trigger redeploy
		if (accessUpdateResponse.status === 200 && expiryUpdateResponse.status === 200) {
			console.log('___________________________________________________________');
			console.log('Token updated');
			await fetch(REDEPLOY_URL as string);
		}
	}
}
