const generateUniqueReceiptID = () => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 10);
  const uniqueID = `${timestamp}-${randomString}`;
  return uniqueID;
};

module.exports = generateUniqueReceiptID;
