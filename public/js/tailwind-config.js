/**
 * StreamFlow Tailwind Configuration
 * Unified config file for consistent theming across all pages
 * @version 2.2.0
 */

tailwind.config = {
  darkMode: 'class',
  theme: {
    fontFamily: {
      'inter': ['Inter', 'sans-serif'],
      'sans': ['Inter', 'system-ui', 'sans-serif']
    },
    extend: {
      colors: {
        // Primary purple palette
        'primary': '#7c3aed',
        'primary-light': '#a855f7',
        'primary-dark': '#6b21a8',
        'secondary': '#9333ea',
        
        // Purple gradient colors
        'purple': {
          '50': '#faf5ff',
          '100': '#f3e8ff',
          '200': '#e9d5ff',
          '300': '#d8b4fe',
          '400': '#c084fc',
          '500': '#a855f7',
          '600': '#9333ea',
          '700': '#7c3aed',
          '800': '#6b21a8',
          '900': '#581c87',
          '950': '#3b0764',
        },
        
        // Cyan accent for highlights
        'accent': {
          '400': '#22d3ee',
          '500': '#06b6d4',
          '600': '#0891b2',
        },
        
        // Dark theme colors (purple-tinted)
        'dark': {
          '950': '#0f0a1a',
          '900': '#1a1025',
          '800': '#251536',
          '700': '#2d1b42',
          '600': '#3d2556',
          '500': '#6E6E8F',
          '400': '#8F8FAF',
          '300': '#AFAFCF',
          '200': '#CFCFEF',
          '100': '#E5E5FF',
        },
        
        // Gray palette (legacy support)
        'gray': {
          '900': '#1a1025',
          '800': '#251536',
          '700': '#2d1b42',
          '600': '#3d2556',
          '500': '#6E6E8F',
          '400': '#8F8FAF',
          '300': '#AFAFCF',
          '200': '#CFCFEF',
          '100': '#E5E5FF',
          '50': '#F5F5FF',
        },
        
        // Glass effect colors
        'glass': {
          'bg': 'rgba(139, 92, 246, 0.08)',
          'border': 'rgba(139, 92, 246, 0.2)',
          'hover': 'rgba(139, 92, 246, 0.12)',
        },
      },
      
      // Custom background images for gradients
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-purple': 'linear-gradient(135deg, #0f0a1a 0%, #1a1025 50%, #0f0a1a 100%)',
        'gradient-btn': 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(139, 92, 246, 0.1) 0%, rgba(139, 92, 246, 0.05) 100%)',
      },
      
      // Box shadows
      boxShadow: {
        'glow': '0 0 20px rgba(124, 58, 237, 0.4)',
        'glow-lg': '0 0 40px rgba(124, 58, 237, 0.3)',
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.3)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.4)',
      },
      
      // Backdrop blur
      backdropBlur: {
        'xs': '2px',
      },
      
      // Animation
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'gradient-shift': 'gradient-shift 15s ease infinite',
      },
      
      keyframes: {
        'glow-pulse': {
          '0%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)' },
          '100%': { boxShadow: '0 0 30px rgba(168, 85, 247, 0.6)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    }
  }
};
