import React from 'react';
export default class Hello extends React.Component {
  render() {
    return (
      <div className="container-fluid">

        <div>
          {this.props.children}
        </div>

      </div>
    );
  }
}
