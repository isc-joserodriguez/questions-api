const secret = require('../config').secret,
    crypto = require('crypto'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        required: [true, 'no puede estar vacío'],
        match: [/\S+@\S+\.\S+/, 'es inválido'],
        index: true,
    },
    hash: String,
    salt: String
},
    { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { error: 'Ya existe el correo' });

UserSchema.methods.hashPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generarJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        idUser: this._id,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

UserSchema.methods.toAuthJSON = function () {
    return {
        idUser: this._id,
        token: this.generarJWT()
    };
};

mongoose.model('User', UserSchema);