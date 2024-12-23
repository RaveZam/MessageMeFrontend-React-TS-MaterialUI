import { DisabledByDefault } from "@mui/icons-material";
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
  return (
    <SignInPage
      signIn={signIn}
      providers={providers}
      slotProps={{ emailField: { autoFocus: false } }}
      sx={{
        minHeight: 0,
        minWidth: 0,
      }}
    />
  );
}
