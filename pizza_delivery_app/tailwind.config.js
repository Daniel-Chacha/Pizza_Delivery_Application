/** @type {import('tailwindcss').Config} */

// tailwind.config.js
module.exports ={
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend:{
      extend: {},
      // animation:{
      //   circularSlide: "circularSlide 6s linear infinite"  //loop indefinitely
      // },
      // keyframes:{
      //   circularSlide:{
      //     "0%": {transform: "rotate(0deg) translateX(150px) rotate(0deg"},
      //     // "25%": {transform: "translateX(50px) translateY(50px)"},
      //     // "50%" : {transform: "translateX(0px) translateY(100px)"},
      //     // "75%" : {transform: "translateX(-50px) translateY(50px)"},
      //     "100%": {transform: "rotate(-360deg) translateX(150px) rotate(-360deg"},
      //   }
      // },
    },
  },
  plugins:[],
}
