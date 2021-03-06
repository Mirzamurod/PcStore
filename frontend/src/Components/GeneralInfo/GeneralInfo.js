import { useState } from 'react'
import { Box, Button } from '@mui/material'
import Comment from '../AddComment/AddComment'
import GeneralCharacter from '../GeneralCharacter/GeneralCharacter'

const GeneralInfo = () => {
    const [change, setChange] = useState('comment')

    return (
        <Box>
            <Box
                sx={{
                    width: '100%',
                    typography: 'body1',
                    my: 4,
                    borderBottom: '1px solid red',
                }}
            >
                {['comment', 'characters'].map((item, index) => (
                    <Button
                        onClick={() => setChange(item)}
                        key={index}
                        sx={{ borderRadius: 0 }}
                        variant={change === item ? 'outlined' : ''}
                        color='error'
                    >
                        {item}
                    </Button>
                ))}
            </Box>
            <Box>{change === 'comment' ? <Comment /> : <GeneralCharacter />}</Box>
        </Box>
    )
}

export default GeneralInfo
