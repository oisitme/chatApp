export const getAvatarFallback = (name = "") => {
	const trimmedName = name.trim();
	if (!trimmedName) {
		return {
			initials: "?",
			background: "linear-gradient(135deg, #0f766e 0%, #0284c7 100%)",
		};
	}

	const parts = trimmedName.split(/\s+/).filter(Boolean);
	const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
	const palette = [
		["#0f766e", "#06b6d4"],
		["#1d4ed8", "#0ea5e9"],
		["#7c3aed", "#2563eb"],
		["#be123c", "#f97316"],
		["#15803d", "#0891b2"],
	];

	let hash = 0;
	for (const char of trimmedName) {
		hash = char.charCodeAt(0) + ((hash << 5) - hash);
	}

	const [from, to] = palette[Math.abs(hash) % palette.length];

	return {
		initials: initials || trimmedName[0].toUpperCase(),
		background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
	};
};
