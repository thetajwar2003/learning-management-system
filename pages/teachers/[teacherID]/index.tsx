import React, { useState } from "react";
import { Card, Dimmer, Grid, Loader, Message } from "semantic-ui-react";
import {
  firestore,
  getClassFromTeacherID,
  getUserWithUID,
  updateClass,
} from "../../../lib/firebase";
import { useRouter } from "next/router";

import ClassModal from "../../../components/ClassModal";
import CustomCard from "../../../atoms/Card";

export async function getServerSideProps({ query }) {
  const { teacherID } = query;
  const teacherDoc = await getUserWithUID(teacherID, "teachers");
  const classDoc = await getClassFromTeacherID(teacherID);

  // if there are no users, link to 404 page
  if (!teacherDoc || !classDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  let classList = null;

  if (teacherDoc && classDoc) {
    user = teacherDoc.data();
    classList = classDoc.map(updateClass);
  }

  return {
    props: { user, classList },
  };
}

export default function TeacherClassPage({ user, classList }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const groupSize =
    Object.keys(classList).length >= 4 ? 4 : Object.keys(classList).length;

  const deleteClass = async (code) => {
    setLoading(true);
    const classDoc = firestore.doc(`classes/${code}`);
    const teacherRef = firestore.doc(`teachers/${user.id}`);

    const updatedClassesList = (await teacherRef.get())
      .data()
      .classes.splice(code, 1);

    const batch = firestore.batch();

    batch.delete(classDoc);
    batch.update(teacherRef, {
      classes: updatedClassesList,
    });

    batch.commit().then(() => {
      setLoading(false);
      router.reload();
    });
  };
  return loading ? (
    <>
      <Dimmer>
        <Loader />
      </Dimmer>
    </>
  ) : (
    <Grid style={{ padding: "0% 3% 0% 3%" }}>
      <Grid.Row centered columns={1}>
        <Grid.Column textAlign="right">
          <ClassModal title="Create a Class" create={true} />
        </Grid.Column>
      </Grid.Row>
      {Object.keys(classList).length === 0 ? (
        <Grid.Row centered>
          <Message info>
            You have no classes. Click the plus sign to create a class!
          </Message>
        </Grid.Row>
      ) : (
        <Grid.Row>
          {/* TODO: accommodate for phones and diferent sized screens */}
          <Card.Group itemsPerRow={groupSize} stackable>
            {classList.map((cardDetails: any) => {
              return (
                <CustomCard
                  cardDetails={cardDetails}
                  key={cardDetails.id}
                  onDelete={deleteClass}
                  subjectPic={user.subjectPic}
                />
              );
            })}
          </Card.Group>
        </Grid.Row>
      )}
    </Grid>
  );
}
