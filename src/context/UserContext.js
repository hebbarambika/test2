// UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

const useUserContext = () => {
	return useContext(UserContext);
};

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const login = (userData) => {
		setUser(userData);
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export { UserContext, useUserContext, UserProvider };
