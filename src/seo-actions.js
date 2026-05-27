import domReady from "@wordpress/dom-ready";
import { addFilter } from "@wordpress/hooks";
import { dispatch } from "@wordpress/data";

const ITEM_NAMES = [
    'has_seo_headline',
    'seo_headline_length',
    'has_seo_description',
    'seo_description_length'
];

/**
 * Add actions onto SEO checks to open field groups in the meta panel
 */
addFilter('mediaPress.checklist.item', 'mediaPress/starterPlugin/addSeoTitleAction', (item) => {
    if ( ! ITEM_NAMES.includes(item.name) ) {
        return item;
    }

    if ( item.status === 'COMPLETED' ) {
        return item;
    }
    
    return {
        ...item,
        action: () => dispatch('mediapress/fields').openFieldGroup('seo'),
    };
});