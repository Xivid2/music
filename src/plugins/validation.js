import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage,
  defineRule,
  configure,
} from 'vee-validate';
import {
  required,
  min,
  max,
  email,
  confirmed,
  min_value as minValue,
  max_value as maxValue,
  alpha_spaces as alphaSpaces,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('email', email);
    defineRule('passwords_mismatch', confirmed);
    defineRule('min_value', minValue);
    defineRule('max_value', maxValue);
    defineRule('alpha_spaces', alphaSpaces);

    configure({
      generateMessage: ({ field, rule }) => {
        const messages = {
          required: `The field ${field} is required.`,
          min: `The field ${field} is too short.`,
          max: `The field ${field} is too long.`,
          alpha_spaces: `The field ${field} may only contain alphabetic characters and spaces.`,
          email: `The field ${field} must be a valid email.`,
          min_value: `The field ${field} is too low.`,
          max_value: `The field ${field} is too high.`,
          passwords_mismatch: "The password don't match.",
          tos: 'You must accept the Terms of Service.',
        };

        const message = messages[rule.name] ? messages[rule.name] : `The field ${field} is invalid.`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
