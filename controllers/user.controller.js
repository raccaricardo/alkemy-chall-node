const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/");
const { encryptpass } = require("../helpers/encrypt");
const User = require('../models/user');
// ! GET LIST USERS
const getUsers = async (req, res)=>{
    try {
        const users = await User.findAll();
        res.status(200).json({
            ok: true,
            users
        });
    } catch (error) {
        console.log(error);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }
        res.status(500).json({ ok: false, error: error.message });          
    }
}
const getUser = async (req, res)=>{
    try {
        const user = await User.findByPk(req.params.id);
        res.status(200).json({
            ok: true,
            user
        });
    } catch (error) {
        console.log(error);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }
        res.status(500).json({ ok: false, error: error.message });          
    }
}
// ! GET LOGIN
const loginUser = async (req, res)=>{
    try {
        const { email, password = "" } = req.body;

        const user = await User.findOne({ where: { email } });
        console.log(user);
        if(!user){
            res.satus(404).json({ok: true, msg: 'Invalid credentials'});
        }

        const validPassword = bcrypt.compareSync(password, user.password);
			if (validPassword) {
				//generate JWT
				const token = await generateJWT(user.id);
				req.user = user;
				req.uid = user.id;
				return res.json({
                    ok: true,
					msg: "Login OK",
					token
				});
			}else{
				return res.status(401).json({ msg: "Email or password incorrect" });
			}
        
    } catch (error) {
        console.log(error);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }
        res.status(500).json({ ok: false, error: error.message });
    }
}
// ! POST
const createUser = async (req, res)=> {
    try {
        let {email, password} = req.body;
        password = await encryptpass(password);
        let user = await User.findOne({ where: { email } });
        if(user && user?.active){
            return res.status(400).json({
                ok: true,
                msg: 'User already registered'
            });
        }
        
        user = await User.create({email, password});
        const token = await generateJWT(user.id);

        res.status(201).json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        console.log(error);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }
        res.status(500).json({ ok: false, error: error.message });
    }
}
// ! PUT
const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk( id );
        let {  email = user.email, password } = req.body;
        if(password){
            password = encryptpass(password);
        }
        if(email !== user.email && password !== user.password){
            await User.update({ email, password }, { where: { id } });
        }
        if(email !== user.email){
            await User.update({ email }, { where: { id } });
        }
        if(password !== user.password){
            await User.update({ password }, { where: { id } });
        }
        // console.log( email, password );
        res.status(200).json({ 
            ok: true,
            user
        });
    } catch (error) {
        console.log(error);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }
        res.status(500).json({ ok: false, error: error.message });
    }
}
// ! DELETE 
const unsubscribeUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.destroy( { where: { id } });
        res.status(200).json({ ok: true, msg: 'User unsubscribed successfully' });
    } catch (error) {
        console.log(error);
        if(error.message == "Validation error"){
            return res.status(400).json({ok: false, msg: 'Validation error', error: error.errors});
        }
        res.status(500).json({ ok: false, error: error.message });
    }
}
module.exports = {
    createUser,
    editUser,
    getUser,
    getUsers,
    loginUser,
    unsubscribeUser
}

