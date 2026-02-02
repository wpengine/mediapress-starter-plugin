<?php
/**
 * Plugin Name:       MediaPress Starter Plugin
 * Plugin URI:        https://media.press
 * Description:       Demonstrates how to configure and extend MediaPress.
 * Version:           1.0.0
 * Author:            WP Engine
 * Author URI:        https://wpengine.com
 * License:           GPLv2 or later
 */

define( 'MEDIAPRESS_STARTER_PLUGIN_DIR', dirname( __FILE__ ) );

require_once __DIR__ . '/inc/class-mediapress-starter-plugin-init.php';

new MediaPress_Starter_Plugin_Init();
