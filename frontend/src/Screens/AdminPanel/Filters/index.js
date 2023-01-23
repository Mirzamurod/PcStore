import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Input, InputOptions } from '../../../Components'
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid } from '@mui/material'
import FilterTypes from './FilterTypes'
import FilterSelects from './FilterSelects'

const Filters = () => {
    const { t } = useTranslation()
    const formSchema = Yup.object().shape({
        filter_name: Yup.string().required(t('filter_name_required')),
        filter_sort_key: Yup.string(),
        sort: Yup.array().when('filter_sort_key', {
            is: filter_sort_key => filter_sort_key && filter_sort_key.length > 0,
            then: Yup.array().of(
                Yup.object().shape({ name: Yup.string().required('This field is required') })
            ),
            otherwise: Yup.array().of(Yup.object().shape({ name: Yup.string() })),
        }),
        minmax: Yup.boolean(),
        column: Yup.string(),
        checkbox: Yup.array().when('column', {
            is: column => column && column.length > 0,
            then: Yup.array().of(
                Yup.object().shape({ name: Yup.string().required('This field is required') })
            ),
            otherwise: Yup.array().of(Yup.object().shape({ name: Yup.string() })),
        }),
        select: Yup.array(
            Yup.object({
                key: Yup.string(),
                name: Yup.mixed().when('key', {
                    is: key => key && key.length > 0,
                    then: Yup.string().required('This field is required'),
                    otherwise: Yup.string(),
                }),
            })
        ),
    })
    const {
        register,
        handleSubmit,
        control,
        watch: watch1,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(formSchema),
        defaultValues: {
            sort: [{ name: '' }],
            checkbox: [{ name: '' }],
            select: [{ name: 'All ', key: 'all' }],
        },
    })

    console.log(errors)

    const watch = useCallback(watch1, [])

    const { fields: fieldsSort, append: appendSort } = useFieldArray({
        name: 'sort',
        control,
    })
    const { fields: fieldsCheckbox, append: appendCheckbox } = useFieldArray({
        name: 'checkbox',
        control,
    })
    const { fields: fieldsSelect, append: appendSelect } = useFieldArray({
        name: 'select',
        control,
    })

    const onSubmit = values => {
        console.log(values)
    }

    const DividerText = ({ children }) => (
        <Divider textAlign='left' sx={{ color: 'red' }}>
            {t(children)}
        </Divider>
    )

    return (
        <Grid container spacing={4}>
            <Grid item md={4}>
                <Box
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ textAlign: 'center' }}
                >
                    {/* filter name */}
                    <DividerText>filter_name</DividerText>
                    <InputOptions
                        options={[{ name: 'filter_name' }]}
                        register={register}
                        errors={errors}
                    />
                    {/* filter sort */}
                    <DividerText>Filter category sort</DividerText>
                    <Input name='filter_sort_key' register={register} errors={errors} />
                    {fieldsSort.map((field, index) => (
                        <FilterTypes
                            key={field.id}
                            register={register}
                            watch={watch}
                            field={field}
                            index={index}
                            append={appendSort}
                            name='sort'
                            label='filter_item'
                        />
                    ))}
                    {/* filter min max */}
                    <DividerText>Filter category min-max</DividerText>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox color='error' {...register('minmax')} />}
                            label={`${t('min')}, ${t('max')}`}
                        />
                    </FormGroup>
                    {/* filter checkbox */}
                    <DividerText>Filter category checkbox</DividerText>
                    <Input name='column' register={register} errors={errors} />
                    {fieldsCheckbox.map((field, index) => (
                        <FilterTypes
                            key={field.id}
                            register={register}
                            watch={watch}
                            field={field}
                            index={index}
                            append={appendCheckbox}
                            name='checkbox'
                            label='filter_item'
                        />
                    ))}
                    {/* filter select */}
                    <DividerText>Filter category select</DividerText>
                    {/* Button */}
                    {fieldsSelect.map((field, index) => (
                        <FilterSelects
                            key={field.id}
                            register={register}
                            watch={watch}
                            field={field}
                            index={index}
                            append={appendSelect}
                            name='select'
                            labels={['filter_select_key', 'filter_select_value']}
                        />
                    ))}
                    <Button
                        color='error'
                        variant='outlined'
                        // endIcon={<ArrowRightAltIcon />}
                        sx={{ mt: 2 }}
                        size='large'
                        type='submit'
                    >
                        {t('save')}
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Filters
