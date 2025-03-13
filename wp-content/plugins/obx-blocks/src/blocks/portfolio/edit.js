/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    ColorPalette,
    MediaUpload,
    MediaUploadCheck,
    BlockControls,
    BlockAlignmentToolbar,
    AlignmentToolbar,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    BaseControl,
    RangeControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { plus, trash } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Edit function for the Portfolio block
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        tagline,
        heading,
        portfolioItems,
        backgroundColor,
        textColor,
        accentColor,
        align,
        textAlign,
        contentWidth,
    } = attributes;

    const [activeItem, setActiveItem] = useState(null);

    const blockProps = useBlockProps({
        className: `obx-portfolio align${align || 'none'} text-${textAlign || 'center'}`,
        style: {
            backgroundColor,
            color: textColor,
        },
    });

    const addPortfolioItem = () => {
        const newItems = [...portfolioItems];
        newItems.push({
            id: `portfolio-${Date.now()}`,
            imageUrl: '',
            imageId: 0,
            imageAlt: '',
            name: '',
            description: '',
        });
        setAttributes({ portfolioItems: newItems });
    };

    const removePortfolioItem = (index) => {
        const newItems = [...portfolioItems];
        newItems.splice(index, 1);
        setAttributes({ portfolioItems: newItems });
        setActiveItem(null);
    };

    const updatePortfolioItem = (index, property, value) => {
        const newItems = [...portfolioItems];
        newItems[index] = {
            ...newItems[index],
            [property]: value,
        };
        setAttributes({ portfolioItems: newItems });
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
                <PanelBody title={__('Portfolio Settings', 'obx-blocks')}>
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Background Color', 'obx-blocks')}
                        </label>
                        <ColorPalette
                            value={backgroundColor}
                            onChange={(color) => setAttributes({ backgroundColor: color })}
                        />
                    </div>
                    
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Text Color', 'obx-blocks')}
                        </label>
                        <ColorPalette
                            value={textColor}
                            onChange={(color) => setAttributes({ textColor: color })}
                        />
                    </div>
                    
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Accent Color', 'obx-blocks')}
                        </label>
                        <ColorPalette
                            value={accentColor}
                            onChange={(color) => setAttributes({ accentColor: color })}
                        />
                    </div>
                </PanelBody>
                
                <PanelBody title={__('Content Settings', 'obx-blocks')}>
                    <RangeControl
                        label={__('Content Width (%)', 'obx-blocks')}
                        value={contentWidth}
                        onChange={(value) => setAttributes({ contentWidth: value })}
                        min={50}
                        max={100}
                        step={5}
                        help={__('Controls the width of the content container on desktop. Mobile will always be 100%.', 'obx-blocks')}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div className="obx-portfolio__container" style={{ maxWidth: `${contentWidth}%` }}>
                    <div className="obx-portfolio__header" style={{ textAlign }}>
                        <RichText
                            tagName="div"
                            className="obx-portfolio__tagline"
                            value={tagline}
                            onChange={(value) => setAttributes({ tagline: value })}
                            placeholder={__('OUR PORTFOLIO', 'obx-blocks')}
                        />
                        <RichText
                            tagName="h2"
                            className="obx-portfolio__heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Check out our latest work', 'obx-blocks')}
                            style={{ 
                                backgroundImage: accentColor ? `linear-gradient(transparent 60%, ${accentColor} 60%)` : 'none' 
                            }}
                        />
                    </div>
                    
                    <div className="obx-portfolio__items">
                        {portfolioItems.map((item, index) => (
                            <div 
                                key={item.id} 
                                className={`obx-portfolio__item ${activeItem === index ? 'is-selected' : ''}`}
                                onClick={() => setActiveItem(index)}
                            >
                                <div className="obx-portfolio__item-image-container">
                                    {item.imageUrl ? (
                                        <img 
                                            src={item.imageUrl} 
                                            alt={item.imageAlt} 
                                            className="obx-portfolio__item-image"
                                        />
                                    ) : (
                                        <div className="obx-portfolio__item-image-placeholder">
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    onSelect={(media) => {
                                                        updatePortfolioItem(index, 'imageUrl', media.url);
                                                        updatePortfolioItem(index, 'imageId', media.id);
                                                        updatePortfolioItem(index, 'imageAlt', media.alt || '');
                                                    }}
                                                    allowedTypes={['image']}
                                                    value={item.imageId}
                                                    render={({ open }) => (
                                                        <Button
                                                            onClick={open}
                                                            className="obx-portfolio__item-image-button"
                                                        >
                                                            {__('Add Image', 'obx-blocks')}
                                                        </Button>
                                                    )}
                                                />
                                            </MediaUploadCheck>
                                        </div>
                                    )}
                                    {item.imageUrl && (
                                        <div className="obx-portfolio__item-image-actions">
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    onSelect={(media) => {
                                                        updatePortfolioItem(index, 'imageUrl', media.url);
                                                        updatePortfolioItem(index, 'imageId', media.id);
                                                        updatePortfolioItem(index, 'imageAlt', media.alt || '');
                                                    }}
                                                    allowedTypes={['image']}
                                                    value={item.imageId}
                                                    render={({ open }) => (
                                                        <Button
                                                            onClick={open}
                                                            variant="secondary"
                                                            isSmall
                                                        >
                                                            {__('Replace', 'obx-blocks')}
                                                        </Button>
                                                    )}
                                                />
                                            </MediaUploadCheck>
                                            <Button
                                                onClick={() => {
                                                    updatePortfolioItem(index, 'imageUrl', '');
                                                    updatePortfolioItem(index, 'imageId', 0);
                                                    updatePortfolioItem(index, 'imageAlt', '');
                                                }}
                                                variant="secondary"
                                                isSmall
                                                isDestructive
                                            >
                                                {__('Remove', 'obx-blocks')}
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <div className="obx-portfolio__item-content">
                                    <RichText
                                        tagName="h3"
                                        className="obx-portfolio__item-name"
                                        value={item.name}
                                        onChange={(value) => updatePortfolioItem(index, 'name', value)}
                                        placeholder={__('Project Name', 'obx-blocks')}
                                        allowedFormats={['core/bold', 'core/italic']}
                                    />
                                    <RichText
                                        tagName="div"
                                        className="obx-portfolio__item-description"
                                        value={item.description}
                                        onChange={(value) => updatePortfolioItem(index, 'description', value)}
                                        placeholder={__('Project description...', 'obx-blocks')}
                                        allowedFormats={['core/bold', 'core/italic', 'core/link']}
                                    />
                                    <div className="obx-portfolio__item-actions">
                                        <Button
                                            isDestructive
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removePortfolioItem(index);
                                            }}
                                            className="obx-portfolio__item-remove"
                                        >
                                            {__('Remove Item', 'obx-blocks')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        <Button
                            className="obx-portfolio__add-button"
                            icon={plus}
                            onClick={addPortfolioItem}
                        >
                            {__('Add Portfolio Item', 'obx-blocks')}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
} 