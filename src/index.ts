import '@logseq/libs'
import * as marked from 'marked'
import { gfmHeadingId } from 'marked-gfm-heading-id'

// Configure marked with gfm-heading-id and disable all deprecated parameters
marked.use({
  ...gfmHeadingId(),
  mangle: false,
  headerIds: false,
  headerPrefix: ''
})

// Use Logseq's logging system
const log = (msg: string, showPopup: boolean = false) => {
  if (showPopup) {
    logseq.UI.showMsg(`[Theorem Formatter] ${msg}`, 'info')
  }
  console.log(`[Theorem Formatter] ${msg}`)
}

log('Plugin script starting...', false)

// Define settings type
interface TheoremSettings {
  fontFamily: string
  fontSize: string
  fontWeight: string
  fontStyle: string
  textColor: string
  backgroundColor: string
  borderColor: string
  borderWidth: string
  borderStyle: string
  padding: string
  margin: string
  borderRadius: string
  customEnvironments: string
  customChineseEnvironments: string
  language: 'en' | 'zh' | 'both'
}

// Default settings
const defaultSettings: TheoremSettings = {
  fontFamily: '"KaiTi", "楷体", "STKaiti", "华文楷体", serif',
  fontSize: '1em',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textColor: 'inherit',
  backgroundColor: 'transparent',
  borderColor: 'transparent',
  borderWidth: '0px',
  borderStyle: 'none',
  padding: '0px',
  margin: '0px',
  borderRadius: '0px',
  customEnvironments: 'Theorem, Lemma, Corollary, Proposition, Definition, Example, Remark, Note, Proof',
  customChineseEnvironments: '定理, 引理, 推论, 命题, 定义, 例子, 注记, 注释, 证明',
  language: 'en'
}

// Helper function to parse custom environments
const parseCustomEnvironments = (settings: TheoremSettings): string[] => {
  const environments: string[] = []
  
  if (settings.language === 'en' || settings.language === 'both') {
    const enEnvs = (settings.customEnvironments || '')
      .split(',')
      .map(env => env.trim())
      .filter(env => env.length > 0)
    environments.push(...enEnvs)
  }
  
  if (settings.language === 'zh' || settings.language === 'both') {
    const zhEnvs = (settings.customChineseEnvironments || '')
      .split(',')
      .map(env => env.trim())
      .filter(env => env.length > 0)
    environments.push(...zhEnvs)
  }
  
  return environments
}

// Helper function to get settings with defaults
const getSettings = (): TheoremSettings => {
  const settings = logseq.settings
  if (!settings) return defaultSettings
  
  return {
    fontFamily: (settings.fontFamily as string) || defaultSettings.fontFamily,
    fontSize: (settings.fontSize as string) || defaultSettings.fontSize,
    fontWeight: (settings.fontWeight as string) || defaultSettings.fontWeight,
    fontStyle: (settings.fontStyle as string) || defaultSettings.fontStyle,
    textColor: (settings.textColor as string) || defaultSettings.textColor,
    backgroundColor: (settings.backgroundColor as string) || defaultSettings.backgroundColor,
    borderColor: (settings.borderColor as string) || defaultSettings.borderColor,
    borderWidth: (settings.borderWidth as string) || defaultSettings.borderWidth,
    borderStyle: (settings.borderStyle as string) || defaultSettings.borderStyle,
    padding: (settings.padding as string) || defaultSettings.padding,
    margin: (settings.margin as string) || defaultSettings.margin,
    borderRadius: (settings.borderRadius as string) || defaultSettings.borderRadius,
    customEnvironments: (settings.customEnvironments as string) || defaultSettings.customEnvironments,
    customChineseEnvironments: (settings.customChineseEnvironments as string) || defaultSettings.customChineseEnvironments,
    language: (settings.language as 'en' | 'zh' | 'both') || defaultSettings.language
  }
}

