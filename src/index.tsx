import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PlayerProvider } from "./context";
import * as Sentry from "@sentry/react";

Sentry.init({
	dsn: "https://27373f63518870e27311430b25ad64ae@o846950.ingest.us.sentry.io/4508999610335232",
});

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<PlayerProvider>
			<App />
		</PlayerProvider>
	</React.StrictMode>
);
