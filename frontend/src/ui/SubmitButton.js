import React from 'react';
import Button from '@material-ui/core/Button';

export default class SubmitButton extends React.Component {
    render() {
        return (
            <form>
                <Button variant="contained" onClick={this.props.onSubmit}>Get Songs</Button>
            </form>
        );
    }
}