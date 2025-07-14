/** @type {import('tailwindcss').Config} */
export default {
  // Optimized content scanning for better CSS purging
  // Only includes files that actually use Tailwind classes
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // Exclude test files and stories to reduce scanning time
    '!./src/**/*.test.{js,ts,jsx,tsx}',
    '!./src/**/*.stories.{js,ts,jsx,tsx}'
  ],

  theme: {
    extend: {
      // Only extend what we actually use to keep CSS minimal
      colors: {
        // Custom colors used in the app
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8'
        }
      },
      animation: {
        // Only include animations we use
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },

  plugins: [
    // Only include plugins we actually use
    // Removed unused plugins to reduce bundle size
  ],

  // Optimize for production builds
  corePlugins: {
    // Disable unused core plugins to reduce CSS size
    preflight: true, // Keep CSS reset
    container: false, // We don't use container
    accessibility: true, // Keep for a11y
    appearance: false, // We don't use appearance
    backdropOpacity: false, // We don't use backdrop opacity
    backgroundAttachment: false, // We don't use bg-attachment
    backgroundClip: true, // We use bg-clip
    backgroundImage: true, // We use gradients
    backgroundOpacity: true, // We use bg-opacity
    backgroundPosition: false, // We don't use bg-position
    backgroundRepeat: false, // We don't use bg-repeat
    backgroundSize: false, // We don't use bg-size
    borderCollapse: false, // We don't use border-collapse
    borderOpacity: true, // We use border-opacity
    boxDecorationBreak: false, // We don't use box-decoration-break
    boxSizing: true, // We use box-sizing
    clear: false, // We don't use clear
    cursor: true, // We use cursor
    display: true, // We use display
    divideColor: false, // We don't use divide
    divideOpacity: false, // We don't use divide
    divideStyle: false, // We don't use divide
    divideWidth: false, // We don't use divide
    fill: false, // We don't use SVG fill
    flex: true, // We use flexbox
    flexDirection: true, // We use flex-direction
    flexGrow: true, // We use flex-grow
    flexShrink: true, // We use flex-shrink
    flexWrap: true, // We use flex-wrap
    float: false, // We don't use float
    fontFamily: true, // We use font-family
    fontSize: true, // We use font-size
    fontSmoothing: true, // We use font-smoothing
    fontStyle: false, // We don't use font-style
    fontVariantNumeric: false, // We don't use font-variant-numeric
    fontWeight: true, // We use font-weight
    gap: true, // We use gap
    gradientColorStops: true, // We use gradients
    gridAutoColumns: false, // We don't use grid
    gridAutoFlow: false, // We don't use grid
    gridAutoRows: false, // We don't use grid
    gridColumn: false, // We don't use grid
    gridColumnEnd: false, // We don't use grid
    gridColumnStart: false, // We don't use grid
    gridRow: false, // We don't use grid
    gridRowEnd: false, // We don't use grid
    gridRowStart: false, // We don't use grid
    gridTemplateColumns: false, // We don't use grid
    gridTemplateRows: false, // We don't use grid
    height: true, // We use height
    inset: true, // We use inset
    justifyContent: true, // We use justify-content
    justifyItems: false, // We don't use justify-items
    justifySelf: false, // We don't use justify-self
    letterSpacing: false, // We don't use letter-spacing
    lineHeight: true, // We use line-height
    listStylePosition: false, // We don't use list-style-position
    listStyleType: false, // We don't use list-style-type
    margin: true, // We use margin
    maxHeight: true, // We use max-height
    maxWidth: true, // We use max-width
    minHeight: true, // We use min-height
    minWidth: true, // We use min-width
    objectFit: false, // We don't use object-fit
    objectPosition: false, // We don't use object-position
    opacity: true, // We use opacity
    order: false, // We don't use order
    outline: true, // We use outline
    overflow: true, // We use overflow
    overscrollBehavior: false, // We don't use overscroll-behavior
    padding: true, // We use padding
    placeContent: false, // We don't use place-content
    placeItems: false, // We don't use place-items
    placeSelf: false, // We don't use place-self
    placeholderColor: true, // We use placeholder colors
    placeholderOpacity: true, // We use placeholder opacity
    pointerEvents: true, // We use pointer-events
    position: true, // We use position
    resize: false, // We don't use resize
    ringColor: true, // We use ring colors
    ringOffsetColor: false, // We don't use ring-offset-color
    ringOffsetWidth: false, // We don't use ring-offset-width
    ringOpacity: true, // We use ring opacity
    ringWidth: true, // We use ring width
    rotate: false, // We don't use rotate
    scale: true, // We use scale
    skew: false, // We don't use skew
    space: true, // We use space
    stroke: false, // We don't use SVG stroke
    strokeWidth: false, // We don't use SVG stroke-width
    tableLayout: false, // We don't use table-layout
    textAlign: true, // We use text-align
    textColor: true, // We use text colors
    textDecoration: false, // We don't use text-decoration
    textDecorationColor: false, // We don't use text-decoration-color
    textDecorationStyle: false, // We don't use text-decoration-style
    textDecorationThickness: false, // We don't use text-decoration-thickness
    textIndent: false, // We don't use text-indent
    textOpacity: true, // We use text opacity
    textOverflow: true, // We use text-overflow
    textTransform: false, // We don't use text-transform
    textUnderlineOffset: false, // We don't use text-underline-offset
    transform: true, // We use transform
    transformOrigin: false, // We don't use transform-origin
    transitionDelay: false, // We don't use transition-delay
    transitionDuration: true, // We use transition-duration
    transitionProperty: true, // We use transition-property
    transitionTimingFunction: true, // We use transition-timing-function
    translate: true, // We use translate
    userSelect: false, // We don't use user-select
    verticalAlign: false, // We don't use vertical-align
    visibility: false, // We don't use visibility
    whitespace: false, // We don't use whitespace
    width: true, // We use width
    wordBreak: false, // We don't use word-break
    zIndex: true // We use z-index
  }
};
