import { useSelector } from 'react-redux'
import { Grid, Typography } from '@mui/material'

const Characters = () => {
    const { pc } = useSelector(state => state.pc)

    return (
        <Grid container spacing={3} sx={{ pt: 4, justifyContent: 'space-between' }}>
            {[
                { name: 'cpu', part: 'Processor' },
                { name: 'ddr', part: 'Memory' },
                { name: 'motherboard', part: 'Motherboard' },
                { name: 'hdd', part: 'HDD' },
                { name: 'ssd_sata', part: 'SSD' },
                { name: 'ssd_m2', part: 'M.2' },
                { name: 'videocard', part: 'Videocard' },
            ].map(
                ({ name, part }, index) =>
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
                                {part}
                            </Typography>
                        </Grid>
                    )
            )}
        </Grid>
    )
}

export default Characters
