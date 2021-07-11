import React, { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import CustomTypography from "./CustomTypography";
import {
	enableGesture,
	addCustomGesture,
	toggleCurrentGesture,
	toggleCustomCurrentGesture,
	enableCustomGesture,
	toggleCurrentAction,
} from "../actions/gestureActions";
import { connect } from "react-redux";
import { conditionalState, sentenceCapitalize } from "../utils/helperFunctions";
import theme from "../utils/theme";
import GestureModal from "../components/pages/gestures/GestureModal";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { sentenceCase } from "sentence-case";

const useStyles = makeStyles((theme) => ({
	svgColor: (props) => ({
		color: props.isSvgActive
			? theme.palette.primary.main
			: props.disabled
			? "#ffffff40"
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
		marginRight: props.withText ? ".5rem" : "0",
	}),
	svgCardContainer: (props) => ({
		width: props.withContainer || props.isComponentActive ? "4.5rem" : "2.8rem",
		height:
			props.withContainer || props.isComponentActive ? "4.5rem" : "2.8rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: "white",
		// backgroundColor: conditionalState(props),
		backgroundColor: "#333",
		borderRadius: "5px",
		position: "relative",
		padding: "1rem",
		// margin: ".5rem 0",
		cursor: "pointer",
		"&:not(:last-child)": {
			// marginLeft: "1.9rem",
			marginLeft: "2.4rem",
			marginBottom: "2.4rem",
		},
		"&:last-child": {
			marginLeft: "2.4rem",
		},
		...props.withContainerStyles,
	}),
	svgNameContainer: (props) => ({
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		color: "white",
		borderRadius: "5px",
	}),
	lockSvg: {
		position: "absolute",
		top: "8px",
		right: "8px",
	},
	gestureNameHeading: (props) => ({
		color: props.disableAll || props.disabled ? "#ffffff40" : "white",
		textTransform: "capitalize",
		width: "fit-content",
		textAlign: "center",
		overflowWrap: "break-word",
		marginTop: "5px",
	}),
}));

const CustomIconGesture = (props) => {
	const classes = useStyles(props);
	const { enqueueSnackbar } = useSnackbar();
	const history = useHistory();

	const {
		icon,
		id,
		isComponentActive,
		gestureName,
		gestureCode,
		action,
		disableAll,
		disabled,
		//reducer
		isActive,
		currentGesture,
		customGestures,
		currentCustomGesture,
		toggleCurrentGesture,
		enableGesture,
		addCustomGesture,
		toggleCustomCurrentGesture,
		enableCustomGesture,
		toggleCurrentAction,
	} = props;

	const [isClicked, setIsClicked] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const clickedNode = document.getElementById(`${gestureName}`);
		clickedNode.style.backgroundColor = "#333";

		if (isComponentActive) {
			clickedNode.style.backgroundColor = theme.palette.primary.main;
			setIsClicked(isComponentActive);
		} else {
			setIsClicked(isComponentActive);
		}

		if (disabled !== null && disabled) {
			clickedNode.style.backgroundColor = "#33333370";
		}

		if (disableAll !== null && disableAll) {
			clickedNode.style.backgroundColor = "#33333370";
		}
	}, [isComponentActive, disabled, disableAll, gestureName, isActive]);

	const onGestureClick = (e) => {
		const clickedNode = document.getElementById(`${gestureName}`);
		// console.log(clickedNode);

		if (
			isActive &&
			gestureName &&
			e.currentTarget.id === gestureName &&
			e.currentTarget.id !== "add custom gesture" &&
			currentCustomGesture === null
		) {
			//active phase
			if (currentGesture === null && !isClicked && !disabled && !open) {
				toggleCurrentGesture(gestureName);
				setIsClicked(!isClicked);
				clickedNode.style.backgroundColor = theme.palette.primary.main;

				//non active phase
			} else if (currentGesture !== null && isClicked && !disabled && !open) {
				toggleCurrentGesture(gestureName);
				setIsClicked(!isClicked);
				clickedNode.style.backgroundColor = "#333";
			} else if (currentGesture === null && disabled && !open) {
				setOpen(!open);

				// toggleCurrentGesture(gestureName);
				setIsClicked(!isClicked);
				// clickedNode.style.backgroundColor = theme.palette.primary.main;
			}
		}

		if (
			isActive &&
			gestureName &&
			e.currentTarget.id === "add custom gesture" &&
			currentGesture === null
		) {
			//active phase
			if (isClicked && !disabled) {
				if (customGestures.length < 2) {
					history.push({
						pathname: "/calibrate",
						state: {
							heading: "gesture",
							text: "Perform your gesture 5 times, for each performance press and hold the button while gesturing.",
						},
					});

					// addCustomGesture({ type: "set current" });
				} else {
					enqueueSnackbar(
						sentenceCase("at max you can only create one custom gestures."),
						{
							variant: "info",
						}
					);
				}

				// setIsClicked(!isClicked);
				// clickedNode.style.backgroundColor = theme.palette.primary.main;
				//non active phase
			}
		} else if (
			isActive &&
			gestureName &&
			e.currentTarget.id === gestureName &&
			e.currentTarget.id !== "add custom gesture" &&
			currentGesture === null
		) {
			//active phase
			if (currentCustomGesture === null && isClicked && !disabled) {
				toggleCustomCurrentGesture(gestureName);
				// setIsClicked(false);
				// toggleCurrentAction(null);
				// clickedNode.style.backgroundColor = "#333";
			} else if (
				currentCustomGesture !== null &&
				isClicked &&
				!disabled &&
				!open
			) {
				toggleCustomCurrentGesture(null);
			} else if (
				currentCustomGesture === null &&
				currentCustomGesture === null &&
				isClicked &&
				disabled &&
				!open
			) {
				//enable
				setOpen(!open);
				// toggleCustomCurrentGesture(gestureName);
				// enableCustomGesture(gestureName);
				// toggleCurrentGesture(gestureName);
				// setIsClicked(!isClicked);
				// clickedNode.style.backgroundColor = theme.palette.primary.main;
			}
		}
	};

	return (
		<div
			id={id}
			className={
				gestureCode || gestureName === "add custom gesture"
					? clsx(classes.svgCardContainer, "custom")
					: clsx(classes.svgCardContainer)
			}
			onClick={onGestureClick}>
			{action !== null && !isComponentActive && (
				<svg
					className={clsx(
						classes.componentDimension,
						classes.svgColor,
						classes.lockSvg
					)}
					dangerouslySetInnerHTML={{
						__html: `<use href='sprite/feather-sprite.svg#lock'/>`,
					}}
				/>
			)}
			<div className={classes.svgNameContainer}>
				<svg
					className={clsx(classes.componentDimension, classes.svgColor)}
					dangerouslySetInnerHTML={{
						__html: `<use href='sprite/feather-sprite.svg#${icon}'/>`,
					}}
				/>
				<Typography variant="caption" className={classes.gestureNameHeading}>
					{gestureName}
				</Typography>
			</div>
			<GestureModal
				open={open}
				setOpen={setOpen}
				primaryButtonText="yes"
				transparentButtonText="no"
				onClose={() => {
					setOpen(!open);
				}}
				text="Are you sure you want to re-enable this gesture?"
				transparentActionHandle={() => {
					setOpen(!open);
				}}
				primaryActionHandle={async (e) => {
					const clickedNode = document.getElementById(`${gestureName}`);

					if (
						isActive &&
						gestureName &&
						disabled &&
						currentGesture === null &&
						currentCustomGesture === null &&
						Boolean(clickedNode)
					) {
						// toggleCurrentGesture(gestureName);
						setOpen(!open);
						setIsClicked(!isClicked);

						let bindingObject;
						if (gestureCode) {
							bindingObject = {
								gesture: gestureCode,
								customGestureName: gestureName,
							};

							const enableGestureCustomObj = await enableCustomGesture(
								bindingObject
							);

							if (
								enableGestureCustomObj &&
								enableGestureCustomObj.anyError &&
								enableGestureCustomObj.anyError.status &&
								enableGestureCustomObj.anyError.message
							) {
								enqueueSnackbar(
									sentenceCapitalize(enableGestureCustomObj.anyError.message),
									{
										variant: "error",
									}
								);
							} else if (
								enableGestureCustomObj &&
								enableGestureCustomObj.success &&
								enableGestureCustomObj.success.status &&
								enableGestureCustomObj.success.message
							) {
								enqueueSnackbar(
									sentenceCapitalize(enableGestureCustomObj.success.message),
									{
										variant: "success",
									}
								);
								clickedNode.style.backgroundColor = theme.palette.primary.main;
							}
						} else if (!gestureCode && gestureName) {
							bindingObject = {
								gestureName: gestureName,
								gesture: `${gestureName.split(" ")[0]}${sentenceCapitalize(
									gestureName.split(" ")[1]
								)}`,
							};

							const enableGestureObj = await enableGesture(bindingObject);

							if (
								enableGestureObj &&
								enableGestureObj.anyError &&
								enableGestureObj.anyError.status &&
								enableGestureObj.anyError.message
							) {
								enqueueSnackbar(
									sentenceCapitalize(enableGestureObj.anyError.message),
									{
										variant: "error",
									}
								);
							} else if (
								enableGestureObj &&
								enableGestureObj.success &&
								enableGestureObj.success.status &&
								enableGestureObj.success.message
							) {
								enqueueSnackbar(
									sentenceCapitalize(enableGestureObj.success.message),
									{
										variant: "success",
									}
								);
								clickedNode.style.backgroundColor = theme.palette.primary.main;
							}
						}
					}

					// else if (
					// 	isActive &&
					// 	gestureName &&
					// 	gestureCode &&
					// 	disabled &&
					// 	currentGesture === null &&
					// 	Boolean(clickedNode)
					// ) {
					// 	// toggleCurrentGesture(gestureName);
					// 	console.log("custom");
					// 	setOpen(!open);
					// 	setIsClicked(!isClicked);

					// 	// const bindingObject = {
					// 	// 	gestureName: gestureName,
					// 	// 	gesture: `${gestureName.split(" ")[0]}${sentenceCapitalize(
					// 	// 		gestureName.split(" ")[1]
					// 	// 	)}`,
					// 	// };

					// 	// const enableCustomGestureObj = await enableGesture(bindingObject);

					// 	// if (
					// 	// 	enableCustomGestureObj &&
					// 	// 	enableCustomGestureObj.anyError &&
					// 	// 	enableCustomGestureObj.anyError.status &&
					// 	// 	enableCustomGestureObj.anyError.message
					// 	// ) {
					// 	// 	enqueueSnackbar(
					// 	// 		sentenceCase(enableCustomGestureObj.anyError.message),
					// 	// 		{
					// 	// 			variant: "error",
					// 	// 		}
					// 	// 	);
					// 	// } else if (
					// 	// 	enableCustomGestureObj &&
					// 	// 	enableCustomGestureObj.success &&
					// 	// 	enableCustomGestureObj.success.status &&
					// 	// 	enableCustomGestureObj.success.message
					// 	// ) {
					// 	// 	enqueueSnackbar(
					// 	// 		sentenceCase(enableCustomGestureObj.success.message),
					// 	// 		{
					// 	// 			variant: "success",
					// 	// 		}
					// 	// 	);
					// 	// }

					// 	// clickedNode.style.backgroundColor = theme.palette.primary.main;
					// }
				}}
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isActive: state.gestures.isActive,
	currentGesture: state.gestures.currentGesture,
	currentCustomGesture: state.gestures.currentCustomGesture,
	customGestures: state.gestures.customGestures,
});

export default connect(mapStateToProps, {
	toggleCurrentGesture,
	toggleCustomCurrentGesture,
	enableCustomGesture,
	addCustomGesture,
	enableGesture,
	toggleCurrentAction,
})(CustomIconGesture);
