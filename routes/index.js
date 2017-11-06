const express = require('express');
const router = express.Router();
const { Telegram } = require('telegraf');
const TG = new Telegram(process.env.BOT_TOKEN);

const emailRegExp =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

router.post('/contact', (req, res) => {
    console.log(req);
    if (!req.body.name || !req.body.email || !req.body.message) {
        return res.send('Please fill out all fields.');
    }
    if (!emailRegExp.test(req.body.email)) {
        return res.send('Invalid email address');
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
