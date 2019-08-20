import React from 'react';

export default class BoardSquare extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
             content: '',                                                                                                                                
        }
    }

    render()
    {         
        return (
        <button 
         id={this.props.index}
         onClick={ this.props.onClick } 
         className='square'>
            {this.props.state}
        </button>);
    }
}
