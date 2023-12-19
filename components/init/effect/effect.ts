import { Variants } from "framer-motion"

interface Effect {
  container: Variants
  item: Variants
}

export const effect: {[key: string]: Effect} = {
  y: {
    container: {
      visible: {
        transition: {
          delayChildren: 0.5,
          staggerChildren: 0.3
        }
      }
    },
    item: {
      hidden: {height: 0, opacity: 0},
      visible: {height: 'fit-content', opacity: 1}
    }
  },
  scale: {
    container: {
      visible: {
        transition: {
          delayChildren: 0.5,
          staggerChildren: 0.1
        }
      }
    },
    item: {
      hidden: {scale: 0.7, opacity: 0},
      visible: {scale: 1, opacity: 1}
    }
  }
}