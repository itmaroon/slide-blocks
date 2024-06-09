=== Slide Blocks ===
Contributors:      Web Creator ITmaroon
Tags:              block, swiper, vegas, slider ,carousel
Requires at least: 6.3
Tested up to:      6.5.4
Stable tag:        1.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html
Requires PHP: 8.1.22

This block allows you to control slide plugins and customize the slider.

== Related Links ==

* [Github](https://github.com/itmaroon/slide-blocks)
* [source code](https://github.com/itmaroon/slide-blocks/tree/master)
* [block-class-package:GitHub](https://github.com/itmaroon/block-class-package)  
* [block-class-package:Packagist](https://packagist.org/packages/itmar/block-class-package) 
* [itmar-block-packages:npm](https://www.npmjs.com/package/itmar-block-packages)  
* [itmar-block-packages:GitHub](https://github.com/itmaroon/itmar-block-packages)

== Description ==

An overview of the features is below.
- Operate the slider plugins VEGAS2 and SWIPER using the block interface and provide blocks to display on the website.
- Two blocks are bundled: `Fade MainView` which operates and displays VEGAS2 settings and `Slide MainView` which operates and displays SWIPER settings.
- `Fade MainView` selects multiple images from the WordPress media library and displays them one by one. At that time, settings can be made by operating blocks to produce a variety of VEGAS2 effects.
- `Slide MainView` is set to `Design Grorp` of [BLOCK COLLECTIONS plugin](https://ja.wordpress.org/plugins/block-collections/) as the SWIPER slide. Therefore, not only images, but also content such as text and tables can be displayed as SWIPER slides with a variety of effects.

== Installation ==

1. From the WP admin panel, click “Plugins” -> “Add new”.
2. In the browser input box, type “Block Collections”.
3. Select the “Block Collections” plugin and click “Install”.
4. Activate the plugin.

OR…

1. Download the plugin from this page.
2. Save the .zip file to a location on your computer.
3. Open the WP admin panel, and click “Plugins” -> “Add new”.
4. Click “upload”.. then browse to the .zip file downloaded from this page.
5. Click “Install”.. and then “Activate plugin”.


== Frequently Asked Questions ==



== Screenshots ==
1. Fade slide of Vegas2 created with Fade MainView
2. A Swiper thumbnail-linked slide created with Slide MainView
3. A cube-shaped slide by Swiper created with Slide MainView
4. Swiper cover flow slide created with Slide MainView

== Changelog ==

= 0.1.0 =
* Release

== Arbitrary section ==
1. Style settings that may require responsive support can be set separately for desktop mode (displayed on devices with a width of 768px or more) and mobile mode (displayed on devices with a width of 767px or less). To tell which setting is set, when you switch the display mode in the block editor or site editor, "(Desktop)" and "(Mobile)" will be displayed in the side menu display.
Please note that responsiveness for tablet display is not supported.
2. This plugin depends on the [BLOCK COLLECTIONS plugin](https://ja.wordpress.org/plugins/block-collections/). This plugin requires installation and activation in order to use it.
3. Regarding the display of text, etc., settings are made using WordPress's internationalization function, so it is possible to display text in multiple national languages. Currently, English and Japanese notation is possible.
4. The Fade MainVeiw block uses VEGAS2. Regarding licenses, etc., please follow the following terms of use.
[Vegas – Backgrounds and Slideshows](https://github.com/jaysalvat/vegas)
As of April 29, 2024, this plugin has been downloaded and used v.2.5.4.
5. The Slide MainView block uses SWIPER. Terms and conditions are listed on the next page.
[Swiper](https://github.com/nolimits4web/swiper)
As of May 22, 2024, this plugin has been downloaded and is using v.11.1.3.
6. PHP class management is now done using Composer.  
[GitHub](https://github.com/itmaroon/block-class-package)  
[Packagist](https://packagist.org/packages/itmar/block-class-package)
As of May 22, 2024, this plugin has been downloaded and is using v.1.1.1. 
7. I decided to make functions and components common to other plugins into npm packages, and install and use them from npm.  
[npm](https://www.npmjs.com/package/itmar-block-packages)  
[GitHub](https://github.com/itmaroon/itmar-block-packages)

