const fs = require('fs');

module.exports.isDirectoryExists = function (dir) {
  try {
    const stats = fs.lstatSync(dir);
    if (stats.isDirectory()) {
      return true;
    }
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
  }
  return false;
};
