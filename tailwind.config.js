/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'domino' : "url('../assets/background.jpg')",
        'banner' : "url('../assets/landingpage/bannerYoutube.png')",
        'domino-second' : "url('../assets/second-background.jpg')"
      },
      colors:{
        "main" : "#22223b",
        "main-light": "#4a4e69",
        "secondary": "#9a8c98",
        "secondary-light": "#c9ada7",
        "creme": "#f2e9e4",
        "bring-yellow": "#ffd23f",
        "cobao": "#ed1b24",
        "creme-black": "#efc3ab",
        "black-letras": "#00010D",
        "yellow-light": "#F2DC6D",
        "yellow-d": "#F2A922",
        "marron-v": "#73541A",
        "azul-light": "#326FA8",
        "café": "#6A4018"
      },
      boxShadow: {
        'custom' : "0px 6px 20px -4px rgba(255,255,255,0.89);",
        'custom-hover': "0px 6px 41px -4px rgba(255,255,255,0.89);"
        // -webkit-box-shadow: 0px 6px 37px -4px rgba(255,255,255,0.89);
        // -moz-box-shadow: 0px 6px 37px -4px rgba(255,255,255,0.89);
      },
      keyframes: {
        rotar:{
          "0%": {
            transform:' rotate(0);'
          },
          "100%":{
            transform: 'rotate(360deg);'
          }
        }
      },
      animation: {
        'rotando': 'rotar 5s linear infinite'
      },
      fontFamily: {
        'montserrat': ["Montserrat", 'sans-serif'],
        'firaSans': ["Fira Sans", 'sans-serif'],
      }      
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
