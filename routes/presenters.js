
const validateObjectId = require('../middleware/validateObjectId')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { validate,Presenter } = require('../models/Presenter');
//const Presenter = require('../models/Presenter');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res,next) => {
  try {
    const presenters = await Presenter.find().sort('presenterName');
    res.send(presenters);
    
  } catch (ex) {
    console.log(ex)
    res.status(500).send('Something Failed...!')
    next(ex)
    


    
  }

});

router.post('/', auth ,async (req, res) => {
  //Validate
  //const result = validate(req.body) ---before destructring
     const { error } = validate(req.body);

  //If invalid, return 400 - Bad request
  if (error) return res.status(400).send(error.details[0].message);

  let presenter = new Presenter({
    presenterName: req.body.presenterName,
    evaluatorName: req.body.evaluatorName,
    topic: req.body.topic,
    articleUrl: req.body.articleUrl,
    presentationDate: req.body.presentationDate,
    textarea: req.body.textarea,
    liked: req.body.liked,
  });
  presenter = await presenter.save();
  console.log(`this presenter is saved in DB ${presenter} `);
  res.send(presenter);
});

router.put('/:id',[auth,validateObjectId] ,async (req, res) => {
  //Validate
  // const { error } = validate(req.body);
  //If invalid, return 400 - Bad request
  // if (error) return res.status(400).send(error.details[0].message);
  //Look up the presenter
  const presenter = await Presenter.findByIdAndUpdate(
    req.params.id,
    {
      presenterName: req.body.presenterName,
      evaluatorName: req.body.evaluatorName,
      topic: req.body.topic,
      articleUrl: req.body.articleUrl,
      presentationDate: req.body.presentationDate,
      textarea: req.body.textarea,
      // liked: req.body.liked,
    },
    { new: true }
  );
  if (!presenter)
    return res
      .status(404)
      .send('The presenter with the given ID was not found!');

  //Return the updated presenter
  res.send(presenter);
});

router.delete('/:id',[auth,admin,validateObjectId] ,async (req, res) => {
  //Look up the presenter
  const _id = req.params.id;
  console.log('deletedObject ID is:', _id);
  const presenter = await Presenter.findByIdAndRemove(_id);
  //If not existing, return 404
  if (!presenter)
    return res
      .status(404)
      .send('The presenter with the given ID was not found!');

  //Return the same presenter
  res.send(presenter);
});

router.get('/:id',validateObjectId, async (req, res) => {
  const presenter = await Presenter.findById(req.params.id);
  if (!presenter)
    return res
      .status(404)
      .send('The presenter with the given ID was not found!');

  res.send(presenter);
});

// function validatePresenter(presenter) {
//   const schema = {
//     presenterName: Joi.string().required(),
//     evaluatorName: Joi.string().required(),
//     topic: Joi.string().required(),
//     articleUrl: Joi.string().required(),
//     presentationDate: Joi.string(),
//     textarea: Joi.string(),
//     date: Joi.Date(),
//   };
//   return Joi.validate(presenter, schema);
// }

module.exports = router;
