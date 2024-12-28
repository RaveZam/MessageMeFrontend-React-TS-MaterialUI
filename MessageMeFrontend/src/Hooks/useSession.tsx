import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useSession = (
  storeSession: (decoded: { email: string; username: string }) => void,
): void => {
  const storedToken = localStorage.getItem("token");
  useEffect(() => {
    if (storedToken) {
      try {
        const decoded = jwtDecode<{ email: string; username: string }>(
          storedToken,
        );
        storeSession(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [storedToken]);
};

export default useSession;
