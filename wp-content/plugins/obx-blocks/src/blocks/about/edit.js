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
    RangeControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { plus, trash } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Edit function for the About Us block
 */
export default function Edit({ attributes, setAttributes }) {
    const {
        heading,
        introText,
        teamMembers,
        backgroundColor,
        textColor,
        accentColor,
        align,
        textAlign,
        contentWidth,
    } = attributes;

    const [activeMember, setActiveMember] = useState(null);

    const blockProps = useBlockProps({
        className: `obx-about align${align}`,
        style: {
            textAlign: textAlign,
            '--content-width': `${contentWidth}%`,
            '--background-color': backgroundColor,
            '--text-color': textColor,
            '--accent-color': accentColor,
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
            description: ''
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
                <div className="obx-about__content">
                    
                    <RichText
                        tagName="h2"
                        className="obx-about__heading"
                        value={heading}
                        onChange={(value) => setAttributes({ heading: value })}
                        placeholder={__('Enter a section heading', 'obx-blocks')}
                        style={{ 
                            backgroundImage: accentColor ? `linear-gradient(transparent 60%, ${accentColor} 60%)` : 'none' 
                        }}
                    />
                    <RichText
                        tagName="div"
                        className="obx-about__intro-text"
                        value={introText}
                        onChange={(value) => setAttributes({ introText: value })}
                        placeholder={__('Enter introduction text', 'obx-blocks')}
                    />
                    
                    <div className="obx-about__team">
                        {teamMembers.map((member, index) => (
                            <div 
                                key={member.id} 
                                className={`obx-about__team-member ${activeMember === index ? 'is-selected' : ''}`}
                                onClick={() => setActiveMember(index)}
                            >
                                <div className="obx-about__team-member-image">
                                    {!member.imageUrl ? (
                                        <div className="obx-about__team-member-image-placeholder">
                                            <MediaUploadCheck>
                                                <MediaUpload
                                                    onSelect={(media) => {
                                                        const newMembers = [...teamMembers];
                                                        newMembers[index] = {
                                                            ...newMembers[index],
                                                            imageUrl: media.url,
                                                            imageId: media.id,
                                                            imageAlt: media.alt || media.title || ''
                                                        };
                                                        setAttributes({ teamMembers: newMembers });
                                                    }}
                                                    allowedTypes={['image']}
                                                    value={member.imageId}
                                                    render={({ open }) => (
                                                        <Button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                open();
                                                            }}
                                                            className="obx-about__team-member-image-button"
                                                            icon={plus}
                                                        >
                                                            {__('Add Image', 'obx-blocks')}
                                                        </Button>
                                                    )}
                                                />
                                            </MediaUploadCheck>
                                        </div>
                                    ) : (
                                        <div className="obx-about__team-member-image-wrapper">
                                            <img 
                                                src={member.imageUrl} 
                                                alt={member.imageAlt || member.name}
                                            />
                                            <div className="obx-about__team-member-image-actions">
                                                <MediaUploadCheck>
                                                    <MediaUpload
                                                        onSelect={(media) => {
                                                            const newMembers = [...teamMembers];
                                                            newMembers[index] = {
                                                                ...newMembers[index],
                                                                imageUrl: media.url,
                                                                imageId: media.id,
                                                                imageAlt: media.alt || media.title || ''
                                                            };
                                                            setAttributes({ teamMembers: newMembers });
                                                        }}
                                                        allowedTypes={['image']}
                                                        value={member.imageId}
                                                        render={({ open }) => (
                                                            <Button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    open();
                                                                }}
                                                                variant="secondary"
                                                                isSmall
                                                            >
                                                                {__('Replace', 'obx-blocks')}
                                                            </Button>
                                                        )}
                                                    />
                                                </MediaUploadCheck>
                                                <Button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const newMembers = [...teamMembers];
                                                        newMembers[index] = {
                                                            ...newMembers[index],
                                                            imageUrl: '',
                                                            imageId: 0,
                                                            imageAlt: ''
                                                        };
                                                        setAttributes({ teamMembers: newMembers });
                                                    }}
                                                    variant="secondary"
                                                    isSmall
                                                    isDestructive
                                                >
                                                    {__('Remove', 'obx-blocks')}
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="obx-about__team-member-content">
                                    <RichText
                                        tagName="h3"
                                        className="obx-about__team-member-name"
                                        value={member.name}
                                        onChange={(value) => updateTeamMember(index, 'name', value)}
                                        placeholder={__('Team Member Name', 'obx-blocks')}
                                    />
                                    <RichText
                                        tagName="div"
                                        className="obx-about__team-member-position"
                                        value={member.position}
                                        onChange={(value) => updateTeamMember(index, 'position', value)}
                                        placeholder={__('Position', 'obx-blocks')}
                                    />
                                    <RichText
                                        tagName="div"
                                        className="obx-about__team-member-description"
                                        value={member.description}
                                        onChange={(value) => updateTeamMember(index, 'description', value)}
                                        placeholder={__('Short description...', 'obx-blocks')}
                                    />
                                </div>
                                
                                <Button
                                    isDestructive
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeTeamMember(index);
                                    }}
                                    className="obx-about__team-member-remove"
                                    icon={trash}
                                >
                                    {__('Remove Member', 'obx-blocks')}
                                </Button>
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