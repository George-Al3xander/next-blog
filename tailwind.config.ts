import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {      
      width: {
        "responsive": "min(90%,40rem)"
      },
      colors: {
          "primary": "var(--clr-primary)",
          "accent": "var(--clr-accent)"
        
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
}
export default config