const express = require('express');
const tokenCheck = require('../middlewerase/tokenCheck');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const {nanoid} = require('nanoid');

const Cocktail = require('../models/Cocktail');

const router = express.Router();

const storage = multer.diskStorage({
   destination: (req, file, cd) => {
      cd(null, config.uploads)
   },
   filename: (req, file, cd) => {
      cd(null, nanoid() + path.extname(file.originalname));
   }
});

const upload = multer({storage});

router.get('/', async (req, res) => {
   const cocktails = await Cocktail.find({publish: true});

   res.send(cocktails);
});

router.get('/myPublications', tokenCheck, async (req, res) => {
   const cocktails = await Cocktail.find({user: req.user._id});

   res.send(cocktails);
});

router.get('/:id', async (req, res) => {
   const cocktails = await Cocktail.findOne({_id: req.params.id}).populate('user');

   res.send(cocktails);
});

router.post('/appraisal', tokenCheck, async (req, res) => {
   const cocktailAppraisals = await Cocktail.findOne({_id: req.body.id,'appraisals.user': req.user._id});

   console.log(cocktailAppraisals);

   const appraisal = {user: req.user._id, appraisal: req.body.appraisal};

   if(!cocktailAppraisals) {
      await Cocktail.updateOne({_id: req.body.id}, {
         $push: {
            appraisals: appraisal
         }
      }, {runValidators: true});
      res.send({message: 'Rate added!'})
   }

   await Cocktail.update({ _id: req.body.id }, { $pull: { appraisals: {user: req.user._id} }}, {multi: true});
   await Cocktail.updateOne({_id: req.body.id}, {
      $push: {
         appraisals: appraisal
      }
   }, {runValidators: true});

   res.send({message: 'Rate changed!'})
});

router.post('/', [tokenCheck, upload.single('image')], async (req, res) => {
   if(req.file){
      req.body.image = 'http://localhost:8000/uploads/' +  req.file.filename
   }

   const cocktail = await Cocktail.create({
      user: req.user._id,
      name: req.body.name,
      ingredients: JSON.parse(req.body.ingredients),
      recipe: req.body.recipe,
      image: req.body.image
   });

   res.send(cocktail);
});

module.exports = router;