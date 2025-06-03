# Logseq Theorem Formatter

A Logseq plugin that transforms `#Theorem` blocks into AMS-style theorem formatting.

## Features

- Transforms blocks starting with `#Theorem` into formatted theorem blocks
- Adds a context menu option to format theorem blocks
- Applies AMS-style formatting with a blue left border and italic text

## Installation

1. Download the latest release from the releases page
2. In Logseq, go to Settings > Advanced > Plugins
3. Click "Load unpacked plugin" and select the downloaded plugin folder

## Usage

1. Create a block starting with `#Theorem` followed by the theorem name
2. Right-click on the block and select "Format as Theorem"
3. The block will be transformed into a formatted theorem block

Example:
```
#Theorem 1.1
```
Will be transformed into:
```
**Theorem 1.1**
```

## Development

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the plugin
4. Load the plugin in Logseq using "Load unpacked plugin"

## License

MIT 