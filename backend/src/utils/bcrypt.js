// require = require("esm")(module);
import bcrypt from "bcrypt";
let salt = bcrypt.genSaltSync(10);

export const encryptText = (pass) => {
  const hash = bcrypt.hashSync(pass, salt);
  return hash;
};

//function to decrypt_password or ant text
export const decryptText = (pass, hash) => {
  const is_compared = bcrypt.compareSync(pass, hash);
  return is_compared;
};
