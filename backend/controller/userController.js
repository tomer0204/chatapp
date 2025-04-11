import User from "../models/userModel.js";

const signUpUser = async (req, res) => {
	try{
		const {name,email,username,password} = req.body;
		const user = await User.findOne({$or:[{email},{username}]});

		if(user){
			return res.status(400).json({message:"User already exists"});
		}
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		const newUser = new User({name, email, username, password:hashPassword});
		await newUser.save();
		if(newUser){
			res.status(201).json({
				id:newUser.id,
				name:newUser.name,
				email:newUser.email,
				username:newUser.username,
				password:newUser.password
			});
		}
		else {
			res.status(400).json({message:"Invalid data try again"});
		}
	}
	catch(err){
		res.status(500).json({message: err.message});
		console.log("error in the signupUser",err);
	}
}
export {signUpUser};