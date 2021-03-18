import React, { useState } from "react";
import { Modal, Popup, Button, Icon } from "semantic-ui-react";

import CreateClass from "./CreateClass";

export default function ClassModal(props) {
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
        <Popup
          trigger={
            <Button
              style={{ background: "#ffffff", paddingBottom: "0%" }}
              onClick={() => setOpen(true)}
            >
              <Icon name="plus" circular />
            </Button>
          }
          content={props.title}
          basic
          on="hover"
          position="bottom center"
          mouseEnterDelay={500}
          inverted
        />
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      centered
    >
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Content>{props.create ? <CreateClass /> : null}</Modal.Content>
    </Modal>
  );
}
