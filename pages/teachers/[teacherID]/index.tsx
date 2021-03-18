import React from "react";
import { Grid } from "semantic-ui-react";

import ClassModal from "../../../components/ClassModal";

export default function TeacherClassPage() {
  // TODO: Add checks in every slug page to make sure that the auth.currentuser.uid = the teacherID slug
  return (
    <Grid centered style={{ padding: "0% 3% 0% 3%" }}>
      <Grid.Row centered columns={1}>
        <Grid.Column textAlign="right">
          <ClassModal title="Create a Class" create={true} />
          {/* pass in teacher's subject, the periods they have left */}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
