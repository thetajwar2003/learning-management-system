import React from "react";
import { Card, Button, Icon, Popup, Grid } from "semantic-ui-react";

export default function CustomCard(props) {
  const updated = Math.round(
    (new Date().getTime() - props.cardDetails.updatedAt) / (1000 * 60)
  );
  return (
    <Card centered raised>
      <Card.Content>
        <Card.Header
          style={{
            height: "100px",
            backgroundImage: `url(https://picsum.photos/200/300/?random=${props.cardDetails.period})`,
            backgroundSize: "cover",
            color: "#ffffff",
            padding: "7%",
            borderRadius: "10px",
          }}
        >
          {props.cardDetails.className}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Meta textAlign="left">
          Period: {props.cardDetails.period}
        </Card.Meta>
        <Card.Description style={{ height: "150px" }}>
          Steve wants to add you to the group <strong>best friends</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid columns={2} style={{ padding: "0%" }}>
          <Grid.Column width={11} textAlign="left">
            Last Updated: {updated} mins ago
          </Grid.Column>
          <Grid.Column width={5} textAlign="right">
            <Popup
              trigger={
                <Button
                  role="copy"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(props.cardDetails.classCode);
                  }}
                  style={{ background: "#ffffff", padding: "0%" }}
                >
                  <Icon name="clipboard" size="large" />
                </Button>
              }
              basic
              inverted
              on="hover"
              content="Click to copy class code"
            />
            <Popup
              trigger={
                <Button
                  style={{ background: "#ffffff", padding: "0%" }}
                  onClick={(e) => {
                    e.preventDefault();
                    props.onDelete(props.cardDetails.classCode);
                  }}
                >
                  <Icon name="trash" size="large" />
                </Button>
              }
              basic
              inverted
              on="hover"
              content="Click to delete class"
            />
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
}
