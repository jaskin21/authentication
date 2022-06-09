import express from 'express';
import User from '../models/UserModel.js';

// validation
import { registerValidation } from '../validation/userValidation.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  //VALIDATE THE DATA BEFORE USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const UserDetails = new User({
    email: req.body.email,
    password: req.body.password,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    userclass: req.body.userclass,
    username: req.body.username,
  });
  try {
    const saveUser = await UserDetails.save();
    res.status(200).json(saveUser);
  } catch (err) {
    res.status(400).json({
      message: err?.message ?? 'Something went wrong, please try again',
    });
  }
});

export default router;
