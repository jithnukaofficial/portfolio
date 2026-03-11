const express = require('express')
const router = express.Router()
const rateLimit = require('express-rate-limit')
const { body, validationResult } = require('express-validator')
const { sendContactEmail } = require('../config/mailer')

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many messages. Please try again later.' },
})

const validateContact = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2–100 characters.').escape(),
  body('email').trim().isEmail().withMessage('A valid email is required.').normalizeEmail(),
  body('subject').trim().isLength({ min: 3, max: 200 }).withMessage('Subject must be 3–200 characters.').escape(),
  body('message').trim().isLength({ min: 20, max: 3000 }).withMessage('Message must be 20–3000 characters.').escape(),
]

router.post('/', limiter, validateContact, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ success: false, errors: errors.array() })
  }

  const { name, email, subject, message } = req.body

  try {
    await sendContactEmail({ name, email, subject, message })
    console.log(`[CONTACT] Message from ${name} <${email}> — "${subject}"`)
    return res.status(200).json({ success: true, message: 'Message sent successfully.' })
  } catch (err) {
    console.error('[CONTACT ERROR]', err.message)
    return res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' })
  }
})

module.exports = router
