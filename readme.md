# node-red-contrib-kanboard

Kanboard api wrapper for node-red. Make simple api calls to kanboard server. More documentation on the api calls can be found [here](https://docs.kanboard.org/en/latest/api/index.html)

## Configuration Node

API endpoint: The url shown in your server's settings page. Usually something like `https://YOUR_SERVER/jsonrpc.php`

Tested for user credentials so use your username and your personal api token. But it will also work for application credentials filled according to apir documentation.

## Kanboard Node

Makes a HTTP post. You can provide `method` and `params` in the node edit screen or pass a message with `msg.method` property and `msg.payload` property will be used for params.

So if the post body looks like this:

```
{
    "jsonrpc": "2.0",
    "method": "getUser",
    "id": 1769674781,
    "params": {
        "user_id": 1
    }
}
```

just a msg object like this:

```
{
    "method": "getUser",
    "payload": {
        "user_id": 1
    }
}
```