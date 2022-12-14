module.exports = {
  content: [
    './public/**/*.html',
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {
   
      gridTemplateRows: {
        // Simple 8 row grid
        '11': 'repeat(11, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      gridTemplateColumns: {
        // Simple 8 row grid
        '11': 'repeat(11, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      keyframes: {
        hangdown: {
          '0%': { transform: 'y:-300' },
          '10%': { transform: 'y:-250' },
          '20%': { transform: 'y:-200' },
          '30%': { transform: 'y:-150' },
          '40%': { transform: 'y:-100' },
          '50%': { transform: 'y:-50' },
          '60%': { transform: 'y:-20' },
          '100%': { transform: 'y:0' },
        },
      },
      fontFamily:{

        BVP:['Be Vietnam Pro', 'sans-serif']
      },
      animation: {
        'hang': 'hangdown 1s linear 1',
      },
      transitionTimingFunction: {
        'bounced': 'cubic-bezier(.41,1.62,.39,.63)',
        'return': 'cubic-bezier(.29,1.25,.4,1.14)',
 
      },
      backgroundImage: {
        'docnhalang': "url('https://live.staticflickr.com/65535/52253442418_dcbffc95a5_o.png')",
        'steam': "url('https://live.staticflickr.com/65535/52253921060_5846d295c2_o.png')",
        'artTech':"url('https://live.staticflickr.com/65535/52252463067_221b4d3acd_o.png')",
        'shop':"url('/src/component/Shop/heropic.svg')"
        
       
      },
      fontSize: {
        'aCaption': '0.875rem',
        'aCaptionVw': '0.985vw',
        'aButton': '1.1722vw',
        'aButtonVw': '1.1rem',
        'aPara': '1.375rem',
        'aParaVw': '1.375rem',
        'aSubtitle': '2rem',
        'aSubtitleVw': ' 2.0835vw',
        'aTitle2': '4rem',
        'aTitle2Vw': '4rem',
        'aTitle1': '6rem',
        'aTitle1Vw': '6.875vw',
      },
      fontWeight: {
        'title-Subtitle':500,
        'title2-caption':400,
        'p':300,
        'button':600,
        'button-sec':500,
        'caption-600':600
      },
      colors: {
        'primary': '#F7F3EE',
        'whiteText':'#FFFFFF',
        'primaryBlack':'#191919',
        'primaryYellow':'#ffdd00'
      },
   
    },
  },
  plugins: [
 
    require('@tailwindcss/typography'),
  ],
}
