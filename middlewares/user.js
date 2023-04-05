const model = require("../models/model");
checkForDuplicateId = async (req, res, next) => {
  let error = 0;
  await model.user.findOne(
    {
      email: req.body.email,
    },
    (err, user) => {
      if (err) {
        error = err;
        return;
      }
      if (user) {
        error = "Email is already used";
        return;
      }
    }
  );
  if (error) {
    res.status(500).send({ message: "Email is already in use" });
    return;
  }

  await model.user.findOne(
    {
      phone: req.body.phone,
    },
    (err, user) => {
      if (err) {
        error = 1;
        return;
      }
      if (user) {
        error = 1;
        return;
      }
    }
  );
  if (!!error) {
    res.status(500).send({ message: "Phone is already in use" });
    return;
  }
  next();
};
const userMiddlewares = {
  checkForDuplicateId,
};

module.exports = userMiddlewares;
