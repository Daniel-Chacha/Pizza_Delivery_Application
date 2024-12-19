// const WebSocket = require('ws');

// let wss; // Variable to hold WebSocket server instance

// const initWebSocket = (server) => {
//     wss = new WebSocket.Server({ server }); // Attach WebSocket to the provided server
//     console.log("WebSocket server initialized");

//     // Handle new client connections
//     wss.on("connection", (ws) => {
//         console.log("WebSocket client connected");

//         // Handle incoming messages from clients
//         ws.on("message", (message) => {
//             console.log("Message received from client: ", message);
//         });

//         // Handle client disconnection
//         ws.on("close", () => {
//             console.log("WebSocket client disconnected");
//         });
//     });
// };

// // Broadcast updates to all connected clients
// const broadcastUpdate = (data) => {
//     if (!wss) {
//         console.error("WebSocket server is not initialized");
//         return;
//     }

//     // Loop through all connected clients and send data
//     wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify(data)); // Send the data as a string
//         }
//     });
// };

// module.exports = { initWebSocket, broadcastUpdate };
