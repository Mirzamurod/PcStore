import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  Autocomplete,
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import mbData from '@/data/motherboard'
import cpuData from '@/data/cpu'
import { useAppSelector } from '@/store'

const Sidebar = () => {
  const { t } = useTranslation()
  const [price, setPrice] = useState('uzs')
  const [cpu, setCpu] = useState('all_cpu')
  const [cpuName, setCpuName] = useState<{ cpu: string; name: string }[]>([])
  const [mb, setMb] = useState('all_mb')
  const [mbName, setMbName] = useState<{ mb: string; name: string }[]>([])
  const [ssd, setSsd] = useState('ssd')

  const { mode } = useAppSelector(state => state.login)

  const motherboards = [
    { name: t('all_mb'), key: 'all_mb' },
    { name: 'Asus', key: 'asus' },
    { name: 'Gigabyte', key: 'gigabyte' },
    { name: 'Colorful', key: 'colorful' },
    { name: 'Msi', key: 'msi' },
    { name: 'Asrock', key: 'asrock' },
    { name: 'Biostar', key: 'biostar' },
  ]

  return (
    <Box
      border={`1px solid ${mode === 'dark' ? '#e2e4e5' : 'gray'}`}
      borderRadius={2}
      height='calc(100vh - 100px)'
      position='sticky'
      top='64px'
      overflow='hidden'
      p={2}
      sx={{
        overflow: 'auto',
        '&::-webkit-scrollbar': { width: '7px' },
        '&::-webkit-scrollbar-thumb': { bgcolor: 'red', borderRadius: 100 },
      }}
    >
      <Box component='form'>
        {/* Price */}
        <Box display='flex' justifyContent='space-between'>
          <Typography color='error'>{t('price')}</Typography>
          <FormControl size='small' color='error' variant='standard'>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={price}
              onChange={e => setPrice(e.target.value)}
              sx={{ px: 1 }}
            >
              <MenuItem value='uzs'>{t('uzs')}</MenuItem>
              <MenuItem value='usd'>{t('usd')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display='flex' justifyContent='space-between' my={1}>
          <TextField
            label='Min'
            variant='standard'
            color='error'
            placeholder='min'
            sx={{ mr: 1 }}
          />
          <TextField
            label='Max'
            variant='standard'
            color='error'
            placeholder='max'
            sx={{ ml: 1 }}
          />
        </Box>
        <Divider sx={{ mt: 2, mb: 1 }} />
        {/* Cpu */}
        <Typography color='error'>{t('cpu')}</Typography>
        <FormControl fullWidth variant='standard' color='error' sx={{ my: 1 }}>
          <InputLabel id='protsessor'>{t('cpu')}</InputLabel>
          <Select
            labelId='protsessor'
            id='demo-simple-select'
            value={cpu}
            label='Protsessor'
            onChange={e => setCpu(e.target.value)}
          >
            <MenuItem value='all_cpu'>{t('all_cpu')}</MenuItem>
            <MenuItem value='intel'>{t('intel')}</MenuItem>
            <MenuItem value='amd'>{t('amd')}</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth variant='standard' color='error' sx={{ my: 1 }}>
          <Autocomplete
            multiple
            id='tags-standard'
            options={cpu === 'all_cpu' ? cpuData : cpuData.filter(cpucpu => cpucpu.cpu === cpu)}
            getOptionLabel={option => option.name}
            value={cpuName}
            onChange={(event, newValue) =>
              setCpuName([...cpuName, ...newValue.filter(option => cpuName.indexOf(option) === -1)])
            }
            renderInput={params => (
              <TextField
                {...params}
                color='error'
                variant='standard'
                label={t(cpu)}
                placeholder={t(cpu)}
              />
            )}
          />
        </FormControl>
        <Divider sx={{ my: 1 }} />
        {/* Motherboard */}
        <Typography color='error'>{t('motherboard')}</Typography>
        <FormControl fullWidth variant='standard' color='error' sx={{ my: 1 }}>
          <InputLabel id='protsessor'>{t('motherboard')}</InputLabel>
          <Select
            labelId='protsessor'
            id='demo-simple-select'
            value={mb}
            label='Protsessor'
            onChange={e => setMb(e.target.value)}
          >
            {motherboards.map(({ name, key }) => (
              <MenuItem value={key} key={key}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth variant='standard' color='error' sx={{ my: 1 }}>
          <Autocomplete
            multiple
            id='tags-standard'
            options={mb === 'all_mb' ? mbData : mbData.filter(mbmb => mbmb.mb === mb)}
            getOptionLabel={option => option.name}
            value={mbName}
            onChange={(event, newValue) =>
              setMbName([...mbName, ...newValue.filter(option => mbName.indexOf(option) === -1)])
            }
            renderInput={params => (
              <TextField
                {...params}
                color='error'
                variant='standard'
                label={t(mb)}
                placeholder={t(mb)}
              />
            )}
          />
        </FormControl>
        <Divider sx={{ my: 1 }} />
        {/* Videocard */}
        <Typography color='error'>{t('videocard')}</Typography>
        <Divider sx={{ my: 1 }} />
        {/* Memory */}
        <Typography color='error'>{t('ram')}</Typography>
        <FormControl sx={{ my: 1 }}>
          <FormGroup>
            <Grid container>
              {[2, 4, 8, 16, 32].map(num => (
                <Grid md={6} item key={num}>
                  <FormControlLabel label={`${num}gb`} control={<Checkbox color='error' />} />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
        </FormControl>
        <Divider sx={{ my: 1 }} />
        {/* Hdd */}
        <Typography color='error'>{t('hdd')}</Typography>
        <Divider sx={{ my: 1 }} />
        {/* Ssd */}
        <Box display='flex' justifyContent='space-between'>
          <Typography color='error'>{t('ssd')}</Typography>
          <FormControl size='small' color='error' variant='standard'>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={ssd}
              onChange={e => setSsd(e.target.value)}
              sx={{ px: 1 }}
            >
              <MenuItem value='ssd'>{t('ssd')}</MenuItem>
              <MenuItem value='ssd_sata'>{t('ssd_sata')}</MenuItem>
              <MenuItem value='ssd_m2'>{t('ssd_m2')}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <FormControl sx={{ my: 1 }}>
          <FormGroup>
            <Grid container>
              {['128gb', '256gb', '512gb', '1tb'].map(num => (
                <Grid md={6} item key={num}>
                  <FormControlLabel label={num} control={<Checkbox color='error' />} />
                </Grid>
              ))}
            </Grid>
          </FormGroup>
        </FormControl>
      </Box>
    </Box>
  )
}

export default Sidebar
