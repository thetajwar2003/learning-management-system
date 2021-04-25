import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  Comment,
  Grid,
  Header,
  Icon,
  Image,
  TextArea,
} from "semantic-ui-react";
import { firestore } from "../lib/firebase";

import { getLatestTime, getTimeOrDate } from "../util/TimeHandler";
import AllPostsModal from "../components/AllPostsModal";

export default function PostCard({ posts, user }) {
  const router = useRouter();
  const { teacherID, classID } = router.query;

  const [text, setText] = useState("");

  const data = getLatestTime(Object.keys(posts.replies));
  const userName = posts.replies[data]?.userName;
  const userReply = posts.replies[data]?.text;
  const userImage = posts.replies[data]?.userPhoto;

  const onPost = async () => {
    const postRef = await firestore
      .collection("classes")
      .doc(`${classID}`)
      .collection("posts")
      .doc(`${posts.id}`);

    postRef
      .update({
        replies: {
          ...(await postRef.get()).data().replies,
          [new Date().getTime()]: {
            userName: user.name,
            userPhoto: user.photoURL,
            text: text.replace(/\r?\n/g, "<br/>"),
          },
        },
      })
      .then(() => setText(""));
  };
  return (
    <Card
      fluid
      style={{
        borderRadius: "10px",
      }}
    >
      <Card.Content>
        <Card.Header>
          <Image
            src={posts.posterPhoto}
            circular
            size="mini"
            verticalAlign="top"
            style={{ margin: "0% 1% 0% 1%" }}
          />
          <Header
            as="h5"
            style={{ fontWeight: "normal", fontSize: 16, display: "inline" }}
          >
            {posts.posterName}
            <Header.Subheader
              style={{ fontSize: 12, display: "inline", float: "right" }}
            >
              {
                new Date(posts.createdAt)
                  .toLocaleDateString("en-US")
                  .split("T")[0]
              }
            </Header.Subheader>
          </Header>
        </Card.Header>
        <Card.Description style={{ padding: "1% 1% 1% 1%" }}>
          {posts.text}
        </Card.Description>
      </Card.Content>
      {Object.keys(posts.replies).length === 0 ? null : (
        <>
          <Card.Content style={{ paddingBottom: "0%" }}>
            {/* <Button size="medium" basic>
              <Icon name="comments" />
              {Object.keys(posts.replies).length} class comments
            </Button> */}
            <AllPostsModal posts={posts} user={user} />
          </Card.Content>
          <Comment.Group>
            <Comment style={{ paddingBottom: "0%" }}>
              <Comment.Content>
                <Image
                  src={userImage}
                  circular
                  size="mini"
                  style={{ marginLeft: "1%", marginRight: "1%" }}
                />
                <Comment.Author as="a" style={{ marginBottom: "0%" }}>
                  {userName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{data ? getTimeOrDate(data) : null}</div>
                </Comment.Metadata>
                <Comment.Text style={{ paddingLeft: "50px", marginTop: "0%" }}>
                  {userReply}
                </Comment.Text>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </>
      )}

      <Card.Content extra>
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column width={1} textAlign="right">
              <Image
                src={user.photoURL}
                circular
                size="mini"
                style={{ margin: "1%" }}
              />
            </Grid.Column>
            <Grid.Column width={14} style={{ padding: "0%" }}>
              <TextArea
                placeholder="Add a comment"
                style={{ width: "100%" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </Grid.Column>
            <Grid.Column width={1} textAlign="left" style={{ padding: "0%" }}>
              <Button
                style={{ background: "#ffffff", paddingRight: "0%" }}
                onClick={onPost}
              >
                <Icon name="send" />
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card.Content>
    </Card>
  );
}
