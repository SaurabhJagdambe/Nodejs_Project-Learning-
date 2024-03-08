const passport = require("passport");
const localStatergy = require("passport-local").Strategy;
const Person = require("./models/person");

passport.use(
  new localStatergy(async (username, password, done) => {
    //authentication logic
    try {
      //   console.log("recieved Credential:", username, password);
      const user = await Person.findOne({ username: username });
      if (!user) {
        return done(null, false, { meg: "Incorrect usesrname" });
      }

      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { meg: "Incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
