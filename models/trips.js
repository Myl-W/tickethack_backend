const mongoose = require("mongoose");

const tripsSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: Date,
  price: Number,
});

const Trips = mongoose.model("trips", tripsSchema);

module.exports = Trips;
