/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * The React hook 'useBlockProps' provides all the necessary props like the class name.
 * You'll also import components such as `InspectorControls` and `MediaUpload` from the block editor package.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
  useBlockProps,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
  RichText,
  PanelColorSettings,
} from "@wordpress/block-editor";

/**
 * WordPress components for block settings and controls.
 * These components are used to create the block's settings panel in the editor.
 * You can use components like `PanelBody`, `Button`, `SelectControl`, `ToggleControl`, and `RangeControl` to create a user-friendly interface for your block.
 */
import {
  PanelBody,
  Button,
  SelectControl,
  ToggleControl,
  RangeControl,
  ColorPicker,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import "./editor.scss";

// Define the attributes interface for this block
interface BlockAttributes {
  title: string;
  showTitle: boolean;
  titleTextColor: string;
  titleFontSize: number;
  content: string;
  contentTextColor: string;
  contentFontSize: number;
  backgroundColor: string;
  padding: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alignment: "left" | "center" | "right";
}

// Define the props interface for the Edit component
interface EditProps {
  attributes: BlockAttributes;
  setAttributes: (attributes: Partial<BlockAttributes>) => void;
  clientId: string;
  isSelected: boolean;
}

const blockClassName = "test-block";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param props - Properties passed to the function.
 * @param props.attributes - Available block attributes.
 * @param props.setAttributes - Function that updates individual attributes.
 *
 * @return Element to render.
 */
export default function Edit({ attributes, setAttributes }: EditProps) {
  const {
    title,
    showTitle,
    titleTextColor,
    titleFontSize,
    content,
    contentTextColor,
    contentFontSize,
    backgroundColor,
    padding,
    alignment,
  } = attributes;

  const blockProps = useBlockProps({
    className: blockClassName,
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Block Settings", "my-plugin")}>
          {/* Title Settings */}
          <ToggleControl
            label={__("Show Title", "my-plugin")}
            checked={showTitle}
            onChange={(value) => setAttributes({ showTitle: value })}
          />

          {showTitle && (
            <RangeControl
              label={__("Title Font Size (rem)", "my-plugin")}
              value={titleFontSize}
              onChange={(value) => setAttributes({ titleFontSize: value })}
              min={0.1}
              max={5}
            />
          )}

          {/* Content Settings */}
          <RangeControl
            label={__("Content Font Size", "my-plugin")}
            value={contentFontSize}
            onChange={(value) => setAttributes({ contentFontSize: value })}
            min={0.1}
            max={20}
          />
          <SelectControl
            label={__("Content Text Color", "my-plugin")}
            value={contentTextColor}
            options={[
              { label: __("Black", "my-plugin"), value: "#000000" },
              { label: __("White", "my-plugin"), value: "#ffffff" },
              { label: __("Gray", "my-plugin"), value: "#808080" },
            ]}
            onChange={(value) => setAttributes({ contentTextColor: value })}
          />

          {/* Padding settings */}
          <RangeControl
            label={__("Padding Top (rem)", "my-plugin")}
            value={padding.top}
            onChange={(value) =>
              setAttributes({ padding: { ...padding, top: value ?? 0 } })
            }
            min={0}
            max={10}
          />
          <RangeControl
            label={__("Padding Bottom (rem)", "my-plugin")}
            value={padding.bottom}
            onChange={(value) =>
              setAttributes({ padding: { ...padding, bottom: value ?? 0 } })
            }
            min={0}
            max={10}
          />
          <RangeControl
            label={__("Padding Left (rem)", "my-plugin")}
            value={padding.left}
            onChange={(value) =>
              setAttributes({ padding: { ...padding, left: value ?? 0 } })
            }
            min={0}
            max={10}
          />
          <RangeControl
            label={__("Padding Right (rem)", "my-plugin")}
            value={padding.right}
            onChange={(value) =>
              setAttributes({ padding: { ...padding, right: value ?? 0 } })
            }
            min={0}
            max={10}
          />
        </PanelBody>

        {/* Color Settings */}
        <PanelColorSettings
          title={__("Color Settings", "my-plugin")}
          initialOpen={false}
          colorSettings={[
            {
              label: __("Background Color", "my-plugin"),
              value: backgroundColor,
              onChange: (value) => setAttributes({ backgroundColor: value }),
            },
            {
              label: __("Title Color", "my-plugin"),
              value: titleTextColor,
              onChange: (value) => setAttributes({ titleTextColor: value }),
            },
            {
              label: __("Content Color", "my-plugin"),
              value: contentTextColor,
              onChange: (value) => setAttributes({ contentTextColor: value }),
            },
          ]}
        />
      </InspectorControls>

      <section
        {...blockProps}
        style={{
          padding: `${padding.top}rem ${padding.right}rem ${padding.bottom}rem ${padding.left}rem`,
          alignItems: alignment,
          backgroundColor: backgroundColor,
        }}
      >
        {showTitle && (
          <RichText
            tagName="h2"
            className={`${blockClassName}__title`}
            value={title}
            onChange={(value) => setAttributes({ title: value })}
            style={{
              color: titleTextColor,
              fontSize: `${titleFontSize}rem`,
            }}
          />
        )}

        <RichText
          tagName="p"
          className={`${blockClassName}__content`}
          value={content}
          onChange={(value) => setAttributes({ content: value })}
          style={{
            color: contentTextColor,
            fontSize: `${contentFontSize}rem`,
          }}
        />
      </section>
    </>
  );
}
