import { useSelector } from 'react-redux'
import { t } from 'i18next'
import { Grid, Typography } from '@mui/material'

const Characters = () => {
    const { pc } = useSelector(state => state.pc)

    return (
        <Grid container spacing={3} sx={{ pt: 4, justifyContent: 'space-between' }}>
            {['cpu', 'ram', 'motherboard', 'hdd', 'ssd_sata', 'ssd_m2', 'videocard'].map(
                (name, index) =>
                    pc?.[name] && (
                        <Grid
                            item
                            md='auto'
                            key={index}
                            sx={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <Typography sx={{ fontWeight: 700, fontSize: '100%' }}>
                                {pc?.[name]}
                            </Typography>
                            <Typography variant='h6' sx={{ opacity: 0.5, mt: 'auto' }}>
                                {t(name)}
                            </Typography>
                        </Grid>
                    )
            )}
        </Grid>
    )
}

export default Characters
