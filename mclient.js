// super simple: pass in an env obj, and a argv array.
// it'll use the ssh agent, and either the cli flags or the envs

var manta = require('manta');
var assert = require('assert');
var dashdash = require('dashdash');

module.exports = createClient;

createClient.parser = dashdash.createParser({
  options: manta.DEFAULT_CLI_OPTIONS,
  allowUnknown: true
});

function createClient(argv, env) {
  argv = argv || process.argv;
  env = env || process.env;

  // allow passing in JUST the manta args
  // dashdash will automatically slice off the first two items,
  // and we've configured it to allow unknown options anyway
  argv = ['', ''].concat(argv);

  var opts = createClient.parser.parse({ argv: argv, env: env });
  manta.checkBinEnv(opts);

  opts.noAuth = opts.noAuth || env.MANTA_NO_AUTH;
  opts.user = opts.account;
  opts.sign = null;
  if (!opts.noAuth) {
    opts.sign = manta.cliSigner({
      algorithm: opts.algorithm,
      keyId: opts.keyId,
      log: opts.log,
      user: opts.user
    });
  }

  if (opts.insecure)
    opts.rejectUnauthorized = false;

  var client = manta.createClient(opts);
  client.opts = opts;
  return client;
}

if (require.main === module) {
  var c = createClient();
  if (c.opts.help)
    console.log(createClient.parser.help());
  else
    console.error(createClient().opts);
}
