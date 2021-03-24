import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Popup, Button, Icon, Form, Grid, Dropdown } from "semantic-ui-react";
import { auth, firestore } from "../lib/firebase";

export default function CreateClass() {
  const router = useRouter();
  var classCode = Math.random().toString(36).substring(7);

  const [pd, setPd] = useState("");

  var period = [];
  for (let i = 0; i < 8; i++) {
    period.push({
      text: i + 1,
      key: i + 1,
      value: i + 1,
    });
  }
  // maybe have a field for time

  useEffect(() => {
    checkClassCode();
    getPeriods();
  }, []);

  const checkClassCode = async () => {
    const ref = firestore.doc(`classes/${classCode}`);
    const { exists } = await ref.get();
    if (exists) classCode = Math.random().toString(36).substring(7);
  };

  const getPeriods = async () => {
    const classRef = await firestore
      .doc(`teachers/${auth.currentUser.uid}`)
      .collection("classes")
      .get();
    classRef.forEach((classID: any) => {
      period.splice(parseInt(classID.data().period) - 1, 1);
    });
  };

  // TODO: Check validator
  const submitCreateClass = async (e) => {
    const currentYear = new Date().getFullYear();
    e.preventDefault();

    const classRef = firestore.doc(`classes/${auth.currentUser.uid}`);
    const teacherRef = firestore
      .doc(`teachers/${auth.currentUser.uid}`)
      .collection("classes")
      .doc(classCode);

    const batch = firestore.batch();

    batch.set(classRef, { uid: auth.currentUser.uid });
    batch.set(teacherRef, {
      className: e.target.className.value,
      period: pd.toString(),
      students: [],
      semesterYear: `${currentYear}-${currentYear + 1}`,
      classCode,
      path: `${auth.currentUser.uid}/${classCode}`,
      updatedAt: new Date().getTime(),
    });

    await batch
      .commit()
      .then(() =>
        router.push(`/teachers/${auth.currentUser.uid}/${classCode}`)
      );
  };
  return (
    <>
      <Form onSubmit={submitCreateClass}>
        <Form.Field required>
          <label>Class Name</label>
          <input placeholder="Name of Class" name="className" />
        </Form.Field>
        <Form.Field required>
          <label>Period</label>
          <Dropdown
            name="periods"
            selection
            options={period}
            placeholder="Class"
            onChange={(e, { value }: any) => {
              e.preventDefault();
              setPd(value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Class Code</label>
          <Grid columns={2}>
            <Grid.Column width={15} style={{ paddingRight: "0%" }}>
              <input disabled value={classCode} />
            </Grid.Column>
            <Grid.Column width={1}>
              <Popup
                trigger={
                  <Button
                    role="copy"
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText(classCode);
                    }}
                    style={{ background: "#ffffff", padding: "0%" }}
                  >
                    <Icon name="clipboard" size="large" />
                  </Button>
                }
                basic
                on="hover"
                content="Click to copy class code"
              />
            </Grid.Column>
          </Grid>
          <Button role="submit" style={{ marginTop: "2%" }}>
            Create Class
          </Button>
        </Form.Field>
      </Form>
    </>
  );
}
