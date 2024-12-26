import { useState } from "react";
import CredentialsSignInPage from "../Components/CredentialsSignInPage";
import CredentialsRegisterPage from "../Components/CredentialsRegisterPage";

export default function Signinpage() {
  const [register, setRegister] = useState<boolean>(false);
  return (
    <div>
      {register ? (
        <CredentialsRegisterPage setRegister={setRegister} />
      ) : (
        <CredentialsSignInPage setRegister={setRegister} />
      )}
    </div>
  );
}
