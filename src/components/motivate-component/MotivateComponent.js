import React, { Component } from 'react'
import './MotivateComponent.css'

export default class MotivateComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            time: 0
        };
    }
    componentDidMount(){
        let timer = setInterval(() => {
            this.setState(state=>{
                state.time++;
                return state; 
            })
        }, 100);

        setTimeout(() => {
            clearInterval(timer);
        }, 10000);
    }
    render() {
        const whiles= "It's time for India to fight back !!";
        const {time} = this.state;
        return(
            <div className="fgt">
                {whiles.slice(0, time)}
            </div>
        )
    }
}