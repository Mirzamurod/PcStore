import { forwardRef, Fragment, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { Box, Card, CardContent, FormControl, InputLabel } from '@mui/material'
import ImageGallery from 'react-image-gallery'
import { Editor } from 'react-draft-wysiwyg'
import { ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { CardBox, InputOptions } from '../../../../Components'
import Image from './Image'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import 'draft-js/dist/Draft.css'

const AddEdit = forwardRef((props, ref) => {
    const { t } = useTranslation()
    const formSchema = Yup.object().shape({
        pc_name: Yup.string().required('Pc name'),
        description: Yup.string().required('Description'),
        price: Yup.string().required('Price'),
        discount: Yup.string().required('Discount'),
        show: Yup.boolean(),
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm({ mode: 'onTouched', resolver: yupResolver(formSchema) })
    const [images, setImages] = useState([])
    const [cImages, setCImages] = useState([])
    const [show, setShow] = useState(false)
    const [imageGallery, setImageGallery] = useState([])
    const [start, setStart] = useState(0)

    useEffect(() => {
        cImages.forEach(image => imageGallery.push({ original: image, thumbnail: image }))

        setImageGallery([...imageGallery])
    }, [images])

    const onChange = e => {
        const selectImages = e.target.files
        const selectImagesArray = Array.from(selectImages)

        if (cImages.length) {
            setImages([...images, ...selectImages])

            const imagesArray = selectImagesArray.map(file => URL.createObjectURL(file))

            setCImages([...cImages, ...imagesArray])
        } else {
            setImages(selectImages)

            const imagesArray = selectImagesArray.map(file => URL.createObjectURL(file))

            setCImages(imagesArray)
        }
    }

    const listOfInputs = [
        { name: 'pc_name' },
        { end: 'uzs', name: 'price' },
        { end: 'uzs', name: 'discount' },
    ]

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        p: 4,
    }

    return (
        <Fragment>
            <CardBox sx={style} ref={ref}>
                <Box
                    sx={{ border: '1px solid #fff', borderRadius: 1 }}
                    component='form'
                    encType='multipart/form-data'
                >
                    <Card sx={{ display: 'flex' }}>
                        <CardContent>
                            <Image
                                images={images}
                                setImages={setImages}
                                cImages={cImages}
                                setCImages={setCImages}
                                setShow={setShow}
                                setStart={setStart}
                                onChange={onChange}
                            />
                            <InputOptions
                                options={listOfInputs}
                                register={register}
                                errors={errors}
                            />
                        </CardContent>
                        <CardContent sx={{ width: '900px' }}>
                            <FormControl>
                                {/* <InputLabel>{t('description')}</InputLabel> */}
                                {/* <Input component={Editor} /> */}
                                <Editor
                                    // editorState={content}
                                    style={{ color: 'black !important' }}
                                    onEditorStateChange={e => console.log('hello')}
                                    wrapperClassName='demo-wrapper'
                                    editorClassName='demo-editor'
                                    placeholder={`${t('description')} (uz)`}
                                />
                                <Editor
                                    // editorState={content}
                                    style={{ color: 'black !important' }}
                                    onEditorStateChange={e => console.log('hello')}
                                    wrapperClassName='demo-wrapper'
                                    editorClassName='demo-editor'
                                    placeholder={`${t('description')} (ru)`}
                                />
                                <Editor
                                    // editorState={content}
                                    style={{ color: 'black !important' }}
                                    onEditorStateChange={e => console.log('hello')}
                                    wrapperClassName='demo-wrapper'
                                    editorClassName='demo-editor'
                                    placeholder={`${t('description')} (eng)`}
                                />
                            </FormControl>
                        </CardContent>
                    </Card>
                </Box>
            </CardBox>
            {show && (
                <Fragment>
                    <Box
                        onClick={() => setShow(false)}
                        sx={{
                            p: 10,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 99,
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '90%',
                            height: '90%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 999,
                        }}
                    >
                        <CardBox
                            sx={{
                                height: '100% !important',
                                '.image-gallery, .image-gallery-swipe, .image-gallery-slides, .image-gallery-content, .image-gallery-thumbnails, .image-gallery-thumbnails-container, .image-gallery-thumbnail, .image-gallery-thumbnail-inner, .image-gallery-thumbnail-image':
                                    { height: '100% !important' },
                                '.image-gallery-slide-wrapper': { height: '665px' },
                                '.image-gallery-slides': { display: 'flex' },
                                '.image-gallery-content': {
                                    display: 'flex',
                                    flexDirection: 'column',
                                },
                                '.image-gallery-image': { my: 'auto' },
                                '.image-gallery-swipe': { overflow: 'hidden' },
                                '.image-gallery-thumbnails-wrapper': { height: '115px' },
                            }}
                        >
                            <ImageGallery
                                items={imageGallery}
                                startIndex={start}
                                showFullscreenButton={false}
                                showPlayButton={false}
                            />
                        </CardBox>
                    </Box>
                </Fragment>
            )}
        </Fragment>
    )
})

export default AddEdit
