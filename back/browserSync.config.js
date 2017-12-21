var os = require('os');

var browser   =
  (os.platform() == 'linux') ?
  ('google-chrome') :
  ((os.platform() == 'darwin') ?
  ('google chrome') :
  ((os.platform() == 'win32') ?
  ('chrome') : ('chrome')))
;

module.exports = {
  port: 8080,
  server: {
    baseDir: './server.js',
  },
  browser: browser,
};
