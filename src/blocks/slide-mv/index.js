import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
//import BlockEditWrapper from '../BlockEditWrapper'
import { BlockEditWrapper } from "itmar-block-packages";
//import Edit from './edit';
import save from "./save";
import metadata from "./block.json";
import { ReactComponent as Slide } from "./slide.svg";

const LazyEditComponent = React.lazy(() => import("./edit"));
const BlockEdit = (props) => {
	return <BlockEditWrapper lazyComponent={LazyEditComponent} {...props} />;
};

registerBlockType(metadata.name, {
	description: __(
		"This is a block that switches the main view by sliding.",
		"slide-blocks",
	),
	icon: <Slide />,
	edit: BlockEdit,
	save,
});
