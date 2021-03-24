import React from "react";
import { useRouter } from "next/router";

export default function TeacherSpecificClass() {
  const router = useRouter();
  return (
    <div>
      <p>{router.pathname}</p>
    </div>
  );
}
