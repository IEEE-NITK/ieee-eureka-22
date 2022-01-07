const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML!',
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: [],
        });
        if (clean !== value)
          return helpers.error('string.escapeHTML', { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.solutionSchema = Joi.object({
  AnswerStone: Joi.string().required().escapeHTML(),
});

module.exports.stoneSchema = Joi.object({
  stone: Joi.object({
    name: Joi.string().required().escapeHTML(),
    title: Joi.string().required().escapeHTML(),
    text: Joi.string().required().escapeHTML(),
    body: Joi.string().required().escapeHTML(),
    imageURL: Joi.string().uri().required().escapeHTML(),
    filelink: Joi.string().uri().required().escapeHTML(),
    hint: Joi.string().required().escapeHTML(),
    solution: Joi.string().required().escapeHTML(),
  }),
});
