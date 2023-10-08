import { IInput } from '@/types/inputs'
import PasswordInput from '@/components/PasswordInput'

interface Props {
  options: IInput[]
  register: any
  errors: any
}

const PasswordInputOptions = (props: Props) => {
  const { options, register, errors } = props

  return options.map((input, index: number) => (
    <PasswordInput
      {...input}
      {...props}
      errors={errors}
      register={register}
      key={index}
      sx={{ mb: index === options.length - 1 ? 0 : 2, ...input.sx }}
    />
  ))
}

export default PasswordInputOptions
