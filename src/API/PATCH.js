import Axios from "axios";

export const patchProfile = async (profile, token) => {
	const url = `${process.env.REACT_APP_BACKEND_URL}/club/profile`;

	let final;

	try {
		await Axios.patch(url, profile, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			final = res;
		});
	} catch (error) {
		console.log(error);
	}

	return final;
};

export const patchStudProfile = async (profile, token) => {
	const url = `${process.env.REACT_APP_BACKEND_URL}/student/profile`;

	let final;

	try {
		await Axios.patch(url, profile, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			final = res;
		});
	} catch (error) {
		console.log(error);
	}

	return final;
};
