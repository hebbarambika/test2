// AdminContext.js
import { createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
	const [adminInfo, setAdminInfo] = useState(null);

	const setAdmin = (adminData) => {
		setAdminInfo(adminData);
	};

	return (
		<AdminContext.Provider value={{ adminInfo, setAdmin }}>
			{children}
		</AdminContext.Provider>
	);
};

export const useAdminContext = () => {
	return useContext(AdminContext);
};
