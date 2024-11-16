/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["app/**/*.{js,jsx}", "components/**/*.{js,jsx}", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
	  extend: {
		fontFamily: {
		  serif: ['Lora', 'Charter', 'Georgia', 'serif'],
		  sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
		  display: ['Lora', 'Charter', 'Georgia', 'serif'],
		},
		fontSize: {
		  'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
		  'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
		  'display': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
		  'title-lg': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
		  'title': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
		  'body-lg': ['1.25rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
		  'body': ['1.125rem', { lineHeight: '1.7', letterSpacing: '-0.01em' }],
		},
		colors: {
		  border: 'hsl(var(--border))',
		  input: 'hsl(var(--input))',
		  ring: 'hsl(var(--ring))',
		  background: 'hsl(var(--background))',
		  foreground: 'hsl(var(--foreground))',
		  primary: {
			DEFAULT: 'hsl(var(--primary))',
			foreground: 'hsl(var(--primary-foreground))'
		  },
		  secondary: {
			DEFAULT: 'hsl(var(--secondary))',
			foreground: 'hsl(var(--secondary-foreground))'
		  },
		  destructive: {
			DEFAULT: 'hsl(var(--destructive))',
			foreground: 'hsl(var(--destructive-foreground))'
		  },
		  muted: {
			DEFAULT: 'hsl(var(--muted))',
			foreground: 'hsl(var(--muted-foreground))'
		  },
		  accent: {
			DEFAULT: 'hsl(var(--accent))',
			foreground: 'hsl(var(--accent-foreground))'
		  },
		  popover: {
			DEFAULT: 'hsl(var(--popover))',
			foreground: 'hsl(var(--popover-foreground))'
		  },
		  card: {
			DEFAULT: 'hsl(var(--card))',
			foreground: 'hsl(var(--card-foreground))'
		  },
		  'color-1': 'hsl(var(--color-1))',
		  'color-2': 'hsl(var(--color-2))',
		  'color-3': 'hsl(var(--color-3))',
		  'color-4': 'hsl(var(--color-4))',
		  'color-5': 'hsl(var(--color-5))'
		},
		borderRadius: {
		  lg: '`var(--radius)`',
		  md: '`calc(var(--radius) - 2px)`',
		  sm: 'calc(var(--radius) - 4px)'
		},
		animation: {
		  rainbow: 'rainbow var(--speed, 2s) infinite linear'
		},
		keyframes: {
		  rainbow: {
			'0%': {
			  'background-position': '0%'
			},
			'100%': {
			  'background-position': '200%'
			}
		  }
		}
	  }
	},
	plugins: [require("tailwindcss-animate")],
  }