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
        "pinkbg": "#F8E8EE",
        "bluesb": "#374259",
        "greenl": "#5C8984",
        "pinkh": "#F15A59"
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
        'rubikwet': ["Rubik Wet Paint", 'cursive'],
        'ptsans': ["PT Sans", 'sans-serif'],
        'montserrat': ["Montserrat", 'sans-serif']
      }      
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
