import { useEffect, useState } from "react";
import useAuthStore from "../../stores/useAuthStore";

export const useUserInfo = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const user = useAuthStore.getState().user;

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setUserName(user.name);
    }
  }, [user]);

  return { userName, email };
};
