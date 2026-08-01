import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"
import User from "../models/user.js"
//regisssetre
export const registerUser= async (req,res)=>{
    try{
    const {name,email,password}= req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            msg:"All field are Required"
        })
    }
    const userExist= await User.findOne({email});
    if(userExist){
        return res.status(400).json({
            msg:"User Already Exist"
        })
    }
    const salt =await bcrypt.genSalt(10);
    const hashpass= await bcrypt.hash(password,salt);
    const user= await User.create({
        name,
        email,
        password: hashpass
    })
    res.status(201).json({
        success: true,
        msg :" user created successfully",
        token: generateToken(user._id),
        user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    })

    }
    catch(err){
    res.status(500).json({
      message: err.message,
    });
        
    }
}
//login


export const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    res.json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};