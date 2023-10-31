import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import ejs from "ejs";

const app = express();
const port = 3000;
const Api_URL = "https://qrtag.net/api/qr.png?url=";
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
      res.render("index.ejs", { qr: " ", message: "Enter URL to Generate QR Code" });
    } catch (error) {
      console.error("Failed to make request", error.message);
      res.render("index.ejs", {
        message: error.response.data,
        qr: "",
      });
    }
  });
  
  app.post("/", async (req, res) => {
    try {
      const result = Api_URL + req.body.url;
      res.render("index.ejs", {
        qr: result, // Assuming the QR URL is in response.data
        message: "Success",
      });
    } catch (error) {
      console.error("Failed to make request", error.message);
      res.render("index.ejs", {
        message: error.response.data,
        qr: "",
      });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});