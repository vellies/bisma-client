'use client'
import React from 'react'
import AddEditProduct from "@@/components/pageComponents/addEditProduct"
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@@/contexts/AuthContextProvider";
import { LOGIN } from "@@/utils/routeUtils";

const AddProductPage = () => {
  const router = useRouter();
  const { accessToken } = useAuth();
  if (typeof accessToken === 'string' && accessToken === "") router.push(LOGIN);
  return (
    <AddEditProduct />
  )
}

export default AddProductPage