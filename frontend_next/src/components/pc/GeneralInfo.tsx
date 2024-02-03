import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Box, Button } from '@mui/material'
import Comment from '@/components/pc/AddComment'
import Specification from '@/components/pc/Specification'

const GeneralInfo = () => {
  const { t } = useTranslation()
  const [change, setChange] = useState('comment')

  return (
    <Box>
      <Box sx={{ width: '100%', typography: 'body1', my: 4, borderBottom: '1px solid red' }}>
        {['comment', 'specification'].map((item, index) => (
          <Button
            onClick={() => setChange(item)}
            key={index}
            sx={{ borderRadius: 0 }}
            variant={classNames({ outlined: change === item }) as 'outlined'}
            color='error'
          >
            {t(item)}
          </Button>
        ))}
      </Box>
      <Box>{change === 'comment' ? <Comment /> : <Specification />}</Box>
    </Box>
  )
}

export default GeneralInfo
