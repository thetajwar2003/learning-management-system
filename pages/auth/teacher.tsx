import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Form, Button } from "semantic-ui-react";
import { firestore } from "../../lib/firebase";
import { UserContext } from "../../lib/context";

export default function Teacher() {
  const { user, classification } = useContext(UserContext);
  const router = useRouter();

  const [dob, setDob] = useState("");

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
      <Button type="submit">Submit</Button>
    </Form>
  );
}
