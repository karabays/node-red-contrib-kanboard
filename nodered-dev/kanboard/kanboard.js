module.exports = function(RED) {
    const axios = require("axios");

    function KanboardServerNode(config) {
        RED.nodes.createNode(this, config);
        this.url = config.url;
        this.username = this.credentials.username;
        this.apipass = this.credentials.apipass
    }
    RED.nodes.registerType("kanboard-server", KanboardServerNode, {
        credentials: {
            username: { type: 'text' },
            apipass: { type: 'password' }
        }
    });

    function KanboardNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.server = RED.nodes.getNode(config.server);
        if (this.server) {
            node.on('input', function(msg) {
                node.status({ fill: "blue", shape: "dot", text: "requesting" });
                let url = this.server.url;
                let method = msg.method || config.method;
                if (config.params) {
                    var parameters = JSON.parse(config.params)
                } else {
                    parameters = null
                };
                params = msg.payload || parameters;
                let id_num = Math.floor(Math.random() * 10000000000) + 1;
                let data = {
                    "jsonrpc": "2.0",
                    "method": method,
                    "id": id_num,
                    "params": params
                };
                let conf = {
                    "auth": {
                        "username": this.server.username,
                        "password": this.server.apipass
                    }
                };

                axios
                    .post(url, data, conf)
                    .then(res => {
                        msg.payload = res.data;
                        node.send(msg)
                        this.status({})
                    })
                    .catch(error => {
                        msg.payload = error.response.data;
                        node.send(msg)
                        this.status({ fill: "red", shape: "dot", text: "error" })
                    });
            });
        }
    }
    RED.nodes.registerType("kanboard", KanboardNode);
}