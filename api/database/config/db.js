const mongoose = require("mongoose");

// // Deployment
// const MONGOURI = "mongodb+srv://communitydash:peggyaustinlydia@community-dash-bzucz.mongodb.net/v1";

// Testing
const MONGOURI = "mongodb+srv://communitydash:peggyaustinlydia@community-dash-bzucz.mongodb.net/test";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
