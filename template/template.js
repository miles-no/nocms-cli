const fs = require('fs');
exports.warnOn = '!nocms.conf.*';

exports.template = function(grunt, init, done){
    init.readDefaults('./nocms.conf.json');
    init.process({}, [], function(err, props) {
        const nocmsConf = JSON.parse(fs.readFileSync('./nocms.conf.json'));
        const namespaceUnderscore = nocmsConf.namespace.replace('-', '_');
        const namespaceDashed = nocmsConf.namespace.replace('-', '_');
        const imageNames = {
          web: `${namespaceUnderscore}_web`,
          config: `${namespaceUnderscore}_config`,
          fragments: `${namespaceUnderscore}_fragments`,
          webApi: `${namespaceUnderscore}_web_api`,
          varnish: `${namespaceUnderscore}_varnish`,
          authorization: `${namespaceUnderscore}_authorization`,
        };

        Object.assign(props, nocmsConf, { imageNames });

        var files = init.filesToCopy(props);
        init.copyAndProcess(files, props);

        // All done!
        done();
  });
};
