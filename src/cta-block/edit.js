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
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import './extends/button-hover-filter';

const TEMPLATE = [
    ['core/spacer', { height: '60px' }],
    ['core/columns', { align: 'wide' }, [
        ['core/column', { width: '20%' }],
        ['core/column', { width: '60%', layout: { type: 'constrained' } }, [
            ['core/heading', { 
                textAlign: 'center',
                content: 'We are here to help you. Let\'s talk.',
                fontSize: '3xl',
                textColor: 'white',
                style: {
                    typography: {
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
                        fontStyle: 'normal',
                        fontWeight: '700',
                        lineHeight: '1.2'
                    }
                }
            }],
            ['core/paragraph', {
                align: 'center',
                content: 'Went through it all here at Imagewize and curious? You have questions? A possible project you would like to discuss with us? Do now hesitate to hit us up!',
                fontSize: 'lg',
                textColor: 'white',
                style: {
                    typography: {
                        fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
                        lineHeight: '1.6'
                    },
                    layout: {
                        selfStretch: 'fixed',
                        flexSize: '70%'
                    }
                }
            }],
            ['core/buttons', { layout: { type: 'flex', justifyContent: 'center' } }, [
                ['core/button', {
                    content: 'Say Hi!',
                    width: 50,
                    style: {
                        typography: {
                            fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
                            lineHeight: '1.4'
                        },
                        border: { radius: '5px' },
                        spacing: { padding: { top: 'var:preset|spacing|40', bottom: 'var:preset|spacing|40' } }
                    },
                    backgroundColor: 'sky-700',
                    className: 'has-hover-background'
                }]
            ]]
        ]],
        ['core/column', { width: '20%' }]
    ]],
    ['core/spacer', { height: '60px' }]
];

export default function Edit({ attributes, setAttributes }) {
    const blockProps = useBlockProps();
    return (
        <div {...blockProps}>
            <InnerBlocks template={TEMPLATE} />
        </div>
    );
}
