import axios from "axios";
import toast from "react-hot-toast";
import { storeInSession } from "./SessionStore.js";
export async function UserAuthThroughServer(
  serverRoute,
  FormData,
  setUserAuth
) {
  axios
    .post("http://localhost:3000/api/" + serverRoute, FormData)
    .then(({ data }) => {
      if (data) {
        toast.success(
          serverRoute === "signUp"
            ? `Account Create successfully`
            : "LogIn successful"
        );
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data);
      }
    })
    .catch(({ response }) => {
      toast.error(response.data.error);
    });
}
