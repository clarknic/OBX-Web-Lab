/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    RichText,
    InspectorControls,
    ColorPalette,
    BlockControls,
    BlockAlignmentToolbar,
    AlignmentToolbar,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    TextControl,
    SelectControl,
    RangeControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { plus, trash, mobile, globe } from '@wordpress/icons';
// Import SVG icons for email and location since they're not available in @wordpress/icons
import { ReactComponent as EmailIcon } from './icons/email.svg';
import { ReactComponent as LocationIcon } from './icons/location.svg';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Edit function for the Contact Us block
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        tagline,
        heading,
        introText,
        contactInfo,
        formShortcode,
        backgroundColor,
        textColor,
        accentColor,
        align,
        textAlign,
        contentWidth,
    } = attributes;

    const [activeItem, setActiveItem] = useState(null);

    const blockProps = useBlockProps({
        className: `obx-contact align${align || 'none'} text-${textAlign || 'center'}`,
        style: {
            backgroundColor,
            color: textColor,
        },
    });

    const getIconComponent = (type) => {
        switch (type) {
            case 'phone':
                return mobile; // Using mobile icon instead of phone
            case 'email':
                return <EmailIcon />; // Using custom email icon
            case 'address':
                return <LocationIcon />; // Using custom location icon
            case 'website':
                return globe;
            default:
                return null;
        }
    };

    const addContactItem = () => {
        const newItems = [...contactInfo];
        newItems.push({
            id: `contact-${Date.now()}`,
            type: 'phone',
            label: '',
            value: '',
            link: '',
        });
        setAttributes({ contactInfo: newItems });
    };

    const removeContactItem = (index) => {
        const newItems = [...contactInfo];
        newItems.splice(index, 1);
        setAttributes({ contactInfo: newItems });
        setActiveItem(null);
    };

    const updateContactItem = (index, property, value) => {
        const newItems = [...contactInfo];
        newItems[index] = {
            ...newItems[index],
            [property]: value,
        };
        
        // Auto-generate link based on type and value
        if (property === 'type' || property === 'value') {
            const item = newItems[index];
            switch (item.type) {
                case 'phone':
                    newItems[index].link = `tel:${item.value.replace(/[^0-9+]/g, '')}`;
                    break;
                case 'email':
                    newItems[index].link = `mailto:${item.value}`;
                    break;
                case 'website':
                    newItems[index].link = item.value.startsWith('http') ? item.value : `https://${item.value}`;
                    break;
                default:
                    newItems[index].link = '';
                    break;
            }
        }
        
        setAttributes({ contactInfo: newItems });
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
                <PanelBody title={__('Contact Settings', 'obx-blocks')}>
                    <TextControl
                        label={__('Form Shortcode', 'obx-blocks')}
                        value={formShortcode}
                        onChange={(value) => setAttributes({ formShortcode: value })}
                        help={__('Enter a shortcode for your contact form plugin (e.g., Contact Form 7, WPForms, etc.)', 'obx-blocks')}
                    />
                    
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
                <div className="obx-contact__container" style={{ maxWidth: `${contentWidth}%` }}>
                    <div className="obx-contact__header" style={{ textAlign }}>
                        <RichText
                            tagName="div"
                            className="obx-contact__tagline"
                            value={tagline}
                            onChange={(value) => setAttributes({ tagline: value })}
                            placeholder={__('GET IN TOUCH', 'obx-blocks')}
                        />
                        <RichText
                            tagName="h2"
                            className="obx-contact__heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Contact Us', 'obx-blocks')}
                            style={{ 
                                backgroundImage: accentColor ? `linear-gradient(transparent 60%, ${accentColor} 60%)` : 'none' 
                            }}
                        />
                        
                        <RichText
                            tagName="div"
                            className="obx-contact__intro-text"
                            value={introText}
                            onChange={(value) => setAttributes({ introText: value })}
                            placeholder={__('We\'d love to hear from you! Reach out using the contact information below or send us a message.', 'obx-blocks')}
                            allowedFormats={['core/bold', 'core/italic', 'core/link']}
                        />
                    </div>
                    
                    <div className="obx-contact__content">
                        <div className="obx-contact__info">
                            <h3 className="obx-contact__info-heading" style={{ textAlign }}>{__('Contact Information', 'obx-blocks')}</h3>
                            
                            {contactInfo.map((item, index) => (
                                <div 
                                    key={item.id} 
                                    className={`obx-contact__info-item ${activeItem === index ? 'is-selected' : ''}`}
                                    onClick={() => setActiveItem(index)}
                                >
                                    <div className="obx-contact__info-icon" style={{ color: accentColor }}>
                                        {getIconComponent(item.type)}
                                    </div>
                                    <div className="obx-contact__info-content">
                                        <div className="obx-contact__info-controls">
                                            <SelectControl
                                                value={item.type}
                                                options={[
                                                    { label: __('Phone', 'obx-blocks'), value: 'phone' },
                                                    { label: __('Email', 'obx-blocks'), value: 'email' },
                                                    { label: __('Address', 'obx-blocks'), value: 'address' },
                                                    { label: __('Website', 'obx-blocks'), value: 'website' },
                                                ]}
                                                onChange={(value) => updateContactItem(index, 'type', value)}
                                                className="obx-contact__info-type"
                                            />
                                            
                                            <RichText
                                                tagName="div"
                                                className="obx-contact__info-label"
                                                value={item.label}
                                                onChange={(value) => updateContactItem(index, 'label', value)}
                                                placeholder={__('Label', 'obx-blocks')}
                                            />
                                            
                                            <RichText
                                                tagName="div"
                                                className="obx-contact__info-value"
                                                value={item.value}
                                                onChange={(value) => updateContactItem(index, 'value', value)}
                                                placeholder={__('Value', 'obx-blocks')}
                                            />
                                            
                                            {item.type === 'address' && (
                                                <TextControl
                                                    label={__('Map Link (optional)', 'obx-blocks')}
                                                    value={item.link}
                                                    onChange={(value) => updateContactItem(index, 'link', value)}
                                                    placeholder={__('Google Maps URL', 'obx-blocks')}
                                                    className="obx-contact__info-link"
                                                />
                                            )}
                                        </div>
                                        
                                        <div className="obx-contact__info-actions">
                                            <Button
                                                isDestructive
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeContactItem(index);
                                                }}
                                                className="obx-contact__info-remove"
                                            >
                                                {__('Remove', 'obx-blocks')}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            <Button
                                className="obx-contact__add-button"
                                icon={plus}
                                onClick={addContactItem}
                            >
                                {__('Add Contact Info', 'obx-blocks')}
                            </Button>
                        </div>
                        
                        <div className="obx-contact__form">
                            <h3 className="obx-contact__form-heading" style={{ textAlign }}>{__('Send Us a Message', 'obx-blocks')}</h3>
                            
                            <div className="obx-contact__form-shortcode">
                                {formShortcode ? (
                                    <div className="obx-contact__form-preview">
                                        <p>{__('Form shortcode:', 'obx-blocks')} <code>{formShortcode}</code></p>
                                        <p>{__('The actual form will appear on the frontend.', 'obx-blocks')}</p>
                                    </div>
                                ) : (
                                    <div className="obx-contact__form-placeholder">
                                        <p>{__('Add a form shortcode in the block settings.', 'obx-blocks')}</p>
                                        <p>{__('Example: [contact-form-7 id="123" title="Contact form"]', 'obx-blocks')}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 