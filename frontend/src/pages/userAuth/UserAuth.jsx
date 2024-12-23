import AnimationWrapper from "../../common/animation/AnimationWrapper";
import InputBox from "../../components/inputBox/InputBox";
import googleIcon from "../../imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import { UserAuthSubmit } from "../../api/UserAuthSubmit";
import { useAuthContext } from "../../context/UserAuthContext";

function UserAuth({ type }) {
  const {
    userAuth: { access_token },
    setUserAuth,
  } = useAuthContext();

  function handleSubmit(e) {
    e.preventDefault();
    let form = new FormData(formSignIn);
    let formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    UserAuthSubmit(type, formData, setUserAuth);
  }

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form id="formSignIn" className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize mb-24 ">
            {type === "signIn" ? "Welcome back" : "Join us today"}
          </h1>

          {type !== "signIn" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full name"
              icon="fi-rr-user"
            />
          ) : (
            ""
          )}
          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rs-envelope"
          />
          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
          />
          <button
            onClick={handleSubmit}
            className="btn-dark center mt-14 "
            type="submit"
          >
            {type}
          </button>
          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold ">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button className="btn-dark flex items-center justify-center gap-4 w-[90%]">
            <img src={googleIcon} alt="google icon" className="w-5 " />
            continue with google
          </button>

          {type === "signIn" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account?
              <Link to="/signup" className="underline text-black text-xl ml-1 ">
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member?
              <Link to="/signin" className="underline text-black text-xl ml-1 ">
                Sign in here
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
}

export default UserAuth;
