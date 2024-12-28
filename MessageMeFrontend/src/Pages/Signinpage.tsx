import { useState } from "react";
import CredentialsSignInPage from "../Components/CredentialsSignInPage";
import CredentialsRegisterPage from "../Components/CredentialsRegisterPage";

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
