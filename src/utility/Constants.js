class Constants {
  constructor() {
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
      ]
    };

    this.polls = {
      elderTimeRequired: 172800000,
      maxAnswers: 6,
      maxAnswerChar: 20,
      maxChar: 40      
    };

    this.setgame = {
      maxLength: 128
    };
  }
}

module.exports = new Constants();