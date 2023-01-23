import { useTranslation } from 'react-i18next'
import { Editor } from 'react-draft-wysiwyg/'
import { Box } from '@mui/material'

const EditorPc = ({ lang }) => {
    const { t } = useTranslation()

    return (
        <Box
            component={Editor}
            sx={{ '& .rdw-editor-main': { height: '100px !important' } }}
            // editorState={content}
            style={{ color: 'black !important' }}
            onEditorStateChange={e => console.log('hello')}
            wrapperClassName='demo-wrapper'
            editorClassName='demo-editor'
            placeholder={`${t('description')} ${lang}`}
        />
    )
}

export default EditorPc
