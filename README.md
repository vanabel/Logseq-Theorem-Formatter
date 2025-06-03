# Logseq Theorem Formatter

A Logseq plugin that formats theorem-like blocks with customizable styles and supports both English and Chinese theorem environments.

## Features

- **Bilingual Support**: Use theorem environments in English, Chinese, or both languages
- **Customizable Environments**: Define your own theorem environments for both English and Chinese
- **Flexible Styling**: Customize font, colors, borders, and spacing
- **Math Formula Support**: Preserves proper formatting for mathematical formulas
- **Real-time Updates**: Automatically formats blocks as you type

## Installation

1. Go to Logseq Settings
2. Navigate to Plugins
3. Search for "Theorem Formatter"
4. Click Install

## Usage

### Basic Usage

1. Create a block with a theorem environment tag (e.g., `#Theorem` or `#定理`)
2. The block will be automatically formatted according to your settings

### Example Blocks

```
#Theorem
This is a theorem block.

#Lemma
This is a lemma block.

#定理
这是一个定理块。

#引理
这是一个引理块。
```

### Language Settings

The plugin supports three language modes:
- English only (`en`)
- Chinese only (`zh`)
- Both languages (`both`)

### Customizing Environments

You can customize theorem environments for both English and Chinese:

1. Go to Plugin Settings
2. Under "English Theorem Environments", enter your custom environments separated by commas
3. Under "Chinese Theorem Environments", enter your custom Chinese environments separated by commas

Default English environments:
```
Theorem, Lemma, Corollary, Proposition, Definition, Example, Remark, Note, Proof
```

Default Chinese environments:
```
定理, 引理, 推论, 命题, 定义, 例子, 注记, 注释, 证明
```

### Styling Options

Customize the appearance of your theorem blocks:

- **Font Family**: Choose your preferred font (e.g., "KaiTi", "楷体", "STKaiti", "华文楷体", serif)
- **Font Size**: Set the size of the text
- **Font Weight**: Choose from normal, bold, or various weights
- **Font Style**: Select normal, italic, or oblique
- **Text Color**: Set the color of the text
- **Background Color**: Choose the background color
- **Border**: Customize border color, width, and style
- **Spacing**: Adjust padding and margin
- **Border Radius**: Set the corner roundness

## Development

### Prerequisites

- Node.js 16 or later
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development:
   ```bash
   npm run dev
   ```

### Building

To build the plugin:
```bash
npm run build
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.