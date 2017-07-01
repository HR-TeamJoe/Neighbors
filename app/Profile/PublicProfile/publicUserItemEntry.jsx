/* eslint react/prop-types: 0 */


const React = require('react');

class PublicUserItemEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="row">
        <a href="#" className="pull-left col-md-2">
          <img
            src={this.props.image}
            alt={this.props.title}
            className="img-responsive"
          />
        </a>
        <div className="col-md-6">
          <h4 className="title">{this.props.title}</h4>
          <p className="summary">{this.props.description}</p>
        </div>
        <div className="col-md-4">
          {this.props.borrowed ? <div>Borrowed</div> : <div>Available</div>}
        </div>
      </div>
    );
  }
}

module.exports = PublicUserItemEntry;
