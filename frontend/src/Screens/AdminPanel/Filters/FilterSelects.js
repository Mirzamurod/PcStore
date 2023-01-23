import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Divider, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const FilterSelects = ({ field, register, watch, index, append, labels, name }) => {
    const { t } = useTranslation()
    const [r, setR] = useState('')

    useEffect(() => {
        if (
            watch(`${name}.${index}.name`).length &&
            watch(`${name}.${index}.key`).length &&
            watch(name).length - 1 === index
        )
            setR('')
        else setR('none')
    }, [watch()])

    return (
        <Box key={field.id}>
            <TextField
                {...register(`${name}.${index}.key`)}
                label={t(labels[0])}
                variant='standard'
                color='error'
                fullWidth
                sx={{ my: 1 }}
            />
            <TextField
                {...register(`${name}.${index}.name`)}
                label={t(labels[1])}
                variant='standard'
                color='error'
                fullWidth
                sx={{ my: 1 }}
            />
            <Divider sx={{ display: r }} />
            <Button
                startIcon={<AddIcon />}
                color='error'
                variant='text'
                sx={{ display: r, mt: 1 }}
                size='small'
                onClick={() => append()}
            >
                Add
            </Button>
        </Box>
    )
}

export default FilterSelects
