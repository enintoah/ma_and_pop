import express, { Request, Response } from 'express';
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const keys = require('./../../config/keys')

router.get("/test", (req: Request, res: Response) => res.json({ msg: "This is the users route" }))

router.post('/register', (req: Request, res: Response) => {
  User.findOne( {email: req.body.email} )
    .then((user: any) => {
      if (user) {
        return res.status(400).json({email: "A user has already registered with this email"})
      } else {
        const newUser = new User({
          handle: req.body.handle,
          email: req.body.email,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err: any, salt: any) => {
          bcrypt.hash(newUser.password, salt, (err: any, hash: any) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then((user: any) => res.json(user))
              .catch((err: any) => console.log(err))
          })
        })
      }
    })
})

router.post('/login', (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email: req.body.email})
    .then((user: any) => {
      if (!user) {
        return res.status(404).json({ email: 'This user does not exist' });
      }

      bcrypt.compare(password, user.password)
        .then((isMatch: any) => {
          if (isMatch) {
            res.json({msg: 'Success'})
          } else {
            return res.status(400).json({password: 'Incorrect Password'})
          }
        })
    })

})

module.exports = router;