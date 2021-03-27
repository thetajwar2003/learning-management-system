import React from "react";
import { useRouter } from "next/router";
import { Card, Grid, Message, Image, Header, Icon } from "semantic-ui-react";
import {
  firestore,
  getUserWithUID,
  updateClass,
} from "../../../../lib/firebase";
import Link from "next/link";

import PostModal from "../../../../components/PostModal";

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
  let posts = null;

  if (teacherDoc) {
    user = teacherDoc.data();
    const classesQuery = firestore.collection("classes").doc(classID);

    classData = (await classesQuery.get()).data();

    if (classesQuery.collection("posts")) {
      posts = (
        await classesQuery
          .collection("posts")
          .orderBy("createdAt", "desc")
          .get()
      ).docs.map(updateClass);
    }
  }

  return {
    props: { user, classData, posts },
  };
}

export default function TeacherSpecificClass({ user, classData, posts }) {
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
          <PostModal user={user} />
          {Object.keys(posts).length === 0 ? (
            <Card fluid>
              <Card.Content>
                <Header as="h2" style={{ padding: "1% 0% 0% 2%" }}>
                  Communicate with your class here
                </Header>
                <Card.Header style={{ padding: "2%", fontWeight: "normal" }}>
                  <Icon name="comment outline" /> Create and schedule
                  announcements
                </Card.Header>
                <Card.Header style={{ padding: "2%", fontWeight: "normal" }}>
                  <Icon
                    name="comment alternate outline"
                    flipped="horizontally"
                  />{" "}
                  Respond to student posts
                </Card.Header>
              </Card.Content>
            </Card>
          ) : null}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
