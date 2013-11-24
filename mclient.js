// super simple: pass in an env obj, and a argv array.
// it'll use the ssh agent, and either the cli flags or the envs

var manta = require('manta');
var assert = require('assert');
var dashdash = require('dashdash');

module.exports = createClient;

var parser = dashdash.createParser({
  options: manta.DEFAULT_CLI_OPTIONS,
  strict: false
});

function createClient(argv, env) {
  argv = argv || process.argv;
  env = env || process.env;
  var opts = parser.parse({ argv: argv, env: env });
  manta.checkBinEnv(opts);

  opts.noAuth = opts.noAuth || process.env.MANTA_NO_AUTH;
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

  return manta.createClient(opts);
}

if (require.main === module) {
  console.log(manta.DEFAULT_CLI_OPTIONS);
  console.log(parser.help());
}
