import PropTypes from 'prop-types'
import { Input } from '../'

const InputOptions = ({ options, register, errors }) =>
    options.map((input, index) => (
        <Input
            {...input}
            errors={errors}
            register={register}
            key={index}
            sx={{ mb: index === options - 1 ? 0 : 2, ...input.sx }}
        />
    ))

InputOptions.propTypes = {
    options: PropTypes.array.isRequired,
    register: PropTypes.any.isRequired,
    errors: PropTypes.any.isRequired,
}

export default InputOptions
