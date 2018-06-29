const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.pre("save", function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  const { username, _id, tokens } = userObj;
  return { username, _id, tokens };
};

UserSchema.methods.generateAuthToken = async function() {
  const user = this;
  const access = "auth";
  const token = jwt
    .sign(
      {
        _id: user._id.toHexString(),
        access
      },
      process.env.JWT_SECRET
    )
    .toString();

  user.tokens.push({ access, token });
  try {
    await user.save();
    return token;
  } catch (err) {
    return err;
  }
};

UserSchema.statics.findByCredentials = async function(email, password) {
  const User = this;
  try {
    const user = await User.findOne({ email });
    if (!user) return Promise.reject({ msg: "User not found" });

    return await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, isMatch) => {
        isMatch ? resolve(user) : reject(err);
      });
    });
  } catch (err) {
    return Promise.reject({ msg: "User not found" });
  }
};

UserSchema.statics.findByToken = async function(token) {
  const User = this;
  let decodedToken;

  try {
    decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decodedToken._id,
      "tokens.token": token
    });
    return user;
  } catch (err) {
    return Promise.reject(err);
  }
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
