import React, { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../lib/context";
import { auth, googleAuthProvider, firestore } from "../lib/firebase";
import Link from "next/link";
import { Menu, Button, Icon, Image } from "semantic-ui-react";

export default function Navbar() {
  const { user, classification } = useContext(UserContext);
  const router = useRouter();

  const link = user
    ? classification
      ? classification === "student"
        ? `/students/${user.uid}`
        : `/teachers/${user.uid}`
      : "/"
    : "/";

  const lost = router.pathname === "/404";
  const mainPage = router.pathname === "/";

  const photo =
    user?.photoURL ||
    "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

  const signOut = () => {
    auth.signOut();
    router.push("/index", "/");
    router.reload();
  };
  return (
    <>
      <Menu>
        {/* User is signed in and has a classification */}
        {!lost && classification && mainPage && (
          <>
            <Menu.Item position="right">
              <Link href={link}>
                <Button primary>
                  <Icon
                    name={classification === "student" ? "student" : "id badge"}
                  />
                  Go to Classroom
                </Button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Button onClick={signOut} secondary>
                <Icon name="sign-out" />
                Sign Out
              </Button>
            </Menu.Item>
            {/* TODO: make pfp clickable and pop a settings modal */}
            <Menu.Item>
              <Image src={photo} circular size="mini" />
            </Menu.Item>
          </>
        )}

        {/* User is in slug page */}
        {!lost && classification && !mainPage && (
          <>
            <Menu.Item position="right">
              <Button onClick={signOut} secondary>
                <Icon name="sign-out" />
                Sign Out
              </Button>
            </Menu.Item>
            {/* TODO: make pfp clickable and pop a settings modal */}
            <Menu.Item>
              <Image src={photo} circular size="mini" />
            </Menu.Item>
          </>
        )}

        {/* User is not signed in*/}
        {!lost && !user && (
          <>
            <Menu.Item position="right" style={{ padding: "1%" }}>
              <SignInButton />
            </Menu.Item>
            <Menu.Item>
              <Link href="/auth">
                <Button secondary>
                  <Icon name="sign out" /> Sign Up
                </Button>
              </Link>
            </Menu.Item>
          </>
        )}

        {/* User in 404 page */}
        {lost && (
          <>
            <Menu.Item position="right">
              <Link href="/">
                <Button primary>
                  <Icon name="home" /> Take Me Home, Country Roads
                </Button>
              </Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </>
  );
}

function SignInButton() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider).then(async (res: any) => {
      const ref: any = firestore.doc(`users/${res.user.uid}`);
      const doc = await ref.get();

      if (doc.exists) {
        const link =
          doc.data().classification === "student"
            ? `/students/${res.user.uid}`
            : `/teachers/${res.user.uid}`;
        router.push(link);
      } else {
        router.push("/auth");
      }
    });
  };
  return (
    <Button color="google plus" onClick={signInWithGoogle}>
      <Icon name="google" /> Log In
    </Button>
  );
}
