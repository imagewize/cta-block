/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks, ColorPalette, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const TEMPLATE = [
    ['core/spacer', { height: '60px' }],
    ['core/columns', { align: 'wide' }, [
        ['core/column', { width: '20%' }],
        ['core/column', { width: '60%' }, [
            ['core/heading', { 
                textAlign: 'center',
                content: 'We are here to help you. Let\'s talk.',
                fontSize: '3xl',
                style: {
                    typography: {
                        fontFamily: 'Open Sans, system-ui, -apple-system, sans-serif',
                        fontWeight: '700'
                    }
                }
            }],
            ['core/paragraph', {
                align: 'center',
                content: 'Went through it all here at Imagewize and curious? You have questions? A possible project you would like to discuss with us? Do now hesitate to hit us up!',
                fontSize: 'lg',
                style: {
                    typography: {
                        fontFamily: 'Open Sans, system-ui, -apple-system, sans-serif',
                        lineHeight: 1.6
                    }
                }
            }],
            ['core/buttons', { layout: { type: 'flex', justifyContent: 'center' } }, [
                ['core/button', {
                    width: 50,
                    style: {
                        border: { radius: '5px' },
                        spacing: { padding: { top: 'var:preset|spacing|40', bottom: 'var:preset|spacing|40' } }
                    }
                }]
            ]]
        ]],
        ['core/column', { width: '20%' }]
    ]],
    ['core/spacer', { height: '60px' }]
];

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    const { buttonHoverColor } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Button Settings', 'cta-block')}>
                    <ColorPalette
                        value={buttonHoverColor}
                        onChange={(color) => setAttributes({ buttonHoverColor: color })}
                        label={__('Button Hover Color', 'cta-block')}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <InnerBlocks
                    template={TEMPLATE}
                    templateLock="all"
                />
            </div>
        </>
    );
}
