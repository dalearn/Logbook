var fs = require('fs');
exports.getPage = function(url) {//Not async yet. --> reading files should somehow be async
    var page = `<!doctype html>
<html>
    <head>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js"></script>

        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular-route.js"></script>

        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">

        <style>
            a:hover {
                text-decoration: underline;
            }
        </style>

        </head><body>`;

    page += fs.readFileSync('./src/client/pages/' + url + '.page', 'UTF-8');//Something needs to be done to make file read async.
    page += '</body></html>';

    return page;
};
