import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles, Divider, CircularProgress } from "@material-ui/core";
import { Link as RouterLink, Router, withRouter } from "react-router-dom";
import clsx from "clsx";
import IconImageContainer from "../../containers/IconImageContainer";
import CustomTypography from "../../containers/CustomTypography";
import ContentItemContainer from "../../containers/ContentItemContainer";
import CustomDropdown from "../../containers/CustomDropdown";

const useStyles = makeStyles((theme) => ({
	//new
	startCenterFlex: {
		justifyContent: "flex-start",
		alignItems: "center",
	},
	endCenterFlex: {
		justifyContent: "flex-end",
		alignItems: "center",
	},
	startStartFlex: {
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	centerCenterFlex: {
		justifyContent: "center",
		alignItems: "center",
	},
	spaceCenterFlex: {
		justifyContent: "space-between",
		alignItems: "center",
	},
	centerStartFlex: {
		justifyContent: "center",
		alignItems: "flex-start",
	},
	centerStartFlex: {
		justifyContent: "center",
		alignItems: "space-between",
	},
	columnCenterContainer: {
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
	},
	rowCenterContainer: {
		width: "100%",
		height: "100%",
		display: "flex",
	},
	rootWeather: {
		width: "100%",
		height: "90%",
		padding: "2rem",
		// border: `1px solid ${theme.palette.common.inputUnfocusedBg}`,
		// borderRadius: "10px",
		// backgroundColor: theme.palette.common.componentBg,
	},
	weatherContainer: {
		width: "100%",
		height: "100%",
		border: `1px solid ${theme.palette.common.inputUnfocusedBg}`,
		borderRadius: "10px",
		backgroundColor: theme.palette.common.componentBg,
	},
	rowHeaderContainer: {
		width: "100%",
		height: "5rem",
		borderBottom: `1px solid ${theme.palette.common.inputUnfocusedBg}`,
	},
	rowContentContainer: {
		width: "100%",
		height: "calc(100% - 5rem)",
	},
	leftContainer: {
		width: "40%",
		height: "100%",
		marginRight: "2rem",
		borderRight: `1px solid ${theme.palette.common.inputUnfocusedBg}`,
		overflowY: "auto",
	},
	rightContainer: {
		width: "calc(100% - 40% - 4rem)",
		padding: "2rem",
		height: "100%",
	},
	contentItemContainer: {
		width: "100%",
	},
}));

const Weather = ({ weatherData }) => {
	const classes = useStyles();

	const [currentWeatherData, setCurrWeatherData] = useState(null);

	useEffect(() => {
		let tempData;
		const filterArray = [];
        
		if (weatherData !== null) {
			tempData = Object.entries(weatherData.current).reduce((acc, curr) => {
				const contentData = {
					heading: curr[0],
					content: Array.isArray(curr[1]) === true ? "no data" : curr[1],
				};

				acc.push(contentData);
				return acc;
			}, []);

			console.log(tempData);
			setCurrWeatherData(tempData);
		}
	}, [weatherData]);

	console.log(currentWeatherData);

	return (
		<div
			className={clsx(
				classes.columnCenterContainer,
				classes.startCenterFlex,
				classes.rootWeather
			)}>
			<div
				className={clsx(
					classes.columnCenterContainer,
					classes.centerCenterFlex,
					classes.weatherContainer
				)}>
				<div
					className={clsx(
						classes.rowCenterContainer,
						classes.spaceCenterFlex,
						classes.rowHeaderContainer
					)}>
					<IconImageContainer
						variant="iconWithText"
						width="2rem"
						height="2rem"
						strokeWidth="1"
						icon="umbrella"
						withTextStyle={{
							justifyContent: "flex-start",
							alignItems: "center",
							marginLeft: "2rem",
						}}
						withText={
							<CustomTypography variant="h5" customColor="white">
								Current Weather Details
							</CustomTypography>
						}
						// isSvgActive={false}
					/>
				</div>
				<div
					className={clsx(
						classes.rowCenterContainer,
						classes.spaceCenterFlex,
						classes.rowContentContainer
					)}>
					<div
						className={clsx(
							classes.columnCenterContainer,
							classes.startCenterFlex,
							classes.leftContainer
						)}>
						{weatherData === null && <CircularProgress />}
						{currentWeatherData !== null &&
							currentWeatherData.map((item) => (
								<ContentItemContainer
									key={item.heading}
									heading={item.heading}
									content={item.content}
								/>
							))}
					</div>
					<div
						className={clsx(
							classes.rowCenterContainer,
							classes.centerCenterFlex,
							classes.rightContainer
						)}>
						{weatherData === null && <CircularProgress />}
						{currentWeatherData !== null &&
							currentWeatherData.map((item) => (
								<ContentItemContainer
									key={item.heading}
									heading={item.heading}
									content={item.content}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	weatherData: state.weather.weatherData,
});

export default connect(mapStateToProps, null)(Weather);
