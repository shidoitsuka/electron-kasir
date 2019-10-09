const { app, BrowserWindow } = require("electron");
let wind;

const loadAppWindow = () => {
  wind = new BrowserWindow({
    width: 800,
    height: 600,
    icon: `${__dirname}/assets/pictures/icon.png`,
    webPreferences: {
      nodeIntegration: true
    }
  });
  wind.loadFile("./views/index.html");
};

app.on("ready", loadAppWindow);
