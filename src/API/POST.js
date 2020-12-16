import Axios from "axios";

export const postQuestionInDomain = async (question, token) => {
	const url = `${process.env.REACT_APP_BACKEND_URL}/test/domain/question/addMultiple`;

	const data = {
		testId: question.testId,
		domainId: question.domainId,
		questions: [question],
	};

	let result;

	try {
		await Axios.post(url, data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => {
			result = res;
			console.log(res);
		});
	} catch (error) {
		console.log(error);
	}

	return result;
};
