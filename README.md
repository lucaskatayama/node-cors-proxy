# Node CORS Proxy
A proxy server to get rid of CORS while developing for external API's

## Use case
I was developing a AngularJS Front-End App that was pointing to a remote API.
Then I needed to get rid of CORS by making a proxy server for API and a local server for webapp.


```shellscript
Usage: cors-proxy [options]

  Options:

    -h, --help                   output usage information
    -V, --version                output the version number
    -s, --static <static path>   Set static folder path
    -P, --port <port>            Local port
    -p, --path <api path>        API redirect path
    -r, --remote <http address>  Remote address
```
