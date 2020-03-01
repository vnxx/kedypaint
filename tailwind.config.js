module.exports = {
  theme: {
    extend: {
      colors: {
        'primary': '#2A82F0',
        'secondary': '#183560',
        'danger': '#E83A3A',
      },
      width: {
        'container': '565px'
      },
      boxShadow: {
        main: '0 3px 6px 0 rgba(11, 88, 185, 1)',
        sec: '0 3px 6px 0 rgba(11, 88, 185, .26)',
      },
    },
  },
  variants: {
    width: ['responsive'],
    boxShadow: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
  },
  plugins: [],
}
