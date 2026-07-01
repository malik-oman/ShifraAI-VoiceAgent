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



export const saveAssistant = async (req,res) => {
  try {
    const {
      assistantName,
      businessName,
      businessType,
      businessDescription,
      tone,
      theme,
      geminiApiKey,
      pages,
    } = req.body

    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(400).json({message:"user current  failed"})
    }
    user.assistantName = assistantName;
    user.businessName = businessName;
    user.businessType = businessType;
    user.businessDescription = businessDescription;
    user.tone = tone;
    user.theme = theme;

    if (geminiApiKey) {
      user.geminiApiKey = geminiApiKey
    }
    user.geminiStatus = "active"
    user.pages = pages || [];

    user.isSetupComplete = true
    await user.save()

    return res.status(200).json({message:"Assistant saved sucessfully", user})


  } catch (error) {
    return res.status(500).json({message:`assistant setup failed ${error}`}) 
  }
  
}