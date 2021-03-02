function sanitizeData(dataObj, removeItem) {
  const copyDataObj = { ...dataObj._doc };
  delete copyDataObj[removeItem];
  return copyDataObj;
}

module.exports = sanitizeData;
