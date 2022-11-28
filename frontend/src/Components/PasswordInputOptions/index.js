import PropTypes from 'prop-types'
import { PasswordInput } from '../'

const PasswordInputOptions = props => {
    const { options, register, errors } = props

    return options.map((input, index) => (
        <PasswordInput
            {...input}
            {...props}
            errors={errors}
            register={register}
            key={index}
            sx={{ mb: index === options - 1 ? 0 : 2, ...input.sx }}
        />
    ))
}

PasswordInputOptions.propTypes = {
    options: PropTypes.array.isRequired,
    register: PropTypes.any.isRequired,
    errors: PropTypes.any.isRequired,
}

export default PasswordInputOptions
