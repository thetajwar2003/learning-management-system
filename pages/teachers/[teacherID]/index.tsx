import React from "react";
import { useRouter } from "next/router";

export default function TeacherClassPage() {
  // show all classes
  const router = useRouter();
  console.log(router.pathname);
  return (
    <div>
      <p>Teacher slug page for all classes</p>
    </div>
  );
}
