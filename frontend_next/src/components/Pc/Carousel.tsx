import { SetStateAction, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'

import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

const Carousel = ({ images }: { images: string[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SetStateAction<any>>(null)

  return (
    <div id='carousel'>
      <Swiper
        style={{
          // @ts-ignore
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper2'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={image} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mySwiper'
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Carousel
