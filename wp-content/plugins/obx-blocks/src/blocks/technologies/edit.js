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
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { plus, upload, image, edit } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Edit function for the Technologies block
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        heading,
        subheading,
        introText,
        technologies,
        backgroundColor,
        textColor,
        align,
    } = attributes;

    const [activeTech, setActiveTech] = useState(null);
    const [svgCache, setSvgCache] = useState({});
    const [editingLogo, setEditingLogo] = useState(null);

    // Function to check if a URL is an SVG
    const isSvgUrl = (url) => {
        return url && url.toLowerCase().endsWith('.svg');
    };

    // Function to fetch SVG content
    const fetchSvg = async (url, id) => {
        if (svgCache[url]) return;
        
        try {
            const response = await fetch(url);
            const svgText = await response.text();
            setSvgCache(prev => ({
                ...prev,
                [url]: `data:image/svg+xml,${encodeURIComponent(svgText)}`
            }));
        } catch (error) {
            console.error('Error fetching SVG:', error);
        }
    };

    // Fetch SVGs when technologies change
    useEffect(() => {
        technologies.forEach(tech => {
            if (tech.logoImage?.url && isSvgUrl(tech.logoImage.url)) {
                fetchSvg(tech.logoImage.url, tech.id);
            }
        });
    }, [technologies]);

    const blockProps = useBlockProps({
        className: `obx-technologies align${align || 'none'}`,
        style: {
            backgroundColor,
            color: textColor,
        },
    });

    const addTechnology = () => {
        const newTechnologies = [...technologies];
        newTechnologies.push({
            id: `tech-${Date.now()}`,
            logoImage: {},
            name: '',
        });
        setAttributes({ technologies: newTechnologies });
    };

    const removeTechnology = (index) => {
        const newTechnologies = [...technologies];
        newTechnologies.splice(index, 1);
        setAttributes({ technologies: newTechnologies });
        setActiveTech(null);
    };

    const updateTechnology = (index, property, value) => {
        const newTechnologies = [...technologies];
        newTechnologies[index] = {
            ...newTechnologies[index],
            [property]: value,
        };
        setAttributes({ technologies: newTechnologies });
    };

    const renderTechLogo = (tech, index) => {
        // If currently editing this logo, show the media upload UI
        if (editingLogo === index) {
            return (
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={(media) => {
                            updateTechnology(index, 'logoImage', media);
                            setEditingLogo(null);
                        }}
                        allowedTypes={['image', 'svg']}
                        value={tech.logoImage?.id}
                        render={({ open }) => (
                            <div className="obx-technologies__item-logo-edit">
                                <Button 
                                    onClick={open}
                                    className="obx-technologies__item-logo-upload-button"
                                >
                                    {tech.logoImage?.id ? __('Change Logo', 'obx-blocks') : __('Upload Logo', 'obx-blocks')}
                                </Button>
                                <Button 
                                    onClick={() => setEditingLogo(null)}
                                    className="obx-technologies__item-logo-cancel-button"
                                >
                                    {__('Cancel', 'obx-blocks')}
                                </Button>
                                {tech.logoImage?.id && (
                                    <Button
                                        onClick={() => {
                                            updateTechnology(index, 'logoImage', {});
                                            setEditingLogo(null);
                                        }}
                                        className="obx-technologies__item-logo-remove-button"
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

        // Regular logo display with edit button overlay
        if (tech.logoImage && tech.logoImage.url) {
            const url = tech.logoImage.url;
            
            // Handle SVG differently
            if (isSvgUrl(url)) {
                const dataUri = svgCache[url];
                if (dataUri) {
                    return (
                        <div className="obx-technologies__item-logo-wrapper">
                            <div 
                                className="obx-technologies__item-logo-svg" 
                                style={{ backgroundImage: `url(${dataUri})` }}
                                aria-label={tech.name}
                            ></div>
                            <Tooltip text={__('Edit Logo', 'obx-blocks')}>
                                <Button 
                                    className="obx-technologies__item-logo-edit-button"
                                    icon={edit}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingLogo(index);
                                    }}
                                />
                            </Tooltip>
                        </div>
                    );
                }
                // Show loading state while fetching SVG
                return (
                    <div className="obx-technologies__item-logo-loading">
                        {__('Loading...', 'obx-blocks')}
                    </div>
                );
            }
            
            // Regular image
            return (
                <div className="obx-technologies__item-logo-wrapper">
                    <img 
                        src={url} 
                        alt={tech.name} 
                        className="obx-technologies__item-logo-img"
                    />
                    <Tooltip text={__('Edit Logo', 'obx-blocks')}>
                        <Button 
                            className="obx-technologies__item-logo-edit-button"
                            icon={edit}
                            onClick={(e) => {
                                e.stopPropagation();
                                setEditingLogo(index);
                            }}
                        />
                    </Tooltip>
                </div>
            );
        }
        
        // Placeholder for empty logo
        return (
            <div 
                className="obx-technologies__item-logo-placeholder"
                onClick={(e) => {
                    e.stopPropagation();
                    setEditingLogo(index);
                }}
            >
                <Tooltip text={__('Add Logo', 'obx-blocks')}>
                    <Button 
                        icon={image}
                        label={__('Add Logo', 'obx-blocks')}
                    />
                </Tooltip>
            </div>
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
                <PanelBody title={__('Technology Settings', 'obx-blocks')}>
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
                <div className="obx-technologies__container">
                    <div className="obx-technologies__header">
                        <RichText
                            tagName="h2"
                            className="obx-technologies__heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Top platforms', 'obx-blocks')}
                            allowedFormats={['core/bold', 'core/italic']}
                        />
                        <RichText
                            tagName="h3"
                            className="obx-technologies__subheading"
                            value={subheading}
                            onChange={(value) => setAttributes({ subheading: value })}
                            placeholder={__('we use', 'obx-blocks')}
                            allowedFormats={['core/bold', 'core/italic']}
                        />
                        <RichText
                            tagName="div"
                            className="obx-technologies__intro"
                            value={introText}
                            onChange={(value) => setAttributes({ introText: value })}
                            placeholder={__('Enter your intro text here', 'obx-blocks')}
                            allowedFormats={['core/bold', 'core/italic', 'core/link']}
                        />
                    </div>
                    
                    <div className="obx-technologies__grid">
                        {technologies.map((tech, index) => (
                            <div 
                                key={tech.id} 
                                className={`obx-technologies__item ${activeTech === index ? 'is-selected' : ''}`}
                                onClick={() => setActiveTech(index)}
                            >
                                <div className="obx-technologies__item-logo">
                                    {renderTechLogo(tech, index)}
                                </div>
                                <div className="obx-technologies__item-content">
                                    <RichText
                                        tagName="div"
                                        className="obx-technologies__item-name"
                                        value={tech.name}
                                        onChange={(value) => updateTechnology(index, 'name', value)}
                                        placeholder={__('Technology Name', 'obx-blocks')}
                                        allowedFormats={['core/bold', 'core/italic']}
                                    />
                                    <div className="obx-technologies__item-actions">
                                        <Button
                                            isDestructive
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeTechnology(index);
                                            }}
                                            className="obx-technologies__item-remove"
                                        >
                                            {__('Remove', 'obx-blocks')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <Button
                        className="obx-technologies__add-button"
                        icon={plus}
                        onClick={addTechnology}
                    >
                        {__('Add Technology', 'obx-blocks')}
                    </Button>
                </div>
            </div>
        </>
    );
} 