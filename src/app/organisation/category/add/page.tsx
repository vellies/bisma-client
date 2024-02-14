'use client'
import React from 'react'
import AddEditCategory from "@@/components/pageComponents/addEditCategory"
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@@/contexts/AuthContextProvider";
import { LOGIN } from "@@/utils/routeUtils";

const AddCategoryPage = () => {
  const router = useRouter();
  const { accessToken } = useAuth();
  if (typeof accessToken === 'string' && accessToken === "") router.push(LOGIN);
  return (
    <AddEditCategory />
  )
}

export default AddCategoryPage