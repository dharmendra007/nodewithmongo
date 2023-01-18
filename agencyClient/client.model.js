const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    agencyId: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    total_bill: { type: Number, required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Client', schema);