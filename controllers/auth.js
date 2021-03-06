import User from '../models/user';
import { hashPassword, comparePassword } from '../utils/auth';

export const register = async (req, res) => {
  try{
    //console.log(req.body);
    const { name, email, password } = req.body
    //vaidation
    if(!name) return res.status(400).send('Name is required')
    if(!password || password.length < 4){
      return res
        .status(400)
        .send("Password is required and should be 4 car long")
    }
    let userExist = await User.findOne({email}).exec();
    if (userExist) return res.status(400).send('Email is taken')

    // hash password
    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    console.log('saved user', user);
    return res.json({ok: true});

  } catch(err){
    console.log(err)
    return res.status(400).send('Error. Try again');
  }
}