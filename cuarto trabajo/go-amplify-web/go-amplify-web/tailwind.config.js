module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'default': '#fefefe',
        'text': '#707070',
        'rifa': '#425AC5',
        'rifaDate': '#9955D4',
        'primary': '#425AC5',
        'url': '#9955D4',
        'footerGrey': '#ADADAD',
        'border': '#E2E2E2',
        'categorieGrey':'#707070',
        'selectCategorie': '#53E7F2',
      },
      fontFamily: {
        visby: ["VisbyRoundCF", "sans-serif"]
      },
      fontSize: {
        'rifaDateSize': ['14px', '16.8px'],
        'rifaDateSizeM': ['10px', '12px'],
        'categoriaSize': ['10px', '15px'],
        'tittle': ['15px', '18px'],
        'tittleMinM': ['10px', '12px'],
        'tittleM': ['12px', '14.4px'],
        'points': ['24px', '28.8px'],
        'rifaSize': ['28px', '33.6px'],
        'rifaSizeM': ['25px', '30px'],
        'tittleRifa': ['24px', '28.8px']
        
      },
      width: {
        'pointsTable': '350px',
        'infiniteScroll': '340px',
        'pointsTableM': '271px',
        'rifaDescrip': '933px',
        'rifaDescripM': '371px',
        'textNoCampaigns': '526px',
      },
      maxWidth: {
        'hd':'1396px',
        'infiniteScroll': '340px',
        'filter': '410px'
      },
      height: {
        'rifa': '231px',
        'tittle': '93px',
        'tittleM': '69px',
        'pointsTableM': '75px',
        'imageRifaM': '171px',
        'rifaDescripM': '120px',
        'loader': '75vh',
        'campanias': '60vh'
      },
      margin: {
        'text': '3px'
      },
      padding: {
        '13': '50px',
      },
      borderWidth:{
        '0.5': '0.5px'
      },
      borderRadius: {
        'points': '20px',
        'rifa': '10px',
      },
      boxShadow: {
        'points': '0px 2px 10px 0px #B0AEAE40',
        'shadow': '0 4px 8px 0 rgba(0,0,0,0.1),0 6px 20px 0 rgba(0,0,0,0.1)',
        'header': '0px 2px 12px 2px rgba(0, 0, 0, 0.05)'
      },
      backgroundImage: {
        'inset': 'linear-gradient(89.56deg, #9955D4 -2.8%, #425AC5 103.24%)',
        'tittleImg': 'linear-gradient(to top, rgba(82, 82, 82, 0) 0%, #525252 100%)',
        'activeCampaing': 'linear-gradient(93.83deg, rgba(123, 86, 207, 0.96) 8.7%, #53E7F2 132.7%)',
        'campaing': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',
        'Slider': "url('../../src/assets/header/FondoDegradado.jpg')"
      },
      dropShadow: {
        'campaing':'0px 3px 6px rgba(0, 0, 0, 0.25)',
        'circleCampaing':'0px 3px 6px rgba(0, 0, 0, 0.16)',
      },
      screens: {
        'gx': '1335px',
        'dl': {'min':'1020px', 'max':'1335px'},
        'ml': {'min':'768px', 'max':'1020px'},
      },
      transitionPropiety:{
        'width':'width',
        'height':'height'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
};
