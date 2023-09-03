import PropTypes from "prop-types";

export default function Divider({ className, text }) {
	return (
		<div
			className={`flex items-center gap-2 w-full after:content-[''] after:w-full after:h-px after:bg-slate-300 before:content-[''] before:w-full before:h-px before:bg-slate-300 ${className}`}
		>
			<span className="inline-block">{text}</span>
		</div>
	);
}

Divider.propTypes = {
	text: PropTypes.string,
	className: PropTypes.string,
};
