const { RichEmbed } = require('discord.js');
const Constants = require('./Constants.js');
const String = require('./String.js');
const Number = require('./Number.js');
const Random = require('./Random.js');

class Text {
  constructor(msg) {
    this.msg = msg
  }

  reply(description, options) {
    return this.send(String.boldify(this.msg.author.tag) + ', ' + description, options);
  }

  send(description, options) {
    return this.constructor.createEmbed(this.msg.channel, description, options);
  }

  sendError(description, reply = true, options) {
    return this.send((reply ? String.boldify(this.msg.author.tag) + ', ' : '') + description, { color: Constants.embedColors.error });
  }

  dm(description, options) {
    return this.constructor.createEmbed(this.msg.author, description, options);
  }

  tryDM(user, description, options) {
    return this.constructor.createEmbed(user, description, options);
  }

  dmFields(fieldsAndValues, options) {
    return this.constructor.sendFields(this.msg.author, fieldsAndValues, options);
  }

  sendFields(fieldsAndValues, options) {
    return this.constructor.sendFields(this.msg.channel, fieldsAndValues, options);
  }

  static sendFields(channel, fieldsAndValues, options = {}) {
    if (Number.isEven(fieldsAndValues.length) === false) {
      throw new TypeError('The values length must be even.');
    }

    const embed = new RichEmbed()
      .setColor(options.color !== undefined ? options.color : Random.arrayElement(Constants.embedColors.defaults));

    for (let i = 0; i < fieldsAndValues.length; i++) {
      if (Number.isEven(i)) {
        embed.addField(fieldsAndValues[i], fieldsAndValues[i + 1], options.inline !== undefined ? options.inline : false);
      }
    }

    if (options.footer !== undefined) {
      embed.setFooter(options.footer.text, options.footer.icon);
    }

    return channel.send({ embed });
  }

  static createEmbed(channel, description, options = {}) {
    const embed = new RichEmbed()
      .setColor(options.color === undefined ? Random.arrayElement(Constants.embedColors.defaults) : options.color);

    if (String.isNullOrWhiteSpace(description) === false) {
      embed.setDescription(description);
    }

    if (options.title !== undefined) {
      embed.setTitle(options.title);
    }

    if (options.footer !== undefined) {
      embed.setFooter(options.footer.text, options.footer.icon);
    }

    if (options.thumbnail !== undefined) {
      embed.setThumbnail(options.thumbnail);
    }

    if (options.image !== undefined) {
      embed.setImage(options.image);
    }

    if (options.author !== undefined) {
      embed.setAuthor(options.author.name, options.author.icon, options.author.url);
    }

    if (options.timestamp !== undefined) {
      embed.setTimestamp();
    }

    return channel.send({ embed });
  }
}

module.exports = Text;