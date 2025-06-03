# Logseq Theorem Formatter

A Logseq plugin that formats theorem blocks with customizable styling and supports multiple theorem environments.

## Features

- Automatically formats theorem blocks with proper styling
- Supports multiple theorem environments (Theorem, Lemma, Corollary, etc.)
- Fully customizable styling through plugin settings
- Preserves math formula styling while applying custom fonts

## Installation

1. Go to Logseq Settings
2. Navigate to Plugins
3. Search for "Theorem Formatter"
4. Click Install

## Usage

Create a block starting with any of the configured theorem environments (e.g., `#Theorem`, `#Lemma`, `#Corollary`, etc.) and the plugin will automatically format it.

## Customization

The plugin provides extensive customization options through the plugin settings:

### Theorem Environments
- Configure which theorem environments to use (e.g., Theorem, Lemma, Corollary)
- Enter environments separated by commas
- Default environments: Theorem, Lemma, Corollary, Proposition, Definition, Example, Remark, Note, Proof

### Styling Options
- Font Family: Choose the font for theorem blocks (default: KaiTi)
- Font Size: Set the size of theorem text
- Font Weight: Choose from various weights (normal, bold, etc.)
- Font Style: Select normal, italic, or oblique
- Text Color: Set the color of theorem text
- Background Color: Choose the background color
- Border: Customize border color, width, and style
- Spacing: Adjust padding and margin
- Border Radius: Set corner roundness

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the plugin:
   ```bash
   npm run build
   ```
4. Load the plugin in Logseq

## License

MIT