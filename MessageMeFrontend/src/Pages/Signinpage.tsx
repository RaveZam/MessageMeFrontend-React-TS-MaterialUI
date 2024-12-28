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
  currentSession: Session;
  setcurrentSession: React.Dispatch<React.SetStateAction<Session>>;
}> = ({ currentSession, setcurrentSession }) => {
  const [register, setRegister] = useState<boolean>(false);
  return (
    <div>
      {register ? (
        <CredentialsRegisterPage setRegister={setRegister} />
      ) : (
        <CredentialsSignInPage
          currentSession={currentSession}
          setcurrentSession={setcurrentSession}
          setRegister={setRegister}
        />
      )}
    </div>
  );
};

export default Signinpage;
