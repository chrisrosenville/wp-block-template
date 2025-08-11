# WordPress Block Template

A complete boilerplate for creating custom WordPress blocks with TypeScript, React, and modern development tools.

## 🚀 Features

- 📦 **TypeScript Support** - Type-safe development with full TypeScript integration
- ⚛️ **React Components** - Modern React hooks and functional components
- 🎨 **SCSS Styling** - Organized styling with BEM methodology and mobile-first approach
- 🔧 **WordPress Block API v3** - Latest block registration and attribute system
- 🎯 **Inspector Controls** - Comprehensive sidebar controls with tabbed interface
- 🎨 **Color Management** - Built-in color picker integration
- 📐 **Layout Controls** - Spacing, padding, and layout customization
- 🔄 **Server-side Rendering** - PHP render files for optimal performance

## 📁 File Structure

```
wp-block-template/
├── README.md           # This setup guide
├── block.json          # Block metadata and attributes ⭐
├── index.ts            # TypeScript entry point ⭐
├── edit.tsx            # React editor component ⭐
├── render.php          # Server-side rendering ⭐
├── editor.scss         # Editor-only styles
└── style.scss          # Frontend styles
```

## 🛠️ Setup & Customization Guide

### Step 1: Initial Setup

1. **Copy the template:**

   ```bash
   cp -r wp-block-template my-new-block
   cd my-new-block
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start development:**
   ```bash
   npm run start  # Development with watch mode
   ```

### Step 2: Configure Block Metadata (`block.json`) ⭐

The `block.json` file is the foundation of your block. Update these key fields:

```json
{
  "name": "plugin-name/block-name", // 👈 Follow this convention
  "title": "Your Block Title",
  "description": "Description of what your block does",
  "textdomain": "plugin-name", // 👈 Must match plugin name
  "attributes": {
    // 👇 Define all customizable settings here
    "title": {
      "type": "string",
      "default": "Block Title"
    },
    "backgroundColor": {
      "type": "string",
      "default": "#ffffff"
    },
    "showTitle": {
      "type": "boolean",
      "default": true
    }
    // Add more attributes as needed...
  }
}
```

**Naming Convention Rules:**

- **Block Name**: `plugin-name/block-name` (lowercase, hyphens only)
- **Title**: Human-readable name shown in block inserter

**Attribute Types:**

- `string` - Text values (colors, text, URLs)
- `number` - Numeric values (sizes, counts, positions)
- `boolean` - True/false toggles
- `array` - Lists of items
- `object` - Complex structured data

### Step 3: Update TypeScript Interface (`edit.tsx`) ⭐

**Every attribute in `block.json` must be added to the BlockAttributes interface:**

```typescript
interface BlockAttributes {
  // 👇 Match EXACTLY with block.json attributes
  title: string;
  backgroundColor: string;
  showTitle: boolean;
  // Add all your attributes here with correct TypeScript types
}
```

**Type Mapping:**

- `"type": "string"` → `string`
- `"type": "number"` → `number`
- `"type": "boolean"` → `boolean`
- `"type": "array"` → `Array<YourType>`
- `"type": "object"` → `{ key: value }`

### Step 4: Update TypeScript Registration (`index.ts`) ⭐

Update the block registration to match your `block.json`:

```typescript
registerBlockType("plugin-name/block-name", {
  // 👈 Match block.json name
  title: __("Your Block Title", "plugin-name"), // 👈 Match textdomain
  // ... other settings
  attributes: {
    // 👇 Copy attributes from block.json
    title: {
      type: "string",
      default: "Block Title",
    },
    backgroundColor: {
      type: "string",
      default: "#ffffff",
    },
    // ... all other attributes
  },
});
```

### Step 5: Configure PHP Rendering (`render.php`) ⭐

**At the top of the file, create variables for ALL attributes:**

```php
<?php
// 👇 Extract ALL attributes from block.json with defaults
$title = $attributes['title'] ?? 'Block Title';
$background_color = $attributes['backgroundColor'] ?? '#ffffff';
$show_title = $attributes['showTitle'] ?? true;
// Add variables for every attribute in block.json...

// Generate unique ID for this block instance
$block_id = 'wp-block-plugin-name-block-name-' . wp_generate_uuid4();

// Continue with rendering logic...
?>
```

**Security Best Practices:**

- Use `esc_attr()` for HTML attributes
- Use `wp_kses_post()` for rich content
- Use `esc_url()` for URLs
- Always provide fallback defaults with `??`

### Step 6: Add Inspector Controls

Add controls in the edit component for each attribute:

```typescript
// Text input
<TextControl
  label={__('Block Title', 'plugin-name')}
  value={title}
  onChange={(value) => setAttributes({ title: value })}
/>

// Color picker (add to PanelColorSettings)
{
  value: backgroundColor,
  onChange: (value) => setAttributes({ backgroundColor: value || '#ffffff' }),
  label: __('Background Color', 'plugin-name'),
}

// Toggle control
<ToggleControl
  label={__('Show Title', 'plugin-name')}
  checked={showTitle}
  onChange={(value) => setAttributes({ showTitle: value })}
/>
```

## 🔧 Common Customization Examples

### Adding a New Color Attribute

1. **In `block.json`:**

```json
"textColor": {
  "type": "string",
  "default": "#333333"
}
```

2. **In `edit.tsx` interface:**

```typescript
interface BlockAttributes {
  textColor: string;
  // ... other attributes
}
```

3. **In `edit.tsx` controls:**

```typescript
// Add to PanelColorSettings array
{
  value: textColor,
  onChange: (value) => setAttributes({ textColor: value || '#333333' }),
  label: __('Text Color', 'plugin-name'),
}
```

4. **In `render.php`:**

```php
$text_color = $attributes['textColor'] ?? '#333333';
// Use in HTML: style="color: <?php echo esc_attr($text_color); ?>"
```

### Adding a Range Control

1. **In `block.json`:**

```json
"fontSize": {
  "type": "number",
  "default": 16
}
```

2. **In `edit.tsx`:**

```typescript
// Interface
fontSize: number;

