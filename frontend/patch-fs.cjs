const fs = require('fs');

// Patch native realpath to fallback to JS realpath which works in Windows sandboxes
fs.realpathSync.native = fs.realpathSync;
if (fs.realpath) {
  fs.realpath.native = fs.realpath;
}
if (fs.promises && fs.promises.realpath) {
  const origPromisesRealpath = fs.promises.realpath;
  fs.promises.realpath = async function (path, options) {
    try {
      return await origPromisesRealpath.call(fs.promises, path, options);
    } catch {
      return fs.realpathSync(path, options);
    }
  };
}

// Suppress mkdir EPERM on roaming/telemetry directories & retry transient mkdir EPERM
const origMkdirSync = fs.mkdirSync;
fs.mkdirSync = function (path, options) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return origMkdirSync.call(fs, path, options);
    } catch (err) {
      if (err && err.code === 'EPERM' && String(path).includes('Roaming')) {
        return undefined;
      }
      if (attempt < 2 && err && err.code === 'EPERM') {
        continue;
      }
      throw err;
    }
  }
};

if (fs.promises && fs.promises.mkdir) {
  const origPromisesMkdir = fs.promises.mkdir;
  fs.promises.mkdir = async function (path, options) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        return await origPromisesMkdir.call(fs.promises, path, options);
      } catch (err) {
        if (err && err.code === 'EPERM' && String(path).includes('Roaming')) {
          return undefined;
        }
        if (attempt < 2 && err && err.code === 'EPERM') {
          await new Promise((r) => setTimeout(r, 50));
          continue;
        }
        throw err;
      }
    }
  };
}
