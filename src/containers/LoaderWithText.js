import React, { useEffect, useState } from "react";
import { makeStyles, Backdrop, CircularProgress } from "@material-ui/core";
import clsx from "clsx";
import CustomTypography from "./CustomTypography";
import theme from "../utils/theme";
import { sentenceCase } from "sentence-case";

const useStyles = makeStyles((theme) => ({
	startStartFlex: {
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	endCenterFlex: {
		justifyContent: "flex-end",
		alignItems: "center",
	},
	centerCenterFlex: {
		justifyContent: "center",
		alignItems: "center",
	},
	startCenterFlex: {
		justifyContent: "flex-start",
		alignItems: "center",
	},
	startBetweenFlex: {
		justifyContent: "flex-start",
		alignItems: "space-between",
	},
	betweenCenterFlex: {
		justifyContent: "space-between",
		alignItems: "center",
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
	rootLoaderText: (props) => ({
		width: "98%",
		height: "4rem",
		marginTop: props.mTop ? props.mTop : "0",
	}),
	loaderContainer: {
		width: "4rem",
		height: "100%",
		marginRight: ".5rem",
	},
	textContainer: {
		width: "fit-content",
		height: "100%",
	},
}));

const LoaderWithText = (props) => {
	const classes = useStyles(props);

	const { text } = props;

	return (
		<div
			className={clsx(
				classes.rowCenterContainer,
				classes.centerCenterFlex,
				classes.rootLoaderText
			)}>
			<div
				className={clsx(
					classes.columnCenterContainer,
					classes.centerCenterFlex,
					classes.loaderContainer
				)}>
				<CircularProgress color="inherit" />
			</div>
			<div
				className={clsx(
					classes.rowCenterContainer,
					classes.startCenterFlex,
					classes.textContainer
				)}>
				<CustomTypography
					variant="body1"
					align="left"
					case="normal"
					customColor={theme.palette.info.light}>
					{sentenceCase(text)}
				</CustomTypography>
			</div>
		</div>
	);
};

export default LoaderWithText;
