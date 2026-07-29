import { useBlockProps } from "@wordpress/block-editor";

const removeStyledComponentClasses = (className = "") => {
	const classes = String(className).split(/\s+/).filter(Boolean);

	return classes
		.filter((classValue, index) => {
			if (/^sc-[a-zA-Z0-9]+$/.test(classValue)) return false;
			if (index > 0 && /^sc-[a-zA-Z0-9]+$/.test(classes[index - 1])) {
				return false;
			}
			return true;
		})
		.join(" ");
};

export default function save({ attributes }) {
	const { default_val, mobile_val, slide_settings } = attributes;
	const className = removeStyledComponentClasses(attributes.className);

	const blockProps = useBlockProps.save({
		className,
		"data-attributes": JSON.stringify(attributes),
	});

	return (
		<div {...blockProps}>
			<div id="mv-slider-area">
				<div
					id="mv-slider"
					className="mv-slider"
					data-default-media={JSON.stringify(default_val.media)}
					data-mobile-media={JSON.stringify(mobile_val.media)}
					data-slide-settings={JSON.stringify(slide_settings)}
				/>
			</div>
		</div>
	);
}
