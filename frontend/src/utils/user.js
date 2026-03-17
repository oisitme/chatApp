export const normalizeUser = (user) => {
	if (!user || typeof user !== "object") return null;

	const username = typeof user.username === "string" ? user.username.trim() : "";
	const fullName = typeof user.fullName === "string" ? user.fullName.trim() : "";

	if (!username && !fullName) return null;

	return {
		...user,
		username: username || fullName.toLowerCase().replace(/\s+/g, ""),
		fullName: fullName || username || "User",
		profilePic: typeof user.profilePic === "string" ? user.profilePic : "",
	};
};
