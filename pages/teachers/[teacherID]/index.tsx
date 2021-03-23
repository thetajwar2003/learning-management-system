import React from "react";
import { Card, Grid, SemanticWIDTHS } from "semantic-ui-react";
import { getUserWithUID, updateClass } from "../../../lib/firebase";

import ClassModal from "../../../components/ClassModal";
import CustomCard from "../../../atoms/Card";

// TODO: fix this
export async function getServerSideProps({ query }) {
  const { teacherID } = query;
  const teacherDoc = await getUserWithUID(teacherID, "teachers");

  // if there are no users, link to 404 page
  if (!teacherDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  let classList = null;

  if (teacherDoc) {
    user = teacherDoc.data();
    const classesQuery = teacherDoc.ref
      .collection("classes")
      .orderBy("period", "asc");

    classList = (await classesQuery.get()).docs.map(updateClass);
  }

  return {
    props: { user, classList },
  };
}

export default function TeacherClassPage({ user, classList }) {
  const groupSize =
    Object.keys(classList).length >= 4 ? 4 : Object.keys(classList).length;

  const deleteClass = async () => {
    console.log("del");
  };
  return (
    <Grid centered style={{ padding: "0% 3% 0% 3%" }}>
      <Grid.Row centered columns={1}>
        <Grid.Column textAlign="right">
          <ClassModal title="Create a Class" create={true} />
          {/* pass in teacher's subject, the periods they have left */}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {/* TODO: accommodate for phones and diferent sized screens */}
        <Card.Group itemsPerRow={groupSize}>
          {classList.map((cardDetails: any) => {
            return (
              <CustomCard
                cardDetails={cardDetails}
                key={cardDetails.id}
                onDelete={deleteClass}
              />
            );
          })}
        </Card.Group>
      </Grid.Row>
    </Grid>
  );
}
