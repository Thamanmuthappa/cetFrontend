import Axios from "axios";

export const fetchAdminProfile = async (token) => {
	const url = `${process.env.REACT_APP_BACKEND_URL}/club/profile`;

	let final;

	try {
		await Axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			final = res.data;
		});
	} catch (error) {
		console.log(error);
	}

	return final;
};
