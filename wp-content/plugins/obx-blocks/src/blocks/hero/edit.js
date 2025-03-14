/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    MediaUpload,
    InspectorControls,
    ColorPalette,
    BlockControls,
    AlignmentToolbar,
    BlockAlignmentToolbar,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    TextControl,
    RangeControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Edit function for the Hero block
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        title,
        primaryButtonText,
        primaryButtonUrl,
        secondaryButtonText,
        secondaryButtonUrl,
        backgroundImageUrl,
        backgroundImageId,
        backgroundImageAlt,
        overlayColor,
        overlayOpacity,
        textColor,
        align,
        textAlign,
        content,
        contentWidth,
    } = attributes;

    const blockProps = useBlockProps({
        className: `obx-hero align${align || 'none'} ${backgroundImageUrl ? 'has-background-image' : ''}`,
        style: {
            color: textColor || '#23282d',
        },
    });

    const backgroundStyles = {
        backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    const overlayStyles = {
        backgroundColor: overlayColor,
        backdropFilter: 'blur(4px)',
    };

    return (
        <>
            <BlockControls>
                <BlockAlignmentToolbar
                    value={align}
                    onChange={(newAlign) => setAttributes({ align: newAlign })}
                    controls={['wide', 'full']}
                />
                <AlignmentToolbar
                    value={textAlign}
                    onChange={(newAlign) => setAttributes({ textAlign: newAlign })}
                />
            </BlockControls>
            
            <InspectorControls>
                <PanelBody title={__('Hero Settings', 'obx-blocks')}>
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Text Color', 'obx-blocks')}
                        </label>
                        <ColorPalette
                            value={textColor}
                            onChange={(color) => setAttributes({ textColor: color || '#23282d' })}
                        />
                    </div>
                    <div className="editor-post-featured-image">
                        <MediaUpload
                            onSelect={(media) => setAttributes({ backgroundImage: media })}
                            allowedTypes={['image']}
                            value={backgroundImageId}
                            render={({ open }) => (
                                <Button
                                    className={backgroundImageId ? 'editor-post-featured-image__preview' : 'editor-post-featured-image__toggle'}
                                    onClick={open}
                                >
                                    {backgroundImageId ? (
                                        <img src={backgroundImageUrl} alt={backgroundImageAlt} />
                                    ) : (
                                        __('Set background image', 'obx-blocks')
                                    )}
                                </Button>
                            )}
                        />
                        {backgroundImageId && (
                            <Button
                                onClick={() => setAttributes({ backgroundImage: {} })}
                                isDestructive
                            >
                                {__('Remove background image', 'obx-blocks')}
                            </Button>
                        )}
                    </div>
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Overlay Color', 'obx-blocks')}
                        </label>
                        <ColorPalette
                            value={overlayColor}
                            onChange={(color) => setAttributes({ overlayColor: color })}
                        />
                    </div>
                </PanelBody>
                <PanelBody title={__('Content Settings', 'obx-blocks')}>
                    <RangeControl
                        label={__('Content Width (%)', 'obx-blocks')}
                        value={contentWidth}
                        onChange={(value) => setAttributes({ contentWidth: value })}
                        min={30}
                        max={100}
                        step={5}
                        help={__('Width of content area on desktop. Mobile will always be 100%.', 'obx-blocks')}
                    />
                </PanelBody>
                <PanelBody title={__('Button Settings', 'obx-blocks')}>
                    <TextControl
                        label={__('Primary Button Text', 'obx-blocks')}
                        value={primaryButtonText}
                        onChange={(value) => setAttributes({ primaryButtonText: value })}
                    />
                    <TextControl
                        label={__('Primary Button URL', 'obx-blocks')}
                        value={primaryButtonUrl}
                        onChange={(value) => setAttributes({ primaryButtonUrl: value })}
                    />
                    <TextControl
                        label={__('Secondary Button Text', 'obx-blocks')}
                        value={secondaryButtonText}
                        onChange={(value) => setAttributes({ secondaryButtonText: value })}
                    />
                    <TextControl
                        label={__('Secondary Button URL', 'obx-blocks')}
                        value={secondaryButtonUrl}
                        onChange={(value) => setAttributes({ secondaryButtonUrl: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="obx-hero__background" style={backgroundStyles}>
                    <div className="obx-hero__overlay" style={overlayStyles}></div>
                </div>
                <div 
                    className={`obx-hero__content text-${textAlign || 'center'}`} 
                    style={{ 
                        textAlign,
                        maxWidth: `${contentWidth}%`
                    }}>
                    <RichText
                        tagName="h1"
                        className="obx-hero__title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder={__('Add title...', 'obx-blocks')}
                        style={{ color: textColor }}
                    />
                    <RichText
                        tagName="p"
                        className="obx-hero__text"
                        value={content}
                        onChange={(value) => setAttributes({ content: value })}
                        placeholder={__('Add content...', 'obx-blocks')}
                        style={{ color: textColor }}
                    />
                    <div className="obx-hero__buttons">
                        {primaryButtonText && (
                            <div className="wp-block-button">
                                <RichText
                                    tagName="a"
                                    className="wp-block-button__link obx-button"
                                    value={primaryButtonText}
                                    onChange={(value) => setAttributes({ primaryButtonText: value })}
                                    placeholder={__('Add text...', 'obx-blocks')}
                                />
                            </div>
                        )}
                        {secondaryButtonText && (
                            <div className="wp-block-button">
                                <RichText
                                    tagName="a"
                                    className="wp-block-button__link obx-button obx-button-ghost"
                                    value={secondaryButtonText}
                                    onChange={(value) => setAttributes({ secondaryButtonText: value })}
                                    placeholder={__('Add text...', 'obx-blocks')}
                                    style={{ 
                                        backgroundColor: 'transparent',
                                        color: 'white',
                                        border: '1px solid white'
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
} 