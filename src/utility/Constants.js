class Constants {
  constructor() {
    this.defaultPrefix = 'p!';

    this.disabledEvents = [
      'CHANNELS_PIN_UPDATE',
      'MESSAGE_DELETE_BULK',
      'MESSAGE_REACTION_ADD',
      'MESSAGE_REACTION_REMOVE',
      'MESSAGE_REACTION_REMOVE_ALL',
      'MESSAGE_UPDATE',
      'RELATIONSHIP_ADD',
      'RELATIONSHIP_REMOVE',
      'RESUMED',
      'TYPING_START',
      'USER_NOTE_UPDATE',
      'VOICE_SERVER_UPDATE',
      'VOICE_STATE_UPDATE'
    ];

    this.embedColors = {
      error: [255, 0, 0],
      defaults: [
        [255, 38, 154],
        [255, 190, 17],
        [255, 28, 142],
        [255, 105, 180],
        [255, 131, 250],
        [252, 184, 41],
        [242, 38, 255],
        [168, 237, 0],
        [160, 36, 237],
        [147, 112, 219],
        [104, 255, 34],
        [41, 84, 255],
        [8, 248, 255],
        [0, 255, 0],
        [0, 232, 255],
        [0, 245, 255],
        [0, 255, 127]
      ],
      mute: [255, 114, 14],
      unban: [19, 255, 25],
      unmute: [109, 237, 94],
      kick: [255, 160, 36],
      clear: [0, 29, 255],
      ban: [255, 0, 0]
    };

    this.regexes = {
      capitalize: /\w\S*/g
    };

    this.guildSettings = {
      prefixLength: 5
    };

    this.intervals = {
      autoUnmute: 30000,
      autoRemovePoll: 30000
    };

    this.leaderboardCap = 10;

    this.polls = {
      elderTimeRequired: 172800000,
      maxAnswers: 6,
      maxAnswerChar: 20,
      maxChar: 40
    };

    this.setgame = {
      maxLength: 128
    };

    this.xp = {
      messageCooldown: 15000,
      minCharLength: 5,
      xpPerMessage: 3,
      globalMessageCooldown: 15000,
      globalMinCharLength: 10,
      globalXpPerMessage: 1
    };

    this.skills = ['magic', 'damage', 'healing', 'craftmanship', 'intelligence', 'haste'];

    this.levels = [
      {
        'level': 1,
        'xpRequired': 20
      },
      {
        'level': 2,
        'xpRequired': 60
      },
      {
        'level': 3,
        'xpRequired': 140
      },
      {
        'level': 4,
        'xpRequired': 190
      },
      {
        'level': 5,
        'xpRequired': 237
      },
      {
        'level': 6,
        'xpRequired': 291
      },
      {
        'level': 7,
        'xpRequired': 371
      },
      {
        'level': 8,
        'xpRequired': 452
      },
      {
        'level': 9,
        'xpRequired': 500
      },
      {
        'level': 10,
        'xpRequired': 571
      },
      {
        'level': 11,
        'xpRequired': 624
      },
      {
        'level': 12,
        'xpRequired': 691
      },
      {
        'level': 13,
        'xpRequired': 742
      },
      {
        'level': 14,
        'xpRequired': 783
      },
      {
        'level': 15,
        'xpRequired': 824
      },
      {
        'level': 16,
        'xpRequired': 853
      },
      {
        'level': 17,
        'xpRequired': 912
      },
      {
        'level': 18,
        'xpRequired': 984
      },
      {
        'level': 19,
        'xpRequired': 1114
      },
      {
        'level': 20,
        'xpRequired': 1432
      },
    ];    
  }
}

module.exports = new Constants();
