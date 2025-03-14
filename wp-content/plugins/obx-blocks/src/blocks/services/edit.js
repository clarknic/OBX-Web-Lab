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
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    Placeholder,
    Tooltip,
    Spinner,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { plus, upload, image, edit } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Edit function for the Services block
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        tagline,
        heading,
        introText,
        services,
        backgroundColor,
        textColor,
        align,
    } = attributes;

    const [activeService, setActiveService] = useState(null);
    const [svgCache, setSvgCache] = useState({});
    const [editingIcon, setEditingIcon] = useState(null);

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
            </InspectorControls>

            <div {...blockProps}>
                <div className="obx-services__container">
                    <div className="obx-services__left">
                        <RichText
                            tagName="div"
                            className="obx-services__tagline"
                            value={tagline}
                            onChange={(value) => setAttributes({ tagline: value })}
                            placeholder={__('Enter your tagline here', 'obx-blocks')}
                        />
                        <RichText
                            tagName="h2"
                            className="obx-services__heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Enter your heading here', 'obx-blocks')}
                            allowedFormats={['core/bold', 'core/italic', 'core/link']}
                        />
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
                                    <div className="obx-services__item-icon" style={{ overflow: 'visible' }}>
                                        {renderServiceIcon(service, index)}
                                    </div>
                                    <div className="obx-services__item-content">
                                        <RichText
                                            tagName="h3"
                                            className="obx-services__item-title"
                                            value={service.title}
                                            onChange={(value) => updateService(index, 'title', value)}
                                            placeholder={__('Service Title', 'obx-blocks')}
                                            allowedFormats={['core/bold', 'core/italic']}
                                        />
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
                                </div>
                            ))}
                        </div>
                        
                        <Button
                            className="obx-services__add-button"
                            icon={plus}
                            onClick={addService}
                        >
                            {__('Add Service', 'obx-blocks')}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
} 