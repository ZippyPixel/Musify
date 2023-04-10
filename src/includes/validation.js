import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minValue,
  max_value as maxValue,
  confirmed,
  not_one_of as excluded
} from '@vee-validate/rules' // min -> minimum number of characters, max -> maximum number of characters, alpha_spaces -> set of characters (only alphabetical characters)
export default {
  install(app) {
    // app-> reference to the vue application, (optional second parameter) options-> additional data passed from the vue instance
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    defineRule('required', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('min_value', minValue)
    defineRule('max_value', maxValue)
    defineRule('passwords_mismatch', confirmed)
    defineRule('excluded', excluded)
    defineRule('country_excluded', excluded)
    defineRule('tos', required)

    configure({
      generateMessage: (context) => {
        const messages = {
          required: `The field ${context.field} is required`,
          min: `The field ${context.field} is too short`,
          max: `The field ${context.field} is too long`,
          alpha_spaces: `The field ${context.field} should only contain alphabetical characters`,
          email: `The field ${context.field} must contain a valid email`,
          min_value: `You are too young`,
          max_value: `You are too old`,
          excluded: `You are not allowed to use this value for the field ${context.field}`,
          country_excluded: `Due to limitations, we do not accept users from this location.`,
          passwords_mismatch: `The passwords don't match`,
          tos: `You must agree to our terms of service`
        }

        const message = messages[context.rule.name]
          ? messages[context.rule.name]
          : `The field is invalid`
        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: true,
      validateOnModelUpdate: true
    })
  }
}
