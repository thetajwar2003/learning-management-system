import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { Form, Button, Dropdown } from "semantic-ui-react";
import { firestore } from "../../lib/firebase";
import { UserContext } from "../../lib/context";

export default function Teacher() {
  const { user, classification } = useContext(UserContext);
  const router = useRouter();

  const [dob, setDob] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");

  /**
   * use server side rendering or something to query in the subjects and classes
   * @params subjects [
   *  {
   *    text: "English",
   *    key: "English",
   *    value: "English"
   *  }
   * ] -> use in dropdown for subjects
   * store value in subject
   **/
  const subjects = [];

  /**
   * use useEffects to show the proper classes: based on subject the person chose -> add a check to make sure subject was chosen (make classes disables) then allow for classes
   * @param classes  [
   *  {
   *    text: "EN09",
   *    key: "EN09",
   *    value: "EN09"
   *  }
   * ] -> use in dropdown for classes
   * store value in year and create a code with this, the uid, and the year
   */
  const classes = [];

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
      <Form.Field>
        <label>What Subject Would You Like To Teach?</label>
        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>What Class Would You Like To Teach</label>
        <Dropdown search selection selectOnBlur={false} />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
