const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/");
const User = require('../models/user');
// GET LIST USERS
const getUsers = async (req, res)=>{
    try {
        const users = await User.findAll();
        res.status(200).json({
            ok: true,
            users
        });
    } catch (error) {
        console.log(error);
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
        res.status(500).json({ ok: false, error: error.message });          
    }
}
// GET LOGIN
const loginUser = async (req, res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findAll({ where: { email, password } });
        if( user.length > 0 && user[0].active ){
            const token = await generateJWT(user.id);
            res.status(200).json({
                ok: true,
                user, 
                token
            });
        }else{
            res.status(401).json({
                ok: false,
                msg: 'Invalid credentials or not registered'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, error: error.message });
    }
}
// POST
const createUser = async (req, res)=> {
    try {
        const {email, password} = req.body;
        const userExist = await User.findAll({ where: { email } });
        let user = userExist[0];
        if(user && user?.active){
            res.status(400).json({
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
        res.status(500).json({ ok: false, error: error.message });
    }
}
// PUT 
const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk( id );
        console.log(user);
        let {  email = user.email, password = user.password } = req.body;
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
        res.status(500).json({ ok: false, error: error.message });
    }
}
//DELETE 
const unsubscribeUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        
        
        await User.destroy( { where: { id } });
        res.status(200).json({ ok: true, msg: 'User unsubscribed successfully' });
    } catch (error) {
        console.log(error);
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

