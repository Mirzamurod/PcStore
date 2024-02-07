import { Addinational, TPasswordInputType } from '@/types/inputs'
import PasswordInput from '@/components/passwordInput'

type Props = {
  options: TPasswordInputType[]
} & Addinational

const PasswordInputOptions = (props: Props) => {
  const { options, register, errors } = props

  return options.map((input, index: number) => (
    <PasswordInput {...input} errors={errors} register={register} key={index} />
  ))
}

export default PasswordInputOptions
