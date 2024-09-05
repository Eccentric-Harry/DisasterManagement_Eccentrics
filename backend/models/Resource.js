const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    disaster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disaster',
    },

    vehicle: {
        type: String,
        required: true,
    },

    personnel: {
        type: String,
        required: true,
    },

    equipment: {
        type: String,
        required: true,
    },

    supplies:{
        type: String,
        required: true,
    },
    
    facilities: {
        type: String,
        required: true,
    },
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('Resource', resourceSchema);