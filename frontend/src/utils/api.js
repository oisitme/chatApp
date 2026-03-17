const normalizeBaseUrl = (value) => (value ? value.replace(/\/+$/, "") : "");

export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);
export const SOCKET_URL = normalizeBaseUrl(import.meta.env.VITE_SOCKET_URL) || API_BASE_URL;

export const buildApiUrl = (path) => {
	if (!API_BASE_URL) return path;
	return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const apiFetch = (path, options = {}) =>
	fetch(buildApiUrl(path), {
		credentials: "include",
		...options,
	});
