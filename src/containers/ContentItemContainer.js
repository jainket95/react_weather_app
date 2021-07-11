import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles, Divider } from "@material-ui/core";
import { Link as RouterLink, Router, withRouter } from "react-router-dom";
import clsx from "clsx";
import IconImageContainer from "../containers/IconImageContainer";
import CustomTypography from "../containers/CustomTypography";

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
	rootContentItem: {
		width: "100%",
		height: "100%",
		"&:not(last-child)": {
			padding: "1rem 0",
			marginBottom: "1rem",
		},
	},
}));

const ContentItemContainer = ({ heading, content }) => {
	const classes = useStyles();

	return (
		<div
			className={clsx(
				classes.rowCenterContainer,
				classes.centerCenterFlex,
				classes.rootContentItem
			)}>
			<IconImageContainer
				variant="iconWithText"
				icon="map-pin"
				withTextStyle={{
					width: "50%",
					justifyContent: "flex-start",
					alignItems: "center",
					marginLeft: "2rem",
				}}
				withText={
					<div
						className={clsx(
							classes.rowCenterContainer,
							classes.spaceCenterFlex,
							classes.contentItemContainer
						)}>
						<CustomTypography variant="body1" customColor="white">
							{heading}
						</CustomTypography>
						<CustomTypography variant="body1" customColor="white">
							{content}
						</CustomTypography>
					</div>
				}
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(null, null)(ContentItemContainer);
