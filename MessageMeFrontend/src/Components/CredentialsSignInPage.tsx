import { Container, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import LoadingButton from "@mui/lab/LoadingButton";

import axios from "axios";
import ResponsiveDialog from "./ResponsiveDialog";

const SyledContainer = styled(Container)(() => ({
  display: "flex",
  justifyContent: "center", // Centers horizontally
  alignItems: "center", // Centers vertically
  height: "100vh", // Full viewport height
}));

const StyledTextField = styled(TextField)(() => ({
  width: "80%",
}));

const DemoPaper = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px", // Adjust the gap size as needed
  square: false,
  width: 420,
  borderRadius: 12,
  height: 450,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  justifyItems: "center",
  alignItems: "center",
}));

const CredentialsSignInPage: React.FC<{
  setRegister: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setRegister }) => {
  const [email, SetEmail] = useState<string>("");
  const [password, SetPassword] = useState<string>("");

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/users/AddUser",
        { email, password },
      );
      setTimeout(() => {
        setOpen(true);
        setLoading(false);
        console.log("Register Success", response.data);
      }, 1500);
    } catch (error) {
      console.error("Error During Registration", error);
    }
  };

  return (
    <>
      <ResponsiveDialog
        setRegister={setRegister}
        open={open}
        setOpen={setOpen}
      />
      <SyledContainer>
        <form onSubmit={handleSubmit}>
          <DemoPaper variant="outlined">
            <BiSolidMessageRoundedDetail className="my-4 mt-8 scale-[4] text-blue-300" />
            <Typography
              sx={{
                fontSize: "1.4rem",
              }}
            >
              Sign In To MessageMe
            </Typography>
            <Typography
              sx={{
                mb: "8px",
              }}
              variant="subtitle2"
            >
              Welcome Please Sign In to your Account!
            </Typography>

            <StyledTextField
              error={error}
              value={email}
              onChange={(e) => SetEmail(e.target.value)}
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onBlur={() => {
                if (email === "") {
                  setError(false); // Do not show error if email is empty
                } else {
                  setError(!/^[^@]+@gmail\.com$/.test(email)); // Validate if not empty
                }
              }}
              helperText={error ? "Must Contain a Valid Email." : ""}
              required
              InputLabelProps={{
                required: false, // Prevent the asterisk from showing
              }}
            />
            <StyledTextField
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              onChange={(e) => {
                SetPassword(e.target.value);
              }}
              value={password}
              required
              InputLabelProps={{
                required: false, // Prevent the asterisk from showing
              }}
            />

            <LoadingButton
              type="submit"
              sx={{ width: "85%", mt: "4px" }}
              variant="contained"
              loading={loading}
            >
              Sign In
            </LoadingButton>

            <span className="mt-2">
              Dont Have An Account?{" "}
              <span
                onClick={() => {
                  setRegister(true); // Set the register state to false for sign-in
                }}
                className="underline hover:cursor-pointer hover:text-blue-200"
              >
                Register
              </span>
            </span>
          </DemoPaper>
        </form>
      </SyledContainer>
    </>
  );
};

export default CredentialsSignInPage;
