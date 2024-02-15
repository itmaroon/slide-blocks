<?php
/**
 * Plugin Name:       Slide Blocks
 * Plugin URI:        https://itmaroon.net
 * Description:       This block allows you to control slide plugins and customize the slider.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Web Creator ITmaroon
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       slide-blocks
 *
 * @package           itmar
 */

if ( ! defined( 'ABSPATH' ) ) exit;

//composerによるリモートリポジトリからの読み込みを要求
require_once __DIR__ . '/vendor/autoload.php';

$block_entry = new \Itmar\BlockClassPakage\ItmarEntryClass();

//ブロックの初期登録
add_action( 'init', function() use ($block_entry ) {
  $text_domain = 'slide-blocks'; // ここで引数を設定
  $block_entry->block_init($text_domain, __FILE__);
});

function itmar_slide_add_enqueue() {
	//jquery-easingを読み込む
	if (!wp_script_is('itmar_jquery_easing', 'enqueued')) {
		wp_enqueue_script( 'itmar_jquery_easing', plugins_url('assets/jquery.easing.min.js', __FILE__ ), array('jquery' ), true );
	}
	//vegasを読み込む
	if (!wp_script_is('itmar_vegas_js', 'enqueued')) {
		wp_enqueue_script('itmar_vegas_js', plugins_url('assets/vegas.min.js', __FILE__ ), array('jquery'), true);
	}
	
	if (!wp_style_is('itmar_vegas_css', 'enqueued')) {
			wp_enqueue_style('itmar_vegas_css', plugins_url('assets/vegas.min.css', __FILE__));
	}

	//swiperを読み込む
	if (!wp_script_is('itmar_swiper_js', 'enqueued')) {
		wp_enqueue_script('itmar_swiper_js', plugins_url('assets/swiper-bundle.min.js', __FILE__ ), array('jquery'), true);
	}
	
	if (!wp_style_is('itmar_swiper_css', 'enqueued')) {
			wp_enqueue_style('itmar_swiper_css', plugins_url('assets/swiper-bundle.min.css', __FILE__));
	}

	if(!is_admin()){
		//独自jsのエンキュー
		$script_path = plugin_dir_path(__FILE__) . 'assets/slideBlocks.js';
		wp_enqueue_script(
			'itmar-script-handle',
			plugins_url('/assets/slideBlocks.js', __FILE__),
			array('jquery','wp-i18n'),
			filemtime($script_path),
			true
		);
	}
}
add_action('enqueue_block_assets', 'itmar_slide_add_enqueue');

