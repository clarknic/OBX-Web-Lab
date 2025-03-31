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
    TextControl,
    RangeControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
    const {
        heading,
        introText,
        phone,
        email,
        emailConfig,
        backgroundColor,
        textColor,
        accentColor,
        align,
        textAlign,
        contentWidth,
    } = attributes;

    const blockProps = useBlockProps({
        className: `obx-contact align${align}`,
        style: {
            textAlign: textAlign,
            '--content-width': `${contentWidth}%`,
            '--background-color': backgroundColor,
            '--text-color': textColor,
            '--accent-color': accentColor,
        },
    });

    const updateEmailConfig = (key, value) => {
        setAttributes({
            emailConfig: {
                ...emailConfig,
                [key]: value,
            },
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
                <PanelBody title={__('Content Settings', 'obx-blocks')}>
                    <TextControl
                        label={__('Phone Number', 'obx-blocks')}
                        value={phone}
                        onChange={(value) => setAttributes({ phone: value })}
                        placeholder={__('Enter phone number...', 'obx-blocks')}
                    />
                    <TextControl
                        label={__('Email Address', 'obx-blocks')}
                        value={email}
                        onChange={(value) => setAttributes({ email: value })}
                        placeholder={__('Enter email address...', 'obx-blocks')}
                    />
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
                <PanelBody title={__('Email Settings', 'obx-blocks')}>
                    <TextControl
                        label={__('Message Title', 'obx-blocks')}
                        value={emailConfig.messageTitle}
                        onChange={(value) => updateEmailConfig('messageTitle', value)}
                        help={__('Title for email notifications', 'obx-blocks')}
                    />
                    <TextControl
                        label={__('Receivers', 'obx-blocks')}
                        value={emailConfig.receivers}
                        onChange={(value) => updateEmailConfig('receivers', value)}
                        help={__('Comma-separated list of email addresses', 'obx-blocks')}
                    />
                    <TextControl
                        label={__('Success Message', 'obx-blocks')}
                        value={emailConfig.successMessage}
                        onChange={(value) => updateEmailConfig('successMessage', value)}
                    />
                    <TextControl
                        label={__('Error Message', 'obx-blocks')}
                        value={emailConfig.errorMessage}
                        onChange={(value) => updateEmailConfig('errorMessage', value)}
                    />
                </PanelBody>
                <PanelBody title={__('Colors', 'obx-blocks')}>
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
                <div className="obx-contact__content">
                    <div className="obx-contact__info">
                        <RichText
                            tagName="h2"
                            className="obx-contact__heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Enter heading', 'obx-blocks')}
                            style={{ 
                                backgroundImage: accentColor ? `linear-gradient(transparent 60%, ${accentColor} 60%)` : 'none' 
                            }}
                        />
                        <RichText
                            tagName="div"
                            className="obx-contact__intro-text"
                            value={introText}
                            onChange={(value) => setAttributes({ introText: value })}
                            placeholder={__('Enter introduction text', 'obx-blocks')}
                        />
                    </div>
                    
                    <div className="obx-contact__form-preview">
                        <div className="obx-contact__form">
                            <div className="obx-contact__form-field">
                                <label>{__('Name', 'obx-blocks')}</label>
                                <input type="text" disabled placeholder={__('Your name', 'obx-blocks')} />
                            </div>
                            <div className="obx-contact__form-field">
                                <label>{__('Email', 'obx-blocks')}</label>
                                <input type="email" disabled placeholder={__('Your email', 'obx-blocks')} />
                            </div>
                            <div className="obx-contact__form-field">
                                <label>{__('Message', 'obx-blocks')}</label>
                                <textarea disabled placeholder={__('Your message', 'obx-blocks')} rows="5"></textarea>
                            </div>
                            <button className="obx-contact__form-submit" disabled>
                                {__('Send Message', 'obx-blocks')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 