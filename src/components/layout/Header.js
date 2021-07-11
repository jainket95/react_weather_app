import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles, Divider } from "@material-ui/core";
import { Link as RouterLink, Router, withRouter } from "react-router-dom";
import clsx from "clsx";
import IconImageContainer from "../../containers/IconImageContainer";
import CustomInput from "../../containers/CustomInput";
import CustomTypography from "../../containers/CustomTypography";

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
	rootNav: (props) => ({
		width: "100%",
		height: props.height ? props.height : "6rem",
		backgroundColor: theme.palette.common.normalBg,
		borderRadius: "5px",
		boxShadow: `0px 0px 4px 2px ${theme.palette.common.inputUnfocusedBg}`,
	}),
	brandContainer: (props) => ({
		height: "100%",
		width: "calc(100% - 80% - 2rem)",
		marginLeft: "2rem",
	}),
	headerContainer: (props) => ({
		height: "100%",
		width: "calc(100% - 200px - 20% - 2rem)",
	}),
	footerContainer: (props) => ({
		height: "100%",
		width: "200px",
	}),
}));

const Header = (props) => {
	const classes = useStyles(props);

	const [state, setState] = useState("new york");
	const [ref, setRef] = useState(null);

	// useEffect(() => {}, []);

	const addCityName = () => {
		if (state.length > 0) {
			console.log(state);
		}
	};
	return (
		<div
			className={clsx(
				classes.rowCenterContainer,
				classes.spaceCenterFlex,
				classes.rootNav
			)}>
			<div
				className={clsx(
					classes.rowCenterContainer,
					classes.startCenterFlex,
					classes.brandContainer
				)}>
				<RouterLink to="/">
					<IconImageContainer
						variant="iconWithText"
						width="3.5rem"
						height="3.5rem"
						strokeWidth="1"
						icon="codesandbox"
						withText={
							<CustomTypography variant="h4" customColor="white">
								Weather App
							</CustomTypography>
						}
						// isSvgActive={false}
					/>
				</RouterLink>
			</div>
			<div
				className={clsx(
					classes.rowCenterContainer,
					classes.centerCenterFlex,
					classes.headerContainer
				)}>
				<CustomInput
					inputWidth="60%"
					iconProps={{
						variant: "icon",
						icon: "search",
						inputIcon: true,
						noMargin: true,
						withContainerStyles: {
							marginLeft: "-3.5rem",
						},
					}}
					inputBg="transparent"
					state={state}
					buttonProps={{
						variant: "contained",
						case: "capitalize",
						text: "search",
						colorDetails: {
							backgroundColor: "#333333",
							color: "white",
						},
						buttonStyle: {
							minHeight: "2rem",
							borderTopLeftRadius: "0",
							borderBottomLeftRadius: "0",
						},
						onClick: addCityName,
					}}
					setState={setState}
					node={{
						component: "add city name",
						input_type: "text",
					}}
					handleChangeInput={({ setting, value, ref }) => {
						console.log(setting, value, state);
					}}
				/>
			</div>
			<div
				className={clsx(
					classes.rowCenterContainer,
					classes.endCenterFlex,
					classes.footerContainer
				)}>
				<RouterLink to="/logs" onClick={(e) => {}}>
					<IconImageContainer
						variant="icon"
						icon="alert-circle"
						// isSvgActive={false}
					/>
				</RouterLink>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(null, null)(Header);
