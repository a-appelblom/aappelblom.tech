const instagramAccess = import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN;
const expiryDate = import.meta.env.VITE_INSTAGRAM_EXPIRY_DATE;

export async function get() {
	const postsUrl = `https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,timestamp&access_token=${instagramAccess}`;
	console.log(process.env.VITE_INSTAGRAM_ACCESS_TOKEN);
	const response = await fetch(postsUrl);
	const data = await response.json();

	const tokenExpires = parseInt(process.env.INSTAGRAM_TOKEN_EXPIRY_DATE, 10);
	const today = Date.now();
	const expired = today > tokenExpires;

	if (expired) {
		//TODO UPDATE TOKEN and trigger redeploy
		// post();
	}
	return {
		body: {
			posts: data.data,
			paging: data.paging
		}
	};
}

export async function post() {
	const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`;
	const response = await fetch(url);
	const data = await response.json();

	if (response.ok && data) {
		const vercelUrl = `https://api.vercel.com/v8/projects/${process.env.VERCEL_PROJECT_ID}/env/{id}`;
		const options = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`
			}
		};
		const response = await fetch(vercelUrl, options);
	}
}
