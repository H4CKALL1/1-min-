const TelegramBot = require('node-telegram-bot-api');
const token = '6312141532:AAFrFlDrpyjGyaSjqN7-k_im7macPvF6tLg';
const bot = new TelegramBot(token, { polling: true });

let lastPredictionPeriod = ''; 

// Start 

bot.onText(/\/start/, (msg) => {
  const joinButtons = {
    inline_keyboard: [
      [
        { text: "Jᴏɪɴ 🚀", url: "https://t.me/+yLbg53r5mK85ZWU1" },
        { text: "Jᴏɪɴ 🚀", url: "https://t.me/+bDpEEmE4K8oyMWM9" }
      ],
      [
        { text: "Jᴏɪɴ 🚀", url: "https://t.me/enzoxmod" },
        { text: "Jᴏɪɴ 🚀", url: "https://t.me/slizagod" }
      ],
      [{ text: "Jᴏɪɴᴇᴅ 🟢", callback_data: "check_joined" }]
    ]
  };

  //Captions

  bot.sendPhoto(msg.chat.id, "https://t.me/jdjdjfjfbdjdb/75", {
    caption: `Hᴇʏ ${msg.from.first_name}\n\nAғᴛᴇʀ Jᴏɪɴɪɴɢ Aʟʟ Cʜᴀɴɴᴇʟs, Cʟɪᴄᴋ Oɴ Jᴏɪɴᴇᴅ 🟢`,
    reply_markup: joinButtons
  });
});


// Main menu keyboard
const mainMenuKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: "Pʀᴇᴅɪᴄᴛɪᴏɴ" }, { text: "Gɪғᴛ Cᴏᴅᴇ" }],
      [{ text: "Aᴅᴍɪɴ" }, { text: "Aʙᴏᴜᴛ" }]
    ],
    resize_keyboard: true, 
    one_time_keyboard: false
  }
};

// Callback query handler
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const userId = callbackQuery.from.id;
  const firstName = callbackQuery.from.first_name;

  if (callbackQuery.data === 'check_joined') {
    const channel1 = -1002191953851;
    const channel2 = -1002081504282;

    Promise.all([
      bot.getChatMember(channel1, userId),
      bot.getChatMember(channel2, userId)
    ])
    .then(([member1, member2]) => {
      const validStatuses = ['member', 'administrator', 'creator'];
      const isJoinedChannel1 = validStatuses.includes(member1.status);
      const isJoinedChannel2 = validStatuses.includes(member2.status);

      if (isJoinedChannel1 && isJoinedChannel2) {
        bot.sendMessage(message.chat.id, `Wᴇʟʟᴄᴏᴍᴇ Tᴏ Mᴀɪɴ Mᴀɴᴜ ${firstName}!`, mainMenuKeyboard);
      } else {
        bot.sendMessage(message.chat.id, "Yᴏᴜ Aʀᴇ Nᴏᴛ Jᴏɪɴᴇᴅ Tᴏ Aʟʟ Cʜᴀɴɴᴇʟ 🔒");
      }
    })
    .catch(error => {
      bot.sendMessage(message.chat.id, "Eʀᴏʀʀ Pʟᴇᴀsᴇ Cᴏɴᴛᴀᴄᴛ Aᴅᴍɪɴ @enzosrs");
      console.error(error);
    });
  } else if (callbackQuery.data === 'start_prediction') {
    startPrediction(message.chat.id);
  } else if (callbackQuery.data.startsWith('game_')) {
    showGameMessage(message.chat.id, callbackQuery.data);
  } else if (callbackQuery.data === 'back_to_game_selction') {
    showGameSelection(message.chat.id);
  } else if (callbackQuery.data === 'admin_contact') {
    bot.sendMessage(message.chat.id, "👨‍💻 You can contact me at [Admin Contact](https://t.me/enzosrs.", { parse_mode: 'Markdown' });
  }
});

// Handle the Pʀᴇᴅɪᴄᴛɪᴏɴ button
bot.onText(/Pʀᴇᴅɪᴄᴛɪᴏɴ/, (msg) => {
  showGameSelection(msg.chat.id);
});


function showGameSelection(chatId) {
  const gameSelectionButtons = {
    inline_keyboard: [
      [
        { text: "51 Gᴀᴍᴇ", callback_data: "game_51" },
        { text: "Dɪᴜ Wɪɴ", callback_data: "game_dui" },
        { text: "82 Lᴏᴛᴛᴀʀʏ", callback_data: "game_82" }
      ],
      [
        { text: "91 Cʟᴜʙ", callback_data: "game_91" },
        { text: "Tɪʀᴀɴɢᴀ", callback_data: "game_tirenga" },
        { text: "Sɪᴋᴋɪᴍ", callback_data: "game_bdg" }
      ]
    ]
  };

  bot.sendMessage(chatId, "Pʟᴇᴀsᴇ Sᴇʟᴇᴄᴛ Yᴏᴜʀ Gᴀᴍᴇ 🎮", {
    reply_markup: gameSelectionButtons
  });
}


