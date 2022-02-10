const express = require("express");
const router = express.Router();
const userController=require('../controllers/userController')

router.post('/createArticle',userController.createArticle)
router.post('/getAllArticle',userController.getAllArticle)
router.post('/editArticle/:id',userController.editArticle)







module.exports = router;
