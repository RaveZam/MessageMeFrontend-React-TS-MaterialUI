import { useState } from "react";
import CredentialsRegisterPage from "../Components/Sing Up Components/CredentialsRegisterPage";
import CredentialsSignInPage from "../Components/Sing Up Components/CredentialsSignInPage";

interface Session {
  user: {
    name: string;
    email: string;
    image: string | null;
  };
}
const Signinpage: React.FC<{
  setcurrentSession: React.Dispatch<React.SetStateAction<Session>>;
}> = ({ setcurrentSession }) => {
  const [register, setRegister] = useState<boolean>(false);
  return (
    <div>
      {register ? (
        <CredentialsRegisterPage setRegister={setRegister} />
      ) : (
        <CredentialsSignInPage
          setcurrentSession={setcurrentSession}
          setRegister={setRegister}
        />
      )}
    </div>
  );
};

export default Signinpage;
