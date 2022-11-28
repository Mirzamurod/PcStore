import { Fragment, useRef } from 'react'
import { Box, Button } from '@mui/material'
import WallpaperIcon from '@mui/icons-material/Wallpaper'
import { ImageCarouselCard } from '../../../../Components'

const Image = ({ images, setImages, cImages, setCImages, setShow, setStart, onChange }) => {
    // const [images, setImages] = useState([])
    // const [cImages, setCImages] = useState([])
    const fileInputRef = useRef()

    // const onChange = e => {
    //     const selectImages = e.target.files
    //     const selectImagesArray = Array.from(selectImages)

    //     if (cImages.length) {
    //         setImages([...images, ...selectImages])

    //         const imagesArray = selectImagesArray.map(file => URL.createObjectURL(file))

    //         setCImages([...cImages, ...imagesArray])
    //     } else {
    //         setImages(selectImages)

    //         const imagesArray = selectImagesArray.map(file => URL.createObjectURL(file))

    //         setCImages(imagesArray)
    //     }
    // }

    const addImages = () => (
        <Fragment>
            <Box
                sx={{
                    bgcolor: '#313131',
                    width: '100%',
                    height: cImages.length ? '100%' : '117px',
                    borderRadius: 1,
                    display: 'flex',
                }}
            >
                <input
                    type='file'
                    hidden
                    accept='image/*'
                    ref={fileInputRef}
                    multiple
                    onChange={onChange}
                />
                <Button
                    color='inherit'
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}
                    onClick={event => {
                        event.preventDefault()
                        fileInputRef.current.click()
                    }}
                >
                    <Box>
                        <WallpaperIcon />
                    </Box>
                    Add image
                </Button>
            </Box>
        </Fragment>
    )

    const deleteImage = name => {
        const restImages = cImages.filter(image => image !== name)
        setCImages([...restImages])
    }

    return cImages.length ? (
        <ImageCarouselCard
            add
            images={cImages}
            addImage={addImages}
            deleteImage={deleteImage}
            setStart={setStart}
            setShow={setShow}
        />
    ) : (
        addImages()
    )
}

export default Image
