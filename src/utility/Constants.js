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
  }
}

module.exports = new Constants();