<?php

/**
 * Plugin Name:       Slide Blocks
 * Plugin URI:        https://itmaroon.net
 * Description:       This block allows you to control slide plugins and customize the slider.
 * Requires at least: 6.3
 * Requires PHP:      8.2.10
 * Version:           1.1.1
 * Author:            Web Creator ITmaroon
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       slide-blocks
 * Domain Path:       /languages
 * @package           itmar
 */

//PHPファイルに対する直接アクセスを禁止
if (!defined('ABSPATH')) exit;



// プラグイン情報取得に必要なファイルを読み込む
if (!function_exists('get_plugin_data')) {
	require_once(ABSPATH . 'wp-admin/includes/plugin.php');
}

//composerによるリモートリポジトリからの読み込みを要求
require_once __DIR__ . '\vendor\itmar\loader-package\src\register_autoloader.php';
$block_entry = new \Itmar\BlockClassPackage\ItmarEntryClass();

//ブロックの初期登録
add_action('init', function () use ($block_entry) {
	$plugin_data = get_plugin_data(__FILE__);
	$block_entry->block_init($plugin_data['TextDomain'], __FILE__);
});

// 依存するプラグインが有効化されているかのアクティベーションフック
register_activation_hook(__FILE__, function () use ($block_entry) {
	$plugin_data = get_plugin_data(__FILE__);
	$block_entry->activation_check($plugin_data, ['block-collections']); // ここでメソッドを呼び出し
});

// 管理画面での通知フック
add_action('admin_notices', function () use ($block_entry) {
	$plugin_data = get_plugin_data(__FILE__);
	$block_entry->show_admin_dependency_notices($plugin_data, ['block-collections']);
});

function itmar_slide_add_enqueue()
{
	//jquery-easingを読み込む
	if (!wp_script_is('itmar_jquery_easing', 'enqueued')) {
		wp_enqueue_script(
			'itmar_jquery_easing',
			plugins_url('assets/jquery.easing.min.js', __FILE__),
			array('jquery'),
			'1.0.0',
			array('in_footer'  => true)
		);
	}
	//vegasを読み込む
	if (!wp_script_is('itmar_vegas_js', 'enqueued')) {
		wp_enqueue_script(
			'itmar_vegas_js',
			plugins_url('assets/vegas.min.js', __FILE__),
			array('jquery'),
			'1.0.0',
			array('in_footer'  => true)
		);
	}

	if (!wp_style_is('itmar_vegas_css', 'enqueued')) {
		wp_enqueue_style('itmar_vegas_css', plugins_url('assets/vegas.min.css', __FILE__), array(), "1.0.0");
	}

	//swiperを読み込む
	if (!wp_script_is('itmar_swiper_js', 'enqueued')) {
		wp_enqueue_script(
			'itmar_swiper_js',
			plugins_url('assets/swiper-bundle.min.js', __FILE__),
			array('jquery'),
			'1.0.0',
			array('in_footer'  => true)
		);
	}

	if (!wp_style_is('itmar_swiper_css', 'enqueued')) {
		wp_enqueue_style('itmar_swiper_css', plugins_url('assets/swiper-bundle.min.css', __FILE__), array(), "1.0.0");
	}

	if (!is_admin()) {
		//独自jsのエンキュー
		$script_path = plugin_dir_path(__FILE__) . 'assets/slideBlocks.js';
		wp_enqueue_script(
			'itmar-slide-handle',
			plugins_url('/assets/slideBlocks.js', __FILE__),
			array('jquery', 'wp-i18n'),
			filemtime($script_path),
			true
		);
	}
}
add_action('enqueue_block_assets', 'itmar_slide_add_enqueue');
