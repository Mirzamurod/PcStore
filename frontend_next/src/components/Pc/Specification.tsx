import { useTranslation } from 'react-i18next'

const Specification = () => {
  const { t } = useTranslation()

  return <div>{t('specification')}</div>
}

export default Specification
