export const themeData = {
  "logo": "https://s3.bmp.ovh/imgs/2021/09/7e9b736246fa3521.png",
  "logoDark": "https://s3.bmp.ovh/imgs/2021/09/53653599a08c9994.png",
  "repo": "https://github.com/YeSuX",
  "navbar": [
    {
      "text": "Vue",
      "link": "/vue/"
    },
    {
      "text": "生活",
      "link": "/life/",
      "children": [
        {
          "text": "记录",
          "link": "/life/diary/"
        },
        {
          "text": "影像",
          "link": "/life/photos/"
        }
      ]
    },
    {
      "text": "项目",
      "link": "/projects/"
    },
    {
      "text": "周记",
      "link": "/week/"
    }
  ],
  "locales": {
    "/": {
      "selectLanguageName": "English"
    }
  },
  "darkMode": true,
  "selectLanguageText": "Languages",
  "selectLanguageAriaLabel": "Select language",
  "sidebar": "auto",
  "sidebarDepth": 2,
  "editLink": true,
  "editLinkText": "Edit this page",
  "lastUpdated": true,
  "lastUpdatedText": "Last Updated",
  "contributors": true,
  "contributorsText": "Contributors",
  "notFound": [
    "There's nothing here.",
    "How did we get here?",
    "That's a Four-Oh-Four.",
    "Looks like we've got some broken links."
  ],
  "backToHome": "Take me home",
  "openInNewWindow": "open in new window",
  "toggleDarkMode": "toggle dark mode",
  "toggleSidebar": "toggle sidebar"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
