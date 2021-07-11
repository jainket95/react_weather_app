import React from "react";
import { render } from "react-dom";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import App from "./App";
import theme from "./utils/theme";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import store from "./store";

const root = document.getElementById("root");
console.log(theme);

render(
	<Provider store={store}>
		<HashRouter basename="/">
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<SnackbarProvider maxSnack={3}>
					<App />
				</SnackbarProvider>
			</ThemeProvider>
		</HashRouter>
	</Provider>,
	root
);
