"use client";

import { useEffect, useState } from "react";
import AuthModal from "../layouts/AuthModal";
import UploadModal from "../layouts/UploadModal";

const index = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
};

export default index;
