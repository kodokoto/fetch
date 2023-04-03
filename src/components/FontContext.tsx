import React from 'react';

const FontContext = React.createContext({
  fontSize: 16,
  setFontSize: () => {},
});

export default FontContext;
