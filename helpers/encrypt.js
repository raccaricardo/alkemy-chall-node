const bcrypt = require("bcryptjs");

const encryptpass = async (pass) => {
  const salt = bcrypt.genSaltSync(8);
  const hash = await bcrypt.hashSync(pass, salt);
  return hash;
};

module.exports = { encryptpass };
