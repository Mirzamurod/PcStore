import { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
} from '@mui/material'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'

const PasswordInput = ({
    isLoading,
    name,
    label,
    register,
    errors,
    sx,
    variant,
    color,
    placeholder,
}) => {
    const { t } = useTranslation()
    const [showText, setShowText] = useState(false)

    return (
        <FormControl
            variant={variant ?? 'standard'}
            color={color ?? 'error'}
            error={!!errors?.[name]}
            sx={{ display: 'block', '& .MuiInput-root': { width: '100%' }, ...sx }}
        >
            <InputLabel htmlFor={name}>{t(label ?? name)}</InputLabel>
            <Input
                id={name}
                error={!!errors?.[name]}
                placeholder={placeholder ?? t(label ?? name)}
                type={showText ? 'text' : 'password'}
                {...register(name)}
                disabled={isLoading}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton
                            aria-label={label}
                            onClick={() => setShowText(!showText)}
                            onMouseDown={e => e.preventDefault()}
                        >
                            {showText ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText>{errors?.[name]?.message}</FormHelperText>
        </FormControl>
    )
}

PasswordInput.propTypes = {
    isLoading: PropTypes.bool,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    register: PropTypes.any.isRequired,
    errors: PropTypes.any.isRequired,
    sx: PropTypes.object,
    variant: PropTypes.string,
    color: PropTypes.string,
    placeholder: PropTypes.string,
}

export default PasswordInput
