import * as types from "./types";

export const getWeatherData = () => async (dispatch) => {
	const baseObject = {
		lat: 40.73061,
		lon: -73.935242,
	};

	const weatherData = await requestData(baseObject);

	if (Object.keys(weatherData).length > 0) {
		dispatch({
			type: types.GET_DATA,
			payload: weatherData,
		});
	} else if (weatherData.error.errorMessage) {
		dispatch({
			type: types.ERROR_FETCHING_DATA,
			payload: weatherData.error.errorMessage,
		});
	}

	return weatherData;
};

const requestData = async (baseObject) => {
	try {
		const apiKey = "4ee24863075f5b5f8d32c090b8891d9c";

		const weatherApi = `
        https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=${baseObject.lat}&lon=${baseObject.lon}&appid=${apiKey}&units=metric`;
		console.log(weatherApi);

		let response = await fetch(weatherApi, {
			method: "GET",
			headers: { "Content-type": "application/json" },
		});

		const responseObject = await response.json();

		return responseObject;
	} catch (error) {
		return error;
	}
};
