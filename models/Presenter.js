const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = mongoose.Schema;

const PresenterSchema = new Schema(
  {
    presenterName: {
      type: String, //name: Joi.string().min(3).required(),
      required: [true, 'PresenterName field is required'],
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    evaluatorName: {
      type: String, //age: Joi.number().required(),
      require: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 255,
    },

    articleUrl: {
      type: String,
      required: true,
    },

    presentationDate: {
      type: Date,
      default: Date.now,
      required: [true, 'Date is required'],
    },
    textarea: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now,
      required: [true, 'Date is required'],
    },
    liked: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

function validatePresenter(presenter) {
  const schema = {
    presenterName: Joi.string().min(3).required(),
    evaluatorName: Joi.string().min(3).required(),
    topic: Joi.string().min(3).required(),
    articleUrl: Joi.string().min(5),
    presentationDate: Joi.date(),
    textarea: Joi.string().min(5),
    date: Joi.date(),
    // liked: Joi.Boolean(),
  };
  return Joi.validate(presenter, schema);
}
const Presenter = mongoose.model('presenter', PresenterSchema);

exports.validate = validatePresenter;
exports.Presenter = Presenter;
