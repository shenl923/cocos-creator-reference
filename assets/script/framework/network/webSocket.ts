const ws =  new WebSocket("ws://echo.websocket.org");
ws.onopen = function (event) {
    console.log("Send Text WS was opened.");
};
ws.onmessage = function (event) {
    console.log("response text msg: " + event.data);
};
ws.onerror = function (event) {
    console.log("Send Text fired an error");
};
ws.onclose = function (event) {
    console.log("WebSocket instance closed.");
};

// setTimeout(function () {
//     if (ws.readyState === WebSocket.OPEN) {
//         ws.send("Hello WebSocket, I'm a text message.");
//     }
//     else {
//         console.log("WebSocket instance wasn't ready...");
//     }
// }, 3);


export default ws;