const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    disaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disaster',
        required: true
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    // reportedAt: {
    //     type: Date,
    //     required: true
    // },
    title:{
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    // severity: {
    //     type: String,
    //     required: true
    // },
    // image: {
    //     type: String
    // },
    // location: {
    //     type: {
    //         type: String,
    //         enum: ['Point'],
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // }
});

module.exports = mongoose.model('Report', reportSchema);
