import User from "../models/userModel.js";

const signUpUser = async (req, res) => {
	try{
		const {name,email,username,password} = req.body;
		const user = await User.findOne({$or: [{email}, {username}]});
	}
	catch(err){
		res.status(500).json({message: err.message});
		console.log("error in the signupUser",err);
	}
}
export {signUpUser};