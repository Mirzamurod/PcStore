import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Box } from '@mui/material'
import { forwardRef } from 'react'

const CardBox = forwardRef(({ children, sx }, ref) => {
    const { dark_mode } = useSelector(state => state.login)

    return (
        <Box ref={ref} sx={{ ...sx }} className={`fon ${dark_mode ? 'dark' : 'light'}`}>
            {children}
        </Box>
    )
})

CardBox.propTypes = {
    children: PropTypes.any.isRequired,
    sx: PropTypes.object,
}

export default CardBox
