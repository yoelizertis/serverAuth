const {Router} = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//Crear un nuevo usuario
router.post('/new', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6}),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
] ,  crearUsuario );


// Login de usuario
router.post( '/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({min: 6}),
    validarCampos
] , loginUsuario);

// Validar y revalidar token
router.get( '/renew', validarJWT , revalidarToken );








module.exports = router;
