const router = require('express').Router();
const {saveEmotion, getEmotions} = require('../controllers/emotions');

router.route('/').get(getEmotions);
router.route('/save').post(saveEmotion);

module.exports = router;