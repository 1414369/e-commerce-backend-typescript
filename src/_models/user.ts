import * as config from 'config'
import * as jwt from 'jsonwebtoken'
import * as Joi from 'joi'
import { Schema, model, Document } from 'mongoose'
import * as bcrypt from 'bcrypt';

export interface iUser extends Document {
  name: string;
  email: string;
  isAdmin: boolean;
  password: string;

  generateAuthToken(): string;
  hashPassword(): void;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateAuthToken = function () {
  const payload = {
    _id: this._id,
    isAdmin: this.isAdmin,
    name: this.name
  }
  const token = jwt.sign(payload, config.get('jwtPrivateKey'));
  return token;
}

userSchema.methods.hashPassword = async function () {
  const salt = await bcrypt.genSalt(15);
  this.password = await bcrypt.hash(this.password, salt);
}

const User = model<iUser>('User', userSchema);

export function validate(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'Confirm password must be matched.' } } })
  };

  return Joi.validate(user, schema);
}

export default User;