import React, { useState } from 'react'
import { FiCopy, FiPlus, FiTrash2 } from 'react-icons/fi'
import axios from 'axios'
import { CLIENT_URL, ServerUrl } from '../App';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

const THEME = ["light", "dark", "glass", "neon"];
const TONES = ["friendly", "professional", "sales"];

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Builder = ({ user, setUser }) => {

  const [editAssistant, setEditAssistant] = useState(!user?.isSetupComplete)

  const [assistantName, setAssistantName] = useState(user?.assistantName || "")
  const [businessName, setBusinessName] = useState(user?.businessName || "")
  const [businessType, setBusinessType] = useState(user?.businessType || "")
  const [businessDescription, setBusinessDescription] = useState(user?.businessDescription || "")
  const [theme, setTheme] = useState(user?.theme || "dark")
  const [tone, setTone] = useState(user?.tone || "friendly")
  const [geminiApiKey, setGeminiApiKey] = useState(user?.geminiApiKey || "")

  const [pages, setPages] = useState(user?.pages || []);
  const [pageName, setPageName] = useState("");
  const [pagePath, setPagePath] = useState("")
  const [pageKeyWords, setPageKeyWords] = useState("")

  const addPages = () => {
    if (!pageName || !pagePath) return toast.error("Page Name and Path are required");
    const newPage = {
      name: pageName,
      path: pagePath,
      keywords: pageKeyWords.split(",").map((k) => k.trim()).filter(k => k)
    }
    setPages([...pages, newPage])
    setPageName("")
    setPagePath("")
    setPageKeyWords("")
    toast.success("Page Added");
  }

  const removePage = (index) => {
    const updatePages = pages.filter((_, i) => i !== index)
    setPages(updatePages)
    toast.success("Page Removed");
  }

  const saveAssistant = async () => {
    try {
      const data = { assistantName, businessName, businessType, businessDescription, tone, theme, geminiApiKey, pages }
      const res = await axios.post(ServerUrl + "/api/user/save-assistant", data, { withCredentials: true })
      setUser(res.data.user)
      setEditAssistant(false)
      toast.success("Assistant Saved Successfully")
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Failed to save assistant")
    }
  }

  const remainingMessages = Math.max(0, (user?.requestLimit || 0) - (user?.totalMessages || 0))
  const remainingDays = user?.proExpiresAt ? Math.max(0, Math.ceil((new Date(user.proExpiresAt) - new Date()) / (1000 * 60 * 60 * 24))) : 0;

  const embedCode = `<script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}"></script>`

  // Modern Input Classes
  const inputClasses = "w-full border border-gray-200 bg-white/60 focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none rounded-2xl px-4 py-3.5 text-[#081028] placeholder:text-gray-400 transition-all duration-300";

  return (
    <div className='min-h-screen bg-[#f0f2f8] relative overflow-hidden py-8 px-4 sm:px-6'>
      
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className='max-w-4xl mx-auto relative z-10'>
        
        {/* Header */}
        <motion.div 
          className='mb-10'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='text-3xl sm:text-4xl font-bold text-[#081028] tracking-tight'>
            Assistant Builder
          </h2>
          <p className='text-gray-500 mt-2 text-base'>Customize your Virtual Assistant to match your brand</p>
        </motion.div>

        {/* ======================= VIEW MODE (SETUP COMPLETE) ======================= */}
        {user.isSetupComplete && !editAssistant && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className='space-y-6'
          >
            
            {/* Main Info Card */}
            <motion.div variants={itemVariants} className='bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-sm p-6 sm:p-8'>
              <p className='text-sm font-medium text-purple-500 uppercase tracking-wider'>Assistant Active</p>
              <h2 className='text-3xl font-bold text-[#081028] mt-2'>{user.assistantName}</h2>
              <p className='text-gray-500 mt-3 leading-7'>Your assistant is ready to use on your website.</p>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8'>
                <div className='rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50/50 p-5 shadow-sm'>
                  <p className='text-xs font-semibold text-gray-400 uppercase'>Current Plan</p>
                  <h2 className='text-2xl font-bold text-[#081028] mt-2 capitalize'>{user?.plan}</h2>
                </div>

                <div className='rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50/50 p-5 shadow-sm'>
                  <p className='text-xs font-semibold text-gray-400 uppercase'>Gemini Status</p>
                  <h2 className={`text-2xl font-bold mt-2 capitalize ${user?.geminiStatus === "active" ? "text-emerald-500" : user?.geminiStatus === "invalid" ? "text-red-500" : "text-amber-500"}`}>
                    {user?.geminiStatus}
                  </h2>
                </div>

                <div className='rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50/50 p-5 shadow-sm'>
                  <p className='text-xs font-semibold text-gray-400 uppercase'>{user?.plan === "free" ? "Message Left" : "Plan Expiry"}</p>
                  <h2 className='text-2xl font-bold text-[#081028] mt-2'>
                    {user?.plan === "free" ? remainingMessages : `${remainingDays} Days`}
                  </h2>
                </div>
              </div>
            </motion.div>

            {/* Embed Code Section */}
            <motion.div variants={itemVariants} className='bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-sm p-6 sm:p-8'>
              
              <div className='mb-6 rounded-2xl bg-amber-50 border border-amber-100 p-5'>
                <p className='text-sm font-bold text-amber-800'>Where to paste this script?</p>
                <p className='text-sm text-amber-700 mt-2 leading-6'>
                  Paste this script before the closing <span className='font-mono font-bold bg-amber-100 px-1.5 py-0.5 rounded'>{"</body>"}</span> tag of your website HTML file.
                </p>
                <pre className='mt-4 bg-[#0b1020] text-emerald-400 rounded-xl p-4 text-xs font-mono overflow-x-auto shadow-inner'>
                  {`<body>\n    Your Website Content\n\n    <script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}"></script>\n\n</body>`}
                </pre>
              </div>

              <p className='text-sm font-semibold text-[#081028] mb-3'>Embed Code</p>
              <div className='relative group'>
                <textarea 
                  readOnly 
                  value={embedCode} 
                  className='w-full h-20 bg-[#0b1020] text-emerald-400 rounded-2xl p-4 text-sm font-mono resize-none outline-none border border-transparent focus:border-purple-500/50 transition-all pr-14' 
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { navigator.clipboard.writeText(embedCode); toast.success("Copied to clipboard!") }}
                  className='absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 group-hover:bg-white text-gray-400 group-hover:text-[#081028] flex items-center justify-center transition-colors duration-200 shadow-sm'
                >
                  <FiCopy size={16} />
                </motion.button>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(124, 58, 237, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setEditAssistant(true)} 
                className='mt-6 w-full h-14 rounded-2xl bg-linear-to-r from-purple-600 to-emerald-500 text-white font-semibold shadow-lg transition-shadow'
              >
                Edit Assistant
              </motion.button>
            </motion.div>
          </motion.div>
        )}


        {/* ======================= EDIT MODE (FORM) ======================= */}
        {editAssistant && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className='space-y-6'
          >
            
            {/* Basic Information */}
            <motion.div variants={itemVariants} className='bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-sm p-6 sm:p-8'>
              <h2 className='text-xl font-bold text-[#081028] mb-6'>Basic Information</h2>
              <div className='space-y-4'>
                <input type="text" onChange={(e) => setAssistantName(e.target.value)} value={assistantName} placeholder='Assistant Name (e.g. Shifra)' className={inputClasses} />
                <input type="text" onChange={(e) => setBusinessName(e.target.value)} value={businessName} placeholder='Business Name' className={inputClasses} />
                <input type="text" onChange={(e) => setBusinessType(e.target.value)} value={businessType} placeholder='Business Type (e.g. SaaS, E-commerce)' className={inputClasses} />
                <textarea rows={4} onChange={(e) => setBusinessDescription(e.target.value)} value={businessDescription} placeholder='Tell us briefly about your business...' className={`${inputClasses} resize-none`} />
              </div>
            </motion.div>

            {/* Appearance (Theme & Tone) */}
            <motion.div variants={itemVariants} className='bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-sm p-6 sm:p-8'>
              <h2 className='text-xl font-bold text-[#081028] mb-6'>Appearance</h2>
              
              <div>
                <label className='text-sm font-semibold text-gray-600 mb-3 block'>Theme</label>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                  {THEME.map((item) => (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setTheme(item)}
                      key={item}
                      className={`py-3.5 rounded-2xl border-2 capitalize font-medium transition-all duration-300 ${
                        theme === item
                          ? "border-purple-500 bg-purple-50 text-purple-700 shadow-md shadow-purple-100"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className='mt-8'>
                <label className='text-sm font-semibold text-gray-600 mb-3 block'>Assistant Tone</label>
                <div className='grid grid-cols-3 gap-3'>
                  {TONES.map((item) => (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setTone(item)}
                      key={item}
                      className={`py-3.5 rounded-2xl border-2 capitalize font-medium transition-all duration-300 ${
                        tone === item
                          ? "border-purple-500 bg-purple-50 text-purple-700 shadow-md shadow-purple-100"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Gemini API Key */}
            <motion.div variants={itemVariants} className='bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-sm p-6 sm:p-8'>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
                <div>
                  <h2 className='text-xl font-bold text-[#081028]'>Gemini API Key</h2>
                  <p className='text-sm text-gray-500 mt-1'>Required to power the AI responses</p>
                </div>
                <a href="https://aistudio.google.com/app/apikey" target='_blank' rel='noopener noreferrer'
                  className='px-5 py-2.5 rounded-xl bg-[#081028] text-white text-sm font-medium text-center hover:bg-black transition-colors w-fit'>
                  Get API Key →
                </a>
              </div>
              <input 
                type="password"
                onChange={(e) => setGeminiApiKey(e.target.value)} 
                value={geminiApiKey}
                placeholder='AIza.... (paste key here)'
                className={inputClasses} 
              />
              <p className='text-xs text-gray-400 mt-3 leading-6'>
                Your API key is securely stored on our servers and only used to generate responses for your widget.
              </p>
            </motion.div>

            {/* Navigation Pages */}
            <motion.div variants={itemVariants} className='bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-sm p-6 sm:p-8'>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
                <div>
                  <h2 className='text-xl font-bold text-[#081028]'>Navigation Pages</h2>
                  <p className='text-sm text-gray-500 mt-1'>Assistant will redirect users to these pages</p>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addPages} 
                  className='flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-purple-600 to-emerald-500 text-white text-sm font-medium w-fit shadow-md'
                >
                  <FiPlus size={16} /> Add Page
                </motion.button>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
                <input type="text" placeholder='Page Name (e.g. Pricing)' value={pageName} onChange={(e) => setPageName(e.target.value)} className={inputClasses} />
                <input type="text" placeholder='Path (e.g. /pricing)' value={pagePath} onChange={(e) => setPagePath(e.target.value)} className={inputClasses} />
                <input type="text" placeholder='Keywords (cost, plans)' value={pageKeyWords} onChange={(e) => setPageKeyWords(e.target.value)} className={inputClasses} />
              </div>

              {pages.length > 0 && (
                <div className='mt-6 space-y-3'>
                  {pages.map((page, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className='flex items-center justify-between border border-gray-100 bg-gray-50/50 rounded-2xl p-4 group hover:bg-white hover:shadow-sm transition-all'
                    >
                      <div className='mr-4 overflow-hidden'>
                        <p className='font-semibold text-[#081028] truncate'>{page.name}</p>
                        <p className='text-sm text-gray-400 font-mono truncate'>{page.path}</p>
                        <div className='flex flex-wrap gap-1.5 mt-1.5'>
                          {page.keywords.map((kw, i) => (
                            <span key={i} className='text-[10px] font-medium bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full'>{kw}</span>
                          ))}
                        </div>
                      </div>
                      <motion.button 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removePage(index)} 
                        className='text-gray-300 hover:text-red-500 transition-colors flex-shrink-0'
                      >
                        <FiTrash2 size={18} />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Save Button */}
            <motion.div variants={itemVariants}>
              <motion.button 
                whileHover={{ scale: 1.01, boxShadow: "0 20px 40px rgba(124, 58, 237, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={saveAssistant} 
                className='w-full h-16 rounded-2xl bg-linear-to-r from-purple-600 to-emerald-500 text-white font-bold text-lg shadow-lg transition-shadow'
              >
                {user.isSetupComplete ? "Update Assistant" : "Save & Activate Assistant"}
              </motion.button>
            </motion.div>

          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Builder