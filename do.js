(function () {
  //console.log('before.js executed');
  pathArray = getURLPathArray();
  var sites = [];
  var sitName = [];
  var sitID = [];
  var sitUrl = [];
  var siteMadeTime = [];
  var sitePhpVersion = [];
  var siteWpVersion = [];
  const token = localStorage.getItem("InstaWPAPIKey");
  async function fetchSite() {
    let siteResponse = await fetch("https://app.instawp.io/api/v1/sites", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const SiteData = await siteResponse.json();
    sites = SiteData.data.sites.data;
    sitName = sites.map((item) => item.name);
    sitID = sites.map((item) => item.id);
    sitUrl = sites.map((item) => item.url);
    siteMadeTime = sites.map((item) => item.added_at);
    sitePhpVersion = sites.map((item) => item.php_version);
    siteWpVersion = sites.map((item) => item.wp_version);

    console.log(sites);
  }
  if (token) {
    fetchSite();
  }
  addCreateWebsiteButton();

  function dateconversion(t) {
    var today = new Date();
    var createdate = new Date(t);
    var diffMs = today - createdate; // milliseconds between now & Christmas
    var diffDays = Math.floor(diffMs / 86400000); // days
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    console.log(
      diffDays + " days, " + diffHrs + " hours, " + diffMins + " minutes"
    );
    var created_at =
      "Created At: " +
      diffDays +
      " days, " +
      diffHrs +
      " hours, " +
      diffMins +
      " minutes";
    return created_at;
  }

  function addClickEventToThemeURL() {
    //add onclick event to all theme detail urls.
    var el = document.querySelectorAll(".url");
    for (var i = 0; i < el.length; i++) {
      el[i].onclick = function () {
        setTimeout(function () {
          addThemeLaunchButton();
        }, 1000);
      };
    }
    addClickenventToLoadMore();
  }
  function addClickenventToLoadMore() {
    //add onclick event to all theme detail urls after load more theme.
    if (document.querySelector(".js-load-more-themes")) {
      var close_btn = document.querySelector(".js-load-more-themes");
      close_btn.onclick = function () {
        setTimeout(function () {
          addClickEventToThemeURL();
        }, 1000);
      };
    }
  }
  function addCloseButtonevent() {
    //add onclick event to back button of theme detail page.
    if (document.querySelector(".close")) {
      var close_btn = document.querySelector(".close");
      close_btn.onclick = function () {
        setTimeout(function () {
          addClickEventToThemeURL();
        }, 1000);
      };
    }
  }

  function addCreateWebsiteButton() {
    (Element.prototype.appendBefore = function (element) {
      if (element) {
        element.parentNode.insertBefore(this, element);
      }
    }),
      false;

    /* Adds Element AFTER NeighborElement */
    (Element.prototype.appendAfter = function (element) {
      if (element) {
        element.parentNode.insertBefore(this, element.nextSibling);
      }
    }),
      false;
    var NewElement = document.createElement("button");
    NewElement.innerHTML =
      '<img src="https://app.instawp.io/images/white.svg" width="18"> Get a Website';
    NewElement.id = "create-new-website-btn";
    NewElement.classList.add("creact-btn");
    NewElement.appendAfter(
      document.getElementsByClassName(
        "wp-block-navigation__responsive-close"
      )[0]
    );
    NewElement.href = "javascript:void(0)";
    NewElement.addEventListener("click", launchSiteScript4);
  }

  function addThemeLaunchButton() {
    //add launch button to theme detail page.
    var InstaWPAPIKey = localStorage.getItem("InstaWPAPIKey");
    if (InstaWPAPIKey) {
      showLaunchThemebutton();
    } else {
      generateLanchThemeButton();
    }
  }

  function generateLanchThemeButton() {
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "apiToken");
    input.setAttribute("class", "themeTokenInput");
    input.setAttribute("placeholder", "Enter InstaWP API Key");
    var button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("id", "subminbtn");
    button.setAttribute("value", "Add");
    button.setAttribute("class", "themeTokenSubmit");
    document.querySelector(".theme-actions.clear").appendChild(input);
    document.querySelector(".theme-actions.clear").appendChild(button);
    button.addEventListener("click", launchThemeButton);
  }

  function launchThemeButton() {
    var tokenValue = document.getElementById("apiToken").value;
    if (tokenValue == "") {
      alert("Please InstaWP API Key");
      document.getElementById("apiToken").focus();
      return false;
    } else {
      localStorage.setItem("InstaWPAPIKey", tokenValue);
      document.getElementById("apiToken").classList.add("displayNone");
      document.getElementById("subminbtn").classList.add("displayNone");
      location.reload(true);
    }
  }

  function showLaunchThemebutton() {
    var launcher = document
      .querySelector(".button.button-secondary.alignleft")
      .cloneNode(true);
    launcher.innerHTML =
      '<img src="https://app.instawp.io/images/white.svg" width="18"> Select a website';
    launcher.classList.add("instawp-btn");
    launcher.classList.remove("button-secondary");
    launcher.id = "instawp-btn-theme";
    launcher.setAttribute("data-toggle", "on");
    launcher.href = "javascript:void(0)";
    launcher.addEventListener("click", showlist);
    document.querySelector(".theme-actions.clear").appendChild(launcher);
    callbtn();
  }

  function showAllSite() {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    // create the inner modal div with appended argument
    const child = document.createElement("div");
    child.classList.add("child", "modal-content");
    const header = document.createElement("div");
    header.classList.add("header", "flex", "justify-between", "w-full");
    const h1div = document.createElement("div");
    const h1 = document.createElement("h1");
    h1.classList.add("site-heading", "font-semibold", "text-grayCust-1600");
    h1.innerHTML = "All Sites";
    h1div.appendChild(h1);
    header.appendChild(h1div);
    const items_center = document.createElement("div");
    items_center.classList.add("w-48", "items-center", "px-2");
    const shadow_sm = document.createElement("div");
    shadow_sm.classList.add("shadow-sm", "flex");
    items_center.appendChild(shadow_sm);
    const label = document.createElement("label");
    label.classList.add("sr-only");
    label.setAttribute("for", "search");
    shadow_sm.appendChild(label);
    const relative = document.createElement("div");
    relative.classList.add("relative");
    const searchbox = document.createElement("input");
    searchbox.classList.add("searchbox");
    searchbox.id = "search";
    searchbox.setAttribute("name", "Search");
    searchbox.setAttribute("placeholder", "Search");
    searchbox.setAttribute("type", "text");
    searchbox.addEventListener("keyup", liveSearch);
    relative.appendChild(searchbox);
    shadow_sm.appendChild(relative);
    header.appendChild(shadow_sm);

    // header done
    // body part
    const modalBodyContainer = document.createElement("div");
    modalBodyContainer.classList.add("modalBodyContainer", "modal-body");
    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body", "modal-body-content");
    const tableBody = document.createElement("table");
    tableBody.classList.add("tableBody");
    tableBody.id = "paginated-list";
    for (var i = 0; i < sites.length; i++) {
      var tablerow = document.createElement("tr");
      tablerow.classList.add("tablerow");
      var tablerowdata = document.createElement("td");
      tablerowdata.classList.add("tablerowdata");
      var tablerowdatadiv1 = document.createElement("div");
      tablerowdatadiv1.classList.add("siteNameDiv");
      var tablerowdatadiv1Sitename = document.createElement("div");
      tablerowdatadiv1Sitename.classList.add("siteNameDiv1");
      var tablerowdatadiv1SiteWpVersion = document.createElement("span");
      tablerowdatadiv1SiteWpVersion.classList.add("wpVersion");
      tablerowdatadiv1SiteWpVersion.innerHTML =
        "Wp Version: <b>" + siteWpVersion[i] + "</b>";
      var tablerowdatadiv1SitePhpVersion = document.createElement("span");
      tablerowdatadiv1SitePhpVersion.classList.add("phpVersion");
      tablerowdatadiv1SitePhpVersion.innerHTML =
        "PHP Version: <b>" + sitePhpVersion[i] + "</b> ";
      var tablerowdataspanDiv = document.createElement("div");
      tablerowdataspanDiv.classList.add("siteNameDivspan");
      var tablerowdatadiv1Siteurl = document.createElement("span");
      tablerowdatadiv1Siteurl.classList.add("siteUrl");
      tablerowdatadiv1Siteurl.innerHTML = sitUrl[i];
      var tablerowdatadiv1SiteTime = document.createElement("span");
      tablerowdatadiv1SiteTime.classList.add("siteMadeTime");
      // tablerowdatadiv1SiteTime.innerHTML = dateconversion(siteMadeTime[i]);
      tablerowdatadiv1SiteTime.innerHTML =
        "Added At: <b>" + siteMadeTime[i] + "</b>";
      var tablerowdatadiv2 = document.createElement("div");
      tablerowdatadiv2.classList.add("installBtn");
      tablerowdatadiv2.innerHTML = "Install";
      tablerowdatadiv2.id = sitID[i + 1];
      tablerowdatadiv2.setAttribute("data-site-id", sitID[i + 1]);
      tablerowdatadiv2.addEventListener("click", launchOptionSiteScript3);
      tablerowdataspanDiv.appendChild(tablerowdatadiv1Siteurl);
      tablerowdataspanDiv.appendChild(tablerowdatadiv1SiteTime);
      tablerowdatadiv1.appendChild(tablerowdataspanDiv);
      tablerowdatadiv1Sitename.appendChild(tablerowdatadiv1SiteWpVersion);
      tablerowdatadiv1Sitename.appendChild(tablerowdatadiv1SitePhpVersion);
      tablerowdatadiv1.appendChild(tablerowdatadiv1Sitename);
      tablerowdata.appendChild(tablerowdatadiv1);
      tablerowdata.appendChild(tablerowdatadiv2);
      tablerow.appendChild(tablerowdata);
      tableBody.appendChild(tablerow);
    }
    modalBody.appendChild(tableBody);
    modalBodyContainer.appendChild(modalBody);
    const footerbtnDiv = document.createElement("div");
    footerbtnDiv.classList.add("footerbtnDiv");
    footerbtnDiv.classList.add("pagination-container");
    const pagination_numbers = document.createElement("div");
    pagination_numbers.classList.add("pagination-numbers");
    pagination_numbers.id = "pagination-numbers";
    const footerbtnprevious = document.createElement("button");
    footerbtnprevious.classList.add("footerbtnprevious", "pagination-button");
    footerbtnprevious.id = "prev-button";
    footerbtnprevious.innerHTML = "Previous";
    const footerbtnNext = document.createElement("button");
    footerbtnNext.classList.add("footerbtnNext", "pagination-button");
    footerbtnNext.id = "next-button";
    footerbtnNext.innerHTML = "Next";
    footerbtnDiv.appendChild(footerbtnprevious);
    footerbtnDiv.appendChild(pagination_numbers);
    footerbtnDiv.appendChild(footerbtnNext);
    var footerBtnCancel = document.createElement("div");
    footerBtnCancel.classList.add("cancelBtn");
    footerBtnCancel.innerHTML = "Cancel";
    footerBtnCancel.addEventListener("click", removeModal);

    child.appendChild(header);
    child.appendChild(modalBodyContainer);
    child.appendChild(footerbtnDiv);
    child.appendChild(footerBtnCancel);

    modal.appendChild(child);
    document.body.appendChild(modal);
    pagination();
    // remove modal if background clicked
    modal.addEventListener("click", (event) => {
      if (event.target.className === "modal") {
        removeModal();
      }
    });
  }

  function callbtn() {
    pathArray = getURLPathArray();
    var array = sitName;
    // array.unshift("Lanch New Website");
    var sitIDArray = sitID;
    // sitIDArray.unshift("1");
    var selectList = document.createElement("div");
    selectList.id = "instawp-btn-theme1";
    selectList.classList.add("instawp-btn", "displayNone", "displaypluginbtn");
    selectList.href = "javascript:void(0)";
    var ulList = document.createElement("ul");
    if (array.length == "") {
      var option = document.createElement("li");
      option.innerHTML = "No Site Found!";
      option.style.color = "red";
      ulList.appendChild(option);
    } else {
      for (var i = 0; i < array.length; i++) {
        var option = document.createElement("li");
        option.innerHTML = array[i];
        option.setAttribute("data-site-id", sitIDArray[i]);
        ulList.appendChild(option);
        if (pathArray[1] == "themes") {
          option.addEventListener("click", launchOptionSiteScript3);
        }
        if (pathArray[1] == "plugins") {
          option.addEventListener("click", launchOptionSiteScript2);
        }
        if (i > 1) {
          break;
        }
      }
      if (array.length > 3) {
        var option = document.createElement("li");
        option.innerHTML = "Browse All Sites";
        option.setAttribute("class", "browsAllSite");
        ulList.appendChild(option);
        option.addEventListener("click", showAllSite);
      }
    }

    selectList.appendChild(ulList);
    if (document.querySelector(".theme-actions.clear")) {
      document.querySelector(".theme-actions.clear").appendChild(selectList);
    }
    if (document.getElementsByClassName("plugin-actions")[0]) {
      document
        .getElementsByClassName("plugin-actions")[0]
        .appendChild(selectList);
    }
  }

  function removeModal() {
    // find the modal and remove if it exists
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.remove();
    }
  }

  function showlist() {
    var toggle = document
      .getElementById("instawp-btn-theme")
      .getAttribute("data-toggle");
    if (toggle == "on") {
      document
        .getElementById("instawp-btn-theme")
        .setAttribute("data-toggle", "off");
      document
        .getElementById("instawp-btn-theme1")
        .classList.remove("displayNone");
    } else {
      document
        .getElementById("instawp-btn-theme")
        .setAttribute("data-toggle", "on");
      document
        .getElementById("instawp-btn-theme1")
        .classList.add("displayNone");
    }
  }

  async function launchOptionSiteScript3(evt) {
    //launch instawp website to install theme.
    pathArray = getURLPathArray();
    var sitIDArray = evt.target.getAttribute("data-site-id");
    evt.target.classList.remove("check");
    evt.target.classList.add("loader");
    console.log(sitIDArray);
    console.log(pathArray[2]);
    if (sitIDArray == 1) {
      launchSiteScript3();
    } else {
      let response = await fetch(
        "https://app.instawp.io/api/v1/site/user-install-theme-by-slug/" +
          sitIDArray,
        {
          method: "POST",
          body: JSON.stringify({
            slugs: pathArray[2],
          }),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      evt.target.classList.remove("loader");
      evt.target.classList.add("check");
      var id = evt.target.id;
      if (id) {
        document.getElementById(id).innerHTML = "Installed";
      }
    }
  }

  function launchSiteScript3() {
    pathArray = getURLPathArray();
    if (pathArray[1] == "themes" && pathArray[2] != "") {
      newtabUrl =
        "https://app.instawp.io/dashboard?launch_slug=true&themes=" +
        pathArray[2];
      window.open(newtabUrl, "_blank").focus();
    }
    setTimeout(function () {
      location.reload(true);
    }, 5000);
  }

  function addPluginLaunchButton() {
    var InstaWPAPIKey = localStorage.getItem("InstaWPAPIKey");
    if (InstaWPAPIKey) {
      showLaunchluginbutton();
    } else {
      generateLanchluginButton();
    }
  }

  function generateLanchluginButton() {
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "apiToken");
    input.setAttribute("class", "tokenInput");
    input.setAttribute("placeholder", "Enter InstaWP API Key");
    var button = document.createElement("input");
    button.setAttribute("type", "button");
    button.setAttribute("id", "subminbtn");
    button.setAttribute("value", "Add");
    button.setAttribute("class", "tokenSubmit");
    document.getElementsByClassName("plugin-actions")[0].appendChild(input);
    document.getElementsByClassName("plugin-actions")[0].appendChild(button);
    button.addEventListener("click", launchPluginButton);
  }

  function launchPluginButton() {
    var tokenValue = document.getElementById("apiToken").value;
    if (tokenValue == "") {
      alert("Please InstaWP API Key");
      document.getElementById("apiToken").focus();
      return false;
    } else {
      localStorage.setItem("InstaWPAPIKey", tokenValue);
      document.getElementById("apiToken").classList.add("displayNone");
      document.getElementById("subminbtn").classList.add("displayNone");
      location.reload(true);
    }
  }
  function showLaunchluginbutton() {
    var launcher = document
      .getElementsByClassName("plugin-download")[0]
      .cloneNode(true);
    launcher.innerHTML =
      '<img src="https://app.instawp.io/images/white.svg" width="18"> Select a website';
    launcher.classList.add("instawp-btn", "launchPluginBtn");
    launcher.classList.remove("download-button");
    launcher.id = "instawp-btn-theme";
    launcher.setAttribute("data-toggle", "on");
    launcher.href = "javascript:void(0)";
    launcher.addEventListener("click", showlist);
    document.getElementsByClassName("plugin-actions")[0].appendChild(launcher);
    callbtn();
  }

  async function launchOptionSiteScript2(evt) {
    pathArray = getURLPathArray();
    var sitIDArray = evt.target.getAttribute("data-site-id");
    evt.target.classList.remove("check");
    evt.target.classList.add("loader");
    console.log(sitIDArray);
    console.log(pathArray[2]);
    if (sitIDArray == 1) {
      launchSiteScript2();
    } else {
      var response = await fetch(
        "https://app.instawp.io/api/v1/site/user-install-plugin-by-slug/" +
          sitIDArray,
        {
          method: "POST",
          body: JSON.stringify({
            slugs: pathArray[2],
          }),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      evt.target.classList.remove("loader");
      evt.target.classList.add("check");
      var id = evt.target.id;
      if (id) {
        document.getElementById(id).innerHTML = "Installed";
      }
    }
  }

  function launchSiteScript2() {
    //launch instawp website to install plugin.
    pathArray = getURLPathArray();
    if (pathArray[1] == "plugins" && pathArray[2] != "") {
      newtabUrl =
        "https://app.instawp.io/dashboard?launch_slug=true&plugins=" +
        pathArray[2];
      window.open(newtabUrl, "_blank").focus();
    }
    setTimeout(function () {
      location.reload(true);
    }, 5000);
  }

  function launchSiteScript4() {
    pathArray = getURLPathArray();
    if (pathArray) {
      newtabUrl = "https://app.instawp.io/dashboard?launch_slug=true";
      window.open(newtabUrl, "_blank").focus();
    }
    setTimeout(function () {
      location.reload(true);
    }, 5000);
  }

  function getURLPathArray() {
    var pathArray = window.location.pathname.split("/");
    return pathArray;
  }

  chrome.runtime.sendMessage({ greeting: "checkLogin" }, function (response) {
    console.log(response.farewell);
    if (response.farewell == "loggedIn") {
      if (
        pathArray[1] == "plugins" &&
        document.querySelector(".plugin-download")
      ) {
        //for plugin detail page
        addLaunchPluginButton();
        addPluginLaunchButton();
      } else if (
        pathArray[1] == "themes" &&
        document.querySelector(".button.button-secondary.alignleft")
      ) {
        //for theme detail page
        addLaunchThemeButton();
        addThemeLaunchButton();
      } else if (
        pathArray[1] == "themes" &&
        document.querySelector(".js-load-more-themes")
      ) {
        //for theme list page
        addClickEventToThemeURL();
      }
    }
  });

  function liveSearch() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    var tdSiteName = document.getElementsByClassName("siteNameDiv1");
    filter = input.value.toUpperCase();
    table = document.getElementById("paginated-list");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
        tr[i].classList.remove("hidden");
      } else {
        tr[i].style.display = "none";
      }
    }
  }

  function addLaunchThemeButton() {
    //add launch button to theme detail page.
    var launcher = document
      .querySelector(".button.button-secondary.alignleft")
      .cloneNode(true);
    launcher.innerHTML =
      '<img src="https://app.instawp.io/images/white.svg" width="18"> Launch New Website';
    launcher.classList.add("instawp-btn", "launchInstawp-btn");
    launcher.classList.remove("button-secondary");
    launcher.id = "instawp-btn";
    launcher.href = "javascript:void(0)";
    launcher.addEventListener("click", launchSiteScript3);
    document.querySelector(".theme-actions.clear").appendChild(launcher);
    addCloseButtonevent();
  }
  function addLaunchPluginButton() {
    //add launch button to plugin detail page.
    var launcher = document
      .getElementsByClassName("plugin-download")[0]
      .cloneNode(true);
    launcher.innerHTML =
      '<img src="https://app.instawp.io/images/white.svg" width="18"> Launch New Website';
    launcher.classList.add("instawp-btn", "launchPluginInstawp-btn");
    launcher.id = "instawp-btn";
    launcher.href = "javascript:void(0)";
    launcher.addEventListener("click", launchSiteScript2);
    document.getElementsByClassName("plugin-actions")[0].appendChild(launcher);
  }
})();
