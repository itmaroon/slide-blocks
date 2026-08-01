import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

const removeStyledComponentClasses = (className = "") => {
	const classes = String(className).split(/\s+/).filter(Boolean);

	return classes
		.filter((classValue, index) => {
			if (/^sc-[a-zA-Z0-9]+$/.test(classValue)) return false;
			const prevClass = classes[index - 1];
			return !(prevClass && /^sc-[a-zA-Z0-9]+$/.test(prevClass));
		})
		.join(" ");
};

export default function save({ attributes }) {
	const { sourceType, default_val, mobile_val, choiceFields } = attributes;
	const className = removeStyledComponentClasses(attributes.className);

	const blockProps = useBlockProps.save({
		className,
		"data-attributes": JSON.stringify(attributes),
	});

	return (
		<div className="itmar-masonry-mv-style-root">
			<div {...blockProps}>
				<div
					className="itmar-masonry-grid"
					data-source-type={sourceType}
					data-default-media={JSON.stringify(default_val.media)}
					data-mobile-media={JSON.stringify(mobile_val.media)}
					data-default-columns={default_val.columns}
					data-mobile-columns={mobile_val.columns}
					data-choice-fields={JSON.stringify(choiceFields)}
				>
					<div className="itmar-masonry-sizer" />
				</div>

				<div className="itmar-masonry-inner-blocks">
					<InnerBlocks.Content />
				</div>
			</div>
		</div>
	);
}
