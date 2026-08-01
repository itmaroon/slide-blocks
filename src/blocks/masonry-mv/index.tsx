import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";
import { __ } from "@wordpress/i18n";
/**
 * Internal dependencies
 */
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import { ReactComponent as Masonry } from "./masonry.svg";

registerBlockType(metadata.name, {
	description: __(
		"This is a block that changes the main view while fading in and out.",
		"slide-blocks",
	),
	icon: <Masonry />,
	edit: Edit,
	save,
});
