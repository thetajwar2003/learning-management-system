import React from "react";
import { useRouter } from "next/router";

export default function TeacherClassPage() {
  const router = useRouter();
  const { classid } = router.query;
  console.log(classid);
  // `${router.pathname}?classid=${id}`
  return (
    <div>
      <p>Teacher slug page for a specific class</p>
    </div>
  );
}
