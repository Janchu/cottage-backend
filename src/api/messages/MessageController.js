import express from 'express';
import Message from './Message';

const messageRouter = express.Router();


// CREATE NEW MESSAGE
messageRouter.post('/', (req, res) => {
  Message.create({
    text: req.body.text,
    author: req.body.author,
    timestamp: Date.now(),
  })
    .then(message => res.status(200).send(message))
    .catch(() => res.status(500).send('Viestiä ei voitu lisätä.'));
});


// GET ALL MESSAGES
messageRouter.get('/', (req, res) => {
  Message.find({})
    .then(messages => res.status(200).send(messages))
    .catch(() => res.status(500).send('Viestejä ei voitu hakea.'));
});


// GET ONE MESSAGE
messageRouter.get('/', (req, res) => {
  Message.findById(req.params.id)
    .then(messages => res.status(200).send(messages))
    .catch(() => res.status(500).send('Viestiä ei voitu hakea.'));
});


// UPDATES A SINGLE USER IN THE DATABASE
messageRouter.put('/:id', (req, res) => {
  Message.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(message => res.status(200).send(message))
    .catch(() => res.status(500).send('Viestin päivittäminen ei onnistunut.'));
});


// DELETES A MESSAGE FROM THE DATABASE
messageRouter.delete('/:id', (req, res) => {
  Message.findByIdAndRemove(req.params.id)
    .then(() => res.status(200).send('Viesti poistettiin onnistuneesti.'))
    .catch(() => res.status(500).send('Viestin poistaminen ei onnistunut.'));
});


export default messageRouter;