function showGameMessage(chatId, game) {
  let gameName = '';
  let registrationLink = '';

  switch (game) {
    case 'game_51':
      gameName = "51 Gᴀᴍᴇ";
      registrationLink = "https://51game.app/#/register?invitationCode=38443227957";
      break;
    case 'game_diu':
      gameName = "Dɪᴜ Wɪɴ";
      registrationLink = "https://diuwin.org/#/register?invitationCode=66427247200";
      break;
    case 'game_82':
      gameName = "82 Lᴏᴛᴛᴀʀʏ";
      registrationLink = "https://82bet.com/#/register?invitationCode=13645860930";
      break;
    case 'game_91':
      gameName = "91 Cʟᴜʙ";
      registrationLink = "https://www.91club-4.com/#/register?invitationCode=851611187354";
      break;
    case 'game_tiranga':
      gameName = "Tɪʀᴀɴɢᴀ";
      registrationLink = "https://www.tirangagames.top/#/register?invitationCode=263152175322";
      break;
    case 'game_bdg':
      gameName = "Sɪᴋᴋɪᴍ";
      registrationLink = "https://sikkim4.com/#/register?invitationCode=825432137105";
      break;
  }

  const gameMessage = `
🕹 *Yᴏᴜ Sᴇʟᴇᴄᴛ ➢ ${gameName}*\n
🔗 *Rᴇɢɪsᴛᴇʀ Hᴇʀᴇ ➢* [Cʟɪᴄᴋ Hᴇʀᴇ](${registrationLink})\n
⚠️ *Nᴏᴛᴇ :- *Rᴇɢɪsᴛᴇʀ Usɪɴɢ Oᴜʀ Lɪɴᴋ, Oᴛʜᴇʀᴡɪsᴇ Bᴏᴛ Mɪɢʜᴛ Nᴏᴛ Wᴏʀᴋ Pʀᴏᴘᴇʀʟʏ !!
`;

  const gameActionButtons = {
    inline_keyboard: [
      [
        { text: "Pʀᴇᴅɪᴄᴛɪᴏɴ 📊", callback_data: "start_prediction" },
        { text: "Bᴀᴄᴋ 🔙", callback_data: "back_to_game_selection" }
      ]
    ]
  };

  bot.sendMessage(chatId, gameMessage, {
    reply_markup: gameActionButtons,
    parse_mode: 'Markdown'
  });
}


function startPrediction(chatId) {
  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes() + 1;
  const formattedMinutes = String(totalMinutes).padStart(4, '0');
  const currentDate = now.toISOString().split('T')[0].replace(/-/g, '');
  const autoPeriod = currentDate + '01' + formattedMinutes;

  if (autoPeriod === lastPredictionPeriod) {
    bot.sendMessage(chatId, "⚠️ Wᴀɪᴛ Fᴏʀ Nᴇxᴛ Pᴇʀɪᴏᴅ ");
    return;
  }

  lastPredictionPeriod = autoPeriod;

  
  const lastThreeDigits = parseInt(autoPeriod.slice(-3), 10); 

  
  const calculation = (lastThreeDigits * 7 + 3) % 10; 

  let resultText;
  
  if (calculation >= 0 && calculation <= 4) {
    resultText = "Sᴍᴀʟʟ"; 
  } else if (calculation >= 5 && calculation <= 9) {
    resultText = "Bɪɢ"; 
  }

  const predictionText = `
📊 *Gᴀᴍᴇ Tʏᴘᴇ ➢ Wɪɴɢᴏ 1 Mɪɴ*\n
💠 *Pᴇʀɪᴏᴅ ➢* ${autoPeriod}\n
📈 *Rᴇsᴜʟᴛ ➢* ${resultText}\n
⚠️ *Nᴏᴛᴇ :-* Fᴏʀ Wɪɴ Aᴄᴄᴜʀᴀᴄʏ Uᴘᴛᴏ 96% Yᴏᴜ Cᴀɴ Mᴀᴋᴇ Uɴᴅᴇʀ Tʜᴇ Vɪᴘ Lɪɴᴋ Wɪᴛʜ Tʜᴇ Rᴇɢɪsᴛᴇʀ !!
`;

  const predictionButtons = {
    inline_keyboard: [
      [
        { text: "Nᴇxᴛ 🔜", callback_data: "start_prediction" },
        { text: "🔙 Bᴀᴄᴋ", callback_data: "back_to_game_selection" }
      ]
    ]
  };

  bot.sendMessage(chatId, predictionText, {
    reply_markup: predictionButtons,
    parse_mode: 'Markdown'
  });
}

 

