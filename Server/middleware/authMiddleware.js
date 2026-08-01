import jwt from 'jsonwebtoken'
import user from "../models/user.js"

const protect = async(req,res,next)=>{
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
    try{
        token = req.headers.authorization.split(" ")[1]

        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        req.user= await user.findById(decoded.id).select("-password")

        next();

    }catch (err) {
  console.log("JWT Error:", err);

  return res.status(401).json({
    success: false,
    msg: err.message,
  });
}
    
    }
    if(!token){
        return res.status(401).json({
      success: false,
      message: "No token provided",
    });
    }

}
export default protect;