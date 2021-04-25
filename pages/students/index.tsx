import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import { firestore } from "../../lib/firebase";
import { UserContext } from "../../lib/context";

export default function StudentAuth() {
  const { user, classification } = useContext(UserContext);
  const router = useRouter();

  const [osis, setOsis] = useState("");
  const [dob, setDob] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const userDoc = firestore.doc(`users/${user.uid}`);
    const studentDoc = firestore.doc(`students/${user.uid}`);

    const batch = firestore.batch();

    batch.set(userDoc, { classification: "students" });
    batch.set(studentDoc, {
      name: user.displayName,
      email: user.email,
      dob: dob,
      osis: osis,
    });

    await batch.commit().then(() => {
      router.push(`/students/${user.uid}`);
    });
  };

  return (
    <Grid centered verticalAlign="middle" style={{ paddingTop: "10%" }}>
      <Grid.Row centered columns={3} verticalAlign="middle">
        <Grid.Column width={8}>
          <Header as="h1">Student Sign Up</Header>
          <Segment>
            <Form onSubmit={handleOnSubmit}>
              <Form.Field>
                <label>Name</label>
                <input disabled placeholder={user.displayName} />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input disabled placeholder={user.email} />
              </Form.Field>
              <Form.Field>
                <label>OSIS</label>
                <input
                  placeholder="Your OSIS Number"
                  value={osis}
                  onChange={(e) => setOsis(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>Date of Birth</label>
                <input
                  placeholder="Your Birthday"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </Form.Field>
              <Button type="submit">Submit</Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
