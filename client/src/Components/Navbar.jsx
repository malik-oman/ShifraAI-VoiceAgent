import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { FiLogOut, FiMenu, FiX, FiZap, FiCreditCard } from 'react-icons/fi'
import axios from 'axios'
import { ServerUrl } from '../App'
import toast from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = ({ user, setUser }) => {

  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogOut = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
      setUser(null)
      toast.success("Logout successfully")
      navigate("/login")
    } catch (error) {
      toast.error("Logout failed.....")
      console.log(error)
    }
  }

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -15, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.12,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  }

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.35,
        ease: 'easeInOut'
      }
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }

  const glowVariants = {
    initial: { opacity: 0.4, scale: 1 },
    animate: {
      opacity: [0.4, 0.7, 0.4],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50"
    >
      {/* Top gradient line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-purple-500 via-emerald-400 to-purple-500" />

      {/* Navbar background with enhanced glassmorphism */}
      <div className="backdrop-blur-3xl bg-white/60 border-b border-orange-100/40 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">

          {/* LEFT SIDE - Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Logo with glow effect */}
            <div className="relative">
              <motion.div
                variants={glowVariants}
                initial="initial"
                animate="animate"
                className="absolute -inset-2 bg-gradient-to-r from-purple-400/20 to-emerald-400/20 rounded-2xl blur-xl"
              />
              <img
                src={logo}
                alt="ShifraAI"
                className="relative h-29 w-auto object-contain drop-shadow-lg"
              />
            </div>
          </motion.div>

          {/* RIGHT SIDE - Desktop */}
          {user && (
            <div className="hidden md:flex items-center gap-4">

              {/* Builder Button - Premium Gradient Pill */}
              <motion.button
                custom={0}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => navigate("/builder")}
                className="relative group px-6 py-2.5 rounded-2xl overflow-hidden cursor-pointer"
              >
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-purple-500 to-emerald-500 rounded-2xl" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-purple-500 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-emerald-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Content */}
                <span className="relative z-10 flex items-center gap-2 text-white text-sm font-bold tracking-wide">
                  <FiZap size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                  Builder
                </span>
              </motion.button>

              {/* Billing Button - Clean Outline */}
              <motion.button
                custom={1}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 0.96, y: -2 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => navigate("/billing")}
                className="relative group px-6 py-2.5 rounded-2xl bg-white/80 border border-orange-200/60 text-gray-700 text-sm font-bold tracking-wide cursor-pointer overflow-hidden transition-all duration-300 hover:border-purple-300/60 hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] hover:bg-white"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiCreditCard size={16} className="text-purple-500 group-hover:text-emerald-500 transition-colors duration-300" />
                  Billing
                </span>
              </motion.button>

              {/* User Profile Card - Premium Glass Card */}
              <motion.div
                custom={2}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03, y: -1 }}
                className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-2xl bg-white/80 border border-orange-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.1)] hover:border-purple-200/50 transition-all duration-500 cursor-default"
              >
                {/* Avatar with ring */}
                <div className="relative">
                  <div className="absolute -inset-[2px] bg-gradient-to-br from-purple-500 via-purple-400 to-emerald-400 rounded-full" />
                  <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-bold">{user?.name.charAt(0).toUpperCase()}</span>
                  </div>
                </div>

                {/* User Info */}
                <div className="max-w-[150px]">
                  <p className="text-sm font-bold text-gray-800 truncate leading-tight">{user.name}</p>
                  <p className="text-[11px] text-gray-400 truncate leading-tight">{user.email}</p>
                </div>

                {/* Divider */}
                <div className="w-px h-6 bg-gray-200/60" />

                {/* Logout Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={handleLogOut}
                  className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50/80 transition-all duration-300 cursor-pointer"
                >
                  <FiLogOut size={18} />
                </motion.button>
              </motion.div>
            </div>
          )}

          {/* MOBILE MENU TOGGLE */}
          {user && (
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-2xl bg-gradient-to-br from-purple-50 to-emerald-50 border border-purple-100/50 text-gray-700 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300 cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <FiX size={22} className="text-purple-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <FiMenu size={22} className="text-purple-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {mobileMenuOpen && user && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="md:hidden overflow-hidden border-b border-orange-100/40 backdrop-blur-3xl bg-white/70"
          >
            <div className="px-5 py-5 space-y-3.5">
              {/* Mobile User Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-white to-emerald-50 border border-purple-100/40 shadow-sm"
              >
                <div className="relative">
                  <div className="absolute -inset-[2px] bg-gradient-to-br from-purple-500 to-emerald-400 rounded-full blur-[2px]" />
                  <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-base font-bold">{user?.name.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
              </motion.div>

              {/* Mobile Builder Button */}
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { navigate("/builder"); setMobileMenuOpen(false) }}
                className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-emerald-500 text-white text-sm font-bold cursor-pointer shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-shadow duration-300"
              >
                <FiZap size={18} />
                Builder
              </motion.button>

              {/* Mobile Billing Button */}
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { navigate("/billing"); setMobileMenuOpen(false) }}
                className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl font-bold border border-orange-200/60 bg-white/90 text-gray-700 text-sm cursor-pointer hover:bg-white hover:border-purple-300/40 hover:shadow-lg hover:shadow-purple-100/30 transition-all duration-300"
              >
                <FiCreditCard size={18} className="text-purple-500" />
                Billing
              </motion.button>

              {/* Mobile Logout Button */}
              <motion.button
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { handleLogOut(); setMobileMenuOpen(false) }}
                className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl font-bold border border-red-100/60 bg-gradient-to-r from-red-50 to-orange-50 text-red-500 text-sm cursor-pointer hover:from-red-100 hover:to-orange-100 transition-all duration-300"
              >
                <FiLogOut size={18} />
                Logout
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Navbar