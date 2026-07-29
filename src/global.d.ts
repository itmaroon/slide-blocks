declare module "@wordpress/*";
declare module "@wordpress/blocks";
declare module "@wordpress/block-editor";
declare module "@wordpress/components";
declare module "@wordpress/compose";
declare module "@wordpress/data";
declare module "@wordpress/element";
declare module "@wordpress/i18n";
declare module "itmar-block-packages";
declare module "styled-components";
declare module "swiper/swiper-bundle.css";
declare module "swiper";
declare module "swiper/modules";
declare module "react-dom/server";
declare module "*.svg" {
	const src: string;
	export default src;
	export const ReactComponent: any;
}
declare module "*.png" {
	const src: string;
	export default src;
}
declare module "*.scss";

declare const jQuery: any;
declare const wp: any;
declare const React: any;
declare const slide_blocks: any;

declare namespace JSX {
	interface IntrinsicElements {
		[elemName: string]: any;
	}
}
