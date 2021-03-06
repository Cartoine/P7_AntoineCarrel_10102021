// PLUGINS UTILISÉS
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index.js');

// CONSTANTES
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z0-9\d@$!%*?&]{8,}$/; // Au moins une majuscule, un chiffre. Minimum 8 caractères.




// POST
exports.signup = (req, res, next) => {

  const lastname = req.body.lastName;
  const firstname = req.body.firstName;
  const email = req.body.email;
  const password = req.body.password;

  if (lastname == null || firstname == null || email == null || password == null) {
    return res.status(400).json({ error: "Vous n'avez pas rempli tous les champs obligatoires."})
  } else if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ error: "Le mot de passe doit comprendre une majuscule et 1 chiffre et doit être de 8 caractères minimum."})
  } else if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: "Email non valide." })
  }
  
  const Users = db.Users;

    bcrypt.hash(req.body.password, 10) 
      .then(hash => {
            const user = new Users({ 
            lastName: lastname,
            firstName: firstname,
            email: email,
            password: hash,
            permission: false,
            photo: "http://localhost:3000/images/avatar.png"
        });

        user.save() 
          .then(user => res.status(201).json( user ))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};




// POST
exports.login = (req, res, next) => {

  const Users = db.Users;

  Users.findOne({ 
    where: { 
      email: req.body.email 
    }
  }) 
    .then(user => {
      if (!user) { 
        return res.status(404).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) 
        .then(valid => {
          if (!valid) {
            return res.status(400).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({ 
            user,
            token: jwt.sign(
              { userId: user.id },
              process.env.SECRET_TOKEN,
              { expiresIn: '24h' }
              )
          })
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};




// DELETE
exports.delete = (req, res, next) => {

  const Users = db.Users;

  Users.findOne({
    where: {
      id: req.params.id
    }
  }).then(user => {
    if (user.photo !== 'http://localhost:3000/images/avatar.png') {
    const filename = user.photo.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
      Users.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message : 'Utilisateur supprimé !' }))
        .catch(error => res.status(400).json( error ))
      })
    } else {
      Users.destroy({ 
        where: { 
          id: req.params.id
        }
      })
      .then(() => res.status(200).json({ message: 'Utilisateur supprimé' }))
      .catch(error => res.status(500).json({ error }));
    }
  })
};




// GET
exports.getOneUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; 
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN); 
  const userId = decodedToken.userId;

  const Users = db.Users;

  Users.findOne({ 
    attributes: [ 'id', 'firstName', 'lastName', 'email', 'photo', 'permission' ],
    where: { id: userId },
  })
  .then((user) => res.status(200).json({ user }))
  .catch(error => res.status(500).json({ error }));
};




// PUT
exports.modifyUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]; 
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN); 
  const userId = decodedToken.userId;

  const Users = db.Users;

    Users.update({ 
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      photo: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: req.body.photo
    },
      {where: { id: userId }
    })
    .then(newUser => { res.status(201).json( newUser )})
    .catch(error => res.status(500).json({ error }));
};