// Control
<RangeControl
  label={__('Font Size', 'plugin-name')}
  value={fontSize}
  onChange={(value) => setAttributes({ fontSize: value ?? 16 })}
  min={12}
  max={48}
  step={2}
/>
```

### Adding a Select Dropdown

1. **In `block.json`:**

```json
"alignment": {
  "type": "string",
  "default": "center",
  "enum": ["left", "center", "right"]
}
```

2. **In `edit.tsx`:**

```typescript
<SelectControl
  label={__('Text Alignment', 'plugin-name')}
  value={alignment}
  onChange={(value) => setAttributes({ alignment: value as 'left' | 'center' | 'right' })}
  options={[
    { label: __('Left', 'plugin-name'), value: 'left' },
    { label: __('Center', 'plugin-name'), value: 'center' },
    { label: __('Right', 'plugin-name'), value: 'right' },
  ]}
/>
```

## 🚀 Development Workflow

### Build Commands

```bash
# Development with hot reload
npm run start

# Production build
npm run build

# Code linting
npm run lint:js
npm run lint:css

# Format code
npm run format
```

### Testing Checklist

- [ ] Block appears in inserter
- [ ] All controls work correctly
- [ ] Block saves and loads properly
- [ ] Frontend matches editor preview
- [ ] Responsive design works
- [ ] Accessibility is maintained

## 🔌 WordPress Plugin Integration

### Method 1: Copy `sample-plugin.php`

1. Copy `sample-plugin.php` to your plugin directory
2. Rename it to match your plugin name
3. Update the plugin header information
4. Copy the `build/` folder to your plugin directory

### Method 2: Add to Existing Plugin

```php
function your_plugin_register_blocks() {
    register_block_type_from_metadata(__DIR__ . '/build/your-block');
}
add_action('init', 'your_plugin_register_blocks');
```

## 📚 Key Concepts

### Block Attributes

- Define all customizable settings in `block.json`
- Must match exactly across all files
- Use appropriate data types
- Always provide sensible defaults

### TypeScript Integration

- Strict type checking prevents runtime errors
- Interfaces must match block.json attributes
- Use `??` for null coalescing in range controls

### Security

- Always escape output in PHP
- Sanitize user inputs
- Use WordPress helper functions
- Validate attribute types

## 🐛 Troubleshooting

**Block doesn't appear:**

- Check block name matches in all files
- Verify build files are generated
- Confirm WordPress registration

**Controls don't save:**

- Ensure attribute exists in block.json
- Check TypeScript interface matches
- Verify setAttributes usage

**TypeScript errors:**

- Match interfaces with block.json
- Use proper type assertions
- Check for undefined values

## 📖 Additional Resources

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

---

**Happy Block Building! 🎉**

```bash
git clone [repository-url] my-new-block
cd my-new-block
```

2. **Customize the block:**

   - Update `block.json` with your block details
   - Modify `edit.tsx` for your editor interface
   - Update `render.php` for frontend output
   - Customize styles in `editor.scss` and `style.scss`

3. **Build and test:**
   ```bash
   npm run build
   # Add to your WordPress plugin and test
   ```

## File Structure

```
wp-block-template/
├── README.md                 # This documentation
├── block.json          # Block metadata and attributes
├── index.ts            # TypeScript entry point
├── edit.tsx            # React editor component
├── render.php          # Server-side rendering
├── editor.scss         # Editor-only styles
└── style.scss          # Frontend styles
```

## Customization Guide

### 1. Block Metadata (`block.json`)

- Update `name`, `title`, `description`
- Define your custom attributes
- Set category and keywords
- Configure supports options

### 2. Editor Component (`edit.tsx`)

- Modify the TypeScript interfaces
- Update inspector controls
- Customize the editor preview
- Add your block's functionality

### 3. Frontend Rendering (`render.php`)

- Update PHP rendering logic
- Handle attribute sanitization
- Customize HTML output structure

### 4. Styling (`*.scss`)

- Update CSS custom properties
- Modify responsive breakpoints
- Customize visual effects
- Maintain BEM methodology

## Development Workflow

1. **Start Development:**

   ```bash
   npm run start
   # Enables watch mode for development
   ```

2. **Build for Production:**

   ```bash
   npm run build
   # Creates optimized production files
   ```

3. **Code Quality:**
   ```bash
   npm run lint
   # Check TypeScript and code quality
   ```

## Block Registration

Add to your WordPress plugin's main PHP file:

```php
function register_my_custom_block() {
    register_block_type_from_metadata(__DIR__ . '/build');
}
add_action('init', 'register_my_custom_block');
```

## Best Practices

- ✅ Use TypeScript interfaces for type safety
- ✅ Implement proper accessibility features
- ✅ Follow WordPress coding standards
- ✅ Use semantic HTML structure
- ✅ Implement mobile-first responsive design
- ✅ Sanitize and escape all dynamic content
- ✅ Use WordPress components when possible
- ✅ Maintain consistent code formatting

## Attributes System

The template includes a flexible attributes system:

```typescript
interface BlockAttributes {
  // Content attributes
  title: string;
  content: string;

  // Layout attributes
  alignment: string;
  columns: number;
  gap: number;

  // Styling attributes
  backgroundColor: string;
  textColor: string;
  padding: number;
  borderRadius: number;

  // Behavior attributes
  showTitle: boolean;
  animationEffect: string;
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

GPL-2.0-or-later - WordPress compatible license

---

**Happy Block Building! 🚀**
