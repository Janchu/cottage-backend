import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});


/* eslint-disable func-names, consistent-return */
UserSchema.pre('save', function (next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  // hash the password
  bcrypt.hash(user.password, saltRounds)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch(err => err);
});
/* eslint-enable */


UserSchema.methods.comparePassword = (password, user) =>
  bcrypt.compare(password, user.password)
    .then(match => match)
    .catch(err => err);

export default mongoose.model('User', UserSchema);
