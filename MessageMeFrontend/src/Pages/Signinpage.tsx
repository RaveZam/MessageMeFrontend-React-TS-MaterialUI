import { useState } from "react";
import CredentialsSignInPage from "../Components/CredentialsSignInPage";
import CredentialsRegisterPage from "../Components/CredentialsRegisterPage";

export default function Signinpage() {
  const [register, setRegister] = useState<boolean>(true);
  return (
    <div>
      {register ? <CredentialsRegisterPage /> : <CredentialsSignInPage />}
    </div>
  );
}
