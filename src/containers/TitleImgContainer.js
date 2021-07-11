import React, { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import IconImageContainer from "./IconImageContainer";

const useStyles = makeStyles((theme) => ({
	mainHeading: (props) => ({
		fontSize: props.fontSize ? props.fontSize : "8.8rem",
		fontWeight: "700",
		lineHeight: props.lineHeight ? props.lineHeight : "160px",
		textTransform: "uppercase",
		backgroundColor: "white",
		backgroundImage:
			"linear-gradient(0deg, #000000, 45%, rgba(0, 0, 0, 0) 55%), linear-gradient(0deg, #FFFFFF, #FFFFFF)",
		backgroundSize: "100%",
		backgroundRepeat: "repeat",
		backgroundClip: "text",
		textFillColor: "transparent",
		WebkitBackgroundClip: "text",
		WebkitTextFillColor: "transparent",
		WebkitTextStrokeColor: "transparent",
		MozBackgroundClip: "text",
		MozTextFillColor: "transparent",
	}),
	centerImgContainer: {
		marginTop: "-2.4rem",
	},
}));

const TitleImgContainer = (props) => {
	const { text, imgSrc, variant } = props;

	const classes = useStyles(props);

	return (
		<>
			<div className={classes.centerMainHeading}>
				<Typography variant={variant} className={classes.mainHeading}>
					{text}
				</Typography>
			</div>
			<div className={classes.centerImgContainer}>
				<IconImageContainer variant="img" imgSrc={imgSrc} imgWidth="16em" />
			</div>
		</>
	);
};

export default TitleImgContainer;
