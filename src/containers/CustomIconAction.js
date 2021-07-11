import React, { useEffect, useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import CustomTypography from "./CustomTypography";
import { enableGesture, toggleCurrentAction } from "../actions/gestureActions";
import { connect } from "react-redux";
import { conditionalState } from "../utils/helperFunctions";
import theme from "../utils/theme";
import GestureModal from "../components/pages/gestures/GestureModal";

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
	actionCardContainer: (props) => ({
		width: "19rem",
		height: "6rem",
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		color: "white",
		backgroundColor: "#33333370",
		borderRadius: "5px",
		// margin: ".5rem 2rem",
		marginBottom: "2rem",
		marginRight: "4rem",
		cursor: "pointer",
		...props.withContainerStyles,
	}),
	iconCardContainer: {
		width: "30%",
		height: "100%",
		margin: ".5rem",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	actionContentContainer: {
		width: "70%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
	},
}));

const CustomIconAction = (props) => {
	const classes = useStyles(props);
	const {
		icon,
		id,
		isComponentActive,
		actionName,
		actionSubText,
		action,
		disableAll,
		disabled,
		getState,
		//reducer
		isActive,
		currentGesture,
		currentAction,
		toggleCurrentAction,
		enableGesture,
	} = props;

	const [isClicked, setIsClicked] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const clickedNode = document.getElementById(`${actionName}`);
		clickedNode.style.backgroundColor = "#33333390";

		if (
			currentAction &&
			currentAction.isComponentActive &&
			currentAction.actionName === actionName
		) {
			if (clickedNode.style.backgroundColor !== theme.palette.primary.main) {
				clickedNode.style.backgroundColor = theme.palette.primary.main;
				setIsClicked(currentAction.isComponentActive);
				getState(currentAction.isComponentActive);
			} else if (
				clickedNode.style.backgroundColor === theme.palette.primary.main
			) {
				clickedNode.style.backgroundColor = "#33333390";
			}
		}
	}, [currentAction, currentGesture]);

	const onActionClick = (e) => {
		const clickedNode = document.getElementById(`${actionName}`);
		// console.log("node", clickedNode, actionName, isClicked);

		if (
			isActive &&
			actionName &&
			// !isClicked &&
			e.currentTarget.id === actionName
		) {
			//active phase
			// if (!isClicked) {
			toggleCurrentAction(actionName);
			setIsClicked(!isClicked);
			getState(!isClicked);
			clickedNode.style.backgroundColor = theme.palette.primary.main;
			//non active phase
			// }
		}
		// else if (
		// 	isActive &&
		// 	actionName &&
		// 	isClicked &&
		// 	e.currentTarget.id === actionName
		// ) {
		// 	toggleCurrentAction(actionName);
		// 	setIsClicked(!isClicked);
		// 	getState(!isClicked);
		// 	clickedNode.style.backgroundColor = theme.palette;
		// }
	};

	console.log("isClicke", isClicked);

	return (
		<div
			id={id}
			className={clsx(classes.actionCardContainer)}
			onClick={onActionClick}>
			<div className={classes.iconCardContainer}>
				<svg
					className={clsx(classes.componentDimension, classes.svgColor)}
					dangerouslySetInnerHTML={{
						__html: `<use href='sprite/feather-sprite.svg#${icon}'/>`,
					}}
				/>
			</div>
			<div className={classes.actionContentContainer}>
				<CustomTypography variant="h5" mBottom=".1rem" case="capitalize">
					{actionName}
				</CustomTypography>
				<CustomTypography variant="caption" case="capitalize" fontWeight="300">
					{actionSubText}
				</CustomTypography>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isActive: state.gestures.isActive,
	currentAction: state.gestures.currentAction,
	currentGesture: state.gestures.currentGesture,
});

export default connect(mapStateToProps, {
	toggleCurrentAction,
	enableGesture,
})(CustomIconAction);
