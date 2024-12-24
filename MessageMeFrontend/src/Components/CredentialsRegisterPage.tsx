import { Button, Container, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";

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
  height: 620,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  justifyItems: "center",
  alignItems: "center",
}));

export default function CredentialsRegisterPage() {
  const [Email, SetEmail] = useState<string>("");
  const [Username, setUsername] = useState<string>("");
  const [Password, SetPassword] = useState<string>("");
  const [ConfirmPassword, setconfirmPassword] = useState<string>("");

  const [error, setError] = useState<boolean>(false);
  const [passwordMatch, setpasswordMatch] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!error && !passwordMatch) {
      console.log("Logging in");
      console.log(Email, Username, Password);
    }
  };

  return (
    <SyledContainer>
      <form onSubmit={handleSubmit}>
        <DemoPaper variant="outlined">
          <BiSolidMessageRoundedDetail className="my-4 mt-8 scale-[4] text-blue-300" />
          <Typography
            sx={{
              fontSize: "1.4rem",
            }}
          >
            Register To MessageMe
          </Typography>
          <Typography
            sx={{
              mb: "8px",
            }}
            variant="subtitle2"
          >
            Welcome Please Register to Create your Account!
          </Typography>

          <StyledTextField
            error={error}
            value={Email}
            onChange={(e) => SetEmail(e.target.value)}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onBlur={() => {
              if (Email === "") {
                setError(false); // Do not show error if email is empty
              } else {
                setError(!/^[^@]+@gmail\.com$/.test(Email)); // Validate if not empty
              }
            }}
            helperText={error ? "Must Contain a Valid Email." : ""}
            required
            InputLabelProps={{
              required: false, // Prevent the asterisk from showing
            }}
          />
          <StyledTextField
            id="username"
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            value={Username}
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
            // onBlur={() => {
            //   Password !== ConfirmPassword
            //     ? setpasswordMatch(true)
            //     : setpasswordMatch(false);
            // }}
            value={Password}
            required
            InputLabelProps={{
              required: false, // Prevent the asterisk from showing
            }}
          />

          {/* Confirm Password */}
          <StyledTextField
            error={passwordMatch}
            id="confirm-password"
            label="ConfirmPassword"
            variant="outlined"
            type="password"
            onChange={(e) => setconfirmPassword(e.target.value)}
            value={ConfirmPassword}
            onBlur={() => {
              Password !== ConfirmPassword
                ? setpasswordMatch(true)
                : setpasswordMatch(false);
            }}
            helperText={passwordMatch ? "Password Does Not Match." : ""}
            required
            InputLabelProps={{
              required: false, // Prevent the asterisk from showing
            }}
          />
          <Button
            type="submit"
            sx={{ width: "85%", mt: "4px" }}
            variant="contained"
          >
            Register
          </Button>

          <p>
            Already Have An Account?{" "}
            <a className="underline" href="">
              Sign In
            </a>
          </p>
        </DemoPaper>
      </form>
    </SyledContainer>
  );
}
