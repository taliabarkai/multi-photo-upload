import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/** Figma Make exports use figma:asset/... which only resolves inside Figma. */
function figmaAssetPlaceholder(): Plugin {
  const prefix = '\0figma-asset:'
  return {
    name: 'figma-asset-placeholder',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) return prefix + id.slice('figma:asset/'.length)
    },
    load(id) {
      if (!id.startsWith(prefix)) return
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800"><rect fill="#e8e8ea" width="100%" height="100%"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-family="Poppins,sans-serif" font-size="18">Asset</text></svg>`
      const href = `data:image/svg+xml,${encodeURIComponent(svg)}`
      return `export default ${JSON.stringify(href)}`
    },
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    figmaAssetPlaceholder(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
