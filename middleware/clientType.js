const setClientType = (type) => {
    return (req, res, next) => {
      req.clientType = type;
      next();
    };
  };
  
  module.exports = setClientType;
  