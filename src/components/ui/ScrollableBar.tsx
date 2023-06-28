import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
const responsive = {
  bigDesktop: {
    breakpoint: { max: 4000, min: 1200 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 1200, min: 920 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 920, min: 770 },
    items: 6,
  },
  smallTablet: {
    breakpoint: { max: 770, min: 500 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 500, min: 370 },
    items: 4,
  },
  smallMobile: {
    breakpoint: { max: 370, min: 0 },
    items: 3,
  },
}

export default function ScrollableBar({ children }: { children: React.ReactNode }) {
  return (
    <Carousel className="flex w-full gap-2" responsive={responsive}>
      {children}
    </Carousel>
  )
}
