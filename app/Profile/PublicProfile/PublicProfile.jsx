/*  global fetch:false  */
/* eslint react/prop-types: 0 */
// User Profile Page

const React = require('react');
const PublicProfileBio = require('./publicProfileBio.jsx');
const PublicProfileItemList = require('./publicProfileItemList.jsx');
import CommentForm from './publicCommentForm.jsx';
import Comments from './publicComments.jsx';
const Messages = require('./Messages.jsx');


class PublicProfile extends React.Component {
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
      updatedAt: null
      // ,
      // currentComment: '' // added empty comments array
    };
    // this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    // this.updateComment = this.updateComment.bind(this);
    console.log('In PublicProfile, this.props.comments is: ', this.props.comments);
  }
  componentWillMount() {
    this.populateProfile(this.props.id);
    this.props.getComments(this.props.id);
  }
  // Populate profile populates the profile page by querying the User table by Id.
  // It is passed down to both borrowedItemEntry and UserItemEntry as a click handler.
  populateProfile(profileRoute) {
    fetch(`/api/profile/${profileRoute}`, { credentials: 'same-origin' })
      .then(profile => profile.json())
      .then(json => this.setState(json));
  }
  // handleCommentSubmit(e) {
  //   e.preventDefault();
  //   this.setState({ currentComment: '' });
  //   const messageData = {
  //     submitterId: this.props.currentUserId,
  //     targetId: this.state.id,
  //     message: this.state.currentComment
  //   };
  //   console.log('Sending data: ', messageData);

  //   fetch('/api/comments', {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     credentials: 'same-origin',
  //     body: JSON.stringify(messageData),
  //   })
  //   .then(() => this.props.getComments(this.props.id)); 
  // }
  // updateComment(e) {
  //   this.setState({ currentComment: e.target.value });
  // }
  render() {
    return (
      <div className="container">
        <div className="col-lg-5 sub-component">
          <img
            className="img-responsive"
            src={this.state.image}
            alt=""
          />
          <section className="spacer" />
          <PublicProfileBio
            fullName={this.state.fullName}
            email={this.state.email}
            bio={this.state.bio}
            rating={this.state.rating}
            city={this.state.city}
            state={this.state.state}
            zip={this.state.zip}
          />
          <div>
          <div>
            <Comments
              handleScroll={this.props.handleScroll}
              getComments={this.props.getComments}
              currentUserId={this.props.currentUserId}
              comments={this.props.comments}
            />
          </div>
          <div>
            <CommentForm
              currentComment={this.props.currentComment} 
              handleCommentSubmit={this.props.handleCommentSubmit}
              updateComment={this.props.updateComment}
            />
          </div>
        </div>
        </div>
        <div className="col-lg-7">
          {this.state.id &&
            <PublicProfileItemList
              populateProfile={this.populateProfile.bind(this)}
              userId={this.state.id}
            />
          }
        </div>
        <div>
          <Messages self={this.props.self} friend={this.props.id} allProps={this.props.allProps}/>
        </div>
      </div>
    );
  }
}

module.exports = PublicProfile;
