"use client";
import Spinner from "@@/components/Spinner";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { LOGIN } from "@@/utils/routeUtils";

const DefaultPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(LOGIN);
  }, []);
  return <Spinner />;
};

export default DefaultPage;
