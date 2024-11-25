import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";
import User from "../Schema/User.js";

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

async function userSignIn(req, res) {
  try {
    let { email, password } = req.body;

    const findEmail = await User.findOne({ "personal_info.email": email });
    if (!findEmail) return res.status(403).json({ error: "Email not found" });

    bcrypt.compare(
      password,
      findEmail.personal_info.password,
      (err, result) => {
        if (err) {
          return res.json({
            error: "Error occured while loggin in please try again",
          });
        }
        console.log(result);
        if (!result) {
          return res.status(403).json({
            error: "Incorrect password",
          });
        } else {
          return res.status(200).json(formatDataToSend(findEmail));
        }
      }
    );
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }
}

function formatDataToSend(user) {
  const access_token = jwt.sign(
    { id: user._id },
    process.env.SECRET_ACCESS_KEY
  );

  return {
    access_token,
    profile_img: user.personal_info.profile_img,
    username: user.personal_info.username,
    fullname: user.personal_info.fullname,
  };
}

async function generateUserName(email) {
  let username = email.split("@")[0];

  let isUserNameExists = await User.exists({
    "personal_info.username": username,
  }).then((result) => {
    return result;
  });

  isUserNameExists ? (username += nanoid()) : "";

  return username;
}

async function userSignUp(req, res) {
  let { fullname, email, password } = req.body;

  if (fullname.length < 3) {
    return res
      .status(403)
      .json({ error: "fullname must be at least three letters long" });
  }

  if (!email.length) {
    return res.status(403).json({ error: "You must provide email" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email is invalid" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password should be 6 to 20 characters long with a numeric , 1 lowercase and 1 uppercase letters",
    });
  }

  let username = await generateUserName(email);
  bcrypt.hash(password, 10, (err, hashed_password) => {
    let user = new User({
      personal_info: {
        fullname,
        email,
        password: hashed_password,
        username,
      },
    });

    user
      .save()
      .then((u) => {
        return res.status(200).json(formatDataToSend(u));
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res.status(500).json({ error: "Email already exist" });
        }
        return res.status(500).json({ error: err.message });
      });
  });
}

export { userSignIn, userSignUp };
