async function generateUniqueAlphanumericString(length) {
  const characters =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;

  let uniqueString;
  let attempts = 0;

  uniqueString = "";
  for (let i = 0; i < length; i++) {
    uniqueString += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return uniqueString;
}

module.exports = { generateUniqueAlphanumericString };
