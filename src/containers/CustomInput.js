import React, { useRef, useEffect } from "react";
import { makeStyles, Input, InputAdornment } from "@material-ui/core";

import "../utils/input_step.css";
import IconImageContainer from "./IconImageContainer";
import { sentenceCapitalize } from "../utils/helperFunctions";
import * as changeCase from "change-case";
import CustomButton from "./CustomButton";
import clsx from "clsx";
import { sentenceCase } from "sentence-case";

const useStyles = makeStyles((theme) => ({
	root: (props) => ({
		width: props.inputWidth ? props.inputWidth : "50%",
		height: "2rem",
		minHeight: "2rem",
		marginLeft: props.mLeft ? props.mLeft : "0",
		marginRight: props.mRight ? props.mRight : "0",
		"&:not(:last-child)": {
			marginBottom: props.mBottom ? props.mBottom : "0",
		},
	}),
	input: (props) => ({
		width: "100%",
		minHeight: "2.0rem",
		height: "100%",
		maxHeight: "2.1rem",
		color: "white",
		fontSize: ".9rem",
		fontWeight: "400",
		padding: ".2rem",
		paddingLeft: ".8rem",
		borderRadius: "5px 0px 0px 5px",
		border: "1px solid #333333",
		backgroundColor: props.inputBg
			? props.inputBg
			: theme.palette.common.inputUnfocusedBg,
		"&:focus": {
			backgroundColor: theme.palette.common.inputFocusedBg,
		},
		"&:hover": {
			boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
		},
		"&::placeholder": {
			textOverflow: "ellipsis !important",
			color: "white !important",
		},
		"&:placeholder-shown": {
			textOverflow: "ellipsis !important",
			color: "white !important",
		},
	}),
	centerCenterFlex: {
		justifyContent: "center",
		alignItems: "center",
	},
	rowCenterContainer: {
		width: "100%",
		height: "100%",
		display: "flex",
	},
	inputContainer: (props) => ({
		...props.inputContainerStyle,
	}),
}));

const CustomInput = (props) => {
	const classes = useStyles(props);
	const localRef = useRef(null);
	// const [state, setState] = useState("");

	const { component, selectedValue, inputType } = props.node;
	const { handleChangeInput, iconProps, setState, state, buttonProps } = props;

	useEffect(() => {
		if (state !== null) {
			setState(state);
		}
	}, [props.node]);

	const handleChange = (e) => {
		const settingData = {
			setting: changeCase.camelCase(e.target.name),
			value: e.target.value,
			ref: localRef.current,
		};

		handleChangeInput(settingData);
		setState(e.target.value);
	};

	if (buttonProps && buttonProps.text) {
		return (
			<div
				className={clsx(
					classes.rowCenterContainer,
					classes.centerCenterFlex,
					classes.inputContainer
				)}>
				<Input
					disableUnderline={true}
					inputRef={localRef}
					classes={{
						root: classes.root,
						input: classes.input,
						focused: classes.focused,
					}}
					name={changeCase.camelCase(component)}
					type={inputType}
					value={state}
					placeholder={sentenceCase(component)}
					endAdornment={
						iconProps && (
							<InputAdornment position="end">
								<IconImageContainer {...iconProps} />
							</InputAdornment>
						)
					}
					onChange={handleChange}
				/>
				<CustomButton {...buttonProps}>{buttonProps.text}</CustomButton>
			</div>
		);
	}

	return (
		<Input
			disableUnderline={true}
			classes={{
				root: classes.root,
				input: classes.input,
				focused: classes.focused,
			}}
			name={changeCase.camelCase(component)}
			type={inputType}
			value={state}
			placeholder={changeCase.capitalCase(component)}
			endAdornment={
				iconProps && (
					<InputAdornment>
						<IconImageContainer {...iconProps} />
					</InputAdornment>
				)
			}
			onChange={handleChange}
		/>
	);
};

export default CustomInput;
