var createClient = require('./mclient.js');
var test = require('tap').test;

test('basic', function(t) {
  var c = createClient([
    '-aMrPeebles',
    '-k', '66:f2:21:3d:82:a8:21:f7:85:50:60:0b:5a:5e:82:f5',
    '-u', 'http://example.com/',
    '-xasdf',
    '--unknown=value',
    'xyz'
  ], {});

  var o = c.opts;
  t.type(o.sign, 'function')
  delete o.sign;

  t.same(o, {
    account: 'MrPeebles',
    keyId: '66:f2:21:3d:82:a8:21:f7:85:50:60:0b:5a:5e:82:f5',
    url: 'http://example.com/',
    insecure: false,
    _order:
        [{ key: 'account', value: 'MrPeebles', from: 'argv' },
         { key: 'keyId',
           value: '66:f2:21:3d:82:a8:21:f7:85:50:60:0b:5a:5e:82:f5',
           from: 'argv' },
         { key: 'url', value: 'http://example.com/', from: 'argv' }],
    _args: [
      '-xasdf',
      '--unknown=value',
      'xyz'
    ],
    noAuth: undefined,
    user: 'MrPeebles'
  });

  // get from env obj
  var c = createClient([
    '-xasdf',
    '--unknown=value',
    'xyz'
  ], {
    MANTA_USER: 'MrPeebles',
    MANTA_KEY_ID: '66:f2:21:3d:82:a8:21:f7:85:50:60:0b:5a:5e:82:f5',
    MANTA_URL: 'http://example.com/'
  });

  var o = c.opts;
  t.type(o.sign, 'function')
  delete o.sign;

  t.same(o, {
    account: 'MrPeebles',
    keyId: '66:f2:21:3d:82:a8:21:f7:85:50:60:0b:5a:5e:82:f5',
    url: 'http://example.com/',
    insecure: false,
    _order:
        [{ key: 'account', value: 'MrPeebles', from: 'env' },
         { key: 'keyId',
           value: '66:f2:21:3d:82:a8:21:f7:85:50:60:0b:5a:5e:82:f5',
           from: 'env' },
         { key: 'url', value: 'http://example.com/', from: 'env' }],
    _args: [
      '-xasdf',
      '--unknown=value',
      'xyz'
    ],
    noAuth: undefined,
    user: 'MrPeebles'
  });

  // don't pass in required args
  t.throws(function() {
    c = createClient([], {});
  });

  t.end();
});
