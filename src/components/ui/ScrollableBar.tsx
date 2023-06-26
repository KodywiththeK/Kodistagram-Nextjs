import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 576 },
    items: 6,
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 4,
  },
}

export default function ScrollableBar({ children }: { children: React.ReactNode }) {
  return (
    <Carousel className="flex w-full gap-2" responsive={responsive}>
      {children}
    </Carousel>
  )
}
