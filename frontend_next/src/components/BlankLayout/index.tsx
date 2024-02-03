import { FC, Fragment } from 'react'
import { IBlankLayout } from '@/types/blankLayout'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const BlankLayout: FC<IBlankLayout> = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  )
}

export default BlankLayout
