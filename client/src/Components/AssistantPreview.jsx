import React, { useState, useEffect } from 'react'
import { CiMicrophoneOn } from 'react-icons/ci'
import { motion } from 'motion/react'

const AssistantPreview = () => {

  const themes = {
    dark: {
      label: "Dark",
      bg: "bg-[#050816]",
      overlay: "bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_45%)]",
      orb: "from-cyan-400 via-purple-500 to-pink-500",
      cardBorder: "border border-white/10",
      text: "text-white",
      sub: "text-white/65",
      listening: "text-emerald-400",
      wave: "bg-emerald-400",
      button: "from-purple-500 to-violet-400",
      micGlow: "shadow-[0_0_60px_rgba(168,85,247,0.45)]",
      swatch: "bg-[#050816]",
      ring: "ring-purple-400",
    },
    light: {
      label: "Light",
      bg: "bg-gradient-to-br from-white via-[#f8fafc] to-[#eef6ff]",
      overlay: "bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_45%)]",
      orb: "from-blue-300 via-cyan-300 to-pink-300",
      cardBorder: "border border-[#dbeafe]",
      text: "text-[#081028]",
      sub: "text-[#475569]",
      listening: "text-blue-500",
      wave: "bg-blue-500",
      button: "from-blue-400 to-cyan-400",
      micGlow: "shadow-[0_0_45px_rgba(59,130,246,0.35)]",
      swatch: "bg-white",
      ring: "ring-blue-400",
    },
    glass: {
      label: "Glass",
      bg: "bg-black/20 backdrop-blur-[45px]",
      overlay: "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]",
      orb: "from-cyan-200 via-violet-300 to-fuchsia-300",
      cardBorder: "border border-white/10",
      text: "text-white",
      sub: "text-white/70",
      listening: "text-cyan-200",
      wave: "bg-cyan-200",
      button: "from-cyan-400 to-violet-500",
      micGlow: "shadow-[0_0_70px_rgba(34,211,238,0.35)]",
      swatch: "bg-gradient-to-br from-white/80 to-white/20",
      ring: "ring-white",
    },
    neon: {
      label: "Neon",
      bg: "bg-[#03120d]",
      overlay: "bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_45%)]",
      orb: "from-emerald-300 via-green-400 to-cyan-400",
      cardBorder: "border border-emerald-400/20",
      text: "text-emerald-50",
      sub: "text-emerald-100/70",
      listening: "text-emerald-300",
      wave: "bg-emerald-300",
      button: "from-emerald-400 to-green-500",
      micGlow: "shadow-[0_0_70px_rgba(16,185,129,0.45)]",
      swatch: "bg-gradient-to-r from-emerald-400 to-green-500",
      ring: "ring-emerald-400",
    },
  }

  const [theme, setTheme] = useState("dark")
  const [isBouncing, setIsBouncing] = useState(false)
  const current = themes[theme]

  // Realistic Wave Heights Generator
  const generateWaves = () => {
    return Array.from({ length: 6 }, () => Math.floor(Math.random() * 20) + 6);
  }

  const [waves, setWaves] = useState(generateWaves);

  // Update waves periodically to simulate real audio
  useEffect(() => {
    const interval = setInterval(() => {
      setWaves(generateWaves());
    }, 600);
    return () => clearInterval(interval);
  }, []);

  const handleThemeChange = (key) => {
    if (theme === key) return;
    setIsBouncing(true);
    setTheme(key);
    setTimeout(() => setIsBouncing(false), 300); // Reset bounce state
  }

  return (
    <div className='flex items-center justify-center px-3 sm:px-4 py-10 sm:py-14'>
      
      {/* Main Card Container */}
      <motion.div
        animate={{ 
          scale: isBouncing ? 0.95 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`relative w-[280px] h-[450px] sm:w-[330px] sm:h-[500px] md:w-[380px] md:h-[550px] rounded-[32px] sm:rounded-[42px] overflow-hidden transition-colors duration-500 ${current.bg} ${current.cardBorder} shadow-[0_20px_80px_rgba(0,0,0,0.28)]`}
      >
        <div className={`absolute inset-0 transition-opacity duration-500 ${current.overlay}`} />

        {/* Theme switcher */}
        <div className='absolute top-4 right-4 sm:top-5 sm:right-5 z-30 flex items-center gap-2.5'>
          {Object.keys(themes).map((key) => (
            <motion.button
              key={key}
              onClick={() => handleThemeChange(key)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Switch to ${themes[key].label} theme`}
              title={themes[key].label}
              className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all duration-200 cursor-pointer ring-offset-2 ring-offset-black/20 ${themes[key].swatch} ${
                theme === key
                  ? `ring-2 ${themes[key].ring} scale-110`
                  : "ring-1 ring-white/20 opacity-70"
              }`}
            />
          ))}
        </div>

        <div className='relative z-20 flex flex-col items-center justify-between h-full px-5 py-6 sm:px-7 sm:py-8'>

          {/* Premium Orb */}
          <div className='relative mt-1'>
            {/* Rotating Background Glow */}
            <motion.div 
              animate={{ 
                scale: [1.8, 2.2, 1.8],
                rotate: [0, 180, 360],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className={`absolute inset-0 rounded-full blur-[80px] bg-gradient-to-r ${current.orb} transition-all duration-700`} 
            />
            
            {/* Main Solid Orb */}
            <motion.div 
              animate={{ 
                scale: [1, 1.05, 1], 
                boxShadow: [
                  "0 0 60px rgba(255,255,255,0.1)", 
                  "0 0 100px rgba(255,255,255,0.2)", 
                  "0 0 60px rgba(255,255,255,0.1)"
                ] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className={`relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br ${current.orb} overflow-hidden transition-all duration-500`}
            >
              <div className='absolute inset-0 rounded-full bg-white/20 blur-xl' />
            </motion.div>
          </div>

          <div className='text-center'>
            <h2 className={`text-[20px] sm:text-[26px] md:text-[32px] font-semibold transition-colors duration-500 ${current.text}`}>
              Hello, I'm Shifra AI
            </h2>

            <p className={`mt-4 text-[13px] sm:text-[15px] md:text-[16px] leading-6 sm:leading-7 max-w-[280px] mx-auto transition-colors duration-500 ${current.sub}`}>
              Your smart voice assistant.
              <br />
              Ask anything about your website.
            </p>

            <div className='mt-6 sm:mt-8'>
              {/* Pulsing Listening Text */}
              <motion.p 
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className={`text-sm sm:text-base font-medium transition-colors duration-500 ${current.listening}`}
              >
                Listening...
              </motion.p>

              {/* Realistic Audio Waves */}
              <div className='flex items-end justify-center gap-1 sm:gap-1.5 mt-3 sm:mt-4 h-7'>
                {waves.map((h, i) => (
                  <motion.span
                    key={i}
                    className={`w-1 rounded-full transition-colors duration-500 ${current.wave}`}
                    animate={{ height: `${h}px` }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      mass: 0.8
                    }}
                  />
                ))}
              </div>
            </div>

            <div className='relative mt-6 sm:mt-8 mb-1 flex justify-center'>
              {/* Mic Background Glow Pulse */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.5, 1], 
                  opacity: [0.4, 0.7, 0.4] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className={`absolute inset-0 m-auto w-12 h-12 sm:w-15 sm:h-15 md:w-18 md:h-18 rounded-full blur-2xl transition-colors duration-500 ${current.wave}`} 
              />
              
              {/* Mic Button */}
              <motion.button
                aria-label='Start listening'
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: `0 0 80px rgba(255,255,255,0.4)` 
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`relative w-12 h-12 sm:w-15 sm:h-15 md:w-18 md:h-18 rounded-full bg-gradient-to-br ${current.button} ${current.micGlow} flex items-center justify-center transition-all duration-500 cursor-pointer`}
              >
                <CiMicrophoneOn className='text-black/70' size={25} />
              </motion.button>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  )
}

export default AssistantPreview