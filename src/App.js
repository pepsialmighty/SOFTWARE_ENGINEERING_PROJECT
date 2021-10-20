import React from 'react'
import './styles/index.scss'

import Sheet from './Sheet'
import FunctionBar from './FunctionBar'

const App = () => {
  return (
    <div>
      <div className='title'>Spreadsheet</div>
      <FunctionBar />
      <Sheet numberOfRows={10} numberOfColumns={10} />
    </div>
  )
}

export default App
