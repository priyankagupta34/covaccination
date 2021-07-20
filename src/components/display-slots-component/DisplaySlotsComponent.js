import React, { Component } from 'react'
import './DisplaySlotsComponent.css'

export default class DisplaySlotsComponent extends Component {
    render() {
        const { slotList, selectSlotHandler, selectedSlot } = this.props;
        return (
            <div className="slotlst">
                {slotList.map((item, index) => (
                    <div key={index} onClick={() => selectSlotHandler(index)} className={selectedSlot === index ? 'selectedSlot' : 'slot'}>
                        {item}
                        {selectedSlot === index ?<div className="slotick">&#9989;</div>:<div className="slotick">&#11036;</div>}
                    </div>
                ))}
            </div>
        )
    }
}
