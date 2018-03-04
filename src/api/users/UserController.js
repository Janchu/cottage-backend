import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jwt-simple';
import User from './User';
import config from '../../config';

const userRouter = express.Router();

mongoose.Promise = Promise;

// CREATES A NEW USER
userRouter.post('/register', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(500).json({ success: false, msg: 'Please provide both name and password.' });
  } else {
    const newUser = new User({ username: req.body.username, password: req.body.password });
    newUser.save(newUser)
      .then(savedUser => res.status(200).json({ success: true, msg: `Käyttäjä ${savedUser.username} luotiin onnistuneesti` }))
      .catch(() => res.status(500).json({ success: false, msg: 'Käyttäjän luominen ei onnistunut.' }));
  }
});


userRouter.post('/login', (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user.comparePassword(req.body.password, user)) {
        const token = jwt.encode(user, config.secret);
        res.cookie('access_token', `${token}`, { maxAge: 3600000 });
        res.json({
          success: true, token: `JWT ${token}`, username: user.username, id: user._id,
        });
      } else {
        res.send({ success: false, msg: 'Sisäänkirjautuminen ei onnistunut' });
      }
    })
    .catch(() => res.send({ success: false, msg: 'Sisäänkirjautuminen ei onnistunut' }));
});


userRouter.get('/logout', (req, res) => {
  res.clearCookie('access_token');
  res.json({ success: true, msg: 'Uloskirjauduttiin onnistuneesti' });
});


// GET ALL USERS
userRouter.get('/', (req, res) => {
  User.find({})
    .then(users => res.status(200).send(users))
    .catch(() => res.status(500).send('There was a problem finding the users.'));
});

// GET USER BY ID
userRouter.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.status(200).send(user))
    .catch(() => res.status(500).send('Käyttäjää ei voitu hakea.'));
});

// DELETES A USER FROM THE DATABASE
userRouter.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => res.status(200).send(`Käyttäjä ${user.username} poistettiin.`))
    .catch(() => res.status(500).send('Käyttäjän poistaminen ei onnistunut.'));
});


// UPDATES A SINGLE USER IN THE DATABASE
userRouter.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => res.status(200).send(user))
    .catch(() => res.status(500).send('Käyttäjän päivittäminen ei onnistunut.'));
});


export default userRouter;
