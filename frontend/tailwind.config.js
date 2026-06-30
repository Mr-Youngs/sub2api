/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 主色调 - Gold / Ink
        primary: {
          50: '#fff9e6',
          100: '#fdf0c5',
          200: '#fae09a',
          300: '#f5d16a',
          400: '#efc940',
          500: '#f0c845',
          600: '#dda931',
          700: '#c08d27',
          800: '#9c7120',
          900: '#7b5818',
          950: '#5a4010'
        },
        // 辅助色 - 深金
        accent: {
          50: '#fff7df',
          100: '#feebbb',
          200: '#fddf93',
          300: '#f9cf63',
          400: '#f3bd3c',
          500: '#dda931',
          600: '#c28f28',
          700: '#a47421',
          800: '#825a1b',
          900: '#644416',
          950: '#48300f'
        },
        // 深色模式背景 - Ink / Blue-gray
        dark: {
          50: '#f4f5f8',
          100: '#e8ebf1',
          200: '#d1d6e2',
          300: '#b0b8c8',
          400: '#8790a6',
          500: '#65708a',
          600: '#4d566d',
          700: '#3b4256',
          800: '#2f3444',
          900: '#292c3b',
          950: '#1f2230'
        }
      },
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'sans-serif'
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace']
      },
      boxShadow: {
        glass: '0 6px 18px rgba(31, 34, 48, 0.06)',
        'glass-sm': '0 2px 8px rgba(31, 34, 48, 0.05)',
        glow: '0 0 14px rgba(240, 200, 69, 0.15)',
        'glow-lg': '0 0 28px rgba(240, 200, 69, 0.2)',
        card: '0 1px 2px rgba(31, 34, 48, 0.05)',
        'card-hover': '0 6px 18px rgba(31, 34, 48, 0.08)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #f0c845 0%, #dda931 100%)',
        'gradient-dark': 'linear-gradient(135deg, #292c3b 0%, #1f2230 100%)',
        'gradient-glass':
          'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'mesh-gradient':
          'radial-gradient(at 40% 20%, rgba(240, 200, 69, 0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(221, 169, 49, 0.08) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(41, 44, 59, 0.06) 0px, transparent 50%)'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
        glow: 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(20, 184, 166, 0.25)' },
          '100%': { boxShadow: '0 0 30px rgba(20, 184, 166, 0.4)' }
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  },
  plugins: []
}
