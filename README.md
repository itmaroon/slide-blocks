# Slide Blocks

## 概要
このリポジトリはSlide BlocksというWordpressのプラグインのソースコードを含んでいます。
機能の概要は以下のとおりです。
- スライダーのプラグインであるVEGAS2とSWIPERをブロックのインターフェースを利用して操作し、Webサイトに表示するブロックを提供します。
- ブロックはVEGAS2の設定を操作し表示する`Fade MainVeiw`とSWIPERの設定を操作し表示する`Slide MainView`の２つのブロックがバンドルされています。
- `Fade MainVeiw`はWordPressのメディアライブラリから複数の画像を選択し、それらの画像を１枚づつ表示させます。そのときVEGAS2の多彩なエフェクトを演出させるようにブロックの操作で設定が可能です。
- `Slide MainView`はSWIPERのスライドとして[BLOCK COLLECTIONSプラグイン](https://ja.wordpress.org/plugins/block-collections/)の`Design Grorp`をセットするようになっています。したがって、画像だけでなく、文字や表といったコンテンツも、SWIPERのスライドとして多彩なエフェクトを演出しながら表示させることが可能です。


zipファイルをダウンロードしてWordpress管理画面からプラグインのインストールを行うとプラグインとして機能します。
このブロックを使用するには、[BLOCK COLLECTIONSプラグイン](https://ja.wordpress.org/plugins/block-collections/)がインストールされていることが必要です。

このプラグインをインストールすると次の２つのブロックが登録され、ブロックエディタでもサイトエディタで使用することができます（WordPress6.5.2で動作確認済み）。

以下各ブロックの機能の概要を説明します。
1. Fade MainVeiw
インスペクターからメディアライブラリ内の複数の画像を選択し、それをVEGASの各種エフェクトを演出させながら表示させます。  
画像は、デスクトップとモバイルで別々の画像をセットすることができるようになっています。

2. Slide MainView
インナーブロックとして[BLOCK COLLECTIONSプラグイン](https://ja.wordpress.org/plugins/block-collections/)のDesign Groupを配置します。  
すると、そのDesign GroupがSWIPERのswiper-slideとなって、SWIPERで可能なエフェクトを演出します。エフェクトはブロックのインスペクターから設定することができます。

## その他特筆事項
1. レスポンシブ対応が必要と思われるスタイル設定について、デスクトップモード（幅768px以上のデバイスでの表示）とモバイルモード（幅767px以下のデバイスでの表示）で、別々の設定が可能となっています。どちらの設定なのかは、ブロックエディタやサイトエディタで表示モードを切り替えたとき、サイドメニューの表示に「（デスクトップ）」、「（モバイル）」と表示されるようになっています。
なお、タブレット表示に関するレスポンシブには対応しておりません。
2. このプラグインは、[BLOCK COLLECTIONSプラグイン](https://ja.wordpress.org/plugins/block-collections/)に依存しています。このプラグインを使用するためには、インストールと有効化が必要です。
3. 文言等の表示に関しては、WordPressの国際化関数による設定を行っていますので、多国籍の言語表示が可能です。現時点においては英語と日本語表記が可能となっています。
4. このプラグインはPHPのクラスモジュール利用のため、作者がPackagistに公開している`block-class-package`を使用しています。  
[GitHub](https://github.com/itmaroon/block-class-package)  
[Packagist](https://packagist.org/packages/itmar/block-class-package) 
5. このプラグインはJavaScriptのコンポーネント、関数を利用するため、作者が公開している`itmar-block-packages`を使用しています。  
[npm](https://www.npmjs.com/package/itmar-block-packages)  
[GitHub](https://github.com/itmaroon/itmar-block-packages)

## 留意事項
1. Fade MainVeiwブロックでは、VEGAS2を使用しています。ライセンス等については、次の利用規約にしたがってください。  
[Vegas – Backgrounds and Slideshows](https://github.com/jaysalvat/vegas)  
なお、2024/4/29現在で、このプラグインはv.2.5.4をダウンロードして利用しています。
2. Slide MainViewブロックでは、SWIPERを使用しています。利用規約等については、次のページに記載されています。  
[Swiper](https://github.com/nolimits4web/swiper)  
なお、2024/4/29現在で、このプラグインはv.11.0.7をダウンロードして利用しています。
