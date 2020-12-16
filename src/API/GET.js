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

export const fetchAllTests = async (token) => {
	const url = `${process.env.REACT_APP_BACKEND_URL}/test/allTestsOfAClub`;

	let final;

	try {
		await Axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			final = res.data.tests;
		});
	} catch (error) {
		console.log(error);
	}

	return final;
};

export const fetchTestDetails = async (id, token) => {
	const url = `${process.env.REACT_APP_BACKEND_URL}/test/details?testId=${id}`;

	let final;
	try {
		await Axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			final = res.data.test;
		});
	} catch (error) {
		console.log(error);
	}

	return final;
};

export const fetchTestDomains = async (id, token) => {
	const url = `${process.env.REACT_APP_BACKEND_URL}/test/domain/all?testId=${id}`;

	let final;
	try {
		await Axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			final = res.data.domains;
		});
	} catch (error) {
		console.log(error);
	}

	return final;
};

export const fetchQuestionsInDomain = async (testId, domainId, token) => {
	const url = `${process.env.REACT_APP_BACKEND_URL}/test/domain/question/all?testId=${testId}&domainId=${domainId}`;

	let final;
	try {
		await Axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			final = res.data.questions;
		});
	} catch (error) {
		console.log(error);
	}

	return final;
};

export const fetchSingleDomainDetails = async (domainId, token) => {
	const url = `${process.env.REACT_APP_BACKEND_URL}/test/domain/details?domainId=${domainId}`;

	let final;
	try {
		await Axios.get(url, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			final = res.data.domainDetails;
		});
	} catch (error) {
		console.log(error);
	}

	return final;
};
