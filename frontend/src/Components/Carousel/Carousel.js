import { useEffect, useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import './carousel.scss'

const Carousel = ({ images }) => {
    let [current, setCurrent] = useState(0)
    const [hover, setHover] = useState(true)

    useEffect(() => {
        if (hover) {
            const interval = setInterval(() => {
                setCurrent(current === images.length - 1 ? 0 : ++current)
            }, 3000)
            return () => clearInterval(interval)
        }
    }, [current, images, hover])

    return (
        <div
            id='carousel'
            className='carousel'
            onMouseEnter={() => setHover(false)}
            onMouseLeave={() => setHover(true)}
        >
            <div className='dot'>
                <KeyboardArrowUpIcon
                    className='up-arow'
                    onClick={() => setCurrent(current === 0 ? images.length - 1 : --current)}
                />
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`thumb ${current === index && 'active'}`}
                    >
                        <img src={image} alt={image} />
                    </div>
                ))}
                <KeyboardArrowDownIcon
                    className='down-arrow'
                    onClick={() => setCurrent(current === images.length - 1 ? 0 : ++current)}
                />
            </div>
            <div className='image'>
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`slide ${current === index && 'active'}`}
                    >
                        {current === index && <img src={image} alt={image} />}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Carousel
