import React, { useState } from 'react'
import {FiPlus, FiTrash2} from 'react-icons/fi'


const THEME = [
  "light",
  "dark",
  "glass",
  "neon",
];

const TONES = [
  "friendly",
  "professional",
  "sales",
];

const Builder = ({user,setUser}) => {

  const [assistantName,setAssistantName] = useState(user?.assistantName || "")
  const [businessName,setBusinessName] = useState(user?.businessName || "")
  const [businessType,setBusinessType] = useState(user?.businessType || "")
  const [businessDescription,setBusinessDescription] = useState(user?.businessDescription || "")
  const [theme,setTheme]  = useState(user?.theme || "dark")
  const [tone,setTone]  = useState(user?.tone || "friendly")
  const [geminiApiKey,setGeminiApiKey]  = useState(user?.geminiApiKey || "")

  const [pages,setPages] = useState(user?.pages || []);
  const [pageName,setPageName] = useState("");
  const [pagePath,setPagePath]  = useState("")
  const [pageKeyWords,setPageKeyWords] = useState("")

  const addPages = () => {
    if (!pageName || !pagePath) return;
    
    const newPage = {
      name:pageName,
      path:pagePath,
      keywords:pageKeyWords.split(",").map((k)=> k.trim())

    }
    setPages([...pages,newPage])

    setPageName("")
    setPagePath("")
    setPageKeyWords("")
  }


  const removePage = (index) => {
     const updatePages = pages.filter((_,i)=>i !== index)

     setPages(updatePages)
  }


  return (
    <div className='min-h-screen bg-[#f7f8fc] py-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
          <h2 className='text-3xl font-bold text-[#081028]'>
            Assistant Builder
          </h2>
          <p className='text-gray-500 mt-1'>Customize your Virtual Assistant</p>
        </div>

        <div className='space-y-6'>

          <div className='bg-white rounded-3xl border border-gray-300 shadow-sm p-6'>
            <h2 className='text-lg font-semibold mb-5'>
              Basic Information
            </h2>

      {/* INPUT FEILDS BUSINESS NAME TYPE AND DESC=================================== */}
          <div className='space-y-4'>
            <input type="text"
            onChange={(e)=>setAssistantName(e.target.value)}
            value={assistantName} 
            placeholder='Assistant Name'
            className='w-full border border-gray-200 rounded-2xl px-4 py-3'
            />

          <input type="text" 
            onChange={(e)=>setBusinessName(e.target.value)}
            value={businessName} 
             placeholder='Business Name'
             className='w-full border border-gray-200 rounded-2xl px-4 py-3'
             />

          <input type="text" 
            onChange={(e)=>setBusinessType(e.target.value)}
            value={businessType} 
             placeholder='Business Type'
            className='w-full border border-gray-200 rounded-2xl px-4 py-3'
              />

         <textarea type="text" 
         rows={4}
           onChange={(e)=>setBusinessDescription(e.target.value)}
           value={businessDescription} 
            placeholder='Business Description'
            className='w-full border border-gray-200 rounded-2xl px-4 py-3 resize-none'
            /> 
            </div>  

          </div>

        {/* ASSISTANT THEME TONE APPERANCE ================================== */}
          <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
            <h2 className='text-lg font-semibold mb-5'>
              Appearance
            </h2>

           <div>
            <label className='text-sm text-gray-600 mb-3 block' >Theme</label>

           <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
            {THEME.map((item)=>(
           <button
           onClick={()=>setTheme(item)}
           key={item} className={`py-3 rounded-2xl border-2 capitalize
           ${theme === item 
           ? "border-purple-500 bg-purple-50 text-purple-700"
           :
           "border-gray-200"}`}>
            {item}
           </button>
            ))}
            </div> 
            </div> 

              {/* ASSISTANT TONE SETUP======================================== */}
            <div className='mt-6'>
            <label className='text-sm text-gray-600 mb-3 block' >Assistant Tone</label>

           <div className='grid grid-cols-3 sm:grid-cols-3 gap-3'>
            {TONES.map((item)=>(
           <button
           onClick={()=>setTone(item)}
           key={item} className={`py-3 rounded-2xl border-2 capitalize
           ${tone === item 
           ? "border-purple-500 bg-purple-50 text-purple-700"
           :
           "border-gray-200"}`}>
            {item}
           </button>
            ))}
            </div> 
            </div> 
              

          </div>


          {/* GEMINI API KEY FIELD=============================================== */}

         <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
            <div className='flex items-center justify-between mb-5 gap-4 flex-wrap'>
             <div>
              <h2 className='text-lg font-semibold'>Gemini API KEY</h2>
              <p className='text-sm text-gray-400 mt-1'>Add Your Gemini API Key to power your assistant</p>
              </div> 

             <a href="https://aistudio.google.com/app/apikey" target='_blank'
             rel='noopener noreferrer'
              className='px-4 py-2 rounded-xl bg-linear-to-r from-purple-500 to-emerald-500
              text-white text-sm font-medium'>
                Get API KEY
             </a> 
            </div>

         <input type="password"
         onChange={(e)=>setGeminiApiKey(e.target.value)} 
         value={geminiApiKey}
         placeholder='AIza....(gemini api key)'
         className='w-full border border-gray-200 rounded-2xl px-4 py-3'
         />  

        <p className='text-xs text-gray-400 mt-3 leading-6 '>
          Your API key is securely stored and only used for generating AI responses.
          </p>  
        </div> 


       <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6'>
      <div className='flex items-center justify-between mb-5 flex-wrap'>
            <div>
              <h2 className='text-lg font-semibold'>Navigation Pages</h2>
              <p className='text-xs text-gray-400'>Assistant can redirect users</p>
            </div>


         <button onClick={addPages} className='flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-purple-500
         to-emerald-500 text-white text-xs'>
          <FiPlus/>
          </button> 
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
        <input type="text" placeholder='Page Name'
        onChange={(e)=>setPageName(e.target.value)}
        value={[pageName]}
        className='border border-gray-200 rounded-2xl px-4 py-3'
        />

      <input type="text" placeholder='Page Path (e.g. /pricing)'
        onChange={(e)=>setPagePath(e.target.value)}
        value={[pagePath]}
        className='border border-gray-200 rounded-2xl px-4 py-3'
        />

        <input type="text" placeholder='Pricing, Plan (keywords)'
        onChange={(e)=>setPageKeyWords(e.target.value)}
        value={[pageKeyWords]}
        className='border border-gray-200 rounded-2xl px-4 py-3'
        />  
      </div>


      <div className='mt-5 space-y-3'>
        {
          pages.map((page,index)=>(
            <div key={index} className='flex items-center justify-between border border-gray-100
            rounded-2xl p-4'>

           <div>
            <p className='font-medium'>{page.name}</p>
            <p className='text-sm text-gray-400'>{page.path}</p>  
            <p className='text-sm text-gray-400'>{page.keywords}</p>
            </div>   
            <button onClick={()=>removePage(index)} className='text-red-500'>
            <FiTrash2/>
            </button>
            </div>
          ))
        }
      </div>
      </div> 


      <button className='w-full h-14 rounded-2xl bg-linear-to-r from-purple-500 to-emerald-500 text-white
      font-semibold'>{user.isSetupComplete ? "Update Assistant" : "Save Assistant"}</button>
        </div>
      </div>
    </div>
  )
}

export default Builder