// Register settings
logseq.useSettingsSchema([
  {
    key: 'language',
    type: 'enum',
    enumChoices: ['en', 'zh', 'both'],
    default: defaultSettings.language,
    title: 'Language',
    description: 'Choose the language for theorem environments (English, Chinese, or both)'
  },
  {
    key: 'customEnvironments',
    type: 'string',
    default: defaultSettings.customEnvironments,
    title: 'English Theorem Environments',
    description: 'Enter English theorem environments separated by commas (e.g., "Theorem, Lemma, Corollary"). Each environment will be used as a tag (e.g., #Theorem, #Lemma).'
  },
  {
    key: 'customChineseEnvironments',
    type: 'string',
    default: defaultSettings.customChineseEnvironments,
    title: 'Chinese Theorem Environments',
    description: '输入中文定理环境，用逗号分隔（例如："定理, 引理, 推论"）。每个环境将用作标签（例如：#定理, #引理）。'
  },
  {
    key: 'fontFamily',
    type: 'string',
    default: defaultSettings.fontFamily,
    title: 'Font Family',
    description: 'Font family for theorem blocks (e.g., "KaiTi", "楷体", "STKaiti", "华文楷体", serif)'
  },
  {
    key: 'fontSize',
    type: 'string',
    default: defaultSettings.fontSize,
    title: 'Font Size',
    description: 'Font size for theorem blocks (e.g., "1em", "16px")'
  },
  {
    key: 'fontWeight',
    type: 'enum',
    enumChoices: ['normal', 'bold', 'lighter', 'bolder', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
    default: defaultSettings.fontWeight,
    title: 'Font Weight',
    description: 'Font weight for theorem blocks'
  },
  {
    key: 'fontStyle',
    type: 'enum',
    enumChoices: ['normal', 'italic', 'oblique'],
    default: defaultSettings.fontStyle,
    title: 'Font Style',
    description: 'Font style for theorem blocks'
  },
  {
    key: 'textColor',
    type: 'string',
    default: defaultSettings.textColor,
    title: 'Text Color',
    description: 'Text color for theorem blocks (e.g., "#000000", "inherit")'
  },
  {
    key: 'backgroundColor',
    type: 'string',
    default: defaultSettings.backgroundColor,
    title: 'Background Color',
    description: 'Background color for theorem blocks (e.g., "transparent", "#f5f5f5")'
  },
  {
    key: 'borderColor',
    type: 'string',
    default: defaultSettings.borderColor,
    title: 'Border Color',
    description: 'Border color for theorem blocks (e.g., "transparent", "#e0e0e0")'
  },
  {
    key: 'borderWidth',
    type: 'string',
    default: defaultSettings.borderWidth,
    title: 'Border Width',
    description: 'Border width for theorem blocks (e.g., "0px", "1px")'
  },
  {
    key: 'borderStyle',
    type: 'enum',
    enumChoices: ['none', 'solid', 'dashed', 'dotted', 'double'],
    default: defaultSettings.borderStyle,
    title: 'Border Style',
    description: 'Border style for theorem blocks'
  },
  {
    key: 'padding',
    type: 'string',
    default: defaultSettings.padding,
    title: 'Padding',
    description: 'Padding for theorem blocks (e.g., "0px", "10px")'
  },
  {
    key: 'margin',
    type: 'string',
    default: defaultSettings.margin,
    title: 'Margin',
    description: 'Margin for theorem blocks (e.g., "0px", "10px")'
  },
  {
    key: 'borderRadius',
    type: 'string',
    default: defaultSettings.borderRadius,
    title: 'Border Radius',
    description: 'Border radius for theorem blocks (e.g., "0px", "5px")'
  }
])

const main = async () => {
  log('Plugin main function starting...', false)

  // Function to generate CSS based on settings
  const generateCSS = (settings: TheoremSettings) => {
    const environments = parseCustomEnvironments(settings)
    if (environments.length === 0) return ''
    
    const enabledSelectors = environments.map(env => 
      `.ls-block[data-refs-self*="${env.toLowerCase()}"]`
    ).join(',\n')

    return `
      /* Style for theorem blocks */
      ${enabledSelectors} {
        font-family: ${settings.fontFamily} !important;
        font-size: ${settings.fontSize} !important;
        font-weight: ${settings.fontWeight} !important;
        font-style: ${settings.fontStyle} !important;
        color: ${settings.textColor} !important;
        background-color: ${settings.backgroundColor} !important;
        border: ${settings.borderWidth} ${settings.borderStyle} ${settings.borderColor} !important;
        padding: ${settings.padding} !important;
        margin: ${settings.margin} !important;
        border-radius: ${settings.borderRadius} !important;
      }

      /* Style for theorem block content */
      ${enabledSelectors} .block-content {
        font-family: ${settings.fontFamily} !important;
      }

      /* Style for theorem block text */
      ${enabledSelectors} .block-content-wrapper {
        font-family: ${settings.fontFamily} !important;
      }

      /* Style for theorem block strong text */
      ${enabledSelectors} strong {
        font-family: ${settings.fontFamily} !important;
      }

      /* Style for theorem block paragraphs */
      ${enabledSelectors} .block-content-inner {
        font-family: ${settings.fontFamily} !important;
      }

      /* Exclude math formulas from custom font */
      ${enabledSelectors} .katex,
      ${enabledSelectors} .katex-display,
      ${enabledSelectors} .katex-html,
      ${enabledSelectors} .katex-mathml,
      ${enabledSelectors} .katex-html > .katex {
        font-family: KaTeX_Main, "Times New Roman", Times, serif !important;
      }

      /* Preserve math formula styling */
      ${enabledSelectors} .katex-display {
        font-family: KaTeX_Main, "Times New Roman", Times, serif !important;
      }

      ${enabledSelectors} .katex-html {
        font-family: KaTeX_Main, "Times New Roman", Times, serif !important;
      }

      ${enabledSelectors} .katex-mathml {
        font-family: KaTeX_Math, "Times New Roman", Times, serif !important;
      }

      /* Style for theorem tags */
      ${enabledSelectors} .tag {
        font-weight: bold !important;
        font-family: ${settings.fontFamily} !important;
      }
    `
  }

  // Apply styles based on settings
  const applyStyles = () => {
    const settings = getSettings()
    const css = generateCSS(settings)
    if (css) {
      logseq.provideStyle(css)
    }
  }

  // Initial style application
  applyStyles()

  // Listen for settings changes
  logseq.onSettingsChanged(() => {
    log('Settings changed, updating styles...', false)
    applyStyles()
  })

  // Listen for block changes
  logseq.DB.onBlockChanged('*', async (block: any) => {
    try {
      if (!block.content) return
      
      const settings = getSettings()
      const environments = parseCustomEnvironments(settings)
      if (environments.length === 0) return
      
      // Check if the block starts with any of the enabled theorem environments
      const isTheoremBlock = environments.some((env: string) => 
        block.content.startsWith(`#${env}`)
      )
      
      if (isTheoremBlock) {
        const envType = environments.find((env: string) => 
          block.content.startsWith(`#${env}`)
        )?.toLowerCase()
        
        log(`Found new ${envType} block: ${block.content}`, false)
        
        await logseq.Editor.updateBlock(block.uuid, block.content, {
          properties: {
            theorem: true,
            type: envType
          }
        })
        
        log('Block styled successfully', false)
      }
    } catch (error) {
      log(`Error: ${error}`, true) // Show popup for errors
    }
  })

  log('Plugin initialization complete', false)
}

// Initialize the plugin
log('Calling logseq.ready...', false)
logseq.ready(main).catch((error) => {
  log(`Plugin failed to initialize: ${error}`, true) // Show popup for initialization errors
}) 