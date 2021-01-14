function sanitizeData(dataObj, removeItem) {
  console.log('dataobj: ', { ...dataObj._doc });
  const copyDataObj = { ...dataObj._doc };
  delete copyDataObj[removeItem];
  return copyDataObj;
}

module.exports = sanitizeData;
