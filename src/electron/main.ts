import { BrowserWindow, app, desktopCapturer, ipcMain } from "electron";
import path from "path";

const isDev = process.env.DEV != undefined;
const isPreview = process.env.PREVIEW != undefined;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");

    win.webContents.openDevTools();
  } else if (isPreview) {
    win.webContents.openDevTools();
    win.loadFile("dist-electron/main");
  } else {
    win.loadFile("dist-electron/main");
  }
};

app.whenReady().then(() => {
  ipcMain.handle("get-sources", async () => {
    const sources = await desktopCapturer.getSources({
      types: ["window", "screen"],
    });

    return sources.map((source) => {
      return {
        id: source.id,
        name: source.name,
        thumbnail: source.thumbnail.toDataURL(),
      };
    });
  });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
