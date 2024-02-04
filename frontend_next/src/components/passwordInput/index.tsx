import { FC, useState } from 'react'
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
import { IPasswordInput } from '@/types/inputs'
import { useAppSelector } from '@/store'

interface Addinational {
  register: any
  errors: any
}

type Props = IPasswordInput & Addinational

const PasswordInput: FC<Props> = ({
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
  const { mode } = useAppSelector(state => state.login)

  return (
    <FormControl
      variant={variant ?? 'standard'}
      // @ts-ignore
      color={color ?? 'error'}
      error={!!errors?.[name]}
      sx={{ display: 'block', '& .MuiInput-root': { width: '100%' }, ...sx }}
    >
      <InputLabel htmlFor={name}>{t(label ?? name)}</InputLabel>
      <Input
        id={name}
        error={!!errors?.[name]}
        placeholder={placeholder ?? t(label ?? name)}
        className={mode === 'dark' ? 'autocomplete-dark' : 'autocomplete-light'}
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

export default PasswordInput
