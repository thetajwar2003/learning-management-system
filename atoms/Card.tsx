import React from "react";
import { Card, Button, Icon, Popup, Grid, Label } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getUpdated } from "../util/TimeHandler";

export default function CustomCard(props) {
  const router = useRouter();
  const { teacherID } = router.query;

  const updated = getUpdated(props.cardDetails.updatedAt);

  return (
    <Card centered raised>
      <Card.Content>
        <Link href={`${teacherID}/${props.cardDetails.classCode}`}>
          <Card.Header
            as="a"
            style={{
              height: "100px",
              backgroundImage: `url(${props.subjectPic})`,
              backgroundSize: "cover",
              color: "#ffffff",
              padding: "7%",
              borderRadius: "10px",
              width: "400px",
            }}
          >
            {props.cardDetails.className}
          </Card.Header>
        </Link>
      </Card.Content>
      <Card.Content>
        <Card.Meta textAlign="left">
          <Label image style={{ paddingRight: "0%" }}>
            Period:
            <Label.Detail>
              <strong>{props.cardDetails.period}</strong>
            </Label.Detail>
          </Label>
        </Card.Meta>
        <Card.Description style={{ height: "150px" }}>
          Steve wants to add you to the group <strong>best friends</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Grid columns={2} style={{ padding: "0%" }}>
          <Grid.Column width={11} textAlign="left">
            Last Updated: {updated}
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
