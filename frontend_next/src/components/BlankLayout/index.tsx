import { FC, Fragment } from 'react'
import { IBlankLayout } from '@/types/blankLayout'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

const BlankLayout: FC<IBlankLayout> = ({ children }) => {
  const store = useSelector((state: RootState) => state.login)

  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  )
}

export default BlankLayout
