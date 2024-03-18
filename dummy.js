const crypto = require("crypto");

function generateJwtSecretKey(length = 64) {
  return crypto.randomBytes(length).toString("hex");
}

const jwtSecretKey = generateJwtSecretKey();
console.log(jwtSecretKey);
