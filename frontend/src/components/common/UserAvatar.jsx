import { useState } from "react";
import { getAvatarFallback } from "../../utils/avatar";

const UserAvatar = ({ src, name, alt, className = "", textClassName = "" }) => {
	const [hasError, setHasError] = useState(false);
	const fallback = getAvatarFallback(name);

	if (!src || hasError) {
		return (
			<div
				className={`flex items-center justify-center overflow-hidden ${className}`}
				style={{ background: fallback.background }}
				aria-label={alt || name}
			>
				<span className={`font-semibold text-white ${textClassName}`}>{fallback.initials}</span>
			</div>
		);
	}

	return (
		<img
			src={src}
			alt={alt || name}
			className={`object-cover ${className}`}
			onError={() => setHasError(true)}
		/>
	);
};

export default UserAvatar;
