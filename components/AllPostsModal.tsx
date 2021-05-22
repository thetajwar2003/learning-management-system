import React, { useState } from "react";
import { Modal, Image, Button, Header, Icon, Comment } from "semantic-ui-react";
import PostComment from "../atoms/PostComment";
import { getTimeOrDate } from "../util/TimeHandler";

import CreateClass from "./CreateClass";

export default function AllPostsModal({ posts, user }) {
  const [open, setOpen] = useState(false);
  return (
    <Modal
      dimmer={false}
      closeOnDimmerClick={false}
      closeIcon={{
        style: { top: "1.0535rem", right: "1rem" },
        color: "black",
        name: "close",
      }}
      size="small"
      open={open}
      trigger={
        <Button size="medium" basic>
          <Icon name="comments" />
          {Object.keys(posts.replies).length} class comments
        </Button>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      centered
    >
      <Modal.Header>Class Comments</Modal.Header>
      <Modal.Content>
        <Comment.Group>
          <PostComment
            image={posts.posterPhoto}
            name={posts.posterName}
            time={
              new Date(posts.createdAt)
                .toLocaleDateString("en-US")
                .split("T")[0]
            }
            reply={posts.text}
          />
        </Comment.Group>
        <Comment.Group>
          {Object.keys(posts.replies).map((reply: any) => {
            return (
              <PostComment
                image={posts.replies[reply]?.userPhoto}
                name={posts.replies[reply]?.userName}
                time={getTimeOrDate(reply)}
                reply={posts.replies[reply]?.text}
              />
            );
          })}
        </Comment.Group>
      </Modal.Content>
    </Modal>
  );
}
//TODO: replace null for students
