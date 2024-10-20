import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tasks from "./components/Task";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./App.css"; // Import the CSS file

function App() {
	const [token, setToken] = useState(null); // Token from login
	const [userData, setUserData] = useState(null); // Data from login
	const [isDarkMode, setIsDarkMode] = useState(true); // State for theme

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<div className={isDarkMode ? "App dark-mode" : "App light-mode"}>
			<Router>
				<Routes>
					<Route path="/" element={<Login setToken={setToken} setUserData={setUserData} />}/>
					<Route path="/login" element={<Login setToken={setToken} setUserData={setUserData} />}/>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/tasks" element={ <Tasks token={token} setToken={setToken} userData={userData} />}/>
				</Routes>
			</Router>
			<footer className="footer">
				<button className="theme-toggle" onClick={toggleTheme}>
					{isDarkMode ? "Light Mode" : "Dark Mode"}
				</button>
			</footer>
		</div>
	);
}

export default App;
