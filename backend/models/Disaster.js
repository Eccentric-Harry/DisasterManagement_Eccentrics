const mongoose = require('mongoose');

const disasterSchema = new mongoose.Schema(
    {
          user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          
          location: {
            type: {
              type: String,
              enum: ['Point'],
              required: true
            },
            coordinates: {
              type: [Number],
              required: true
            }
          },
          reportedat: String,
          disasterType: String,
          description: String,
          severity: String,
          image: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Disaster', disasterSchema);
  