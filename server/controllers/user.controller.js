import User from "../models/user.model.js"



export const getCurrentUser = async (req,res) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(400).json({message:"user get failed"})
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({message:`get user error ${error}`}) 
  }
}