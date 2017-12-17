var http = require('http');

'use strict';

module.exports = class Web {
    constructor() {
    }

    static getHTML(url, callback) {
        let content = "";

        http.get(url, (resp) => {
            resp.setEncoding("utf8");
            resp.on("data", function (chunk) {
                content += chunk;
            });

            resp.on("end", function () {
                callback(content);
            });
        });
    }
}