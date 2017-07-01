/*  global fetch:false  */
/* eslint react/prop-types: 0 */
// User Profile Page
// immediate children components include
// -- ProfileBio, AddStuff, ProfileItemList

const React = require('react');
const ProfileBio = require('./profileBio.jsx');
const AddStuff = require('./addStuff.jsx');
const Bank = require('./bank.jsx');
const ProfileItemList = require('./profileItemList.jsx');
import Comments from './PublicProfile/publicComments.jsx';
import axios from 'axios';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      fbId: null,
      fbToken: null,
      image: null,
      name: null,
      email: null,
      password: null,
      street: null,
      city: null,
      state: null,
      zip: null,
      bio: null,
      rating: null,
      ratingCount: null,
      createdAt: null,
      updatedAt: null,
      listFlag: false
    };
    props.getComments(props.id);
    this.populateProfile = this.populateProfile.bind(this);
  }
  componentDidMount() {
    // this.populateProfile(this.props.id);
    axios.get(`/api/profile/${this.props.id}`)
      .then(result => this.setState(result.data))
      .then(this.setState({
        listFlag: !(this.state.listFlag)
      }));
  }
  // Populate profile populates the profile page by querying the User table by Id.
  populateProfile(profileRoute) {
    // fetch(`/api/profile/${profileRoute}`, { credentials: 'same-origin' })
    //   .then(profile => profile.json())
    //   .then(json => this.setState(json)) //This is a problem
    //   .then(this.setState({
    //     listFlag: !(this.state.listFlag),
    //   }));
    // axios.get(`/api/profile/${profileRoute}`)
    //   .then(result => this.setState(result.data))
    //   .then(this.setState({
    //     listFlag: !(this.state.listFlag)
    //   }));
  }

  render() {
    return (
      <div className="container">
        <div className="col-lg-3 sub-component">
          <section className="spacer" />
          <ProfileBio
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            fullName={this.state.fullName}
            email={this.state.email}
            bio={this.state.bio}
            rating={this.state.rating}
            city={this.state.city}
            state={this.state.state}
            zip={this.state.zip}
            image={this.state.image}
            userId={this.props.id}
            populateProfile={this.populateProfile.bind(this)}
          />
          <div>
            <Comments
              handleScroll={this.props.handleScroll}
              comments={this.props.comments}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <AddStuff userId={this.state.id} populateProfile={this.populateProfile.bind(this)} />
          <Bank userId={this.state.id} />
        </div>
        <div className="col-lg-5">
          {this.state.id &&
            <ProfileItemList
              currentComment={this.props.currentComment} 
              handleCommentSubmit={this.props.handleCommentSubmit}
              updateComment={this.props.updateComment}
              populateProfile={this.populateProfile}
              userId={this.state.id}
              flag={this.state.listFlag}
            />
          }
        </div>
      </div>

    );
  }
}



module.exports = Profile;
