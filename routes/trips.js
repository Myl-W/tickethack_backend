// ┬─┬ノ( º _ ºノ)
// (╯°□°)╯︵ ┻━┻
const express = require("express");
const router = express.Router();
const Trip = require("../models/trips");

router.post("/", async (req, res) => {
  try {
    const { departure, arrival, date } = req.body;
    // Date suivante au jour choisit pour le filtrage
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    // Vérification des champs requis
    if (!departure || !arrival || !date) {
      return res.status(400).json({
        response: false,
        error: "Missing 'departure' or 'arrival' in body",
      });
    }

    // Filtrage des trips correspondant aux critères
    const filteredTrips = await Trip.find({
      departure: { $regex: new RegExp(departure.trim(), "i") },
      arrival: { $regex: new RegExp(arrival.trim(), "i") },
      date: { $gte: new Date(date), $lt: nextDay },
    });

    // Vérification de valeur dans la liste
    const isNotEmpty = filteredTrips.length > 0;
    return res.json({
      response: isNotEmpty,
      trips: isNotEmpty ? filteredTrips : "Empty list",
    });
  } catch (error) {
    console.error("Error on GET /:", error);
    return res.status(500).json({ response: false, error: error.message });
  }
});

module.exports = router;
