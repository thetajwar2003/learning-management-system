import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button, Dimmer, Grid, Icon, Loader, Segment } from "semantic-ui-react";
import { auth, googleAuthProvider } from "../../lib/firebase";
import { UserContext } from "../../lib/context";

export default function AuthPage() {
  const { user, classification } = useContext(UserContext);
  return (
    <Grid
      centered
      columns={1}
      style={{
        padding: "0% 10% 0% 10%",
        margin: "15% 0% 20% 0%",
        width: "100%",
      }}
      verticalAlign="middle"
    >
      <Segment
        raised
        style={{
          padding: "10%",
          //   margin: "15% 0% 0% 0%",
          width: "100%",
        }}
        textAlign="center"
      >
        <main>
          {user ? classification ? <GoToPage /> : <SignUp /> : <SignInButton />}
        </main>
      </Segment>
    </Grid>
  );
}

function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  return (
    <main>
      <Button color="google plus" onClick={signInWithGoogle}>
        <Icon name="google" /> Sign In
      </Button>
    </main>
  );
}

function SignUp() {
  return (
    <div>
      <Link href="/auth/student">
        <Button>
          <Icon name="student" /> I am a student
        </Button>
      </Link>
      <Link href="/auth/teacher">
        <Button>
          <Icon name="id badge" />I am a teacher
        </Button>
      </Link>
    </div>
  );
}

function GoToPage() {
  const { user, classification } = useContext(UserContext);
  const router = useRouter();
  const link = classification === "student" ? "/students/" : "/teachers/";
  router.push(link + user.uid);
  return (
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  );
}
