import express from 'express';
import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';

// validation
import {
  registerValidation,
  loginValidation,
} from '../validation/userValidation.js';

const router = express.Router();

//register
router.post('/register', async (req, res) => {
  //VALIDATE THE DATA BEFORE USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if email is unique
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email already exist');

  //Hash Pasword
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(req.body.password, salt);

  //Create a new user
  const UserDetails = new User({
    email: req.body.email,
    password: hash,
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    userclass: req.body.userclass,
    username: req.body.username,
  });
  try {
    const saveUser = await UserDetails.save();
    res.status(200).send({ user: saveUser._id });
  } catch (err) {
    res.status(400).send({
      message: err?.message ?? 'Something went wrong, please try again',
    });
  }
});

//Login
router.post('/login', async (req, res) => {
  //VALIDATE THE DATA BEFORE USER
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Checking if email exist
  const userEmail = await User.findOne({ email: req.body.email });
  if (!userEmail) return res.status(400).send('Email or password is wrong');

  //Check if password is correct
  const validPassword = await bcrypt.compare(
    req.body.password,
    userEmail.password
  );
  if (!validPassword) return res.status(400).send('Email or password is wrong');

  res.send('successful login');
});

export default router;
