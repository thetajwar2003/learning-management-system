import React from "react";
import { useRouter } from "next/router";
import { Card, Grid, Message, Image, Header, Icon } from "semantic-ui-react";
import {
  firestore,
  getUserWithUID,
  updateClass,
} from "../../../../lib/firebase";
import Link from "next/link";

export async function getServerSideProps({ query }) {
  const { teacherID, classID } = query;
  const teacherDoc = await getUserWithUID(teacherID, "teachers");

  // if there are no users, link to 404 page
  if (!teacherDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  let classData = null;

  if (teacherDoc) {
    user = teacherDoc.data();
    const classesQuery = teacherDoc.ref.collection("classes").doc(classID);

    classData = (await classesQuery.get()).data();
  }

  return {
    props: { user, classData },
  };
}

export default function TeacherSpecificClass({ user, classData }) {
  const router = useRouter();
  const { teacherID, classID } = router.query;
  const commonLink = `/teachers/${teacherID}/${classID}/`;
  return (
    <Grid style={{ margin: "0% 15% 0% 15%", padding: "0%" }}>
      <Grid.Row centered columns={1}>
        <Grid.Column textAlign="left">
          <Message
            floating
            style={{
              backgroundImage: `url(${user.subjectPic})`,
              backgroundSize: "cover",
              height: "200px",
              borderRadius: "10px",
            }}
          >
            <Header as="h1" style={{ color: "#ffffff" }}>
              {classData.className}
              <Header.Subheader style={{ color: "#ffffff" }}>
                {classData.classCode}
              </Header.Subheader>
            </Header>
          </Message>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered textAlign="right">
        <Grid.Column width={4}>
          <Link href={commonLink + "classwork"}>
            <Card
              style={{
                borderRadius: "10px",
              }}
            >
              <Card.Content textAlign="left">
                <b>Classwork</b>
                <Icon name="angle right" style={{ float: "right" }} />
              </Card.Content>
            </Card>
          </Link>
          <Link href={commonLink + "people"}>
            <Card
              style={{
                borderRadius: "10px",
              }}
            >
              <Card.Content textAlign="left">
                <b>People</b>
                <Icon name="angle right" style={{ float: "right" }} />
              </Card.Content>
            </Card>
          </Link>
          <Link href={commonLink + "grades"}>
            <Card
              style={{
                borderRadius: "10px",
              }}
            >
              <Card.Content textAlign="left">
                <b>Grade Book</b>
                <Icon name="angle right" style={{ float: "right" }} />
              </Card.Content>
            </Card>
          </Link>
        </Grid.Column>
        <Grid.Column width={12}>
          <Card
            fluid
            raised
            style={{
              borderRadius: "10px",
            }}
          >
            <Card.Content>
              <Card.Description>
                <Image
                  src={user.photoURL}
                  circular
                  size="mini"
                  style={{ margin: "0% 1% 0% 1%" }}
                />
                Announce something to your class
              </Card.Description>
            </Card.Content>
          </Card>
          <Card>Hi</Card>
          <Card>Hi</Card>
          <Card>Hi</Card>
          <Card>Hi</Card>
          <Card>Hi</Card>
          <Card>Hi</Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
