import jwt from 'jsonwebtoken'

const sign = (payloadInfo) => {

    console.log('Sign Token', process.env.JWT_SCRET);
    // สร้าง jwt
    return jwt.sign(payloadInfo, process.env.JWT_SCRET, {expiresIn: '3d'});
}

const verify = (token) => {
    console.log('Verify Token', process.env.JWT_SECRET);
    return jwt.verify(token, process.env.JWT_SECRET);
  };  
  
export { sign, verify };