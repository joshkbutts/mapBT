import React, {useState} from 'react'
import Icon from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import ReactTooltip from 'react-tooltip'

const LocationPin = (props) => {
  const [randomId, setRandomId] = useState(String(Math.random()))
  
  return (
    <div>
      <div className="pin">
        <Icon icon={locationIcon} className="pin-icon" data-tip data-for={randomId}>
        </Icon>
        <ReactTooltip id={randomId} place="top" effect="solid" className='tooltip'>
          <img className='show-page-img' src={props.image}></img> 
        </ReactTooltip>
      </div>
    </div>
  )
}

export default LocationPin