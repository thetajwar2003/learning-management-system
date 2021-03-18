import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Button, Dropdown } from "semantic-ui-react";
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

export default function Teacher({ subjectList }) {
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

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const userDoc = firestore.doc(`users/${user.uid}`);
    const teacherDoc = firestore.doc(`teachers/${user.uid}`);

    const batch = firestore.batch();

    batch.set(userDoc, { classification: "teacher" });
    batch.set(teacherDoc, {
      name: user.displayName,
      email: user.email,
      dob: dob,
      subject: subject,
      teachingYear: year,
    });

    await batch.commit().then(() => {
      router.push("/teachers");
    });
  };

  return (
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
  );
}
