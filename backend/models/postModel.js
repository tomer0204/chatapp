import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
	postedBy:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User',
		required:true
	},
	text:{
		type:String,
		maxLength:500
	},
	img:{
		type:String,
	},
	likes:{
		type:Number,
		default:0
	},
	replies:[
		{
			userId:{
				type:mongoose.Schema.Types.ObjectId,
				ref:'User',
				required:true
			},
			text:{
				type:String,
				required:true,
				maxLength:500
			},
			userProfilePic:{
				type:String,
			},
			username:{
				type:String,
			}
		}
	]
},
	{
		timestamps:true
	});

const post = mongoose.model('Post', postSchema);

export default post;