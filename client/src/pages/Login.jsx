import React from 'react'
import { motion } from 'motion/react'
import { HiOutlineSparkles } from 'react-icons/hi'
import { FcGoogle } from 'react-icons/fc'
import {
  FiMic,
  FiPhoneCall,
  FiMessageSquare,
  FiGlobe,
  FiZap,
  FiShield,
} from "react-icons/fi";
import logo from '../assets/logo.png'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios'
import { ServerUrl } from '../App';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login({setUser}) {

  const features = [
    {
      icon: <FiMic />,
      title: "AI Voice Assistant",
      description:
        "Engage visitors with natural, human-like AI voice conversations 24/7.",
    },
    {
      icon: <FiPhoneCall />,
      title: "24/7 Customer Support",
      description:
        "Answer customer questions instantly without requiring a live support team.",
    },
    {
      icon: <FiMessageSquare />,
      title: "Smart Conversations",
      description:
        "Understand customer intent and deliver accurate, context-aware responses.",
    },
    {
      icon: <FiGlobe />,
      title: "Easy Website Integration",
      description:
        "Embed the AI voice agent into any website with a simple script in minutes.",
    },
    {
      icon: <FiZap />,
      title: "Lightning Fast Responses",
      description:
        "Provide instant replies with low-latency AI voice interactions for better engagement.",
    },
    {
      icon: <FiShield />,
      title: "Secure & Reliable",
      description:
        "Protect customer conversations with enterprise-grade security and dependable uptime.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.3,
      },
    },
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -80, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 80, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.2,
      },
    },
  };

  const featureCardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const glowPulse = {
    scale: [1, 1.08, 1],
    opacity: [0.35, 0.6, 0.35],
  };

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth,provider)
      const {displayName, email} = result.user
      const res = await axios.post(ServerUrl + "/api/auth/google",{
        name:displayName,
        email, 
      },{withCredentials:true})
      setUser(res.data)
      toast.success("Login Successfully")
      navigate("/")
    } catch (error) {
      toast.error("Login failed.....")
      console.log(error)
    }
  }

  return (
    <div className='min-h-screen bg-[#FAFAFE] overflow-hidden relative'>

      {/* ===== Advanced layered gradient mesh background ===== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(38% 32% at 12% 18%, rgba(124,58,237,0.18), transparent 70%),
            radial-gradient(42% 38% at 88% 12%, rgba(99,102,241,0.14), transparent 70%),
            radial-gradient(48% 42% at 82% 88%, rgba(16,185,129,0.16), transparent 70%),
            radial-gradient(34% 30% at 8% 88%, rgba(52,211,153,0.14), transparent 70%)
          `,
        }}
      />

      {/* Floating ambient orbs - living motion on top of the mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-violet-400/20 rounded-full blur-[110px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-400/15 rounded-full blur-[90px]"
        />
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 relative z-10'>

        <div className='grid lg:grid-cols-2 gap-10 lg:gap-20 items-center'>

          {/* LEFT================================================ */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={leftVariants}
          >
            {/* AI Bot Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-violet-200/60 bg-white/60 backdrop-blur-md text-violet-600 text-sm font-semibold shadow-[0_4px_20px_rgba(124,58,237,0.08)]'
            >
              <motion.span
                animate={{
                  rotate: [0, 20, -20, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }}
              >
                <HiOutlineSparkles className="text-lg" />
              </motion.span>
              AI Voice Assistant Platform
              <motion.span
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className='mt-8 text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.08] tracking-tight text-[#0B1020]'
            >
              Build AI Assistants
              <motion.span
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                className='block text-transparent bg-clip-text bg-linear-to-r from-violet-500 via-indigo-500 to-emerald-500'
              >
                For Any Website
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              className='mt-6 sm:mt-8 text-base sm:text-lg text-[#54607A] leading-7 sm:leading-8 max-w-xl'
            >
              Create customizable AI voice assistants that talk, guide users, and integrate into any website instantly.
            </motion.p>

            {/* Google Sign In Button - AI Bot Style */}
            <motion.button
            onClick={handleLogin}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{
                scale: 1.02,
                y: -2,
                boxShadow: "0 25px 60px rgba(124,58,237,0.32), 0 0 0 1px rgba(124,58,237,0.12)",
                transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
              }}
              whileTap={{ scale: 0.98 }}
              className='mt-8 sm:mt-10 h-14 sm:h-16 px-6 sm:px-8 rounded-2xl bg-linear-to-r from-violet-500 via-indigo-500 to-emerald-500 text-white text-base sm:text-lg font-semibold flex items-center gap-3 sm:gap-4 shadow-[0_15px_50px_rgba(124,58,237,0.22)] cursor-pointer relative overflow-hidden group'
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                initial={{ x: "-200%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
              />
              <FcGoogle className='text-2xl sm:text-3xl bg-white rounded-full relative z-10' />
              <span className="relative z-10">Continue With Google</span>
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className='mt-3 sm:mt-4 text-xs sm:text-sm text-[#7A8499] font-medium'
            >
              Free plan includes 200 AI responses
            </motion.p>
          </motion.div>

          {/* RIGHT================================================== */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={rightVariants}
            className='relative flex justify-center lg:justify-end'
          >
            {/* Background glow pulses behind the narrow panel */}
            <motion.div
              animate={glowPulse}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className='absolute -inset-8 bg-linear-to-br from-violet-400/30 via-indigo-300/20 to-emerald-300/25 blur-[90px] rounded-full'
            />

            {/* Features Container with Gradient Glow - now a narrower card */}
            <div className="relative w-full max-w-[420px]">

              {/* Outer rotating glow ring */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-[3px] rounded-[36px] opacity-70"
                style={{
                  background: "conic-gradient(from 0deg, #8B5CF6, #6366F1, #34D399, #6366F1, #8B5CF6)",
                }}
              />

              {/* Second slower ring */}
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-[1px] rounded-[34px] opacity-40"
                style={{
                  background: "conic-gradient(from 180deg, #34D399, #8B5CF6, #6366F1, #34D399)",
                }}
              />

              {/* Main Features Box */}
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative rounded-[32px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-[0_25px_80px_rgba(124,58,237,0.14),0_0_0_1px_rgba(255,255,255,0.6)_inset] p-5 sm:p-6 overflow-hidden"
              >
                {/* top sheen highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent" />

                {/* Inner gradient glow */}
                <div className="absolute top-0 right-0 w-56 h-56 bg-violet-300/25 rounded-full blur-[70px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-44 h-44 bg-emerald-300/25 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className='flex items-center justify-between relative z-10'
                >
                  <div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-500/80"
                    >
                      What's included
                    </motion.p>
                    <motion.h2
                      className='mt-1 text-xl sm:text-2xl font-bold text-[#0B1020]'
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.55 }}
                    >
                      Features
                    </motion.h2>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  
                  >
                    <motion.span
                      className="absolute -inset-1 rounded-2xl bg-linear-to-r from-violet-500 to-emerald-500 opacity-50 blur-md -z-10"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <img src={logo} alt="ShifraAI" className='w-full h-full object-contain' />
                  </motion.div>
                </motion.div>

                {/* Features List */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className='mt-6 sm:mt-7 space-y-2.5 sm:space-y-3 relative z-10'
                >
                  {
                    features.map(({ icon, title, description }, index) => (
                      <motion.div
                        key={index}
                        variants={featureCardVariants}
                        whileHover={{
                          y: -3,
                          boxShadow: "0 16px 40px rgba(124,58,237,0.16), 0 0 0 1px rgba(124,58,237,0.12)",
                          transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                        }}
                        className='group relative flex gap-3.5 sm:gap-4 rounded-2xl border border-violet-100/60 bg-white/70 backdrop-blur-sm p-3.5 sm:p-4 cursor-default overflow-hidden'
                      >
                        {/* hover wash */}
                        <div className="absolute inset-0 bg-linear-to-r from-violet-500/0 via-indigo-500/0 to-emerald-500/0 group-hover:from-violet-500/[0.06] group-hover:via-indigo-500/[0.04] group-hover:to-emerald-500/[0.06] transition-colors duration-500" />

                        {/* Icon with glow halo */}
                        <div className="relative z-10 min-w-[44px] h-[44px] sm:min-w-[48px] sm:h-[48px]">
                          <motion.div
                            className="absolute inset-0 rounded-xl bg-linear-to-br from-violet-500 to-emerald-500 blur-md opacity-30"
                            animate={{ opacity: [0.25, 0.45, 0.25] }}
                            transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                          />
                          <motion.div
                            whileHover={{
                              rotate: [0, -10, 10, 0],
                              scale: 1.0,
                              transition: { duration: 0.4 },
                            }}
                            className='relative w-full h-full rounded-xl bg-linear-to-br from-violet-500 via-indigo-500 to-emerald-500 text-white text-base sm:text-lg flex items-center justify-center shadow-[0_8px_22px_rgba(124,58,237,0.28)]'
                          >
                            {icon}
                          </motion.div>
                        </div>

                        <div className="relative z-10 flex-1 min-w-0">
                          <h3 className='text-[#0B1020] text-sm sm:text-base font-semibold group-hover:text-violet-600 transition-colors duration-300'>{title}</h3>
                          <p className='mt-0.5 sm:mt-1 text-xs leading-5 text-[#6B7488]'>{description}</p>
                        </div>
                      </motion.div>
                    ))
                  }
                </motion.div>

              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Login