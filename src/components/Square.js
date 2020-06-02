import React, { Component } from 'react'

export default class Square extends Component {
    render() {
        return (
            <div>
                <div className="box" onClick={() => this.props.boxClick(this.props.id)}>
                    {this.props.value}
                </div>
            </div>
        )
    }
}
