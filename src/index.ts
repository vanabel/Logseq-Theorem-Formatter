import '@logseq/libs'

// Use Logseq's logging system
const log = (msg: string) => {
  logseq.UI.showMsg(`[Theorem Formatter] ${msg}`, 'info')
  console.log(`[Theorem Formatter] ${msg}`)
}

log('Plugin script starting...')

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

    /* Style for theorem tags */
    .ls-block[data-refs-self*="theorem"] .tag {
      font-weight: bold !important;
      font-family: "KaiTi", "楷体", "STKaiti", "华文楷体", serif !important;
    }
  `)

  // Listen for block changes
  logseq.DB.onBlockChanged('*', async (block: any) => {
    try {
      if (!block.content) return
      
      // Check if the block starts with #Theorem
      if (block.content.startsWith('#Theorem')) {
        log(`Found new theorem block: ${block.content}`)
        
        await logseq.Editor.updateBlock(block.uuid, block.content, {
          properties: {
            theorem: true,
            type: 'theorem'
          }
        })
        
        log('Block styled successfully')
      }
    } catch (error) {
      log(`Error: ${error}`)
    }
  })

  // Process existing blocks
  try {
    const blocks = await logseq.DB.q('[:find (pull ?b [*]) :where [?b :block/content ?c] [(clojure.string/starts-with? ?c "#Theorem")]]')
    log(`Found ${blocks?.length || 0} existing theorem blocks`)
    
    if (blocks) {
      for (const block of blocks) {
        if (block.content.startsWith('#Theorem')) {
          await logseq.Editor.updateBlock(block.uuid, block.content, {
            properties: {
              theorem: true,
              type: 'theorem'
            }
          })
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