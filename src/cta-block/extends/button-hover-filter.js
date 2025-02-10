import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls, PanelColorSettings, useSettings } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

// Add hover color attribute to button block
const addHoverColorAttribute = (settings, name) => {
    if (name !== 'core/button') return settings;

    return {
        ...settings,
        attributes: {
            ...settings.attributes,
            hoverBackgroundColor: {
                type: 'string',
                default: 'var(--wp--preset--color--sky-800)'
            }
        }
    };
};

/**
 * Add hover color control to button block
 */
const withHoverColorControl = createHigherOrderComponent((BlockEdit) => {
    return function WithHoverColorControl(props) {
        if (props.name !== 'core/button') {
            return <BlockEdit {...props} />;
        }

        const { attributes, setAttributes, clientId } = props;
        const [colors] = useSettings('color.palette');

        // Check if button is within our CTA block
        const parentClientId = wp.data.select('core/block-editor').getBlockParents(clientId);
        const parentBlock = wp.data.select('core/block-editor').getBlock(parentClientId[0]);
        if (!parentBlock || parentBlock.name !== 'imagewize/cta-block') {
            return <BlockEdit {...props} />;
        }

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls>
                    <PanelColorSettings
                        title={__('Button Hover Settings', 'cta-block')}
                        initialOpen={true}
                        colorSettings={[
                            {
                                value: attributes.hoverBackgroundColor,
                                onChange: (color) => setAttributes({ hoverBackgroundColor: color }),
                                label: __('Hover Background Color'),
                                colors,
                            }
                        ]}
                    />
                </InspectorControls>
            </>
        );
    };
}, 'withHoverColorControl');

// Add hover class and style to button block
const addHoverColorClass = (props, blockType) => {
    if (blockType.name !== 'core/button') return props;

    const { className, style, attributes } = props;
    if (!attributes?.hoverBackgroundColor) return props;

    // Clean up the color value and ensure proper format
    let hoverColor = attributes.hoverBackgroundColor;
    
    // If it's a theme color (not hex), format it properly
    if (!hoverColor.startsWith('#')) {
        // Remove any existing var() wrapper
        hoverColor = hoverColor.replace('var(--wp--preset--color--', '').replace(')', '');
        // Format as CSS variable
        hoverColor = `var(--wp--preset--color--${hoverColor})`;
    }

    return {
        ...props,
        className: `${className || ''} has-hover-background`,
        style: {
            ...style,
            '--wp--custom--button-hover-color': hoverColor
        }
    };
};

// Register filters
addFilter(
    'blocks.registerBlockType',
    'cta-block/add-hover-color-attribute',
    addHoverColorAttribute
);

addFilter(
    'editor.BlockEdit',
    'cta-block/add-hover-color-control',
    withHoverColorControl
);

addFilter(
    'blocks.getSaveContent.extraProps',
    'cta-block/add-hover-color-class',
    addHoverColorClass
);
