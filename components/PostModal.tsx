import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Modal,
  Card,
  Image,
  TextArea,
  Form,
  Button,
  Dropdown,
} from "semantic-ui-react";
import { firestore } from "../lib/firebase";

export default function PostModal(props) {
  const router = useRouter();
  const { teacherID, classID } = router.query;

  const [open, setOpen] = useState(false);
  const [post, setPost] = useState("");

  //TODO: posts cant be an array, they need need their own collection because they need time created/updated, and comments
  const handleSubmitPost = async () => {
    console.log("here");
    const classRef = await firestore
      .collection("classes")
      .doc(`${classID}`)
      .collection("posts")
      .doc();

    classRef
      .set({
        text: post,
        createdAt: new Date().getTime(),
        replies: {},
        poster: props.user.id,
        posterPhoto: props.user.photoURL,
        posterName: props.user.name,
      })
      .then(() => {
        setOpen(false);
        router.reload();
      });
  };

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
        <Card
          fluid
          raised
          style={{
            borderRadius: "10px",
          }}
          onClick={() => setOpen(true)}
        >
          <Card.Content>
            <Card.Description>
              <Image
                src={props.user.photoURL}
                circular
                size="mini"
                style={{ margin: "0% 1% 0% 1%" }}
              />
              Announce something to your class
            </Card.Description>
          </Card.Content>
        </Card>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      centered
    >
      <Modal.Header>Create A Post!</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <TextArea
              placeholder="Announce something to your class"
              onChange={(e) => setPost(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button.Group primary>
          <Button onClick={handleSubmitPost}>Post</Button>
          <Dropdown floating className="button icon" />
        </Button.Group>
      </Modal.Actions>
    </Modal>
  );
}
