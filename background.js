// event to run execute.js content when extension's button is clicked
chrome.action.onClicked.addListener(execScript);

setTimeout(function () {
  chrome.cookies.getAll(
    {
      domain: ".app.instawp.io",
    },
    function (cookies) {
      console.log(cookies);
      for (var i = 0; i < cookies.length; i++) {
        //~ chrome.cookies.remove({
        //~ url: "https://" + cookies[i].domain + cookies[i].path,
        //~ name: cookies[i].name,
        //~ });
      }
    }
  );
}, 2000);

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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting == "checkLogin") {
    fetchText().then((resp) => {
      sendResponse({ farewell: resp });
    });
    return true;
  }
});

async function fetchText() {
  let response = await fetch("https://app.instawp.io/login", {
    mode: "no-cors",
  });
  let data = await response.text();
  var position = data.search(/userEmail/);
  if (position > 0) {
    var loginStatus = "loggedIn";
  } else {
    var loginStatus = "NotlogIn";
  }
  return loginStatus;
}
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
