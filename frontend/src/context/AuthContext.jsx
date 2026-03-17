import { createContext, useContext, useState } from "react";
import { normalizeUser } from "../utils/user";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
	return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
	const [authUser, setAuthUserState] = useState(() => normalizeUser(JSON.parse(localStorage.getItem("chat-user"))));

	const setAuthUser = (user) => {
		const normalizedUser = normalizeUser(user);
		setAuthUserState(normalizedUser);

		if (normalizedUser) {
			localStorage.setItem("chat-user", JSON.stringify(normalizedUser));
			return;
		}

		localStorage.removeItem("chat-user");
	};

	return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
};
