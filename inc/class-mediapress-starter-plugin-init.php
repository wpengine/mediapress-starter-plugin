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
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ], 1 );
		add_action('added_comment_meta', [$this, 'update_workflow_status_on_review'], 10, 4);
		add_action('wp_after_insert_post', [$this, 'update_workflow_status_on_publish'], 10, 4);
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

    /**
	 * Enqueue block editor assets.
	 *
	 * @return void
	 */
	public function enqueue_block_editor_assets(): void {
		$block_editor_asset_file = include self::get_dir() . '/build/index.asset.php';

		wp_enqueue_script(
			'mediapress-starter-plugin',
			self::get_url() . '/build/index.js',
			$block_editor_asset_file['dependencies'],
			$block_editor_asset_file['version'],
			true,
		);
	}

	/**
     * Update the workflow status when review_status meta is added to a review comment.
     *
     * If the review is rejected, set the workflow status to 'requires-changes'.
     * If all top-level reviews are approved, set the workflow status to 'ready'.
     *
     * @param int    $meta_id    The meta ID.
     * @param int    $comment_id The comment ID.
     * @param string $meta_key   The meta key.
     * @param mixed  $meta_value The meta value.
     * @return void
     */
    public function update_workflow_status_on_review( $meta_id, $comment_id, $meta_key, $meta_value ): void {
        if ( 'review_status' !== $meta_key ) {
            return;
        }

        $comment = get_comment( $comment_id );

        if ( ! $comment || 'mediapress_review' !== $comment->comment_type ) {
            return;
        }

        $post_id = (int) $comment->comment_post_ID;

        if ( 'rejected' === $meta_value ) {
            $this->set_workflow_status( $post_id, 'requires-changes' );
            return;
        }

        if ( 'approved' === $meta_value ) {
            // Get all top-level reviews for this post.
            $reviews = get_comments(
                [
                    'post_id' => $post_id,
                    'type'    => 'mediapress_review',
                    'parent'  => 0,
                ]
            );

            if ( empty( $reviews ) ) {
                return;
            }

            // Check if all top-level reviews are approved.
            $all_approved = true;
            foreach ( $reviews as $review ) {
                $status = get_comment_meta( $review->comment_ID, 'review_status', true );
                if ( 'approved' !== $status ) {
                    $all_approved = false;
                    break;
                }
            }

            if ( $all_approved ) {
                $this->set_workflow_status( $post_id, 'approved' );
            }
        }
    }

    /**
     * Update the workflow status when a post is published.
     *
     * Uses the wp_after_insert_post hook which fires after all related updates
     * (meta, terms, etc.) have been completed, ensuring the workflow status
     * is not overridden by the REST API taxonomy save.
     *
     * @param int          $post_id     The post ID.
     * @param WP_Post      $post        The post object.
     * @param bool         $update      Whether this is an update to an existing post.
     * @param WP_Post|null $post_before The post object before the update, or null for new posts.
     * @return void
     */
    public function update_workflow_status_on_publish( $post_id, $post, $update, $post_before ): void {
        if ( 'publish' !== $post->post_status ) {
            return;
        }

        if ( $post_before && 'publish' === $post_before->post_status ) {
            return;
        }

        $this->set_workflow_status( $post_id, 'published' );
    }

	/**
	 * Set the workflow status taxonomy term for a post.
	 *
	 * @param int    $post_id The post ID.
	 * @param string $slug    The workflow status term slug.
	 * @return void
	 */
	private function set_workflow_status( $post_id, $slug ): void {
		$term = get_term_by( 'slug', $slug, 'workflow_status' );

		if ( ! $term || is_wp_error( $term ) ) {
			return;
		}

		wp_set_object_terms( $post_id, [ $term->term_id ], 'workflow_status' );
	}

	/**
	 * Get the plugin directory.
	 *
	 * @return string
	 */
	public static function get_dir() {
		return rtrim( dirname( __DIR__ ), '/' );
	}

	/**
	 * Get the plugin url.
	 *
	 * @return string
	 */
	public static function get_url() {
		return rtrim( plugin_dir_url( __DIR__ ), '/' );
	}

}
