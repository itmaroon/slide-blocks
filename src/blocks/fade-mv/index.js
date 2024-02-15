import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import { ReactComponent as Fade } from './fade.svg';


registerBlockType(metadata.name, {

	description: __("This is a block that changes the main view while fading in and out.", 'itmar_mv_blocks'),
	icon: <Fade />,
	edit: Edit,
	save,
});
