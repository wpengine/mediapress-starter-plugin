<?php

/**
 * Class MediaPress_Starter_Plugin_Init
 */
class MediaPress_Starter_Plugin_Init {

    /**
     * Load config file for MediaPress Fields and MediaPress Checklist
     */
    public function __construct() {
        add_filter( 'mediapress_fields_config_path', [ $this, 'fields_config_path' ] );
        add_filter( 'mediapress_checklist_config_path', [ $this, 'checklist_config_path' ] );
    }

    /**
     * Filters the path to the fields config.
     *
     * @param string $path The path to the fields config.
     * @return string
     */
    public function fields_config_path( $path ) {
        return MEDIAPRESS_STARTER_PLUGIN_DIR . '/config/fields.json';
    }

    /**
     * Filters the path to the checklist config.
     *
     * @param string $path The path to the checklist config.
     * @return string
     */
    public function checklist_config_path( $path ) {
        return MEDIAPRESS_STARTER_PLUGIN_DIR . '/config/checklist.json';
    }
}
