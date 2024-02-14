"use client";
import { useRouter, usePathname } from "next/navigation";
import Loading from "../loading";
import { useEffect } from "react";

const Signup = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/signup/organisation");
  }, []);
  return <Loading />;
};

export default Signup;
