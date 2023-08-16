const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  content: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  threadId: { type: Schema.Types.ObjectId, ref: 'Thread' },
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
