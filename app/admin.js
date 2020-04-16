const express = require('express');
const tokenCheck = require('../middlewerase/tokenCheck');
const permit = require('../middlewerase/permit');

const Cocktail = require('../models/Cocktail');

const router = express.Router();

router.get('/', [tokenCheck, permit('admin')], async (req, res) => {
   const cocktails = await Cocktail.find();

   res.send(cocktails);
});

router.post('/cocktail/publish', [tokenCheck, permit('admin')], async (req, res) => {
   const cocktail = await Cocktail.update({_id: req.body.id}, {publish: true});

   res.send(cocktail);
});

module.exports = router;