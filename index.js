require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const fs = require("fs");
const { writeFile, readFile } = require("fs/promises");
const { parse } = require("csv-parse");
const axios = require("axios");
const db = require("./db/connect");
const app = express();
const PORT = process.env.PORT || 8080;
const detail = require("./model/number");
const fsExtra = require("fs-extra");
const path = require("path");
const User = require("./model/user");
const cookieParser = require("cookie-parser");
const sendToken = require("./utils/token");
const bcrypt = require("bcryptjs");
const { log } = require("console");

app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

const fetchNumberDetails = async (number) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: { apikey: process.env.API_KEY },
  };
  try {
    const { data } = await axios.get(
      `https://api.apilayer.com/number_verification/validate?number=${number}}`,
      requestOptions
    );
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};

//login user
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "please provide your credentials" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User Not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

app.get("/api/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const mainPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    email: email,
    password: mainPassword,
  });
  sendToken(user, 200, res);
});

//fetch a uniquie number detail
app.post("/api/upload", async (req, res) => {
  try {
    //get the numberArray
    const fileName = req.files.fisier;
    if (!req.files) {
      return res.status(400).json({ msg: "please upload a file" });
    }
    fileName.mv(`${__dirname}/files/${fileName.name}`, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log("successfully uploaded the file");
    });
    fs.createReadStream(`./files/${fileName.name}`)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", async (row) => {
        const number = row[0];
        const data = await fetchNumberDetails(number);
        if (data) {
          await detail.create({ ...data });
        }
      })
      .on("error", (error) => {
        return res.status(400).json({ success: false, msg: error.message });
      });

    res.status(200).json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

//get all the details => /api/getdetails?lineType=mobile
app.get("/api/getdetails", async (req, res) => {
  try {
    let data;
    if (req.query.lineType) {
      data = await detail.find({ line_type: req.query.lineType });
      const main = data?.map((item) => {
        let itemArray = item.split(",");
        if (itemArray.index(0) === 1) {
          return item.number - 10000000000;
        }
        return item.number;
      });
      const log = fs.createWriteStream(`./download/${req.query.lineType}.csv`);
      for (var i = 0; i < main.length; i++) {
        log.write(main[i] + "\n");
      }
      return res.status(200).json({ data });
    } else {
      data = await detail.find();
      return res.status(200).json({ data });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

//download
app.get("/api/download/mobile", (req, res) => {
  res.download("./download/mobile.csv");
});

app.get("/api/download/landline", (req, res) => {
  res.download("./download/landline.csv");
});

app.delete("/api/delete", async (req, res) => {
  try {
    await detail.deleteMany();
    fsExtra.emptyDirSync("./files");
    res.status(200).json({ success: true, msg: "database cleares" });
  } catch (error) {
    res.status(500).json({ success: false, msg: err.message });
  }
});

//serve static assets
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV == "staging"
) {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

const start = async () => {
  try {
    await db(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server Listening on port:${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    console.log("Shutting down the server due to unhandled promise rejection");
    process.exit(1);
  }
};
start();
