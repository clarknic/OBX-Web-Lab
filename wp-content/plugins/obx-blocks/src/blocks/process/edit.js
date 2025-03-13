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
    URLInputButton,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    TextControl,
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
 * Edit function for the Process block
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        tagline,
        heading,
        steps,
        ctaText,
        ctaUrl,
        imageUrl,
        imageId,
        imageAlt,
        backgroundColor,
        textColor,
        accentColor,
        align,
        textAlign,
    } = attributes;

    const [activeStep, setActiveStep] = useState(null);

    const blockProps = useBlockProps({
        className: `obx-process align${align || 'none'} text-${textAlign || 'center'}`,
        style: {
            backgroundColor,
            color: textColor,
        },
    });

    const addStep = () => {
        const newSteps = [...steps];
        const newNumber = newSteps.length + 1;
        newSteps.push({
            id: `step-${Date.now()}`,
            number: newNumber.toString(),
            title: '',
            description: '',
        });
        setAttributes({ steps: newSteps });
    };

    const removeStep = (index) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1);
        
        // Update the numbers of remaining steps
        newSteps.forEach((step, i) => {
            step.number = (i + 1).toString();
        });
        
        setAttributes({ steps: newSteps });
        setActiveStep(null);
    };

    const updateStep = (index, property, value) => {
        const newSteps = [...steps];
        newSteps[index] = {
            ...newSteps[index],
            [property]: value,
        };
        setAttributes({ steps: newSteps });
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
                <PanelBody title={__('Process Settings', 'obx-blocks')}>
                    <BaseControl label={__('Process Image', 'obx-blocks')}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={(media) => {
                                    setAttributes({
                                        imageUrl: media.url,
                                        imageId: media.id,
                                        imageAlt: media.alt || '',
                                    });
                                }}
                                allowedTypes={['image']}
                                value={imageId}
                                render={({ open }) => (
                                    <div className="editor-post-featured-image">
                                        <Button
                                            className={imageId ? 'editor-post-featured-image__preview' : 'editor-post-featured-image__toggle'}
                                            onClick={open}
                                        >
                                            {imageId ? (
                                                <img 
                                                    src={imageUrl} 
                                                    alt={imageAlt} 
                                                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                                                />
                                            ) : (
                                                __('Set process image', 'obx-blocks')
                                            )}
                                        </Button>
                                        {imageId && (
                                            <Button
                                                onClick={() => {
                                                    setAttributes({
                                                        imageUrl: '',
                                                        imageId: 0,
                                                        imageAlt: '',
                                                    });
                                                }}
                                                isDestructive
                                            >
                                                {__('Remove image', 'obx-blocks')}
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        </MediaUploadCheck>
                    </BaseControl>
                    
                    <TextControl
                        label={__('CTA Button Text', 'obx-blocks')}
                        value={ctaText}
                        onChange={(value) => setAttributes({ ctaText: value })}
                    />
                    
                    <BaseControl label={__('CTA Button URL', 'obx-blocks')}>
                        <URLInputButton
                            url={ctaUrl}
                            onChange={(url) => setAttributes({ ctaUrl: url })}
                        />
                    </BaseControl>
                    
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
            </InspectorControls>

            <div {...blockProps}>
                <div className="obx-process__container">
                    <div className="obx-process__header" style={{ textAlign }}>
                        <RichText
                            tagName="div"
                            className="obx-process__tagline"
                            value={tagline}
                            onChange={(value) => setAttributes({ tagline: value })}
                            placeholder={__('OUR PROCESS', 'obx-blocks')}
                        />
                        <RichText
                            tagName="h2"
                            className="obx-process__heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Your path to paid search excellence starts here!', 'obx-blocks')}
                            style={{ 
                                backgroundImage: accentColor ? `linear-gradient(transparent 60%, ${accentColor} 60%)` : 'none' 
                            }}
                        />
                    </div>
                    
                    <div className="obx-process__content">
                        <div className="obx-process__steps">
                            {steps.map((step, index) => (
                                <div 
                                    key={step.id} 
                                    className={`obx-process__step ${activeStep === index ? 'is-selected' : ''}`}
                                    onClick={() => setActiveStep(index)}
                                >
                                    <div 
                                        className="obx-process__step-number"
                                        style={{ backgroundColor: accentColor }}
                                    >
                                        {step.number}
                                    </div>
                                    <div className="obx-process__step-content">
                                        <RichText
                                            tagName="h3"
                                            className="obx-process__step-title"
                                            value={step.title}
                                            onChange={(value) => updateStep(index, 'title', value)}
                                            placeholder={__('Step Title', 'obx-blocks')}
                                            allowedFormats={['core/bold', 'core/italic']}
                                        />
                                        <RichText
                                            tagName="div"
                                            className="obx-process__step-description"
                                            value={step.description}
                                            onChange={(value) => updateStep(index, 'description', value)}
                                            placeholder={__('Step description...', 'obx-blocks')}
                                            allowedFormats={['core/bold', 'core/italic', 'core/link']}
                                        />
                                        <div className="obx-process__step-actions">
                                            <Button
                                                isDestructive
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeStep(index);
                                                }}
                                                className="obx-process__step-remove"
                                            >
                                                {__('Remove Step', 'obx-blocks')}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            <Button
                                className="obx-process__add-button"
                                icon={plus}
                                onClick={addStep}
                            >
                                {__('Add Step', 'obx-blocks')}
                            </Button>
                        </div>
                        
                        <div className="obx-process__image-container">
                            {imageUrl ? (
                                <img 
                                    src={imageUrl} 
                                    alt={imageAlt} 
                                    className="obx-process__image"
                                />
                            ) : (
                                <div className="obx-process__image-placeholder">
                                    <MediaUploadCheck>
                                        <MediaUpload
                                            onSelect={(media) => {
                                                setAttributes({
                                                    imageUrl: media.url,
                                                    imageId: media.id,
                                                    imageAlt: media.alt || '',
                                                });
                                            }}
                                            allowedTypes={['image']}
                                            value={imageId}
                                            render={({ open }) => (
                                                <Button
                                                    onClick={open}
                                                    className="obx-process__image-button"
                                                >
                                                    {__('Add Process Image', 'obx-blocks')}
                                                </Button>
                                            )}
                                        />
                                    </MediaUploadCheck>
                                </div>
                            )}
                            
                            {ctaText && (
                                <div className="obx-process__cta-container">
                                    <RichText
                                        tagName="a"
                                        className="obx-process__cta-button"
                                        value={ctaText}
                                        onChange={(value) => setAttributes({ ctaText: value })}
                                        placeholder={__('Call to Action', 'obx-blocks')}
                                        style={{ 
                                            backgroundColor: '#000',
                                            color: '#fff',
                                            borderRadius: '50px',
                                            padding: '12px 24px',
                                            display: 'inline-block',
                                            textDecoration: 'none',
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 