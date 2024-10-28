import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tasks from "./components/Task";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Analytics from "./components/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";
import NotAuthorized from "./components/NotAuthorized";
import "./styles/App.css"; // Import the CSS file

function App() {
	const [token, setToken] = useState(null); // Token from login
	const [userData, setUserData] = useState(null); // Data from login
	const [isDarkMode, setIsDarkMode] = useState(true); // State for theme
	const [roles, setRoles] = useState([]);
	
	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	useEffect(() => {
		const fetchRoles = async () => {
			try {
				const response = await fetch(`https://localhost:8443/auth/roles/${userData?.userName}`, {
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				});
				if (!response.ok) {
					throw new Error(`Error: ${response.status}`);
				}
				const data = await response.json();
				setRoles(data);
			} catch (error) {
				console.error("Error fetching roles:", error);
			}
		};
	
		if (userData && token) {
			fetchRoles();
		}
	}, [userData, token]);
	
	return (
		<div className={isDarkMode ? "App dark-mode" : "App light-mode"}>
			<Router>
				<Routes>
					<Route path="/not-authorized" element={<NotAuthorized />} />
					<Route path="/" element={<Login setToken={setToken} setUserData={setUserData} setRoles={setRoles}/>} />
					<Route path="/login" element={<Login setToken={setToken} setUserData={setUserData} setRoles={setRoles}/>} />
					<Route path="/signup" element={<SignUp />} />
					{/* Rutas protegidas para usuarios con ROLE_USER o ROLE_ADMIN */}
					<Route
						element={
							<ProtectedRoute
								roles={["ROLE_USER", "ROLE_ADMIN"]}
								userRoles={roles} 
								token={token}
								setToken={setToken}
								userData={userData}
							/>
						}
					>
						<Route path="/tasks" element={<Tasks />} />
					</Route>


					{/* Rutas protegidas solo para usuarios con ROLE_ADMIN */}
					<Route
						element={
							<ProtectedRoute
								roles={["ROLE_ADMIN"]}
								userRoles={roles} 
								token={token}
								setToken={setToken}
								userData={userData}
							/>
						}
					>
						<Route path="/analytics" element={<Analytics />} />
					</Route>
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
