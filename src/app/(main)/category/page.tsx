'use client'
import { motion } from 'framer-motion'

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 1,
          type: "spring",
          stiffness: 100
        }}
        className="text-center max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ 
            delay: 0.2,
            type: "spring",
            stiffness: 150
          }}
          className="mb-8"
        >
          <i className="fa fa-clock text-6xl text-green-600"></i>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 0.5,
            type: "spring",
            stiffness: 120
          }}
          className="text-6xl md:text-8xl font-bold text-gray-800 mb-6"
        >
          Coming Soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: 0.8,
            duration: 1.5
          }}
          className="text-xl md:text-2xl text-gray-600 mb-8"
        >
          We are working hard to bring you something amazing!
        </motion.p>

        <motion.div
          className="flex justify-center space-x-2 mb-8"
        >
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className="w-3 h-3 bg-green-500 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: item * 0.3
              }}
            />
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.history.back()}
          className="bg-green-600 text-white py-3 px-8 rounded-lg text-lg font-semibold"
        >
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity
            }}
          >
            ← Go Back
          </motion.span>
        </motion.button>

        <motion.div
          className="absolute inset-0 -z-10"
          animate={{ 
            background: [
              'linear-gradient(45deg, #f0fdf4, #f0f9ff)',
              'linear-gradient(45deg, #f0f9ff, #faf5ff)',
              'linear-gradient(45deg, #faf5ff, #f0fdf4)'
            ]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity 
          }}
        />
      </motion.div>
    </div>
  )
}