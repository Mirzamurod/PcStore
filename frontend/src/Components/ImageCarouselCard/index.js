import { Fragment, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative, Pagination } from 'swiper'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import 'swiper/css/effect-creative'
import 'swiper/css/pagination'

const ImageCarouselCard = ({ images, addImage, deleteImage, add, setStart, setShow }) => {
    const [hover, setHover] = useState(false)

    return (
        <Fragment>
            <Box
                sx={{
                    'span.swiper-pagination-bullet, span.swiper-pagination-bullet.swiper-pagination-bullet-active':
                        { bgcolor: 'red' },
                    my: 0,
                }}
                component={Swiper}
                loop={true}
                pagination={true}
                grabCursor={true}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        origin: 'left center',
                        translate: ['-5%', 0, -200],
                        rotate: [0, 100, 0],
                    },
                    next: {
                        origin: 'right center',
                        translate: ['5%', 0, -200],
                        rotate: [0, -100, 0],
                    },
                }}
                modules={[EffectCreative, Pagination]}
                className='mySwiper6'
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Box
                            sx={{
                                width: '100%',
                                height: '100%',
                                position: 'relative',
                                zIndex: -1,
                            }}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                            <Box
                                sx={{ objectFit: 'contain', my: 'auto', height: '100%' }}
                                component='img'
                                src={image}
                                alt='rasm'
                                width='100%'
                            />
                            {add && hover && (
                                <Box
                                    sx={{
                                        transform: 'translate(-50%, -50%)',
                                        left: '50%',
                                        top: '50%',
                                        zIndex: 1,
                                        position: 'absolute',
                                        bgcolor: '#4b4b4b',
                                        p: 1,
                                        borderRadius: 1,
                                    }}
                                >
                                    <IconButton
                                        onClick={() => {
                                            setStart(index)
                                            setShow(true)
                                        }}
                                    >
                                        <RemoveRedEyeOutlinedIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteImage(image)}>
                                        <DeleteOutlinedIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </SwiperSlide>
                ))}
                {addImage && <SwiperSlide>{addImage()}</SwiperSlide>}
            </Box>
        </Fragment>
    )
}

export default ImageCarouselCard
