import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			white: '#FFFFFF',
  			black: '#1C2434',
  			redTail: '#FB5454',
  			'black-2': '#010101',
  			body: '#64748B',
  			bodydark: '#AEB7C0',
  			bodydark1: '#DEE4EE',
  			bodydark2: '#8A99AF',
  			primaryTail: '#3C50E0',
  			secondaryTail: '#80CAEE',
  			stroke: '#E2E8F0',
  			grayTail: '#EFF4FB',
  			graydark: '#333A48',
  			'gray-2': '#F7F9FC',
  			'gray-3': '#FAFAFA',
  			whiten: '#F1F5F9',
  			whiter: '#F5F7FD',
  			boxdark: '#24303F',
  			'boxdark-2': '#1A222C',
  			strokedark: '#2E3A47',
  			'form-strokedark': '#3d4d60',
  			'form-input': '#1d2a39',
  			'meta-1': '#DC3545',
  			'meta-2': '#EFF2F7',
  			'meta-3': '#10B981',
  			'meta-4': '#313D4A',
  			'meta-5': '#259AE6',
  			'meta-6': '#FFBA00',
  			'meta-7': '#FF6766',
  			'meta-8': '#F0950C',
  			'meta-9': '#E5E7EB',
  			'meta-10': '#0FADCF',
  			success: '#219653',
  			danger: '#D34053',
  			warning: '#FFA70B',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
