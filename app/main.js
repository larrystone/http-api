#!/usr/bin/env node
'use strict';

const program = require('commander'),
    pkg = require('../package.json'), http = require('http');;

/**
 * API function def definition
 *
 */
let fetch = (username,password)  => {
    let params = [];
    http.get({
        //TODO add api token
    }, function(res) {
        // explicitly treat incoming data as utf8 (avoids issues with multi-byte chars)
        res.setEncoding('utf8');

        // incrementally capture the incoming response body
        var body = '';
        res.on('data', function(d) {
            body += d;
        });

        // do whatever we want with the response once it's done
        res.on('end', function() {
            try {
                let parsed = JSON.parse(body);
            } catch (err) {
                console.error('Unable to parse response as JSON', err);
                return cb(err);
            }

            // pass the relevant data back to the callback
            cb(null, {
                //TODO get back data
            });
        });
    }).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        cb(err);
    });
    
};


program
    .version(pkg.version)
    .command('fetch [directory]')
    .option('-c, --country [optional]', 'Enter country')
    .option('-h, --help','Get usage help')
    .action(list);

program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.args.length === 0) program.help();