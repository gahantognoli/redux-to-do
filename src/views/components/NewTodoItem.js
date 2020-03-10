import React, { Component } from 'react';

class NewTodoItem extends Component {

    defaultProps = {
        onAdd: () => {}
    }

    constructor(props){
        super(props);

        this.state = {
            description: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
    }

    handleChange(event){
        const { target } = event,
            { name, value } = target;
        this.setState({
            [name]: value
        })
    }

    add(event){
        event.preventDefault();

        const description = this.state.description;
        if(description){
            this.setState({
                description: ''
            });
            this.props.onAdd(description);
        }
    }

    render(){
        const { state } = this;
        return (
            <form onSubmit={this.add}>
                <input className="tw-input" 
                type="text" 
                placeholder="Novo item" 
                name="description" 
                value={state.description}
                onChange={this.handleChange} />
                <button className="tw-btn">Adicionar</button>
            </form>
        )
    }
}

export default NewTodoItem