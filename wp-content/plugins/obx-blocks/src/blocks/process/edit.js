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
    URLInputButton,
    URLInput,
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button,
    TextControl,
    BaseControl,
    RangeControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { plus, trash, link } from '@wordpress/icons';
import { v4 as uuidv4 } from 'uuid';

/**
 * Internal dependencies
 */
import './editor.scss';
import './style.scss';

/**
 * Edit function for the Process block
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        heading,
        introText,
        steps,
        ctaText,
        ctaUrl,
        backgroundColor,
        textColor,
        accentColor,
        align,
        textAlign,
        contentWidth,
    } = attributes;

    const [activeStep, setActiveStep] = useState(null);
    const [isEditingURL, setIsEditingURL] = useState(false);

    const blockProps = useBlockProps({
        className: `obx-process align${align || 'none'} text-${textAlign || 'center'} content-width-${contentWidth}`,
        style: {
            backgroundColor,
            color: textColor,
        },
    });

    const addStep = () => {
        const newStep = {
            id: uuidv4(),
            number: (steps.length + 1).toString(),
            title: '',
            description: '',
        };
        setAttributes({ steps: [...steps, newStep] });
    };

    const removeStep = (stepId) => {
        setAttributes({
            steps: steps.filter(step => step.id !== stepId),
        });
        setActiveStep(null);
    };

    const updateStep = (stepId, field, value) => {
        setAttributes({
            steps: steps.map(step => 
                step.id === stepId ? { ...step, [field]: value } : step
            ),
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
                <PanelBody title={__('Process Settings', 'obx-blocks')}>
                    
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
            </InspectorControls>

            <div {...blockProps}>
                <div className="obx-process__container" style={{ maxWidth: `${contentWidth}%` }}>
                    <div className="obx-process__header" style={{ textAlign }}>
                        <RichText
                            tagName="h2"
                            className="obx-process__heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Enter section heading', 'obx-blocks')}
                        />
                        <div className="obx-process__cta-wrapper">
                            <div className="obx-process__cta-text-wrapper">
                                <RichText
                                    tagName="div"
                                    className="obx-process__cta-text"
                                    value={ctaText}
                                    onChange={(value) => setAttributes({ ctaText: value })}
                                    placeholder={__('Enter CTA text...', 'obx-blocks')}
                                    allowedFormats={['core/bold', 'core/italic']}
                                />
                                {isEditingURL ? (
                                    <div className="obx-process__cta-url-input">
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
                                        className="obx-process__cta-url-button"
                                    />
                                )}
                            </div>
                            {ctaText && ctaUrl && (
                                <div className="obx-process__cta-preview">
                                    <span>{__('Preview:', 'obx-blocks')}</span>
                                    <a 
                                        href={ctaUrl}
                                        className="obx-process__cta-link"
                                        onClick={(e) => { e.preventDefault(); }}
                                    >
                                        {ctaText}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="obx-process__content">
                        <RichText
                            tagName="div"
                            className="obx-process__intro"
                            value={introText}
                            onChange={(value) => setAttributes({ introText: value })}
                            placeholder={__('Enter intro text...', 'obx-blocks')}
                            allowedFormats={['core/bold', 'core/italic', 'core/link']}
                        />
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
                                            onChange={(value) => updateStep(step.id, 'title', value)}
                                            placeholder={__('Step Title', 'obx-blocks')}
                                            allowedFormats={['core/bold', 'core/italic']}
                                        />
                                        <RichText
                                            tagName="div"
                                            className="obx-process__step-description"
                                            value={step.description}
                                            onChange={(value) => updateStep(step.id, 'description', value)}
                                            placeholder={__('Step description...', 'obx-blocks')}
                                            allowedFormats={['core/bold', 'core/italic', 'core/link']}
                                        />
                                        <div className="obx-process__step-actions">
                                            <Button
                                                isDestructive
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeStep(step.id);
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
                    </div>
                </div>
            </div>
        </>
    );
} 