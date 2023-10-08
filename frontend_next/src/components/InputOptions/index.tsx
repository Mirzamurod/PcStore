import { FC } from 'react'
import Input from '@/components/Input'
import { IInput } from '@/types/inputs'

interface Props {
  options: IInput[]
  register: any
  errors: any
}

const InputOptions: FC<Props> = ({ options, register, errors }) =>
  options.map((input, index) => (
    <Input
      {...input}
      errors={errors}
      register={register}
      key={index}
      sx={{ mb: index === options.length - 1 ? 0 : 2, ...input.sx }}
    />
  ))

export default InputOptions
