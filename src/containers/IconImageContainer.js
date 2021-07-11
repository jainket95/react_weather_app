import React, { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import CustomTypography from "./CustomTypography";

import { connect } from "react-redux";
import { conditionalState } from "../utils/helperFunctions";

const useStyles = makeStyles((theme) => ({
	svgColor: (props) => ({
		color: props.isSvgActive
			? theme.palette.primary.main
			: props.disabled
			? "#ffffff40"
			: props.iconColor
			? props.iconColor
			: theme.palette.common.white,
		stroke: "currentColor",
		strokeWidth: props.strokeWidth ? +props.strokeWidth : 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		fill: "transparent",
	}),
	componentDimension: (props) => ({
		width: props.width ? props.width : "1.2rem",
		height: props.height ? props.height : "1.2rem",
		marginRight: props.withText ? ".8rem" : "0",
	}),
	imgDimension: () => ({
		width: "100%",
		maxWidth: "100%",
	}),
	iconTextContainer: (props) => ({
		width: "100%",
		display: "flex",
		margin: ".2rem 0",
		backgroundColor: "inherit",
		justifyContent: "center",
		alignItems: "center",
		...props.withTextStyle,
	}),
	imageTextContainer: (props) => ({
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		...props.imgMainContainerStyle,
	}),
	imageContainer: (props) => ({
		width: props.imgWidth ? props.imgWidth : "4rem",
		minWidth: "4rem",
		height: "auto",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	}),
	imageMainContainer: (props) => ({
		width: props.imgContainer ? props.imgContainer : "40%",
		minWidth: "4rem",
		height: "100%",
		...props.imgContainerStyle,
	}),
	svgCardContainer: (props) => ({
		width: props.withContainer || props.isComponentActive ? "4.5rem" : "2.8rem",
		height:
			props.withContainer || props.isComponentActive ? "4.5rem" : "2.8rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: "white",
		backgroundColor: conditionalState(props, theme),
		// backgroundColor: "#333",
		borderRadius: "5px",
		position: "relative",
		padding: props.withContainer ? "1rem" : "0",
		margin: ".5rem 1rem",
		cursor: "pointer",
		...props.withContainerStyles,
	}),
}));

const IconImageContainer = (props) => {
	const classes = useStyles(props);
	const {
		icon,
		imgSrc,
		withText,
		isSvgActive,
		withContainer,
		isComponentActive,
		gestureName,
		variant,
		action,
		disableAll,
		disabled,
		iconColor,
		//reducer
		toggleCurrentGesture,
		isActive,
		currentGesture,
	} = props;

	const [justIcon, setIcon] = useState(null);
	const [img, setImg] = useState(null);
	const [imgWithText, setImgWithText] = useState(null);
	const [iconWithText, setIconWithText] = useState(null);

	const [isCompActive, setCompActive] = useState(false);
	// const [withComp, setWithComp] = useState(false);

	useEffect(() => {
		componentInit();

		if (isComponentActive !== null) {
			setCompActive(isComponentActive);
		}
		return () => {
			setIcon(null);
			setImg(null);
			setImgWithText(null);
			setIconWithText(null);
		};
	}, [
		icon,
		imgSrc,
		withText,
		isSvgActive,
		withContainer,
		isComponentActive,
		disableAll,
		disabled,
		gestureName,
		action,
		currentGesture,
		isActive,
	]);

	// if (variant === "iconWithGesture")
	// console.log(isCompActive, id, conditionalState(props));

	const colorCheck = (params) => {
		const currentNode = document.querySelector(`#${gestureName}`);

		// console.log("currentNode", currentNode);

		if (currentNode) {
			if (disableAll) {
				currentNode.style.backgroundColor = "#33333370";
			}

			if (isComponentActive && !withContainer && !disableAll) {
				currentNode.style.backgroundColor = "#007BFF";
			}

			if (withContainer && !disableAll) {
				currentNode.style.backgroundColor = "#333";
			}
		}
	};
	colorCheck();

	const componentInit = () => {
		if ((icon, imgSrc, withText, gestureName, variant)) {
			let useTag = `<use href='sprite/feather-sprite.svg#${icon}'/>`;
			let lockUseTag = `<use href='sprite/feather-sprite.svg#lock'/>`;

			switch (variant) {
				case "icon":
					let iconTemplate = (
						<div className={classes.svgCardContainer}>
							<svg
								className={clsx(classes.componentDimension, classes.svgColor)}
								dangerouslySetInnerHTML={{
									__html: useTag,
								}}
							/>
						</div>
					);

					setIcon(iconTemplate);
					break;
				case "img":
					let imgTemplate = (
						<div className={classes.imageMainContainer}>
							<div className={classes.imageContainer}>
								<img
									className={classes.imgDimension}
									src={imgSrc}
									alt="some image with meaningful content"
								/>
							</div>
						</div>
					);

					setImg(imgTemplate);
					break;
				case "imgWithText":
					let imgWithTextTemplate = (
						<div className={classes.imageTextContainer}>
							<div className={clsx(classes.imageMainContainer)}>
								<div className={classes.imageContainer}>
									<img
										className={classes.imgDimension}
										src={imgSrc}
										alt="some image with meaningful content"
									/>
								</div>
							</div>
							{withText}
						</div>
					);

					setImgWithText(imgWithTextTemplate);
					break;
				case "iconWithText":
					let iconWithTextTemplate = (
						<div className={classes.iconTextContainer}>
							<svg
								className={clsx(classes.componentDimension, classes.svgColor)}
								dangerouslySetInnerHTML={{
									__html: useTag,
								}}
							/>
							{withText}
						</div>
					);

					setIconWithText(iconWithTextTemplate);
					break;

				default:
					return;
			}
		}
	};

	if (variant) {
		colorCheck();
		switch (variant) {
			case "icon":
				return justIcon;
			case "img":
				return img;
			case "imgWithText":
				return imgWithText;
			case "iconWithText":
				return iconWithText;
			default:
				return;
		}
	}
};

const mapStateToProps = (state) => ({
	isActive: state.gestures.isActive,
	currentGesture: state.gestures.currentGesture,
});

export default connect(null, null)(IconImageContainer);
