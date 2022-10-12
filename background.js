// event to run execute.js content when extension's button is clicked
chrome.action.onClicked.addListener(execScript);

// setTimeout(function () {
//   var url = ".s.instawp.io";
//   chrome.cookies.getAll({ domain: url }, function (cookies) {
//     console.log(cookies);
//   });
//   chrome.storage.local.get(null, function (data) {
//     console.log(data);
//   });
// }, 5000);

// chrome.browserAction.onClicked.addListener(function (activeTab) {
//   var newURL = "https://s.instawp.io/dashboard";
//   chrome.tabs.create({ url: newURL });
// });

async function execScript() {
  const tabId = await getTabId();
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ["execute.js"],
  });
}

async function getTabId() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs.length > 0 ? tabs[0].id : null;
}

function functionToExecute() {
  const obj = {};
  obj["logged_in"] = localStorage.getItem("logged_in");
  obj["chrome_insta_session_id"] = localStorage.getItem(
    "chrome_insta_session_id"
  );
  console.log(obj);
  chrome.storage.local.set(obj);
  return obj;
}

function getCurrentTab() {
  return new Promise((resolve) => {
    var tab_id = "";
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach(function (tab) {
        var taxt = tab.url;
        console.log(tab.url);
        if (taxt.match("s.instawp.io")) {
          console.log(tab.url);
          tab_id = tab.id;
        }
      });
      if (tab_id != "") {
        chrome.scripting.executeScript(
          {
            target: { tabId: tab_id },
            function: functionToExecute,
          },
          (resp) => {
            // console.log(resp);
            resolve(resp);
            // setTimeout(function () {
            //   chrome.tabs.remove(createdTabId);
            // }, 200);
          }
        );
      } else {
        chrome.tabs.create(
          {
            pinned: false,
            active: false,
            url: "https://s.instawp.io/dashboard",
          },
          ({ id: createdTabId }) => {
            console.log(createdTabId);
            chrome.scripting.executeScript(
              {
                target: { tabId: createdTabId },
                function: functionToExecute,
              },
              (resp) => {
                // console.log(resp);
                resolve(resp);
                // setTimeout(function () {
                //   chrome.tabs.remove(createdTabId);
                // }, 200);
              }
            );
          }
        );
      }
    });
  });
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message == "checkLogin") {
    getCurrentTab().then(function (resp) {
      sendResponse(true);
    });
  }
  return true;
});

// async function fetchText() {
//   let response = await fetch("https://app.instawp.io/login", {
//     mode: "no-cors",
//   });
//   let data = await response.text();
//   var position = data.search(/userEmail/);
//   if (position > 0) {
//     var loginStatus = "loggedIn";
//   } else {
//     var loginStatus = "NotlogIn";
//   }
//   return loginStatus;
// }
// const token = "U4Yyz2uT60ukHwEh7pQTMxqHCSFvzq3fpakfno7s";
// async function fetchSite() {
//   let response = await fetch("https://app.instawp.io/api/v1/sites", {
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${token}`, // notice the Bearer before your token
//     },
//   });
//   let data = await response.json();
//   console.log(data);
// }
// fetchSite();
