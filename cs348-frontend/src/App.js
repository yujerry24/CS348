import React, { Component } from 'react';
import DataTable from './ui/DataTable';
import Input from './ui/Input';
import Button from './ui/SubmitButton';



import './App.css';

const headings = [
  'Artist',
  'Title',
  'Year'
];

let rows = [];

class App extends Component {
  constructor(){
    super();
    this.state = {apiResponse: []};
    this.onSubmit = this.onSubmit.bind(this);
    this.callAPI = this.callAPI.bind(this);
  }

  onSubmit() {
    console.log('props');
    this.callAPI();
    this.forceUpdate();
  }

  callAPI(){
    fetch('http://localhost:4000/playlist1')
      .then(res => res.json())
      .then(res => {
        this.setState({apiResponse: res});
      })
      .catch(err => err);
  }

  render() {
    rows = [];
    this.state.apiResponse.forEach(entry => {
      rows.push([entry.artist, entry.title, entry.year]);
    });

    return (
      <div className = 'container'>
        {/* <Input/> */}
        <Button onSubmit={this.onSubmit}/>
        <DataTable headings={headings} rows={rows} />
      </div>
    );
  }
}

export default App;