// Handle Gift Code
bot.onText(/Gɪғᴛ Cᴏᴅᴇ/, (msg) => {
  bot.sendMessage(msg.chat.id, "Oᴜʀ Exᴄʟᴜꜱɪᴠᴇ Gɪꜰᴛ Cᴏᴅᴇ Aɴᴅ Gɪᴠᴇᴀᴡᴀʏ Cʜᴀɴɴᴇʟ! 🎉 Hᴇʀᴇ, Yᴏᴜ'ʟʟ Fɪɴᴅ Dᴀɪʟʏ Oᴘᴘᴏʀᴛᴜɴɪᴛɪᴇꜱ Tᴏ Wɪɴ Exᴄɪᴛɪɴɢ Pʀɪᴢᴇꜱ. Bᴇ Sᴜʀᴇ Tᴏ Sᴛᴀʏ Aᴄᴛɪᴠᴇ Aɴᴅ Kᴇᴇᴘ Aɴ Eʏᴇ Oᴜᴛ Fᴏʀ Oᴜʀ Lᴀᴛᴇꜱᴛ Dʀᴏᴘꜱ. Gᴏᴏᴅ Lᴜᴄᴋ, Aɴᴅ Mᴀʏ Tʜᴇ Oᴅᴅꜱ Bᴇ Iɴ Yᴏᴜʀ Fᴀᴠᴏʀ! 🎁", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Gɪғᴛ Cᴏᴅᴇ", url: "https://t.me/+bDpEEmE4K8oyMWM9" }]
      ]
    },
    parse_mode: 'Markdown'
  });
});

// Handle Admin Contact
bot.onText(/Aᴅᴍɪɴ/, (msg) => {
  bot.sendMessage(msg.chat.id, "!!>>Hᴇʟʟᴏ I ᴀᴍ @enzosrs\nSᴋɪʟʟᴇᴅ Iɴ Aɴᴅʀᴏɪᴅ Aᴘᴘs, Wᴇʙsɪᴛᴇs, Aɴᴅ Gᴀᴍᴇ Dᴇᴠᴇʟᴏᴘᴍᴇɴᴛ !!!\n\nPʀᴏɢʀᴀᴍɪɴɢ Kɴᴏᴡʟᴇᴅɢᴇ╰┈➤ \n\nHᴛᴍʟ\nCss\nJᴀᴠᴀ Sᴄʀɪᴘᴛ\nPʏᴛʜᴏɴ", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Aᴅᴍɪɴ", url: "https://t.me/enzosrs" }]
      ]
    },
    parse_mode: 'Markdown'
  });
});

// Handle About command
bot.onText(/Aʙᴏᴜᴛ/, (msg) => {
  bot.sendMessage(msg.chat.id, "!!!>>Bᴀʙʏ Pʀᴇᴅɪᴄᴛᴏʀ Is A Pᴏᴡᴇʀғᴜʟ Aɪ Tʜᴀᴛ Wɪʟʟ Pʀᴇᴅɪᴄᴛ Tʜᴇ Nᴇxᴛ Rᴇsᴜʟᴛ Fᴏʀ Yᴏᴜ Iɴ Aᴅᴠᴀɴᴄᴇ !!\n\n🔰 Hᴏᴡ Tᴏ Usᴇ╰┈➤\n\nFʀɪsᴛ Sᴇʟᴇᴄᴛ A Gᴀᴍᴇ\nTʜᴇɴ Rᴇɢɪsᴛᴇʀ Usɪɴɢ Tʜᴇ Pʀᴏᴠɪᴅᴇᴅ Lɪɴᴋ\nMᴀᴋᴇ A Mɪɴɪᴍᴜᴍ Dɪᴘᴏsɪᴛ Oғ 500\nPʟᴀʏ Aᴄᴄᴏʀᴅɪɴɢ Tᴏ Tʜᴇ Bᴏᴛs Pʀᴇᴅɪᴄᴛɪᴏɴs\nHᴏᴘᴇғᴜʟʟʏ, Tʜᴇʀᴇ Wɪʟʟ Bᴇ Nᴏ Lᴏssᴇs.\n\n🔰 Tʜᴇ Bᴇsᴛ Tɪᴍᴇs╰┈➤\n\n7:00 Aᴍ Tᴏ 9:00 Aᴍ\n11:00 Aᴍ Tᴏ 2:00 Pᴍ\n7:30 Pᴍ Tᴏ 11:45 Pᴍ", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Aᴅᴍɪɴ", url: "https://t.me/enzosrs" }]
      ]
    },
    parse_mode: 'Markdown'
  });
});



