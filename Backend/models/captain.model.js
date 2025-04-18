const mongoose = require('mongoose');

const captaninSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
          lastname: {
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 characters long'],
          }
    },

    email: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
       match: [
         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
         "Please enter a valid email", ],
     },

     password: {
        type: String,
        required: true,
        select: false ,
     },

     socketId: {
        type: String,
     },

     status: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline',
     },

     vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long'],
        }
     },

      plate: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Plate must be at least 3 characters long'],
      },

      capacity: {
        type: Number,
        required: true,
        minlength: [1, 'Capacity must be at least 1 '],
      },

      vehicleType: {
        type: String,
        required: true,
        enum: ['car', 'motorcycle', 'auto'],
      },

      location: {
        lat: {
          type: Number,
        },
        lng: {
          type: Number,
        },
      }
});

const captainModel = mongoose.model('captains', captaninSchema);