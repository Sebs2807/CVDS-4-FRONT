import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tasks from "./components/Task";
import Analytics from "./components/analytics";

function App() {
	return (
		<Router>
			<div className="Task">
				<header className="Task Manager">
					<Routes>
						<Route path="/" element={<Tasks />} />
						<Route path="/analytics" element={<Analytics />} />
					</Routes>
				</header>
			</div>
		</Router>
	);
}

export default App;
