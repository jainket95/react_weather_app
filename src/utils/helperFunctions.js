export const conditionalState = (props, theme) => {
	const { isComponentActive, withContainer, disableAll } = props;

	if (disableAll) {
		return "#33333370";
	}

	if (isComponentActive && !withContainer && !disableAll) {
		return theme.palette.primary.main;
	}

	if (withContainer && !disableAll) {
		return "#333";
	}
};

export const setTimeInterval = (callback, time) => {
	const timerId = setInterval(callback, time);
	return timerId;
};

export const sentenceCapitalize = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const gestureLogsFormatter = (string) => {
	if (string && string.slice(0, "swipe".length).toLowerCase() === "swipe") {
		// const gest1 = sentenceCapitalize();
		// const gest2 = sentenceCapitalize();
		return {
			gestureFormat: `${sentenceCapitalize(
				string.slice(0, "swipe".length)
			)} ${string.slice("swipe".length)}`,
			iconFormatWithoutSpace: `${string
				.slice(0, "swipe".length)
				.toLowerCase()} ${string.slice("swipe".length).toLowerCase()}`,
			iconFormatWithSpace: `${string
				.slice(0, "swipe".length)
				.toLowerCase()} ${string.slice("swipe".length + 1).toLowerCase()}`,
		};
	} else {
		return "data unavailable";
	}
};

export const logsIconFinder = (array, gestureName) => {
	const icon = array
		.filter((item) => item.gestureName === gestureName)
		.map((item) => item.icon)[0];
	return icon;
};
