import { toast } from "react-hot-toast";
import { UserAuthThroughServer } from "./UserAuthThroughServer";

function UserAuthSubmit(type, formData, setUserAuth) {
  let serverRoute = type === "signIn" ? "signin" : "signup";

  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const { fullname, password, email } = formData;

  if (fullname) {
    if (fullname.length < 3) {
      return toast.error("fullname must be at least three letters long");
    }
  }

  if (!email.length) {
    return toast.error("You must provide email");
  }

  if (!emailRegex.test(email)) {
    return toast.error("Email is invalid");
  }

  if (!passwordRegex.test(password)) {
    return toast.error(
      "Password should be 6 to 20 characters long with a numeric , 1 lowercase and 1 uppercase letters"
    );
  }

  UserAuthThroughServer(serverRoute, formData, setUserAuth);
}

export { UserAuthSubmit };
