import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

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

const getOrderedAttributes = (attributes, className) => {
	const {
		className: _className,
		swiper_id,
		relate_id,
		is_thumbnail,
		slideInfo,
		isFront,
		default_val,
		mobile_val,
		radius_slide,
		shadow_element,
		shadow_result,
		is_shadow,
		parallax_obj,
		...restAttributes
	} = attributes;

	return {
		...(className ? { className } : {}),
		swiper_id,
		relate_id,
		is_thumbnail,
		slideInfo,
		isFront,
		default_val,
		mobile_val,
		radius_slide,
		shadow_element,
		shadow_result,
		is_shadow,
		parallax_obj,
		...restAttributes,
	};
};

export default function save({ attributes }) {
	const {
		swiper_id,
		relate_id,
		is_thumbnail,
		slideInfo,
		parallax_obj,
	} = attributes;
	const className = removeStyledComponentClasses(attributes.className);
	const saveAttributes = getOrderedAttributes(attributes, className);

	const blockProps = useBlockProps.save({
		className,
		"data-attributes": JSON.stringify(saveAttributes),
	});

	return (
		<div className="itmar-slide-mv-style-root">
			<div {...blockProps}>
				<div
					className="swiper"
					data-swiper-id={swiper_id}
					data-relate-id={relate_id}
					data-thumb-flg={is_thumbnail}
					data-swiper-info={JSON.stringify(slideInfo)}
					data-parallax-option={JSON.stringify(parallax_obj)}
				>
					<div className="swiper-wrapper">
						<InnerBlocks.Content />
					</div>
				</div>
				<div className={`swiper-button-prev ${swiper_id}-prev`}></div>
				<div className={`swiper-button-next ${swiper_id}-next`}></div>
				<div className={`swiper-pagination ${swiper_id}-pagination`}></div>
				<div className={`swiper-scrollbar ${swiper_id}-scrollbar`}></div>
			</div>
		</div>
	);
}
