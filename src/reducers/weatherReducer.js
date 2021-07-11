import * as types from "../actions/types";

const initialState = {
	weatherData: null,
	error: null,
};

const weatherReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.GET_DATA:
			return { ...state, weatherData: payload };

		case types.ERROR_FETCHING_DATA:
			return { ...state, error: payload };

		default:
			return state;
	}
};

export default weatherReducer;
