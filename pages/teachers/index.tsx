import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import {
  Form,
  Button,
  Dropdown,
  Grid,
  Segment,
  Header,
} from "semantic-ui-react";
import { firestore } from "../../lib/firebase";
import { UserContext } from "../../lib/context";

export async function getServerSideProps() {
  const subjectList = [];
  const subject = await firestore.collection("subjects").get();
  subject.forEach((doc: any) => {
    subjectList.push({
      text: doc.id,
      key: doc.id,
      value: doc.id,
    });
  });
  return {
    props: { subjectList },
  };
}

export default function TeacherAuth({ subjectList }) {
  const { user, classification } = useContext(UserContext);
  const router = useRouter();

  const [dob, setDob] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");

  const years = [
    {
      text: "9",
      key: "9",
      value: "9",
    },
    {
      text: "10",
      key: "10",
      value: "10",
    },
    {
      text: "11",
      key: "11",
      value: "11",
    },
    {
      text: "12",
      key: "12",
      value: "12",
    },
  ];

  const subjectPic = (subject) => {
    switch (subject) {
      case "Math":
        return "Math";
      case "History":
        return "Geography";
      case "Science":
        return "Chemistry";
      case "English":
        return "English";
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const userDoc = firestore.doc(`users/${user.uid}`);
    const teacherDoc = firestore.doc(`teachers/${user.uid}`);

    const batch = firestore.batch();

    batch.set(userDoc, { classification: "teachers" });
    batch.set(teacherDoc, {
      name: user.displayName,
      email: user.email,
      dob: dob,
      subject: subject,
      teachingYear: year,
      id: user.uid,
      subjectPic: subjectPic(subject),
      photoURL: user.photoURL,
    });

    await batch.commit().then(() => {
      router.push(`/teachers/${user.uid}`);
    });
  };

  return (
    <Grid centered verticalAlign="middle" style={{ paddingTop: "10%" }}>
      <Grid.Row centered columns={3} verticalAlign="middle">
        <Grid.Column width={8}>
          <Header as="h1">Teacher Sign Up</Header>
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
                <label>Date of Birth</label>
                <input
                  placeholder="Your Birthday"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <label>What Subject Would You Like To Teach?</label>
                <Dropdown
                  selection
                  options={subjectList}
                  placeholder="Subject"
                  onChange={(e, { value }: any) => {
                    e.preventDefault();
                    setSubject(value);
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>What Year Would You Like To Teach</label>
                <Dropdown
                  selection
                  options={years}
                  placeholder="Class"
                  onChange={(e, { value }: any) => {
                    e.preventDefault();
                    setYear(value);
                  }}
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
