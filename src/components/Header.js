import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {location: ''};
  }

  handleChange = (e) => {
    this.setState({location: e.target.value});
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  handleSubmit = () => {
    this.props.getYelpData(this.state.location)
    this.setState({location: ''});
  }

  render() {
    return (
      <div>
        <label>
          Location: <input type="text" value={this.state.location} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        </label>
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

export default Header;
