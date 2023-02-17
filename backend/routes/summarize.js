const router = require('express').Router();
const {summarize} = require('../controllers/summarize');

router.route('/generate').post(summarize);

module.exports = router;