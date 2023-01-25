const Handlebars = require("handlebars");
const fs = require("fs");

// ------------------------------------------------------------

const adjustedNumber = ( num, size ) => {
    let s = "00" + num;
    return s.substring(s.length-size);
    };

const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// ------------------------------------------------------------

exports.handler = async (event) => {

    const { name } = event.queryStringParameters;

    const today   = new Date(),
        currentHour   = adjustedNumber( today.getHours(), 2 ),
        currentMinute = adjustedNumber( today.getMinutes(), 2 ),
        currentSecond = adjustedNumber( today.getSeconds(), 2 );

    const local_timestamp =      "| " + 
                                Intl.DateTimeFormat().resolvedOptions().timeZone + 
                                " |\n on \n" +
                                weekday[today.getDay()] + 
                                ". ➡️ " + 
                                adjustedNumber(today.getDate(),2) + 
                                "." + 
                                month[today.getMonth()]+ 
                                "." + 
                                today.getFullYear() + 
                                " @ " + 
                                currentHour + 
                                ":" + 
                                currentMinute + 
                                ":" + 
                                currentSecond;

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
