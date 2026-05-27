import domReady from "@wordpress/dom-ready";
import { addAction, addFilter } from "@wordpress/hooks";
import { select, resolveSelect, dispatch } from "@wordpress/data";
import { store as editorStore } from "@wordpress/editor";
import { store as coreStore } from "@wordpress/core-data";

const TAXONOMY_SLUG = 'workflow_status';
const COMMENT_TYPE = 'mediapress_review';

domReady(() => {
    addAction('mediaPressReviews.reviewAdded', 'mediaPress/starterPlugin/updateWorkflowStatusAfterReview', updateWorkflowStatusAfterReview);
});

/**
 * Custom checklist check: block publishing if there are no approved reviews.
 *
 * Queries all top-level reviews for the current post and checks if at least
 * one has an 'approved' review status.
 */
addFilter('mediaPress.checklist.item', 'mediaPress/starterPlugin/checkApprovedReview', (item) => {
    if (item.name !== 'has_approved_review') {
        return item;
    }
    
    const postId = select(editorStore).getCurrentPostId();
    const reviews = select(coreStore).getEntityRecords('root', 'comment', {
        post: postId,
        type: COMMENT_TYPE,
        per_page: -1,
        parent: 0,
    });

    // If reviews haven't loaded yet, show as blocking until resolved.
    if (!reviews) {
        return {
            ...item,
            status: 'BLOCKING',
            message: 'Checking for approved reviews…',
        };
    }

    const approvedReviews = reviews.filter(
        (r) => r.mediapress_reviews_status === 'approved'
    );

    if (approvedReviews.length === 0) {
        return {
            ...item,
            status: 'BLOCKING',
            message: 'Must have at least one approved review',
        };
    }

    return {
        ...item,
        status: 'COMPLETED',
        message: 'Has at least one approved review',
    };
});

/**
 * Update the workflow status after a review is added.
 *
 * If the review is rejected, set the workflow status to 'requires-changes'.
 * If all top-level reviews are approved, set the workflow status to 'ready'.
 *
 * @param {Object} review The review comment object.
 */
async function updateWorkflowStatusAfterReview(review) {
    const reviewStatus = review.meta.mediapress_reviews_status;

    if (reviewStatus === 'rejected') {
        await setWorkflowStatusBySlug('requires-changes');
        return;
    }

    // Get all top-level reviews for this post.
    const postId = select(editorStore).getCurrentPostId();
    const reviews = await select(coreStore).getEntityRecords('root', 'comment', {
        post: postId,
        type: COMMENT_TYPE,
        per_page: -1,
        parent: 0,
    });

    if (!reviews || reviews.length === 0) {
        return;
    }

    // Check if all top-level reviews are approved.
    const allApproved = reviews.every(
        (r) => r.mediapress_reviews_status === 'approved'
    );

    if (allApproved) {
        setWorkflowStatusBySlug('approved');
    }

    return;
}

/**
 * Set the workflow status by term slug.
 *
 * Looks up the workflow_status taxonomy term by slug and stages the change
 * via editPost() so it appears immediately in the editor UI.
 *
 * @param {string} slug The workflow status term slug.
 */
async function setWorkflowStatusBySlug(slug) {
    const terms = await resolveSelect(coreStore).getEntityRecords('taxonomy', TAXONOMY_SLUG, {
        per_page: 100,
        slug,
    });

    console.log(terms);

    if (!terms || terms.length === 0) {
        return;
    }

    const term = terms[0];

    dispatch(editorStore).editPost({
        [TAXONOMY_SLUG]: [term.id],
    });
}
