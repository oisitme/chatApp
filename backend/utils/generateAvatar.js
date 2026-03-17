const avatarPalettes = {
	male: ["#0f766e", "#0284c7"],
	female: ["#be185d", "#7c3aed"],
	default: ["#1d4ed8", "#0ea5e9"],
};

const getInitials = (fullName = "", username = "") => {
	const source = fullName.trim() || username.trim() || "User";
	const parts = source.split(/\s+/).filter(Boolean);
	return parts
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join("");
};

const escapeXml = (value) =>
	value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const generateAvatar = ({ fullName, username, gender }) => {
	const initials = getInitials(fullName, username) || "U";
	const [from, to] = avatarPalettes[gender] || avatarPalettes.default;

	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" role="img" aria-label="${escapeXml(
			fullName || username || "User"
		)}">
			<defs>
				<linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stop-color="${from}" />
					<stop offset="100%" stop-color="${to}" />
				</linearGradient>
			</defs>
			<rect width="128" height="128" rx="32" fill="url(#avatarGradient)" />
			<text
				x="50%"
				y="50%"
				dominant-baseline="central"
				text-anchor="middle"
				font-family="Segoe UI, Arial, sans-serif"
				font-size="44"
				font-weight="700"
				fill="#ffffff"
			>
				${escapeXml(initials)}
			</text>
		</svg>
	`.trim();

	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};
