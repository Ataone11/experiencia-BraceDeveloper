import { useEffect, useState } from 'react'

interface SizeInterface {
  width: number
  height: number
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<SizeInterface>({
    width: 0,
    height: 0
  })

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth as number,
      height: window.innerHeight as number
    })
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}
