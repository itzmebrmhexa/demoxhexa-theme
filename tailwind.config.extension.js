/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║          DEMO X HEXA TAILWIND CONFIG EXTENSION v1.0              ║
 * ║        Tailwind CSS Theme Extensions for Pterodactyl             ║
 * ║                  Created by: itzmebrmhexa                        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * 
 * This file contains Tailwind CSS configuration extensions for the
 * Demo X Hexa theme. Merge these settings with your existing
 * tailwind.config.js file.
 * 
 * INSTALLATION:
 * Add these values to your existing Tailwind config's theme.extend section
 */

module.exports = {
  theme: {
    extend: {
      // ============================================
      // CUSTOM COLORS - CYBER RED/BLACK THEME
      // ============================================
      colors: {
        'cyber-red': {
          50: '#ffe5e5',
          100: '#ffcccc',
          200: '#ff9999',
          300: '#ff6666',
          400: '#ff3333',
          500: '#FF0000',  // Primary
          600: '#dc143c',  // Secondary
          700: '#cc0000',
          800: '#990000',
          900: '#8B0000',  // Dark
        },
        'cyber-black': {
          950: '#000000',  // Primary black
          900: '#0a0a0a',  // Secondary
          800: '#1a1a1a',  // Tertiary
          700: '#2a2a2a',  // Dark gray
          600: '#333333',  // Medium gray
          500: '#4a4a4a',  // Light gray
          400: '#666666',
          300: '#999999',
          200: '#cccccc',
          100: '#e5e5e5',
        },
        'cyber-accent': {
          red: '#FF073A',     // Neon red
          cyan: '#00FFFF',    // Cyber cyan
          green: '#00FF00',   // Matrix green
          purple: '#9D00FF',  // Neon purple
          orange: '#FFA500',  // Warning orange
        }
      },
      
      // ============================================
      // CUSTOM FONT FAMILIES
      // ============================================
      fontFamily: {
        'cyber': ['"Share Tech Mono"', 'Consolas', '"Courier New"', 'monospace'],
        'mono': ['Consolas', '"Courier New"', 'monospace'],
      },
      
      // ============================================
      // CUSTOM BOX SHADOWS
      // ============================================
      boxShadow: {
        'cyber-red-sm': '0 0 10px rgba(255, 0, 0, 0.3)',
        'cyber-red': '0 0 20px rgba(255, 0, 0, 0.5)',
        'cyber-red-lg': '0 0 40px rgba(255, 0, 0, 0.8)',
        'cyber-red-xl': '0 0 60px rgba(255, 0, 0, 1)',
        'cyber-glow': '0 0 10px #FF073A',
        'cyber-glow-lg': '0 0 20px #FF073A, 0 0 40px #FF073A',
        'neon-red': '0 0 5px #FF0000, 0 0 10px #FF0000, 0 0 20px #FF0000, 0 0 40px #FF0000',
        'neon-cyan': '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 20px #00FFFF',
        'neon-green': '0 0 5px #00FF00, 0 0 10px #00FF00, 0 0 20px #00FF00',
      },
      
      // ============================================
      // CUSTOM DROP SHADOWS
      // ============================================
      dropShadow: {
        'cyber-red': '0 0 20px rgba(255, 0, 0, 0.5)',
        'cyber-red-lg': '0 0 40px rgba(255, 0, 0, 0.8)',
        'neon': '0 0 10px currentColor',
        'glow': ['0 0 10px currentColor', '0 0 20px currentColor'],
      },
      
      // ============================================
      // CUSTOM TEXT SHADOWS (via plugin)
      // ============================================
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.5)',
        'DEFAULT': '0 2px 4px rgba(0, 0, 0, 0.5)',
        'lg': '0 8px 16px rgba(0, 0, 0, 0.5)',
        'cyber-red': '0 0 10px #FF0000',
        'cyber-red-lg': '0 0 20px #FF0000, 0 0 40px #FF0000',
        'neon-red': '0 0 5px #FF0000, 0 0 10px #FF0000, 0 0 20px #FF0000',
        'neon-cyan': '0 0 5px #00FFFF, 0 0 10px #00FFFF',
        'neon-green': '0 0 5px #00FF00, 0 0 10px #00FF00',
        'glitch': '-2px 0 #FF0000, 2px 0 #00FFFF',
      },
      
      // ============================================
      // CUSTOM ANIMATIONS
      // ============================================
      animation: {
        // Glitch effects
        'glitch': 'glitch 0.3s infinite',
        'glitch-intense': 'glitch-intense 0.5s infinite',
        'glitch-rgb': 'glitch-rgb-split 0.3s infinite',
        
        // Neon effects
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
        'neon-flicker': 'neon-flicker 3s infinite',
        
        // Fade animations
        'fade-in': 'fade-in 0.5s ease',
        'fade-in-up': 'fade-in-up 0.6s ease',
        'fade-in-down': 'fade-in-down 0.6s ease',
        
        // Zoom animations
        'zoom-in': 'zoom-in 0.5s ease',
        'zoom-pulse': 'zoom-pulse 1s ease infinite',
        
        // Bounce animations
        'bounce-in': 'bounce-in 0.7s ease',
        
        // Slide animations
        'slide-in-up': 'slide-in-up 0.5s ease',
        'slide-in-down': 'slide-in-down 0.5s ease',
        'slide-in-left': 'slide-in-left 0.5s ease',
        'slide-in-right': 'slide-in-right 0.5s ease',
        
        // Rotate animations
        'spin-slow': 'spin 3s linear infinite',
        'spin-reverse': 'spin-reverse 2s linear infinite',
        
        // Pulse animations
        'pulse-fast': 'pulse 1s ease infinite',
        'pulse-slow': 'pulse 3s ease infinite',
        
        // Cyber specific
        'matrix-rain': 'matrix-rain 10s linear infinite',
        'cyber-grid': 'cyber-grid-move 20s linear infinite',
        'holographic': 'holographic 3s ease infinite',
        'hex-float': 'hex-float 3s ease-in-out infinite',
        'data-stream': 'data-stream-horizontal 3s linear infinite',
        'scanline': 'scanlines 10s linear infinite',
      },
      
      // ============================================
      // CUSTOM KEYFRAMES
      // ============================================
      keyframes: {
        // Already defined in CSS, but listed here for reference
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'glitch-intense': {
          '0%, 100%': { transform: 'translate(0) skew(0deg)' },
          '10%': { transform: 'translate(-5px, -5px) skew(2deg)' },
          '20%': { transform: 'translate(5px, 5px) skew(-2deg)' },
          '30%': { transform: 'translate(-5px, 5px) skew(1deg)' },
          '40%': { transform: 'translate(5px, -5px) skew(-1deg)' },
        },
        'neon-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px #FF073A, 0 0 10px #FF073A, 0 0 20px #FF073A' },
          '50%': { boxShadow: '0 0 10px #FF073A, 0 0 20px #FF073A, 0 0 40px #FF073A, 0 0 80px #FF0000' },
        },
        'fade-in': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'fade-in-up': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'holographic': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      
      // ============================================
      // CUSTOM SPACING
      // ============================================
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      
      // ============================================
      // CUSTOM BORDER RADIUS
      // ============================================
      borderRadius: {
        'cyber': '4px',
        'cyber-lg': '8px',
        'cyber-xl': '12px',
      },
      
      // ============================================
      // CUSTOM Z-INDEX
      // ============================================
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // ============================================
      // CUSTOM BACKDROP BLUR
      // ============================================
      backdropBlur: {
        'xs': '2px',
      },
      
      // ============================================
      // CUSTOM BACKGROUND IMAGES
      // ============================================
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(255, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 0, 0.03) 1px, transparent 1px)',
        'cyber-gradient': 'linear-gradient(45deg, #8B0000, #FF0000)',
        'cyber-gradient-v': 'linear-gradient(180deg, #8B0000, #FF0000)',
        'holographic': 'linear-gradient(45deg, #FF0000, #00FFFF, #FF073A)',
      },
      
      // ============================================
      // CUSTOM BACKGROUND SIZES
      // ============================================
      backgroundSize: {
        'cyber-grid': '50px 50px',
      },
      
      // ============================================
      // CUSTOM TRANSITIONS
      // ============================================
      transitionDuration: {
        '2000': '2000ms',
        '3000': '3000ms',
      },
      
      // ============================================
      // CUSTOM TRANSFORMS
      // ============================================
      scale: {
        '102': '1.02',
      },
    },
  },
  
  // ============================================
  // PLUGINS
  // ============================================
  plugins: [
    // Text Shadow Plugin
    function({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
};
