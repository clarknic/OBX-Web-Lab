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
    TextControl,
    TextareaControl,
    ColorPicker,
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
        anchor
    } = attributes;

    const [isAddingItem, setIsAddingItem] = useState(false);
    const [newItem, setNewItem] = useState({
        id: '',
        imageUrl: '',
        imageId: 0,
        imageAlt: '',
        name: '',
        description: ''
    });

    const blockProps = useBlockProps({
        className: `obx-portfolio align${align || 'none'} text-${textAlign || 'center'}`,
        style: {
            backgroundColor,
            color: textColor,
        },
    });

    const addPortfolioItem = () => {
        const newItems = [...portfolioItems, {
            id: `portfolio-${portfolioItems.length + 1}`,
            imageUrl: '',
            imageId: 0,
            imageAlt: '',
            name: '',
            description: ''
        }];
        setAttributes({ portfolioItems: newItems });
        setIsAddingItem(false);
        setNewItem({
            id: '',
            imageUrl: '',
            imageId: 0,
            imageAlt: '',
            name: '',
            description: ''
        });
    };

    const removePortfolioItem = (itemId) => {
        const updatedItems = portfolioItems.filter(item => item.id !== itemId);
        setAttributes({ portfolioItems: updatedItems });
    };

    const updatePortfolioItem = (itemId, field, value) => {
        const updatedItems = portfolioItems.map(item => {
            if (item.id === itemId) {
                if (field === 'image') {
                    return {
                        ...item,
                        imageUrl: value ? value.url : '',
                        imageId: value ? value.id : 0,
                        imageAlt: value ? value.alt : '',
                    };
                }
                return { ...item, [field]: value };
            }
            return item;
        });
        setAttributes({ portfolioItems: updatedItems });
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
                    <TextControl
                        label={__('Tagline', 'obx-blocks')}
                        value={tagline}
                        onChange={(value) => setAttributes({ tagline: value })}
                    />
                    <TextControl
                        label={__('Heading', 'obx-blocks')}
                        value={heading}
                        onChange={(value) => setAttributes({ heading: value })}
                    />
                    <RangeControl
                        label={__('Content Width (%)', 'obx-blocks')}
                        value={contentWidth}
                        onChange={(value) => setAttributes({ contentWidth: value })}
                        min={50}
                        max={100}
                        step={5}
                        help={__('Controls the width of the content container on desktop. Mobile will always be 100%.', 'obx-blocks')}
                    />
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Background Color', 'obx-blocks')}
                        </label>
                        <ColorPicker
                            color={backgroundColor}
                            onChange={(value) => setAttributes({ backgroundColor: value })}
                        />
                    </div>
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Text Color', 'obx-blocks')}
                        </label>
                        <ColorPicker
                            color={textColor}
                            onChange={(value) => setAttributes({ textColor: value })}
                        />
                    </div>
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Accent Color', 'obx-blocks')}
                        </label>
                        <ColorPicker
                            color={accentColor}
                            onChange={(value) => setAttributes({ accentColor: value })}
                        />
                    </div>
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
                            placeholder={__('Enter a section subheading', 'obx-blocks')}
                        />
                        <RichText
                            tagName="h2"
                            className="obx-portfolio__heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Enter a section heading', 'obx-blocks')}
                            style={{ 
                                backgroundImage: accentColor ? `linear-gradient(transparent 60%, ${accentColor} 60%)` : 'none' 
                            }}
                        />
                    </div>
                    
                    <div className="obx-portfolio__items">
                        {portfolioItems.map((item) => (
                            <div 
                                key={item.id} 
                                className="obx-portfolio__item"
                            >
                                <div className="obx-portfolio__item-image-container">
                                    {item.imageUrl ? (
                                        <>
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    onSelect={(media) => {
                                                        updatePortfolioItem(item.id, 'image', media);
                                                    }}
                                                    allowedTypes={['image']}
                                                    value={item.imageId}
                                                    render={({ open }) => (
                                                        <Button
                                                            onClick={open}
                                                            className="obx-portfolio__item-image-wrapper"
                                                        >
                                                            <img 
                                                                src={item.imageUrl} 
                                                                alt={item.imageAlt || item.name} 
                                                                className="obx-portfolio__item-image"
                                                            />
                                                        </Button>
                                                    )}
                                                />
                                            </MediaUploadCheck>
                                            <div className="obx-portfolio__item-image-actions">
                                                <Button
                                                    onClick={() => {
                                                        updatePortfolioItem(item.id, 'image', null);
                                                    }}
                                                    variant="secondary"
                                                    isSmall
                                                    isDestructive
                                                    icon={trash}
                                                >
                                                    {__('Remove', 'obx-blocks')}
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="obx-portfolio__item-image-placeholder">
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    onSelect={(media) => {
                                                        updatePortfolioItem(item.id, 'image', media);
                                                    }}
                                                    allowedTypes={['image']}
                                                    value={item.imageId}
                                                    render={({ open }) => (
                                                        <Button
                                                            onClick={open}
                                                            className="obx-portfolio__item-image-button"
                                                            icon={plus}
                                                        >
                                                            {__('Add Image', 'obx-blocks')}
                                                        </Button>
                                                    )}
                                                />
                                            </MediaUploadCheck>
                                        </div>
                                    )}
                                </div>
                                <div className="obx-portfolio__item-content">
                                    <RichText
                                        tagName="h3"
                                        className="obx-portfolio__item-name"
                                        value={item.name}
                                        onChange={(value) => updatePortfolioItem(item.id, 'name', value)}
                                        placeholder={__('Project Name', 'obx-blocks')}
                                        allowedFormats={['core/bold', 'core/italic']}
                                    />
                                    <RichText
                                        tagName="div"
                                        className="obx-portfolio__item-description"
                                        value={item.description}
                                        onChange={(value) => updatePortfolioItem(item.id, 'description', value)}
                                        placeholder={__('Project description...', 'obx-blocks')}
                                        allowedFormats={['core/bold', 'core/italic', 'core/link']}
                                    />
                                    <div className="obx-portfolio__item-actions">
                                        <Button
                                            isSmall
                                            onClick={() => removePortfolioItem(item.id)}
                                            className="components-button is-destructive"
                                        >
                                            {__('Remove Porfolio item', 'obx-blocks')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Button
                            isPrimary
                            onClick={addPortfolioItem}
                            className="obx-portfolio__add-button"
                            icon={plus}
                        >
                            {__('Add Portfolio Item', 'obx-blocks')}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
} 