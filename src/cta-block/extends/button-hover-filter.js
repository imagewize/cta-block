import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { 
    InspectorControls,
    __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
    __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
    getColorObjectByColorValue
} from '@wordpress/block-editor';
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
                default: '#075985'
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
        const colorSettings = useMultipleOriginColorsAndGradients();

        // Check if button is within our CTA block
        const parentClientId = wp.data.select('core/block-editor').getBlockParents(clientId);
        const parentBlock = wp.data.select('core/block-editor').getBlock(parentClientId[0]);
        if (!parentBlock || parentBlock.name !== 'imagewize/cta-block') {
            return <BlockEdit {...props} />;
        }

        return (
            <>
                <BlockEdit {...props} />
                <InspectorControls group="color">
                    <ColorGradientSettingsDropdown
                        __experimentalIsRenderedInSidebar
                        settings={[
                            {
                                colorValue: attributes.hoverBackgroundColor,
                                onColorChange: (color) => {
                                    setAttributes({ hoverBackgroundColor: color });
                                },
                                label: __('Hover Background'),
                                enableAlpha: true,
                                contrastChecks: [],
                            }
                        ]}
                        panelId={clientId}
                        {...colorSettings}
                        gradients={[]}
                        disableCustomGradients={true}
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

    // Get the hover color
    const hoverColor = attributes.hoverBackgroundColor;

    return {
        ...props,
        className: `${className || ''} has-hover-background`,
        style: {
            ...style,
            '--button-hover-background': hoverColor
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
