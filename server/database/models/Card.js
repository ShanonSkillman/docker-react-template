const bookshelf = require('../bookshelf');

class Card extends bookshelf.Model {
    get tableName() { return "cards"; }
    get hasTimestamps() { return false; }
}

module.exports = bookshelf.model('Card', Card);
