const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const aiService = require("../service/ai.service");
const messageModel = require("../models/message.model");
const { createMemory } = require("../service/vector.service");
const { queryMemory } = require("../service/vector.service");

function initSocketServer(httpServer) {
  const io = new Server(httpServer);

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

    if (!cookies.token) return next(new Error("Authentication error: No token provided"));

    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

      const user = await userModel.findById(decoded.id);
      if (!user) return next(new Error("Authentication error: User not found"));

      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`✅ Socket connected: ${socket.user.email}`);

    socket.on("ai-message", async (rawPayload) => {
      try {
        const messagePayload = JSON.parse(rawPayload);


        if (!messagePayload.content || messagePayload.content.trim() === "") {
          return socket.emit("ai-response", {
            error: "Message content is required",
            chat: messagePayload.chat,
          });
        }


    // Step 1: Create user message
const userMessage = await messageModel.create({
  chat: messagePayload.chat,
  user: socket.user._id,
  content: messagePayload.content,
  role: "user",
});

// Step 2: Generate vector
const userVectors = await aiService.generateVector(userMessage.content);

// Step 3: Create memory
await createMemory({
  vectors: userVectors,
  messageId: userMessage._id.toString(),
  metadata: {
    chat: messagePayload.chat,
    user: socket.user._id,
    text: messagePayload.content
  }
});


        const [memory,chatHistory]=await Promise.all([
          queryMemory({
            queryVector:userVectors,
            limit:3,
            metadata:{
              user:socket.user._id
            }
            }),
            messageModel
            .find({ chat: messagePayload.chat })
            .sort({ createdAt: -1 })
            .limit(20)
            .lean()
            .then(arr=>arr.reverse())
        ])

        const messages = chatHistory.map((item) => ({
          role: item.role,
          parts: [{ text: item.content }],
        }));

        const ltm=[{
          role:"user",
          parts:[{text:`
            these are some previous messages from the chat, use them to generate response

            ${memory.map(item=>item.metadata.text).join("\n")}

            `}]
        }]        

        

        const aiResponse = await aiService.generateResponse([...ltm,...messages]);

        socket.emit("ai-response", {
          content: aiResponse,
          chat: messagePayload.chat,
        });

        const [responseMessage,responseVectors]=await Promise.all([
          messageModel.create({
          chat: messagePayload.chat,
          user: socket.user._id,
          content: aiResponse,
          role: "model",
        }),
        aiService.generateVector(aiResponse)
        ])

        await createMemory({
          vectors: responseVectors,
          messageId: responseMessage._id.toString(),
          metadata: {
            chat: messagePayload.chat,
            user: socket.user._id,
            text:aiResponse
          },
        });
        
      } catch (err) {
        console.error("Socket error:", err);

        socket.emit("ai-response", {
          error: "Something went wrong",
          chat: undefined,
        });
      }
    });
  });
}

module.exports = initSocketServer;
