const Color = require('color');
const main = "#4689f7";

const theme = {
  colors: {
    main,
    green: '#18cb93',
    orange: '#ff8d38',
    purple: '#8061ef',
    // green: Color(main).mix(Color("green")).string(),
    // orange: Color(main).mix(Color("orange")).string(),
    // purple: Color(main).mix(Color("purple")).string(),
    grey: 'rgba(121, 126, 152, 0.82)',
  },
}

export default theme;