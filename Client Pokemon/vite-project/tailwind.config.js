// module.exports = {
//   content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  theme: {
    extend: {
      keyframes: {
        attack: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(100px)' },
        },
        recoil: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-20px)' },
        },
      },
      animation: {
        attack: 'attack 0.5s ease-in-out',
        recoil: 'recoil 0.5s ease-in-out',
      },
     
    },
  },
  variants: {},
  plugins: [],
}

