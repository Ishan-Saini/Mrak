const { Transform } = require('stream');

class AppendInVect extends Transform {
  constructor(initVect, options) {
    super(options);
    this.initVect = initVect;
    this.flag = false;
  }

  _transform(chunk, encoding, cb) {
    if (!this.flag) {
      this.push(this.initVect);
      this.flag = true;
    }
    this.push(chunk);

    cb();
  }
}

module.exports = AppendInVect;
