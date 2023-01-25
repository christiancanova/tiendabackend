import {Router } from 'express';
import passport from 'passport';
const router = Router();

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {  // Si esta autenticado sigue con la ejecucion que queremos
        return next();
    }
    res.redirect('/login');
}

router.get('/registro', (req, res) => {
    res.render('registro');
});

router.post('/registro', passport.authenticate('registro', {
    successRedirect: '/login',
    failureRedirect: '/errorRegistro', 
}));

router.get('/info', isAuth, (req, res) => {
    res.render('info', { nombre: req.user.nombre });   
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/info',
    failureRedirect: '/errorLogin',
}));
   

router.get('/logout', (req, res) => {
    req.session.destroy(
        () => {
            res.render('login');
        }
    );
});

router.get('/', (req, res) => {
   res.redirect('login'); 
});

router.get('/errorRegistro', (req, res) => {
    res.render('errorRegistro');
});

router.get('/errorLogin', (req, res) => {
    res.render('errorLogin');
});

export default router;


/** 


import {Router } from 'express';
import passport from 'passport';
import { generarToken, auth } from '../jwt/jwt.js';
import Usuarios from '../models/usuarios.js';
const router = Router();



router.get('/registro', (req, res) => {
    res.render('registro');
});

router.post('/registro', async (req, res) => {
    const { nombre, email, password } = req.body;
    const usuarioDB = await Usuarios.findOne({ nombre });
    if (usuarioDB) {
        console.log(usuarioDB);
        res.render('errorRegistro')
    }
    const usuario = new Usuarios();
    usuario.nombre = nombre;
    usuario.email = email;
    const contraseniaEncryp = await usuario.encriptarContrasenia(password);
    usuario.contrasenia = contraseniaEncryp;
    await usuario.save();
    console.log(usuario);
    
    const token = generarToken(usuario.toJSON());
    console.log(token);
    res.json({token}) 
});

router.get('/info', auth, (req, res) => {
    res.render('info', { nombre: req.user.nombre });   
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const { nombre, password } = req.body;
    const usuarioDB = await Usuarios.findOne({ nombre });
    if (!usuarioDB || usuarioDB.contrasenia !== password) {
        res.render('errorLogin');
    }
    const usuario = {}
    usuario.nombre = nombre;
    usuario.contrasenia = password;
  
    const token = generarToken(usuario);
    console.log(token);
    res.json({token}) 
});
   

router.get('/logout', (req, res) => {
    req.session.destroy(
        () => {
            res.render('login');
        }
    );
});

router.get('/', (req, res) => {
   res.redirect('login'); 
});

router.get('/errorRegistro', (req, res) => {
    res.render('errorRegistro');
});

router.get('/errorLogin', (req, res) => {
    res.render('errorLogin');
});

export default router;
*/