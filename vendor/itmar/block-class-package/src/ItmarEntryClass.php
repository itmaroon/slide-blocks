<?php

namespace Itmar\BlockClassPakage;

class ItmarEntryClass
{
  function block_init($text_domain, $file_path)
  {
    //jsで使えるようにhome_urlをローカライズ
    $js_name = str_replace("-", "_", $text_domain);
    wp_enqueue_script('itmar-script-handle', plugins_url('', $file_path) . '/assets/block_handle.js', null, null, false);
    wp_localize_script('itmar-script-handle', $js_name, array(
      'home_url' => home_url(),
      'plugin_url' => plugins_url('', $file_path)
    ));

    //ブロックの登録
    $blocks_dir = plugin_dir_path($file_path) . 'build/blocks';
    if (is_dir($blocks_dir)) {
      // blocksフォルダが存在する場合、複数のブロックを登録
      foreach (glob($blocks_dir . '/*') as $block) {
        // ブロックの登録
        $block_type = register_block_type($block);
        // その後、このハンドルを使用してスクリプトの翻訳をセット
        if ($block_type instanceof \WP_Block_Type) {
          $block_handle = str_replace("/", "-", $block_type->name);
          // register_block_typeで生成されるハンドルを使用してスクリプトの翻訳をセット
          wp_set_script_translations($block_handle . '-editor-script', $text_domain, plugin_dir_path($file_path) . 'languages');
        }
      }
    } else {
      // blocksフォルダが存在しない場合、単一のブロックを登録
      $block = plugin_dir_path($file_path) . 'build';
      // ブロックの登録
      $block_type = register_block_type($block);

      // その後、このハンドルを使用してスクリプトの翻訳をセット
      if ($block_type instanceof \WP_Block_Type) {
        $block_handle = str_replace("/", "-", $block_type->name);
        // register_block_typeで生成されるハンドルを使用してスクリプトの翻訳をセット
        wp_set_script_translations($block_handle . '-editor-script', $text_domain, plugin_dir_path($file_path) . 'languages');
      }
    }



    //PHP用のテキストドメインの読込（国際化）
    load_plugin_textdomain($text_domain, false, basename(dirname($file_path)) . '/languages');
  }

  // 依存関係のチェック関数
  function check_dependencies($plugin_data, $plugin_slug)
  {
    include_once(ABSPATH . 'wp-admin/includes/plugin.php'); //is_plugin_active() 関数の使用

    $required_plugins = $plugin_slug; // 依存するプラグインのスラッグ
    $ret_obj = null; //インストールされているかの通知オブジェクト

    foreach ($required_plugins as $plugin) {
      $plugin_path = WP_PLUGIN_DIR . '/' . $plugin;
      if (!is_plugin_active($plugin . '/' . $plugin . '.php')) {
        if (file_exists($plugin_path)) {
          // プラグインはインストールされているが有効化されていない
          $plugin_file = $plugin . '/' . $plugin . '.php';
          $activate_url = wp_nonce_url(admin_url('plugins.php?action=activate&plugin=' . $plugin_file), 'activate-plugin_' . $plugin_file);
          $link = __("Activate Plugin", $plugin_data['TextDomain']);
          $message = $plugin_data['Name'] . ': ' . __("Required plugin is not active.", $plugin_data['TextDomain']) . "(" . $plugin . ")";
          $ret_obj = array("message" => $message, "link" => $link, "url" => $activate_url);
        } else {
          // プラグインがインストールされていない
          $install_url = admin_url('plugin-install.php?s=' . $plugin . '&tab=search&type=term');
          $link = __("Install Plugin", $plugin_data['TextDomain']);
          $message = $plugin_data['Name'] . ': ' . __("Required plugin is not installed.", $plugin_data['TextDomain']) . "(" . $plugin . ")";
          $ret_obj = array("message" => $message, "link" => $link, "url" => $install_url);
        }
        return $ret_obj;
      }
    }
    return $ret_obj;
  }

  //チェックしたプラグインが有効化されているかを判断する関数
  function activation_check($plugin_data, $plugin_slug)
  {
    $notice = $this->check_dependencies($plugin_data, $plugin_slug);

    if (!is_null($notice)) {
      // エラーメッセージ
      $message = $notice["message"] . $notice["link"];
      // プラグインへの戻るリンク
      $return_link = '<br><br><a href="' . esc_url(admin_url('plugins.php')) . '">' . __("Return to Plugins Setting", $plugin_data['TextDomain']) . '</a>';

      // wp_die関数でカスタムメッセージとリンクを表示
      wp_die($message . $return_link);
    }
  }

  //管理画面に通知を表示する関数
  function show_admin_dependency_notices($plugin_data, $pluin_slug)
  {
    $notice = $this->check_dependencies($plugin_data, $pluin_slug);
    if (!is_null($notice)) {
      echo '<div class="error"><p>' . esc_html($notice["message"]);
      echo '<a href="' . esc_url($notice["url"]) . '">' . esc_html($notice["link"]) . '</a></p></div>';
    }
  }

  //共通スタイルの読み込み
  function enqueueCommonStyles($filePath, $isEditor, $packageName)
  {
    $packageJsonPath = $filePath . '\package.json';

    if (file_exists($packageJsonPath)) {
      $packageJson = json_decode(file_get_contents($packageJsonPath), true);

      if (isset($packageJson['dependencies'][$packageName])) {
        $packageVersion = $packageJson['dependencies'][$packageName];
        $styleFiles = [];

        if ($isEditor) {
          $styleFiles = [
            'index.css' => 'itmar-block-packages-editor-style',
            'style-index.css' => 'itmar-block-packages-style',
          ];
        } else {
          $styleFiles = [
            'style-index.css' => 'itmar-block-packages-style',
          ];
        }

        foreach ($styleFiles as $file => $handle) {
          $stylePath = $filePath . '/node_modules/' . $packageName . '/build/' . $file;

          if (file_exists($stylePath)) {
            $relativeDir = substr($stylePath, strlen(ABSPATH));
            $styleUrl = home_url($relativeDir);
            wp_register_style(
              $handle,
              $styleUrl,
              [],
              $packageVersion
            );
            wp_enqueue_style($handle);
          }
        }
      }
    }
  }
}
