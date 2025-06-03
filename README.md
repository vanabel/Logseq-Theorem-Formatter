# Logseq Theorem Formatter

A Logseq plugin that formats theorem blocks with proper styling and KaiTi font.

## Features

- Automatically formats theorem blocks with proper styling
- Applies KaiTi font to theorem text while preserving math formula styling
- Supports various theorem formats:
  - Basic theorems: `#Theorem Some text` → `**Theorem.** Some text`
  - Numbered theorems: `#Theorem 1.1 Some text` → `**Theorem 1.1.** Some text`
  - Named theorems: `#Theorem [Name] Some text` → `**Theorem (Name).** Some text`
  - Numbered and named theorems: `#Theorem 1.1 [Name] Some text` → `**Theorem 1.1 (Name).** Some text`

## Installation

1. Go to Logseq Settings
2. Navigate to Plugins
3. Search for "Theorem Formatter"
4. Click Install

## Usage

Simply create a block starting with `#Theorem` and the plugin will automatically format it. The plugin supports the following formats:

1. Basic theorem:
   ```
   #Theorem Some text
   ```
   Will be formatted as:
   ```
   **Theorem.** Some text
   ```

2. Numbered theorem:
   ```
   #Theorem 1.1 Some text
   ```
   Will be formatted as:
   ```
   **Theorem 1.1.** Some text
   ```

3. Named theorem:
   ```
   #Theorem [Name] Some text
   ```
   Will be formatted as:
   ```
   **Theorem (Name).** Some text
   ```

4. Numbered and named theorem:
   ```
   #Theorem 1.1 [Name] Some text
   ```
   Will be formatted as:
   ```
   **Theorem 1.1 (Name).** Some text
   ```

## Styling

- Theorem text is displayed in KaiTi font
- Math formulas (KaTeX) maintain their original styling
- Theorem headers are displayed in bold
- The `#Theorem` tag is hidden after formatting

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