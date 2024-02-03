import expressAsyncHandler from 'express-async-handler'
import { check } from 'express-validator'

const checkFields = fields1 =>
  expressAsyncHandler((req, res, next) => {
    let fields = {}
    fields1.forEach(field => (fields[field] = req.body[field]))

    // Check if empty field
    let message = {}
    // Object.entries({ username, fullname, email, password }).forEach(([key, value]) => {
    Object.entries(fields).forEach(([key, value]) => {
      if (!!!req.body[key]) message[key] = value
    })

    if (Object.keys(message).length) {
      const keys = Object.keys(message)
      keys.forEach(key => (message[key] = 'This field is required!!!'))

      // if (!!username)
      //     if (/[^A-Za-z0-9]+/g.test(username)) message.username = 'This is not Username'
      // if (!!fullname)
      //     if (!/[A-z]+\s[A-z]+/.test(fullname)) message.fullname = 'This is not Fullname'
      // if (!!email) if (!/[\w.]+@\w+\.(com|ru)/.test(email)) message.email = 'This is not Email'
      // if (!!password) {
      //     if (password.length < 8) message.password = 'Minimum 8 letters'
      //     if (password.length > 16) message.password = 'Maximum 16 letters'
      // }

      res.status(400).json({ message })
    } else next()
  })

const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/

const filterField = [
  check('filter_name', 'This field is required').notEmpty(),
  check('sort.*.name', 'This field is required')
    .if((value, { req }) => req.body.filter_sort_key)
    .notEmpty(),
  check('checkbox.*.name', 'This field is required')
    .if((value, { req }) => req.body.column)
    .notEmpty(),
  check('select.*.key', 'This field is required').if(check('select.*.name')).notEmpty(),
  check('select.*.name', 'This field is required').if(check('select.*.key')).notEmpty(),
]

const userAddField = [
  check('username')
    .notEmpty()
    .withMessage('username_required')
    .bail()
    .trim()
    .matches(/^[a-zA-Z0-9]*$/g)
    .withMessage('not_username'),
  check('fullname')
    .notEmpty()
    .withMessage('fullname_required')
    .bail()
    .trim()
    .matches(/[A-z]+\s[A-z]+/)
    .withMessage('not_fullname'),
  check('email')
    .notEmpty()
    .withMessage('email_required')
    .bail()
    .trim()
    .isEmail()
    .withMessage('not_email'),
  check('password')
    .notEmpty()
    .withMessage('password_required')
    .bail()
    .trim()
    .matches(pwdRegex)
    .withMessage('must')
    .bail()
    .isLength({ min: 8 })
    .withMessage('minimum_8_letters')
    .bail()
    .isLength({ max: 16 })
    .withMessage('maximum_16_letters'),
  check('cpassword')
    .notEmpty()
    .withMessage('confirm_password_required')
    .bail()
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) throw new Error('not_same_confirm_password')
      else return true
    })
    .bail()
    .isLength({ min: 8 })
    .withMessage('minimum_8_letters')
    .bail()
    .isLength({ max: 16 })
    .withMessage('maximum_16_letters'),
]

const userLoginField = [
  check('email')
    .notEmpty()
    .withMessage('email_required')
    .bail()
    .trim()
    .isEmail()
    .withMessage('not_email'),
  check('password')
    .notEmpty()
    .withMessage('password_required')
    .bail()
    .trim()
    .matches(pwdRegex)
    .withMessage('must')
    .bail()
    .isLength({ min: 8 })
    .withMessage('minimum_8_letters')
    .bail()
    .isLength({ max: 16 })
    .withMessage('maximum_16_letters'),
]

const userUpdateField = [
  check('username')
    .notEmpty()
    .withMessage('username_required')
    .bail()
    .trim()
    .matches(/^[a-zA-Z0-9]*$/g)
    .withMessage('not_username'),
  check('fullname')
    .notEmpty()
    .withMessage('fullname_required')
    .bail()
    .trim()
    .matches(/[A-z]+\s[A-z]+/)
    .withMessage('not_fullname'),
  check('email')
    .notEmpty()
    .withMessage('email_required')
    .bail()
    .trim()
    .isEmail()
    .withMessage('not_email'),
  check('currentPassword')
    .if(check('newPassword').exists())
    .notEmpty()
    .withMessage('current_password_required')
    .bail()
    .if(check('confirmNewPassword').exists())
    .notEmpty()
    .withMessage('current_password_required')
    .bail()
    .trim()
    .matches(pwdRegex)
    .withMessage('must')
    .bail()
    .isLength({ min: 8 })
    .withMessage('minimum_8_letters')
    .bail()
    .isLength({ max: 16 })
    .withMessage('maximum_16_letters'),
  check('newPassword')
    .if(check('currentPassword').exists())
    .notEmpty()
    .withMessage('new_password_required')
    .bail()
    .if(check('confirmNewPassword').exists())
    .notEmpty()
    .withMessage('new_password_required')
    .bail()
    .trim()
    .matches(pwdRegex)
    .withMessage('must')
    .bail()
    .isLength({ min: 8 })
    .withMessage('minimum_8_letters')
    .bail()
    .isLength({ max: 16 })
    .withMessage('maximum_16_letters'),
  check('confirmNewPassword')
    .if(check('currentPassword').exists())
    .notEmpty()
    .withMessage('confirm_password_required')
    .bail()
    .if(check('newPassword').exists())
    .notEmpty()
    .withMessage('confirm_password_required')
    .bail()
    .trim()
    .isLength({ min: 8 })
    .withMessage('minimum_8_letters')
    .bail()
    .isLength({ max: 16 })
    .withMessage('maximum_16_letters')
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) throw new Error('not_same_confirm_password')
      else return true
    }),
]

const addressField = [
  check(['district', 'city', 'neighborhood']).notEmpty().withMessage('This field is required'),
  check('zipcode')
    .notEmpty()
    .withMessage('This field is required')
    .bail()
    .isNumeric()
    .withMessage('Must be a number'),
  check('defaultAddress').isBoolean().withMessage('Must be a boolean'),
]

const reviewAddField = [check('comment').notEmpty().withMessage('This field is required')]

const reviewEditField = [
  check('comment').notEmpty().withMessage('This field is required'),
  check('_id').notEmpty().withMessage('ID is required'),
]

export {
  filterField,
  userAddField,
  userLoginField,
  userUpdateField,
  addressField,
  reviewAddField,
  reviewEditField,
}

export default checkFields
