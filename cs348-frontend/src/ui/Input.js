import React from 'react';
import TextField from '@material-ui/core/TextField';
import './Input.css';

export default class Input extends React.Component {

    render() {
        return (
            <form noValidate autoComplete="off">
                <TextField id="standard-basic" label="Artist" />
                <TextField id="standard-basic" label="Title" />
                <TextField id="standard-basic" label="Year" />
            </form>
        );
    }
}