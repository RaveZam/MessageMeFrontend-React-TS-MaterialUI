import { Dialog, DialogContent } from "@mui/material";
import { SignInPage, type AuthProvider } from "@toolpad/core/SignInPage";
import { useState } from "react";

const providers = [{ id: "credentials", name: "Email and Password" }];

const signIn: (provider: AuthProvider, formData: FormData) => void = async (
  provider,
  formData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");

  // Log the values
  console.log("Username (Email):", email);
  console.log("Password:", password);

  const promise = new Promise<void>((resolve) => {
    setTimeout(() => {
      alert(
        `Signing in with "${provider.name}" and credentials: ${formData.get("email")}, ${formData.get("password")}`,
      );
      resolve();
    }, 300);
  });
  return promise;
};

export default function CredentialsSignInPage() {
  const [open, setOpen] = useState(true);

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      aria-labelledby="sign-in-dialog"
      PaperProps={{
        sx: {
          minHeight: 0,
          overflow: "hidden", // Avoids unintended scrollbars
          margin: 0,
          padding: 0,
          minWidth: 0,
          maxWidth: 400,
        },
      }}
    >
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false } }}
        sx={{
          minHeight: 0,
          minWidth: 0,
          margin: 0, // Ensures no extra margins
          padding: 0, // Add consistent spacing inside
        }}
      />
    </Dialog>
  );
}
