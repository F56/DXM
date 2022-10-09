import { app, ipcMain } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";
import { startServer, stopServer } from "./server";
import client from "./utils/webtorrent";
import rimraf from "rimraf";
import path from "path";
import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";
import Store from "electron-store";

const appStore = new Store({
  name: "appStore",
  schema: {
    disclaimer: {
      type: "boolean",
      default: false,
    },
  },
});

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

const installExtensions = async () => {
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
  return Promise.all(
    extensions.map(
      async (ext) =>
        await installExtension(ext, {
          forceDownload: forceDownload,
        })
    )
  );
};

(async () => {
  await app.whenReady();

  if (!isProd) {
    await installExtensions();
  }

  const mainWindow = createWindow("main", {
    width: 1200,
    height: 820,
    minWidth: 1200,
    minHeight: 820,
    autoHideMenuBar: true,
    frame: false,
    center: true,
    resizable: true,
  });

  const appEventHandler = () => {
    ipcMain.on("maximize", (event, arg) => {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    });
    ipcMain.on("minimize", (event, arg) => {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      } else {
        mainWindow.minimize();
      }
    });
    ipcMain.on("close", (event, arg) => {
      mainWindow.close();
    });
    ipcMain.handle("get-store", (event, key) => appStore.get(key));
    ipcMain.handle("set-store", (event, key, val) => appStore.set(key, val));
  };

  startServer(async () => {
    appEventHandler();
    if (isProd) {
      await mainWindow.loadURL("app://./frontpage.html");
    } else {
      const port = process.argv[2];
      await mainWindow.loadURL(`http://localhost:${port}/frontpage`);
      mainWindow.webContents.openDevTools();
    }
  });
})();

app.on("will-quit", () => {
  stopServer();
  const temp = app.getPath("temp");
  rimraf.sync(path.join(temp, "webtorrent"));
});

app.on("window-all-closed", () => {
  app.quit();
});

export { app };
