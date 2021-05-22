import React from "react";
import { Comment, Image } from "semantic-ui-react";

export default function PostComment(props) {
  return (
    <Comment style={{ paddingBottom: "0%" }}>
      <Comment.Content>
        <Image
          src={props.image}
          circular
          size="mini"
          style={{ marginLeft: "1%", marginRight: "1%" }}
        />
        <Comment.Author as="a" style={{ marginBottom: "0%" }}>
          {props.name}
        </Comment.Author>
        <Comment.Metadata>
          <div>{props.time}</div>
        </Comment.Metadata>
        <Comment.Text style={{ paddingLeft: "50px", marginTop: "0%" }}>
          {typeof props.reply === "object"
            ? Object.keys(props.reply).map((index: any) => {
                return index === props.reply.length - 1 ? (
                  props.reply[index]
                ) : (
                  <React.Fragment>
                    {props.reply[index]}
                    <br />
                  </React.Fragment>
                );
              })
            : props.reply}
        </Comment.Text>
      </Comment.Content>
    </Comment>
  );
}
