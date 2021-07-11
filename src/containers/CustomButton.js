import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
	rootButton: (props) => ({
		textTransform: props.case ? props.case : "normal",
		fontWeight: props.fontWeight ? props.fontWeight : "500",
		fontSize: props.fontSize ? props.fontSize : "1rem",
		marginRight: props.mRight ? props.mRight : "0",
		marginLeft: props.mLeft ? props.mLeft : "0",
		marginBottom: props.mBottom ? props.mBottom : "0",

		...props.colorDetails,
		...props.buttonStyle,
		"&:hover": (props) => ({
			...props.colorDetails,
		}),
	}),
}));

const CustomButton = (props) => {
	const classes = useStyles(props);
	const { variant, size, color, disable, onClick } = props;

	return (
		<Button
			variant={variant}
			color={color}
			size={size}
			onClick={onClick}
			disable={disable}
			className={classes.rootButton}>
			{props.children}
		</Button>
	);
};

export default CustomButton;
