import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { selectAdmin, selectAuthVerified } from "../redux/reducers/authReducer";
import colores from "../utils/colores";

const PermissionsGuard = ({ children }: any) => {
  const authVerified = useSelector(selectAuthVerified);
  const admin = useSelector(selectAdmin);
  const router = useRouter();
  const [checkingPermissions, setCheckingPermissions] = useState(true);

  useEffect(() => {
    if (authVerified) checkPermissions();
  }, [authVerified, admin, router.pathname]);

  const checkPermissions = async () => {
    if (router.pathname === "/" && admin) {
      await router.push("/providers/approved");
    } else if (router.pathname !== "/" && !admin) {
      await router.push("/");
    }
    setCheckingPermissions(false);
  };

  if (checkingPermissions)
    return (
      <div className="border h-screen flex flex-col gap-y-1 items-center justify-center">
        <span className="font-bold text-lg text-Principal">Validando...</span>
        <BeatLoader color={colores.Principal} size={10} />
      </div>
    );
  else return children;
};

export default PermissionsGuard;
