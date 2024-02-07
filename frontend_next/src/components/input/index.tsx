import { useTranslation } from 'react-i18next'
import { TextField, InputAdornment } from '@mui/material'
import { Addinational, TInputType } from '@/types/inputs'
import { useAppSelector } from '@/store'

const Input = (props: TInputType & Addinational) => {
  const { label, sx, register, errors, name, placeholder, end, isLoading, endPosition, start } =
    props
  const { t } = useTranslation()
  const { mode } = useAppSelector(state => state.login)

  return end ? (
    <TextField
      {...props}
      label={t(label ?? name)}
      autoComplete='off'
      className={mode === 'dark' ? 'autocomplete-dark' : 'autocomplete-light'}
      placeholder={t(placeholder ?? label ?? name)}
      sx={{ display: 'block', mb: 1, ...sx }}
      error={!!errors?.[name]}
      disabled={isLoading}
      {...register(name)}
      helperText={errors?.[name]?.message}
      InputProps={{
        [start ? 'startAdornment' : 'endAdornment']: (
          // @ts-ignore
          <InputAdornment position={endPosition ?? 'end'}>{end}</InputAdornment>
        ),
      }}
    />
  ) : (
    <TextField
      {...props}
      label={t(label ?? name)}
      autoComplete='off'
      className={mode === 'dark' ? 'autocomplete-dark' : 'autocomplete-light'}
      placeholder={t(placeholder ?? label ?? name)}
      sx={{ display: 'block', mb: 1, ...sx }}
      error={!!errors?.[name]}
      disabled={isLoading}
      {...register(name)}
      helperText={errors?.[name]?.message}
    />
  )
}

export default Input
