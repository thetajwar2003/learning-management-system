import React, { useState } from "react";
import { Modal, Image, Button, Header, Icon } from "semantic-ui-react";

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
      </Modal.Content>
    </Modal>
  );
}
//TODO: replace null for students
