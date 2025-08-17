import mongoose, { Document, Types } from "mongoose";
import bcrypt from "bcrypt";

const SocialAuth = ["google", "email"];

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  fullName: string;
  username: string;
  email: string;
  password?: string;
  provider: string;
  isVerified: boolean;
  verifyToken?: string;
  tokenExpiry?: Date;
  avatarUrl?: String;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    provider: {
      type: String,
      enum: SocialAuth,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      default: "",
      min: [6, "Password must be of minimum 6 Characters"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
    },
    tokenExpiry: {
      type: Date,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.password || !this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
