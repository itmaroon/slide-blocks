import { useBlockProps } from "@wordpress/block-editor";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import { StyleComp } from "./StyleMasonry";

export default function save({ attributes }) {
	const { sourceType, default_val, mobile_val, choiceFields } = attributes;

	const blockProps = useBlockProps.save();

	//styled-componentsのHTML化
	const sheet = new ServerStyleSheet();
	const html = renderToString(
		sheet.collectStyles(<StyleComp attributes={attributes} />),
	);
	const styleTags = sheet.getStyleTags();
	// 正規表現で styled-components のクラス名を取得
	const classMatch = html.match(/class="([^"]+)"/);
	const className = classMatch ? classMatch[1] : "";

	return (
		<>
			<div className={className}>
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
				</div>
			</div>
			<div
				className="itmar_style_div"
				dangerouslySetInnerHTML={{ __html: styleTags }}
			/>
		</>
	);
}
