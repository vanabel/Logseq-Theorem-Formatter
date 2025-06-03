import '@logseq/libs'

// Use Logseq's logging system
const log = (msg: string) => {
  logseq.UI.showMsg(msg, 'info')
  console.log(`[Theorem Formatter] ${msg}`)
}

log('Plugin script starting...')

interface BlockEntity {
  uuid: string
  content: string
}

const formatTheorem = (content: string) => {
  const theoremName = content.replace(/^#Theorem\s*/, '').trim()
  return theoremName.match(/^\d+\.\d+$/) 
    ? `**Theorem ${theoremName}.**`  // For numbered theorems like "1.1"
    : `**Theorem (${theoremName}).**` // For named theorems
}

const main = async () => {
  log('Plugin main function starting...')

  // Add CSS for theorem styling
  logseq.provideStyle(`
    /* Style for theorem blocks */
    .ls-block[data-refs-self*="theorem"] {
      font-family: "KaiTi", "楷体", "STKaiti", "华文楷体", serif !important;
    }

    /* Style for theorem block content */
    .ls-block[data-refs-self*="theorem"] .block-content {
      font-family: "KaiTi", "楷体", "STKaiti", "华文楷体", serif !important;
    }

    /* Style for theorem block text */
    .ls-block[data-refs-self*="theorem"] .block-content-wrapper {
      font-family: "KaiTi", "楷体", "STKaiti", "华文楷体", serif !important;
    }

    /* Style for theorem block strong text */
    .ls-block[data-refs-self*="theorem"] strong {
      font-family: "KaiTi", "楷体", "STKaiti", "华文楷体", serif !important;
    }

    /* Style for theorem block paragraphs */
    .ls-block[data-refs-self*="theorem"] p {
      font-family: "KaiTi", "楷体", "STKaiti", "华文楷体", serif !important;
    }

    /* Additional selectors for theorem blocks */
    .ls-block[data-refs-self*="theorem"] .block-content-inner {
      font-family: "KaiTi", "楷体", "STKaiti", "华文楷体", serif !important;
    }

    /* Exclude math formulas from KaiTi font */
    .ls-block[data-refs-self*="theorem"] .katex,
    .ls-block[data-refs-self*="theorem"] .katex-display,
    .ls-block[data-refs-self*="theorem"] .katex-html,
    .ls-block[data-refs-self*="theorem"] .katex-mathml,
    .ls-block[data-refs-self*="theorem"] .katex-html > .katex {
      font-family: KaTeX_Main, "Times New Roman", Times, serif !important;
    }

    /* Preserve math formula styling */
    .ls-block[data-refs-self*="theorem"] .katex-display {
      font-family: KaTeX_Main, "Times New Roman", Times, serif !important;
    }

    .ls-block[data-refs-self*="theorem"] .katex-html {
      font-family: KaTeX_Main, "Times New Roman", Times, serif !important;
    }

    .ls-block[data-refs-self*="theorem"] .katex-mathml {
      font-family: KaTeX_Math, "Times New Roman", Times, serif !important;
    }
  `)

  // Listen for block changes
  logseq.DB.onBlockChanged('*', async (block: any) => {
    try {
      log(`Block changed: ${JSON.stringify(block)}`)
      
      if (!block.content) {
        log('Block has no content')
        return
      }

      if (block.content.startsWith('#Theorem')) {
        log('Found theorem block in change event')
        const formattedName = formatTheorem(block.content)
        log(`Updating block with: ${formattedName}`)
        
        // Add theorem tag to the block
        await logseq.Editor.updateBlock(block.uuid, formattedName, {
          properties: {
            theorem: true,
            type: 'theorem'
          }
        })

        // Try to add the class directly to the block element
        const blockElement = document.querySelector(`[data-block-id="${block.uuid}"]`)
        if (blockElement) {
          blockElement.setAttribute('data-refs-self', 'theorem')
          log('Added theorem attribute to element')
        }
        
        log('Block updated successfully')
      }
    } catch (error) {
      log(`Error processing block: ${error}`)
    }
  })

  // Also try to process existing blocks
  try {
    const blocks = await logseq.DB.q('[:find (pull ?b [*]) :where [?b :block/content ?c] [(clojure.string/starts-with? ?c "#Theorem")]]')
    log(`Found ${blocks?.length || 0} existing theorem blocks`)
    
    if (blocks) {
      for (const block of blocks) {
        if (block.content.startsWith('#Theorem')) {
          const formattedName = formatTheorem(block.content)
          await logseq.Editor.updateBlock(block.uuid, formattedName, {
            properties: {
              theorem: true,
              type: 'theorem'
            }
          })

          // Try to add the class directly to the block element
          const blockElement = document.querySelector(`[data-block-id="${block.uuid}"]`)
          if (blockElement) {
            blockElement.setAttribute('data-refs-self', 'theorem')
          }
        }
      }
    }
  } catch (error) {
    log(`Error processing existing blocks: ${error}`)
  }

  log('Plugin initialization complete')
}

// Initialize the plugin
log('Calling logseq.ready...')
logseq.ready(main).catch((error) => {
  log(`Plugin failed to initialize: ${error}`)
}) 