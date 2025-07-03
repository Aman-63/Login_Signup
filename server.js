import express, { response } from "express";
import bcrypt from "bcryptjs";
import connectMongo from "./database.js";
import UserInfo from "./user.js";
import jwt from "jsonwebtoken";


const exp = express();
const port =3000;
connectMongo();

exp.use(express.json());
exp.use(express.static('FrontEnd'));


exp.post('/api/Signup', async (request, response) => {
    const { username, password } = request.body;
    const exstUser = await UserInfo.findOne({ username });
    if (exstUser) {
        return response.status(400).json({ error: 'Username already exists' });
    }
    const encrypted = await bcrypt.hash(password, 10);
    const newUser = new UserInfo({ username, password: encrypted });
    await newUser.save();
    response.json({ message: 'SignUp successful' });
});


exp.post('/api/Login', async (request, response
) => {
    const { username, password } = request.body;
    const user = await UserInfo.findOne({ username });
    if (!user) {
        return response.status(400).json({ error: 'Invalid Username' });
    }
    const pswd = await bcrypt.compare(password, user.password);
    if (!pswd) {
        return response.status(400).json({ error: 'Invalid password' });
    }
    const token = jwt.sign({ username }, 'secured', { expiresIn: '1h' });
    response.json({ message: `Welcome ${username}`, token });
})

exp.listen(port, () => console.log(`Server Running: http://localhost:${port}`));