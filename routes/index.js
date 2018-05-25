const express = require('express');
const router = express.Router();
const { Telegram } = require('telegraf');
const isEmail = require('isemail');

const TG = new Telegram(process.env.BOT_TOKEN);


router.post('/contact', (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.message) {
        return res.send({message: 'Please fill out all fields.'});
    }
    if (!isEmail(req.body.email)) {
        return res.send({message: 'Invalid email address'});
    }

    const message = 
    `
*From*: ${req.body.name}  
*Email*: ${req.body.email}  
          
${req.body.message}
    `;

    TG.sendMessage(process.env.USER_ID, message, {parse_mode: 'Markdown'});

    res.send({message: 'success'});
});

module.exports = router;
