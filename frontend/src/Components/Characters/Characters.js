import { useSelector } from 'react-redux'
import { Grid, Typography } from '@mui/material'

const Characters = () => {
    const { pc } = useSelector(state => state.pc)

    return (
        <Grid container spacing={3} sx={{ pt: 4, justifyContent: 'space-between' }}>
            <Grid item md='auto' sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '100%' }}>{pc?.cpu}</Typography>
                <Typography variant='h6' sx={{ opacity: 0.5, mt: 'auto' }}>
                    Processor
                </Typography>
            </Grid>
            <Grid item md='auto' sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '100%' }}>{pc?.ddr}</Typography>
                <Typography variant='h6' sx={{ opacity: 0.5, mt: 'auto' }}>
                    Memory
                </Typography>
            </Grid>
            <Grid item md='auto' sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '100%' }}>
                    {pc?.motherboard}
                </Typography>
                <Typography variant='h6' sx={{ opacity: 0.5, mt: 'auto' }}>
                    Motherboard
                </Typography>
            </Grid>
            {pc?.hdd && (
                <Grid item md='auto' sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '100%' }}>{pc?.hdd}</Typography>
                    <Typography variant='h6' sx={{ opacity: 0.5, mt: 'auto' }}>
                        HDD
                    </Typography>
                </Grid>
            )}
            {pc?.ssd_sata && (
                <Grid item md='auto' sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '100%' }}>
                        {pc?.ssd_sata}
                    </Typography>
                    <Typography variant='h6' sx={{ opacity: 0.5, mt: 'auto' }}>
                        SSD
                    </Typography>
                </Grid>
            )}
            {pc?.ssd_m2 && (
                <Grid item md='auto' sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '100%' }}>{pc?.ssd_m2}</Typography>
                    <Typography variant='h6' sx={{ opacity: 0.5, mt: 'auto' }}>
                        M.2
                    </Typography>
                </Grid>
            )}
            {pc?.videocard && (
                <Grid item md='auto' sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '100%' }}>
                        {pc?.videocard}
                    </Typography>
                    <Typography variant='h6' sx={{ opacity: 0.5, mt: 'auto' }}>
                        Videocard
                    </Typography>
                </Grid>
            )}
        </Grid>
    )
}

export default Characters
