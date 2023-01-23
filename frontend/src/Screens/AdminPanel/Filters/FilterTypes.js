import { useEffect, useState } from 'react'
import { IconButton, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useTranslation } from 'react-i18next'

const FilterTypes = ({ register, field, watch, index, append, name, label }) => {
    const { t } = useTranslation()
    const [r, setR] = useState('none')

    useEffect(() => {
        if (watch(`${name}.${index}.name`) && watch(name).length - 1 === index) setR('block')
        else setR('none')
    }, [watch()])

    return (
        <TextField
            key={field.id}
            {...register(`${name}.${index}.name`)}
            label={t(label ?? name)}
            variant='standard'
            color='error'
            fullWidth
            sx={{ my: 1 }}
            InputProps={{
                endAdornment: (
                    <IconButton sx={{ display: r }} onClick={() => append()} size='small'>
                        <AddIcon />
                    </IconButton>
                ),
            }}
        />
    )
}

export default FilterTypes
