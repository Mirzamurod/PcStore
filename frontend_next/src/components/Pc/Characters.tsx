import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@mui/material'
import { RootState } from '@/store'

const Characters = () => {
  const { t } = useTranslation()

  const { pc } = useSelector((state: RootState) => state.pc)

  return (
    <Grid container spacing={3} sx={{ pt: 4, justifyContent: 'space-between' }}>
      {['cpu', 'ram', 'motherboard', 'hdd', 'ssd_sata', 'ssd_m2', 'videocard'].map(
        (name, index: number) =>
          // @ts-ignore
          pc?.[name] ? (
            <Grid item md='auto' key={index} sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* @ts-ignore */}
              <Typography sx={{ fontWeight: 700, fontSize: '100%' }}>{pc?.[name]}</Typography>
              <Typography variant='h6' sx={{ opacity: 0.5, mt: 'auto' }}>
                {t(name)}
              </Typography>
            </Grid>
          ) : null
      )}
    </Grid>
  )
}

export default Characters
