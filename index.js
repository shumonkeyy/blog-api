const express = require("express");
const app = express();
// const cors = require("cors");

app.use(express.json());
// app.use(cors());
// app.use(
//   cors({
//     origin: ["http://localhost:5173"], // Vite dev server
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"], // add others if you send them
//     credentials: false, // set true only if you use cookies/auth headers that need it
//   })
// );

// app.options("*", cors());

require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");

const connectDB = require("./config/dbConnection");
connectDB();

const blog = require("./routes/blog");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(
  cors({
    origin: ["https://blog-post-azure.vercel.app/"], // your React app domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/blog", blog);

app.get("/blog", (req, res) => {
  console.log("GET /blog hit");
  res.json([{ id: 1, title: "Hello" }]);
});

// (Optional) catch-all to see what path is being hit accidentally
app.use((req, res) => {
  console.log("Unhandled path:", req.method, req.originalUrl);
  res.status(404).json({ error: "Not found" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
