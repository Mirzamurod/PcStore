import { useTranslation } from 'react-i18next'
import { TextField, InputAdornment } from '@mui/material'
import { IInput } from '@/types/inputs'
import { useAppSelector } from '@/store'

interface Addinational {
  register: any
  errors: any
}

type Props = IInput & Addinational

const Input = (props: Props) => {
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
  const { dark_mode } = useAppSelector(state => state.login)

  return end ? (
    <TextField
      label={t(label ?? name)}
      color={color ?? 'error'}
      variant={variant ?? 'standard'}
      className={dark_mode ? 'autocomplete-dark' : 'autocomplete-light'}
      type={type ?? 'text'}
      placeholder={t(placeholder ?? label ?? name)}
      sx={{ display: 'block', '& .MuiInput-root': { width: '100%' }, ...sx }}
      error={!!errors?.[name]}
      disabled={isLoading}
      {...register(name)}
      helperText={errors?.[name]?.message}
      multiline={multiline}
      rows={rows}
      InputProps={{
        [start ? 'startAdornment' : 'endAdornment']: (
          // @ts-ignore
          <InputAdornment position={endPosition ?? 'end'}>{end}</InputAdornment>
        ),
      }}
    />
  ) : (
    <TextField
      label={t(label ?? name)}
      color={color ?? 'error'}
      variant={variant ?? 'standard'}
      className={dark_mode ? 'autocomplete-dark' : 'autocomplete-light'}
      type={type ?? 'text'}
      placeholder={t(placeholder ?? label ?? name)}
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

export default Input
