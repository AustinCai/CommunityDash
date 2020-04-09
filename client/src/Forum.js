import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

export class Forum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forumPosts: null
    };
  }

  async getForumPosts() {
    //console.log("getForumPosts()");
    //console.log(this.props.profileInfo);
    try {
      const res = await fetch("http://localhost:9000/forum/zipcode/" + this.props.profileInfo.zipcode);
      if (res.ok){
        const resText = await res.text();
        this.setState({forumPosts: JSON.parse(resText)})
      } else {
        throw new Error('Request failed!');
      }
    } catch (error){
      console.log(error);
    }
  }

  componentWillMount(){
    this.getForumPosts();
  }

  render() {
    console.log("Forum render()");
    console.log(this.state.forumPosts);

    let forumPostsDisplay = null

    if (this.state.forumPosts) {
      console.log("rendering forumPostsDisplay");
      let forumPosts = this.state.forumPosts;
      console.log(typeof(forumPosts));
      forumPostsDisplay = forumPosts.map((post) =>
          <ListGroup>
            <ListGroup.Item>
              <h5>{post.subject}</h5>
            <br/>
              <p>{post.message}</p>
            </ListGroup.Item>
          </ListGroup>
        );
    } 

    return (
      <div>
        <ListGroup>
          {forumPostsDisplay}
        </ListGroup>
      </div>
    );
  }
}