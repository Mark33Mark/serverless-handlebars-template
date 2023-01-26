const Handlebars = require("handlebars");
const fs = require("fs");


// ------------------------------------------------------------

exports.handler = async (event) => {

    const { name } = event.queryStringParameters;

    const options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false,
        localeMatch: 'lookup',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timeZoneName: 'short'
    };

    const today   = new Date();
    const local_timestamp = new Intl.DateTimeFormat('lookup', options).format(today);

    let data = { 
        name: name || "World", 
        timestamp: local_timestamp
    };

    const template_contents = fs.readFileSync("./templates/hello.hbs", "utf8");

    const template = Handlebars.compile(template_contents);

    console.log(data);

    return {
        statusCode: 200,
        headers: {
            "content-type": "text/html; charset=utf-8",
        },
        body: template(data),
    };
};
