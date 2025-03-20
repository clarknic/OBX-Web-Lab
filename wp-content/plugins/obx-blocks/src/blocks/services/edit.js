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
    URLInput,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    Spinner,
    ToggleControl,
    TextControl,
    RangeControl,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { plus,  edit, link } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Edit function for the Services block
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        heading,
        introText,
        ctaText,
        ctaUrl,
        services,
        backgroundColor,
        textColor,
        align,
        contentWidth,
    } = attributes;

    const [activeService, setActiveService] = useState(null);
    const [svgCache, setSvgCache] = useState({});
    const [editingIcon, setEditingIcon] = useState(null);
    const [isEditingURL, setIsEditingURL] = useState(false);

    // Function to check if a URL is an SVG
    const isSvgUrl = (url) => {
        return url && url.toLowerCase().endsWith('.svg');
    };

    // Function to fetch and cache SVG content
    const fetchSvg = async (url, id) => {
        try {
            const response = await fetch(url);
            const svgText = await response.text();
            
            // Basic validation that it's an SVG
            if (svgText.includes('<svg')) {
                // Create a data URI
                const dataUri = `data:image/svg+xml;base64,${btoa(svgText)}`;
                setSvgCache(prev => ({ ...prev, [url]: dataUri }));
            }
        } catch (error) {
            console.error('Error fetching SVG:', error);
        }
    };

    // Function to update service icon color
    const updateServiceIconColor = (index, color) => {
        const newServices = [...services];
        newServices[index] = {
            ...newServices[index],
            iconColor: color,
        };
        setAttributes({ services: newServices });
    };

    // Fetch SVGs when services change
    useEffect(() => {
        services.forEach(service => {
            if (service.iconImage?.url && isSvgUrl(service.iconImage.url) && !svgCache[service.iconImage.url]) {
                fetchSvg(service.iconImage.url, service.iconImage.id);
            }
        });
    }, [services]);

    const blockProps = useBlockProps({
        className: `obx-services align${align || 'none'}`,
        style: {
            backgroundColor,
            color: textColor,
        },
    });

    const addService = () => {
        const newServices = [...services];
        newServices.push({
            id: `service-${Date.now()}`,
            iconImage: {},
            title: '',
            description: '',
        });
        setAttributes({ services: newServices });
    };

    const removeService = (index) => {
        const newServices = [...services];
        newServices.splice(index, 1);
        setAttributes({ services: newServices });
        setActiveService(null);
    };

    const updateService = (index, property, value) => {
        const newServices = [...services];
        newServices[index] = {
            ...newServices[index],
            [property]: value,
        };
        setAttributes({ services: newServices });
    };

    const renderServiceIcon = (service, index) => {
        // If currently editing this icon, show the media upload UI
        if (editingIcon === index) {
            return (
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={(media) => {
                            const iconImage = {
                                id: media.id,
                                url: media.url,
                                alt: media.alt || '',
                            };
                            updateService(index, 'iconImage', iconImage);
                            setEditingIcon(null);
                        }}
                        allowedTypes={['image']}
                        value={service.iconImage?.id}
                        render={({ open }) => (
                            <div className="obx-services__item-icon-edit">
                                <Button 
                                    onClick={open}
                                    className="obx-services__item-icon-upload-button"
                                    variant="primary"
                                >
                                    {service.iconImage?.id ? __('Change Icon', 'obx-blocks') : __('Upload Icon', 'obx-blocks')}
                                </Button>
                                <Button 
                                    onClick={() => setEditingIcon(null)}
                                    className="obx-services__item-icon-cancel-button"
                                    variant="secondary"
                                >
                                    {__('Cancel', 'obx-blocks')}
                                </Button>
                                {service.iconImage?.id && (
                                    <Button
                                        onClick={() => {
                                            updateService(index, 'iconImage', {});
                                            setEditingIcon(null);
                                        }}
                                        className="obx-services__item-icon-remove-button"
                                        variant="tertiary"
                                        isDestructive
                                    >
                                        {__('Remove', 'obx-blocks')}
                                    </Button>
                                )}
                            </div>
                        )}
                    />
                </MediaUploadCheck>
            );
        }

        // Regular icon display with edit button overlay
        if (service.iconImage && service.iconImage.url) {
            const url = service.iconImage.url;
            
            // Handle SVG
            if (isSvgUrl(url)) {
                const dataUri = svgCache[url];
                if (dataUri) {
                    return (
                        <div className="obx-services__item-icon-wrapper" style={{ position: 'relative' }}>
                            <img 
                                src={dataUri}
                                alt={service.title || ''}
                                className="obx-services__item-icon-svg"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    filter: service.iconColor ? `drop-shadow(0 0 0 ${service.iconColor})` : undefined,
                                }}
                            />
                            <Button 
                                style={{
                                    position: 'absolute',
                                    top: '-18px',
                                    left: '-18px',
                                    background: 'rgb(0 0 0 / 50%)',
                                    color: 'white'
                                }}
                                className="obx-services__item-icon-edit-button"
                                icon={edit}
                                onClick={() => setEditingIcon(index)}
                            />
                        </div>
                    );
                }
                // Show loading spinner while fetching SVG
                return (
                    <div className="obx-services__item-icon-loading">
                        <Spinner />
                    </div>
                );
            }
            
            // Regular image
            return (
                <div className="obx-services__item-icon-wrapper">
                    <img 
                        src={url} 
                        alt={service.title || ''} 
                        className="obx-services__item-icon-img"
                    />
                    <Button 
                        className="obx-services__item-icon-edit-button"
                        icon={edit}
                        onClick={() => setEditingIcon(index)}
                    />
                </div>
            );
        }

        // No icon selected yet
        return (
            <Button
                className="obx-services__item-icon-placeholder"
                onClick={() => setEditingIcon(index)}
            >
                {__('Add Icon', 'obx-blocks')}
            </Button>
        );
    };

    return (
        <>
            <BlockControls>
                <BlockAlignmentToolbar
                    value={align}
                    onChange={(newAlign) => setAttributes({ align: newAlign })}
                    controls={['wide', 'full']}
                />
            </BlockControls>
            
            <InspectorControls>
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
                <PanelBody title={__('Service Settings', 'obx-blocks')}>
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
                </PanelBody>
                <PanelBody title={__('CTA Settings', 'obx-blocks')}>
                    <TextControl
                        label={__('CTA Text', 'obx-blocks')}
                        value={ctaText}
                        onChange={(value) => setAttributes({ ctaText: value })}
                        placeholder={__('Enter CTA text...', 'obx-blocks')}
                    />
                    <TextControl
                        label={__('CTA URL', 'obx-blocks')}
                        value={ctaUrl}
                        onChange={(value) => setAttributes({ ctaUrl: value })}
                        placeholder={__('https://example.com', 'obx-blocks')}
                    />
                </PanelBody>
                {activeService !== null && services[activeService]?.iconImage?.url && isSvgUrl(services[activeService].iconImage.url) && (
                    <PanelBody title={__('Icon Settings', 'obx-blocks')}>
                        <div className="components-base-control">
                            <label className="components-base-control__label">
                                {__('Icon Color', 'obx-blocks')}
                            </label>
                            <ColorPalette
                                value={services[activeService].iconColor}
                                onChange={(color) => updateServiceIconColor(activeService, color)}
                            />
                        </div>
                    </PanelBody>
                )}
            </InspectorControls>

            <div {...blockProps}>
                <div className="obx-services__container" style={{ maxWidth: `${contentWidth}%` }}>
                    <div className="obx-services__left">
                        <RichText
                            tagName="h2"
                            className="obx-services__heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Enter your heading here', 'obx-blocks')}
                            allowedFormats={['core/bold', 'core/italic', 'core/link']}
                        />
                        
                        <div className="obx-services__cta-wrapper">
                            <div className="obx-services__cta-text-wrapper">
                                <RichText
                                    tagName="div"
                                    className="obx-services__cta-text"
                                    value={ctaText}
                                    onChange={(value) => setAttributes({ ctaText: value })}
                                    placeholder={__('Enter CTA text...', 'obx-blocks')}
                                    allowedFormats={['core/bold', 'core/italic']}
                                />
                                {isEditingURL ? (
                                    <div className="obx-services__cta-url-input">
                                        <URLInput
                                            value={ctaUrl}
                                            onChange={(value) => setAttributes({ ctaUrl: value })}
                                            autoFocus={true}
                                            onBlur={() => setIsEditingURL(false)}
                                        />
                                        <Button
                                            icon="editor-break"
                                            label={__('Apply', 'obx-blocks')}
                                            onClick={() => setIsEditingURL(false)}
                                        />
                                    </div>
                                ) : (
                                    <Button
                                        icon={link}
                                        label={__('Edit URL', 'obx-blocks')}
                                        onClick={() => setIsEditingURL(true)}
                                        className="obx-services__cta-url-button"
                                    />
                                )}
                            </div>
                            {ctaText && ctaUrl && (
                                <div className="obx-services__cta-preview">
                                    <span>{__('Preview:', 'obx-blocks')}</span>
                                    <a 
                                        href={ctaUrl}
                                        className="obx-services__cta-link"
                                        target={'_self'}
                                        rel={'noopener noreferrer'}
                                    >
                                        {ctaText}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="obx-services__right">
                        <RichText
                            tagName="div"
                            className="obx-services__intro"
                            value={introText}
                            onChange={(value) => setAttributes({ introText: value })}
                            placeholder={__('Enter your intro text here', 'obx-blocks')}
                            allowedFormats={['core/bold', 'core/italic', 'core/link']}
                        />

                        <div className="obx-services__grid">
                            {services.map((service, index) => (
                                <div
                                    key={service.id}
                                    className={`obx-services__item ${activeService === index ? 'is-selected' : ''}`}
                                    onClick={() => setActiveService(index)}
                                >
                                    <div className="obx-services__title-wrapper">
                                        <div className="obx-services__item-icon" style={{ overflow: 'visible' }}>
                                            {renderServiceIcon(service, index)}
                                        </div>
                                        <RichText
                                            tagName="h3"
                                            className="obx-services__item-title"
                                            value={service.title}
                                            onChange={(value) => updateService(index, 'title', value)}
                                            placeholder={__('Service Title', 'obx-blocks')}
                                            allowedFormats={['core/bold', 'core/italic']}
                                        />
                                    </div>
                                        <RichText
                                            tagName="p"
                                            className="obx-services__item-description"
                                            value={service.description}
                                            onChange={(value) => updateService(index, 'description', value)}
                                            placeholder={__('Service description...', 'obx-blocks')}
                                            allowedFormats={['core/bold', 'core/italic', 'core/link']}
                                        />
                                        <div className="obx-services__item-actions">
                                            <Button
                                                isDestructive
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeService(index);
                                                }}
                                                className="obx-services__item-remove"
                                            >
                                                {__('Remove Service', 'obx-blocks')}
                                            </Button>
                                        </div>
                                </div>
                            ))}
                        </div>

                        <Button
                            variant="primary"
                            onClick={addService}
                            className="obx-services__add-button"
                            icon={plus}
                        >
                            {__('Add Service', 'obx-blocks')}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
} 