import { useState } from 'react'
import SeekBar from 'react-seekbar-component'
import 'react-seekbar-component/dist/index.css'

const ProgressBar = () => {

  const [value, setValue] = useState(0)

  return (
    <div className='coba'>
      <SeekBar
        getNumber={setValue}
        width="100%"
        backgroundColor="#3D4142"
        fillColor="#3254FF"
        headColor="none"
        headShadow="none"
        headShadowSize={1}
        progress={40}
      />
    </div>
  )
}
export default ProgressBar;