import { motion } from "framer-motion";
import { ReactNode } from "react";

// MAINTENANCE: Original transition component with falling blocks effect
// Classic black blocks transition as requested

interface TransitionProps {
  children: ReactNode;
  pageIndex?: number;
}

const calculateRandomBlockDelay = (rowIndex: number, totalRow: number): number => {
  const blockDelay: number = Math.random() * 0.5;
  const rowDelay: number = (totalRow - rowIndex - 1) * 0.3;
  return blockDelay + rowDelay;
};

export const Transition = ({ children, pageIndex = 0 }: TransitionProps) => {
  return (
    <div className="relative w-full h-full">
      {/* Animated black blocks overlay - original effect */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Top layer - blocks fall down */}
        <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-50 flex flex-col">
          {Array.from({ length: 10 }, (_, rowIndex) => (
            <div key={`top-row-${rowIndex}`} className="flex flex-1 w-full">
              {Array.from({ length: 11 }, (_, blockIndex) => (
                <motion.div
                  key={`top-${rowIndex}-${blockIndex}`}
                  className="relative flex-1 bg-black -m-0.5 origin-top"
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  exit={{ scaleY: 0 }}
                  transition={{ 
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: calculateRandomBlockDelay(rowIndex, 10) 
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        
        {/* Bottom layer - blocks fall up */}
        <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-50 flex flex-col">
          {Array.from({ length: 10 }, (_, rowIndex) => (
            <div key={`bottom-row-${rowIndex}`} className="flex flex-1 w-full">
              {Array.from({ length: 11 }, (_, blockIndex) => (
                <motion.div
                  key={`bottom-${rowIndex}-${blockIndex}`}
                  className="relative flex-1 bg-black -m-0.5 origin-bottom"
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  exit={{ scaleY: 0 }}
                  transition={{ 
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                    delay: calculateRandomBlockDelay(rowIndex, 10) 
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};