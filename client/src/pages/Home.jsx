import React from 'react'
import { useNavigate } from 'react-router-dom'
import AssistantPreview from '../Components/AssistantPreview'
import { motion } from 'motion/react'
import logo from '../assets/logo.png'

// Motion Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

function Home({ user }) {

  const STEPS = [
    { step: "01", title: "Sign up free", desc: "Continue with Google and create your assistant instantly without any credit card." },
    { step: "02", title: "Customize Assistant", desc: "Set your business name, choose a tone, voice, and match your website theme." },
    { step: "03", title: "Train your assistant", desc: "Add your business details, FAQs, and personalize AI responses." },
    { step: "04", title: "Embed anywhere", desc: "Copy just one script tag and seamlessly add it to any website." },
  ]

  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-[#f8fafc] overflow-hidden'>

      {/* Hero Section */}
      <section className='relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-20'>
        <div className='absolute inset-0 bg-linear-to-br from-purple-50 via-white to-emerald-50' />
        <div className='absolute top-0 left-1/4 w-[400px] h-[400px] bg-purple-200/30 blur-3xl rounded-full' />
        <div className='absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-200/30 blur-3xl rounded-full' />

        <div className='relative max-w-6xl mx-auto'>
          
          <motion.div 
            className='flex justify-center'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <span className='inline-flex items-center gap-2 bg-white border border-purple-100 shadow-sm text-purple-600 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full backdrop-blur-sm'>
              <span className='relative flex h-2.5 w-2.5'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500'></span>
              </span>
              Voice AI For Modern Websites
            </span>
          </motion.div>

          <motion.div 
            className='text-center mt-10 sm:mt-12'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h1 variants={fadeInUp} className='max-w-5xl mx-auto text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#081028] leading-tight'>
              Add a{" "}
              <span className='inline-block px-2'>
                <span className='text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-emerald-500'>
                  Virtual Assistant
                </span>
              </span>
              <br className='hidden sm:block' />
              to your website
            </motion.h1>

            <motion.p variants={fadeInUp} className='max-w-2xl mx-auto mt-7 text-base sm:text-lg lg:text-xl text-[#64748b] leading-relaxed px-2'>
              Create a smart voice-enabled assistant that talks to visitors, answers questions, and helps users navigate your website instantly.
            </motion.p>

            <motion.div variants={fadeInUp} className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-10'>
              <motion.button 
                onClick={() => navigate("/builder")} 
                whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(124, 58, 237, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                className='w-full sm:w-auto px-8 py-4 rounded-2xl bg-linear-to-r from-purple-600 to-emerald-500 text-white font-semibold text-sm sm:text-base shadow-lg transition-all cursor-pointer'
              >
                Build Your Assistant — It&apos;s Free
              </motion.button>
            </motion.div>

            <motion.p variants={fadeInUp} className='mt-5 text-xs sm:text-sm text-gray-400'>
              Free plan includes 200 AI responses • No credit card required
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <AssistantPreview />
          </motion.div>

        </div>
      </section>

      {/* Steps Section */}
      <section className='px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-b from-white to-[#f8fafc]'>
        <div className='max-w-6xl mx-auto'>
          
          <motion.div 
            className='text-center mb-16'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className='text-3xl sm:text-5xl font-bold text-[#081028] tracking-tight'>
              Get Started In Minutes
            </motion.h2>
            <motion.p variants={fadeInUp} className='text-gray-500 mt-4 text-base sm:text-lg max-w-lg mx-auto'>
              Simple setup, powerful results. No complicated integration required.
            </motion.p>
          </motion.div>

          <motion.div 
            className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {STEPS.map((s, i) => (
              <motion.div 
                key={i} 
                variants={fadeInUp}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.3 } 
                }}
                className='group relative bg-white/80 backdrop-blur-sm border border-gray-100 rounded-[28px] p-8 transition-all duration-300 hover:shadow-[0_20px_60px_rgba(124,58,237,0.08)] hover:border-purple-200/50'
              >
                {/* Hover Gradient Line at top */}
                <div className='absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full' />
                
                <span className='inline-block px-3 py-1 bg-gray-50 group-hover:bg-purple-50 rounded-xl text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-emerald-500 transition-colors duration-300'>
                  {s.step}
                </span>

                <h3 className='mt-5 text-lg font-bold text-[#081028] group-hover:text-purple-900 transition-colors'>{s.title}</h3>

                <p className='mt-3 text-sm text-gray-500 leading-relaxed'>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className='relative bg-[#081028] overflow-hidden'>
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-900/20 blur-[100px] rounded-full pointer-events-none" />

        <div className='relative max-w-6xl mx-auto pt-16 pb-8 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10'>
            
            {/* Column 1: Brand */}
            <div className="flex flex-col items-center md:items-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/")}
                className="flex items-center gap-3 cursor-pointer mb-6"
              >
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-emerald-400/20 rounded-2xl blur-xl" />
                  <img src={logo} alt="ShifraAI" className="relative h-27 w-auto object-contain drop-shadow-lg" />
                </div>
              </motion.div>
              <p className="text-gray-400 text-sm leading-relaxed text-center md:text-left max-w-xs">
                Empowering businesses with intelligent, voice-enabled AI assistants that convert visitors into loyal customers.
              </p>
            </div>

            {/* Column 2: About AI Assistant (As requested) */}
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Our Vision</h4>
              <p className="text-gray-500 text-sm leading-relaxed text-center md:text-left">
                We believe every website deserves a frontline responder. Our AI assistants are designed to understand context, handle complex queries, and provide a human-like conversational experience 24/7 without any extra load on your support team.
              </p>
            </div>

            {/* Column 3: Quick Links / Legal */}
            <div className="flex flex-col items-center md:items-start md:items-end">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-purple-400 transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors duration-200">Contact Support</a></li>
              </ul>
            </div>

          </div>

          {/* Copyright Section */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs sm:text-sm">
              © {new Date().getFullYear()} ShifraAI. All rights reserved.
            </p>
            <p className="text-gray-700 text-xs">
              Crafted with precision for modern web experiences.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home