import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Switch, Route, withRouter, useHistory } from "react-router-dom";
// import "./App.css";
import "./utils/scrollbar_override.css";
import { useSnackbar } from "notistack";
import { sentenceCapitalize } from "./utils/helperFunctions";
import Header from "./components/layout/Header";
import { getWeatherData } from "./actions/weatherAction";
import Weather from "./components/pages/Weather";

const useStyles = makeStyles((theme) => ({
	rootApp: {
		width: "100vw",
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "stretch",
		overflow: "hidden",
	},
	mainWrapper: {
		height: "100%",
		width: "100%",
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	homeContainer: {
		width: `calc(100% )`,
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
	},
}));

export const App = ({ getWeatherData, weatherData }) => {
	const classes = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const history = useHistory();

	useEffect(async () => {
		if (weatherData === null) {
			const data = await getWeatherData();
		}
	}, [weatherData]);
	return (
		<div className={classes.rootApp}>
			<div className={classes.homeContainer}>
				<Header />
				<Weather />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	weatherData: state.weather.weatherData,
});

export default connect(mapStateToProps, { getWeatherData })(App);

/////App ID
// ya9Dditu
// Client ID (Consumer Key)
// dj0yJmk9bVNkUkhoYXNOUld6JmQ9WVdrOWVXRTVSR1JwZEhVbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTFm
// Client Secret (Consumer Secret)
// 793dc3f64f971908813c1e1c864f3c4ba0b1e2b7
