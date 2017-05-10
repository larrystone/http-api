#!/usr/bin/env node
'use strict';

const program = require('commander'),
    pkg = require('../package.json'), http = require('http');;

let cb = (err) => {
    return err.toString();
}

/**
 * API function def definition
 *
 */
let fetch = (city, country)  => {
    http.get( 'http://api.openweathermap.org/data/2.5/weather?q={Lagos}&APPID=3e4ab7450471cb0b5c7373bcc56d3953', 
        function(res) {
        // explicitly treat incoming data as utf8 (avoids issues with multi-byte chars)
        res.setEncoding('utf8');

        // incrementally capture the incoming response body
        let body = '';
        res.on('data', function(d) {
            body += d;
        });

        // do whatever we want with the response once it's done
        res.on('end', function() {
            try {
                let parsed = JSON.parse(body);
                //TODO interpret and show data
                console.log(parsed);

            } catch (err) {
                console.error('Unable to parse response as JSON', err);
                return cb(err);
            };
        });
    }).on('error', function(err) {
        // handle errors with the request itself
        console.error('Error with the request:', err.message);
        cb(err);
    });
    
};


program
    .version(pkg.version)
    .command('fetch [city] [Country]')
    .description(pkg.description)
    .option('-c, --city [optional]', 'Enter city')
    .option('-C, --Country [optional]', 'Enter country')
    .option('-h, --help','Get usage help')
    .action(fetch);

program.parse(process.argv);

// if program was called with no arguments, show help.
if (program.args.length === 0) program.help();