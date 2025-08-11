/**
 * Registers the Hero block.
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 */
import "./style.scss";
import "./editor.scss";

/**
 * Internal dependencies
 */
import Edit from "./edit";
import metadata from "./block.json";

/**
 * Register the block
 */
// @ts-ignore - WordPress types are incomplete for block.json metadata
registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
});
