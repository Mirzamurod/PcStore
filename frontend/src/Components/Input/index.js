import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { TextField, InputAdornment } from '@mui/material'

const Input = props => {
    const {
        label,
        sx,
        register,
        errors,
        name,
        placeholder,
        end,
        type,
        variant,
        color,
        isLoading,
        endPosition,
        start,
        multiline,
        rows,
    } = props
    const { t } = useTranslation()

    return end ? (
        <TextField
            label={t(label ?? name)}
            color={color ?? 'error'}
            variant={variant ?? 'standard'}
            type={type ?? 'text'}
            placeholder={t(placeholder) ?? t(label ?? name)}
            sx={{ display: 'block', '& .MuiInput-root': { width: '100%' }, ...sx }}
            error={!!errors?.[name]}
            disabled={isLoading}
            {...register(name)}
            helperText={errors?.[name]?.message}
            multiline={multiline}
            rows={rows}
            InputProps={{
                [start ? 'startAdornment' : 'endAdornment']: (
                    <InputAdornment position={endPosition ?? 'end'}>{end}</InputAdornment>
                ),
            }}
        />
    ) : (
        <TextField
            label={t(label ?? name)}
            color={color ?? 'error'}
            variant={variant ?? 'standard'}
            type={type ?? 'text'}
            placeholder={t(placeholder) ?? t(label ?? name)}
            sx={{ display: 'block', '& .MuiInput-root': { width: '100%' }, ...sx }}
            error={!!errors?.[name]}
            disabled={isLoading}
            {...register(name)}
            helperText={errors?.[name]?.message}
            multiline={multiline}
            rows={rows}
        />
    )
}

Input.propTypes = {
    label: PropTypes.string,
    sx: PropTypes.object,
    register: PropTypes.any.isRequired,
    errors: PropTypes.any.isRequired,
    /**bu label va placeholder o'rniga o'tishi mumkin ya'ni ula yozilmasa auto o'tib ketadi */
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    end: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    type: PropTypes.string,
    variant: PropTypes.string,
    color: PropTypes.string,
    isLoading: PropTypes.bool,
    endPosition: PropTypes.string,
    /**agar true berilmasa input oxiridan chiqadi */
    start: PropTypes.bool,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
}

export default Input
