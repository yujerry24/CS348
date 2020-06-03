import React from 'react';
import Button from '@material-ui/core/Button';

export default class SubmitButton extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        console.log('form submit');
    }

    render() {
        return (
            <form>
                <Button variant="contained" onClick={this.handleSubmit}>Default</Button>
            </form>
        );
    }
}