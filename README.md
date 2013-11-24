# manta-client

Easy way to create a Manta client like the Manta CLI tools do.

## USAGE

```javascript
var createClient = require('manta-client');
var client = createClient();

// fancier usage
var client = createClient(process.argv, process.env);

client.doMantaStuff(args, opts, cb);
```
