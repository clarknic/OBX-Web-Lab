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
    TextareaControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { plus, trash, quote } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Edit function for the About Us block
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        tagline,
        heading,
        introText,
        teamMembers,
        backgroundColor,
        textColor,
        accentColor,
        align,
        textAlign,
    } = attributes;

    const [activeMember, setActiveMember] = useState(null);

    const blockProps = useBlockProps({
        className: `obx-about align${align || 'none'} text-${textAlign || 'center'}`,
        style: {
            backgroundColor,
            color: textColor,
        },
    });

    const addTeamMember = () => {
        const newMembers = [...teamMembers];
        newMembers.push({
            id: `member-${Date.now()}`,
            imageUrl: '',
            imageId: 0,
            imageAlt: '',
            name: '',
            position: '',
            description: '',
            quote: ''
        });
        setAttributes({ teamMembers: newMembers });
    };

    const removeTeamMember = (index) => {
        const newMembers = [...teamMembers];
        newMembers.splice(index, 1);
        setAttributes({ teamMembers: newMembers });
        setActiveMember(null);
    };

    const updateTeamMember = (index, property, value) => {
        const newMembers = [...teamMembers];
        newMembers[index] = {
            ...newMembers[index],
            [property]: value,
        };
        setAttributes({ teamMembers: newMembers });
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
                <PanelBody title={__('About Us Settings', 'obx-blocks')}>
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
                <div className="obx-about__container">
                    <div className="obx-about__header" style={{ textAlign }}>
                        <RichText
                            tagName="div"
                            className="obx-about__tagline"
                            value={tagline}
                            onChange={(value) => setAttributes({ tagline: value })}
                            placeholder={__('OUR TEAM', 'obx-blocks')}
                        />
                        <RichText
                            tagName="h2"
                            className="obx-about__heading"
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                            placeholder={__('Meet the people behind our success', 'obx-blocks')}
                            style={{ 
                                backgroundImage: accentColor ? `linear-gradient(transparent 60%, ${accentColor} 60%)` : 'none' 
                            }}
                        />
                        
                        <RichText
                            tagName="div"
                            className="obx-about__intro-text"
                            value={introText}
                            onChange={(value) => setAttributes({ introText: value })}
                            placeholder={__('Add an introduction about your team or company...', 'obx-blocks')}
                            allowedFormats={['core/bold', 'core/italic', 'core/link']}
                        />
                    </div>
                    
                    <div className="obx-about__team">
                        {teamMembers.map((member, index) => (
                            <div 
                                key={member.id} 
                                className={`obx-about__member ${activeMember === index ? 'is-selected' : ''}`}
                                onClick={() => setActiveMember(index)}
                            >
                                <div className="obx-about__member-image-container">
                                    {member.imageUrl ? (
                                        <img 
                                            src={member.imageUrl} 
                                            alt={member.imageAlt} 
                                            className="obx-about__member-image"
                                        />
                                    ) : (
                                        <div className="obx-about__member-image-placeholder">
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    onSelect={(media) => {
                                                        updateTeamMember(index, 'imageUrl', media.url);
                                                        updateTeamMember(index, 'imageId', media.id);
                                                        updateTeamMember(index, 'imageAlt', media.alt || '');
                                                    }}
                                                    allowedTypes={['image']}
                                                    value={member.imageId}
                                                    render={({ open }) => (
                                                        <Button
                                                            onClick={open}
                                                            className="obx-about__member-image-button"
                                                        >
                                                            {__('Add Image', 'obx-blocks')}
                                                        </Button>
                                                    )}
                                                />
                                            </MediaUploadCheck>
                                        </div>
                                    )}
                                    {member.imageUrl && (
                                        <div className="obx-about__member-image-actions">
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    onSelect={(media) => {
                                                        updateTeamMember(index, 'imageUrl', media.url);
                                                        updateTeamMember(index, 'imageId', media.id);
                                                        updateTeamMember(index, 'imageAlt', media.alt || '');
                                                    }}
                                                    allowedTypes={['image']}
                                                    value={member.imageId}
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
                                                    updateTeamMember(index, 'imageUrl', '');
                                                    updateTeamMember(index, 'imageId', 0);
                                                    updateTeamMember(index, 'imageAlt', '');
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
                                <div className="obx-about__member-content">
                                    <RichText
                                        tagName="h3"
                                        className="obx-about__member-name"
                                        value={member.name}
                                        onChange={(value) => updateTeamMember(index, 'name', value)}
                                        placeholder={__('Team Member Name', 'obx-blocks')}
                                        allowedFormats={['core/bold', 'core/italic']}
                                    />
                                    <RichText
                                        tagName="div"
                                        className="obx-about__member-position"
                                        value={member.position}
                                        onChange={(value) => updateTeamMember(index, 'position', value)}
                                        placeholder={__('Position', 'obx-blocks')}
                                        allowedFormats={['core/bold', 'core/italic']}
                                    />
                                    <RichText
                                        tagName="div"
                                        className="obx-about__member-description"
                                        value={member.description}
                                        onChange={(value) => updateTeamMember(index, 'description', value)}
                                        placeholder={__('Short description...', 'obx-blocks')}
                                        allowedFormats={['core/bold', 'core/italic', 'core/link']}
                                    />
                                    
                                    {member.quote && (
                                        <div className="obx-about__member-quote-container">
                                            <div className="obx-about__member-quote-icon" style={{ color: accentColor }}>
                                                {quote}
                                            </div>
                                            <RichText
                                                tagName="div"
                                                className="obx-about__member-quote"
                                                value={member.quote}
                                                onChange={(value) => updateTeamMember(index, 'quote', value)}
                                                placeholder={__('Personal quote...', 'obx-blocks')}
                                                allowedFormats={['core/bold', 'core/italic']}
                                            />
                                        </div>
                                    )}
                                    
                                    <div className="obx-about__member-actions">
                                        {!member.quote && (
                                            <Button
                                                variant="secondary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    updateTeamMember(index, 'quote', '');
                                                }}
                                                className="obx-about__member-add-quote"
                                                icon={quote}
                                            >
                                                {__('Add Quote', 'obx-blocks')}
                                            </Button>
                                        )}
                                        <Button
                                            isDestructive
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeTeamMember(index);
                                            }}
                                            className="obx-about__member-remove"
                                        >
                                            {__('Remove Member', 'obx-blocks')}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        <Button
                            className="obx-about__add-button"
                            icon={plus}
                            onClick={addTeamMember}
                        >
                            {__('Add Team Member', 'obx-blocks')}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
} 