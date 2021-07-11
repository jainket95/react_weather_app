import React, { useState, useEffect } from "react";
import {
	makeStyles,
	FormControl,
	FormLabel,
	Select,
	MenuItem,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { connect } from "react-redux";

const useStyles = makeStyles({
	mainContainer: {
		width: (props) =>
			props.dropdownSize !== null ? props.dropdownSize : "100%",
		color: "white",
		fontSize: ".7rem",
		fontWeight: "400",
		marginRight: ".8rem ",
	},
	formControl: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	fontColor: {
		color: "#5A5A89",
	},
	select: {
		width: "100%",
		minWidth: "7rem",
		height: "2.2rem",
		color: "white",
		backgroundColor: "05050F",
		fontSize: ".9rem",
		fontWeight: "400",
		borderRadius: "3px",
		borderBottom: "1px solid #5A5A89",
		paddingLeft: ".6rem",
		textTransform: "capitalize",
		"&:placeholder": {
			color: "white",
		},
	},
	formLabel: {
		fontSize: ".9rem",
		minWidth: "8rem",
		marginRight: ".5rem",
		marginTop: ".5rem",
		textAlign: "left",
		textTransform: "capitalize",
		color: "#5A5A89",
	},
	menuItem: {
		textTransform: "normal",
	},
});

const Dropdown = () => {
	return <ArrowDropDownIcon style={{ color: "white" }} />;
};

const CustomDropDown = (props) => {
	const classes = useStyles(props);
	const { node, handleChangeDropDown, isAvailable } = props;

	const { component, dropdown_list, selected_value } = node;

	const [state, setState] = useState("");

	useEffect(() => {
		if (selected_value) {
			setState(selected_value[`${component}`]);
		}
		// setDropdownComponent(selected_value);
		// if (selected_value && component === "employee") {
		// 	setEmployee(selected_value[`${component}`]);
		// }
		// console.log(selected_value, component);
		if (selected_value && component === "activity") {
			console.log(selected_value, component);
			// setActivity(selected_value[`${component}`]);
		}
		if (selected_value && component === "parameter") {
			console.log(selected_value, component);
			// setMetricParameter(selected_value[`${component}`]);
		}
	}, [selected_value]);

	const handleChange = (e) => {
		const settingData = {
			setting: e.target.name,
			value: e.target.value,
		};

		handleChangeDropDown(settingData);
		setState(e.target.value);
	};

	const isDisabled = (value) => {
		const arr = [
			"Enter employee here",
			"Enter activity here",
			"Enter session here",
		];

		return arr.includes(value);
	};

	const renderMenuItem = () => {
		if (isAvailable.status && dropdown_list) {
			return dropdown_list.map((value, i) => (
				<MenuItem
					key={i}
					value={value}
					disabled={isDisabled(value)}
					className={classes.menuItem}>
					{/* {value} */}
					{value.split("-").reduce((acc, curr) => {
						acc = acc + " " + curr;
						return acc;
					})}
				</MenuItem>
			));
		} else {
			return dropdown_list.map((value, i) => (
				<MenuItem
					key={i}
					value={value}
					disabled={value.includes("Save") ? true : false}
					className={classes.menuItem}>
					{/* {value} */}
					{value.split("_").reduce((acc, curr) => {
						acc = acc + " " + curr;
						return acc;
					})}
				</MenuItem>
			));
		}
	};

	return (
		<div className={classes.mainContainer}>
			<FormControl className={classes.formControl}>
				{/* <FormLabel
					focused={false}
					className={clsx(classes.fontColor, classes.formLabel)}
					component='legend'>
					{component.split("_").reduce((acc, curr) => {
						acc = acc + " " + curr;
						return acc;
					})}
				</FormLabel> */}
				<Select
					name={component}
					value={state}
					native={false}
					onChange={handleChange}
					IconComponent={() => (
						<Dropdown id="dropdown" style={{ color: "#5A5A89 !important" }} />
					)}
					disableUnderline={true}
					placeholder={state.length > 0 ? state : `Enter ${component}`}
					className={classes.select}
					inputProps={{
						"aria-label": "Without label",
					}}>
					{renderMenuItem()}
				</Select>
			</FormControl>
		</div>
	);
};

export default connect(null, null)(CustomDropDown);

// setMetricParameter,
// setActivity,
// setDropdownComponent,
