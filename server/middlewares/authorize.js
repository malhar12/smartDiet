const jwt = require('jsonwebtoken');

module.exports = (request, response, next) =>{
  const token = request.get('Authorization');
  try{
    const decodedToken = jwt.verify(token, 'BUENOSECRETKEY');
  } catch(error){
    return response.status(500).json({'payload': 'Auth Failed'});
  }
  next();
};
