const { Menu } = require("electron");

const isMac = process.platform === "darwin";

const MenuBuilder = (mainWindow, appName) => {
  // https://electronjs.org/docs/api/menu#main-process
  const defaultTemplate = () => [
    // { role: "appMenu" }
    ...(isMac
      ? [
          {
            label: appName,
            submenu: [
              {
                role: "about",
                label: "About",
              },
              {
                type: "separator",
              },
              {
                role: "services",
                label: "Services",
              },
              {
                type: "separator",
              },
              {
                role: "hide",
                label: "Hide",
              },
              {
                role: "hideothers",
                label: "Hide Others",
              },
              {
                role: "unhide",
                label: "Unhide",
              },
              {
                type: "separator",
              },
              {
                role: "quit",
                label: "Quit",
              },
            ],
          },
        ]
      : []),
    // { role: "fileMenu" }
    {
      label: "File",
      submenu: [
        isMac
          ? {
              role: "close",
              label: "Quit",
            }
          : {
              role: "quit",
              label: "Exit",
            },
      ],
    },
    // { role: "editMenu" }
    {
      label: "Edit",
      submenu: [
        {
          role: "undo",
          label: "Undo",
        },
        {
          role: "redo",
          label: "Redo",
        },
        {
          type: "separator",
        },
        {
          role: "cut",
          label: "Cut",
        },
        {
          role: "copy",
          label: "Copy",
        },
        {
          role: "paste",
          label: "Paste",
        },
        ...(isMac
          ? [
              {
                role: "pasteAndMatchStyle",
                label: "Paste and Match Style",
              },
              {
                role: "delete",
                label: "Delete",
              },
              {
                role: "selectAll",
                label: "Select All",
              },
              {
                type: "separator",
              },
              {
                label: "Speech",
                submenu: [
                  {
                    role: "startspeaking",
                    label: "Start Speaking",
                  },
                  {
                    role: "stopspeaking",
                    label: "Stop Speaking",
                  },
                ],
              },
            ]
          : [
              {
                role: "delete",
                label: "Delete",
              },
              {
                type: "separator",
              },
              {
                role: "selectAll",
                label: "Select All",
              },
            ]),
      ],
    },
    // { role: "viewMenu" }
    {
      label: "View",
      submenu: [
        {
          role: "reload",
          label: "Reload",
        },
        {
          role: "forcereload",
          label: "Force Reload",
        },
        {
          role: "toggledevtools",
          label: "Toggle Developer Tools",
        },
        {
          type: "separator",
        },
        {
          role: "resetzoom",
          label: "Reset Zoom",
        },
        {
          role: "zoomin",
          label: "Zoom In",
        },
        {
          role: "zoomout",
          label: "Zoom Out",
        },
        {
          type: "separator",
        },
        {
          role: "togglefullscreen",
          label: "Toggle Fullscreen",
        },
      ],
    },
    // { role: "windowMenu" }
    {
      label: "Window",
      submenu: [
        {
          role: "minimize",
          label: "Minimize",
        },
        {
          role: "zoom",
          label: "Zoom",
        },
        ...(isMac
          ? [
              {
                type: "separator",
              },
              {
                role: "front",
                label: "Front",
              },
              {
                type: "separator",
              },
              {
                role: "window",
                label: "Window",
              },
            ]
          : [
              {
                role: "close",
                label: "Close",
              },
            ]),
      ],
    },
    {
      role: "help",
      label: "Help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://electronjs.org");
          },
        },
      ],
    },
  ];

  return {
    buildMenu: () => {
      const menu = Menu.buildFromTemplate(defaultTemplate());
      Menu.setApplicationMenu(menu);

      return menu;
    },
  };
};

module.exports = MenuBuilder;
