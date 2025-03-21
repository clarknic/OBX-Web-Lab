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
    const [editingItemId, setEditingItemId] = useState(null);
    const [newItem, setNewItem] = useState({
        id: '',
        image: {},
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
            image: {},
            name: '',
            description: ''
        }];
        setAttributes({ portfolioItems: newItems });
        setIsAddingItem(true);
        setEditingItemId(newItems[newItems.length - 1].id);
        setNewItem(newItems[newItems.length - 1]);
    };

    const removePortfolioItem = (itemId) => {
        const updatedItems = portfolioItems.filter(item => item.id !== itemId);
        setAttributes({ portfolioItems: updatedItems });
        if (editingItemId === itemId) {
            setIsAddingItem(false);
            setEditingItemId(null);
            setNewItem({
                id: '',
                image: {},
                name: '',
                description: ''
            });
        }
    };

    const updatePortfolioItem = (itemId, field, value) => {
        const updatedItems = portfolioItems.map(item => {
            if (item.id === itemId) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setAttributes({ portfolioItems: updatedItems });
    };

    const editPortfolioItem = (item) => {
        setIsAddingItem(true);
        setEditingItemId(item.id);
        setNewItem(item);
    };

    const savePortfolioItem = () => {
        const updatedItems = portfolioItems.map(item => {
            if (item.id === editingItemId) {
                return newItem;
            }
            return item;
        });
        setAttributes({ portfolioItems: updatedItems });
        setIsAddingItem(false);
        setEditingItemId(null);
        setNewItem({
            id: '',
            image: {},
            name: '',
            description: ''
        });
    };

    const cancelEdit = () => {
        setIsAddingItem(false);
        setEditingItemId(null);
        setNewItem({
            id: '',
            image: {},
            name: '',
            description: ''
        });
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
                    <div className="components-base-control">
                        <label className="components-base-control__label">
                            {__('Text Alignment', 'obx-blocks')}
                        </label>
                        <select
                            value={textAlign}
                            onChange={(e) => setAttributes({ textAlign: e.target.value })}
                            className="components-select-control__input"
                        >
                            <option value="left">{__('Left', 'obx-blocks')}</option>
                            <option value="center">{__('Center', 'obx-blocks')}</option>
                            <option value="right">{__('Right', 'obx-blocks')}</option>
                        </select>
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
                                    {item.image && item.image.url && (
                                        <img 
                                            src={item.image.url} 
                                            alt={item.name} 
                                            className="obx-portfolio__item-image"
                                        />
                                    )}
                                    <div className="obx-portfolio__item-image-placeholder">
                                        <MediaUploadCheck>
                                            <MediaUpload
                                                onSelect={(media) => {
                                                    updatePortfolioItem(item.id, 'image', media);
                                                    updatePortfolioItem(item.id, 'imageId', media.id);
                                                    updatePortfolioItem(item.id, 'imageAlt', media.alt || '');
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
                                    {item.image && item.image.url && (
                                        <div className="obx-portfolio__item-image-actions">
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    onSelect={(media) => {
                                                        updatePortfolioItem(item.id, 'image', media);
                                                        updatePortfolioItem(item.id, 'imageId', media.id);
                                                        updatePortfolioItem(item.id, 'imageAlt', media.alt || '');
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
                                                    updatePortfolioItem(item.id, 'image', null);
                                                    updatePortfolioItem(item.id, 'imageId', 0);
                                                    updatePortfolioItem(item.id, 'imageAlt', '');
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
                                            onClick={() => editPortfolioItem(item)}
                                            className="components-button is-secondary"
                                        >
                                            {__('Edit', 'obx-blocks')}
                                        </Button>
                                        <Button
                                            isSmall
                                            onClick={() => removePortfolioItem(item.id)}
                                            className="components-button is-destructive"
                                        >
                                            {__('Remove', 'obx-blocks')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        {isAddingItem && (
                            <div className="obx-portfolio__edit-form">
                                <h3>{editingItemId ? __('Edit Portfolio Item', 'obx-blocks') : __('Add New Portfolio Item', 'obx-blocks')}</h3>
                                <div className="components-base-control">
                                    <label className="components-base-control__label">
                                        {__('Image', 'obx-blocks')}
                                    </label>
                                    <div className="obx-portfolio__image-preview">
                                        {newItem.image && newItem.image.url && (
                                            <img src={newItem.image.url} alt={newItem.name} style={{ maxWidth: '200px', marginBottom: '10px' }} />
                                        )}
                                        <MediaUploadCheck>
                                            <MediaUpload
                                                onSelect={(media) => setNewItem({ ...newItem, image: media })}
                                                allowedTypes={['image']}
                                                value={newItem.image.id}
                                                render={({ open }) => (
                                                    <Button
                                                        onClick={open}
                                                        className="components-button is-secondary"
                                                    >
                                                        {newItem.image.url ? __('Change Image', 'obx-blocks') : __('Select Image', 'obx-blocks')}
                                                    </Button>
                                                )}
                                            />
                                        </MediaUploadCheck>
                                    </div>
                                </div>
                                <TextControl
                                    label={__('Name', 'obx-blocks')}
                                    value={newItem.name}
                                    onChange={(value) => setNewItem({ ...newItem, name: value })}
                                />
                                <TextareaControl
                                    label={__('Description', 'obx-blocks')}
                                    value={newItem.description}
                                    onChange={(value) => setNewItem({ ...newItem, description: value })}
                                />
                                <div className="obx-portfolio__form-actions">
                                    <Button
                                        isPrimary
                                        onClick={savePortfolioItem}
                                        className="components-button"
                                    >
                                        {__('Save', 'obx-blocks')}
                                    </Button>
                                    <Button
                                        isSecondary
                                        onClick={cancelEdit}
                                        className="components-button"
                                    >
                                        {__('Cancel', 'obx-blocks')}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {!isAddingItem && (
                            <Button
                                isPrimary
                                onClick={addPortfolioItem}
                                className="components-button"
                            >
                                {__('Add Portfolio Item', 'obx-blocks')}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
} 