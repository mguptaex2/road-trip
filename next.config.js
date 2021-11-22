const withLess = require('next-with-less');
module.exports = (config) => {
  const _config = config;
  
  return withLess({ ..._config});
}