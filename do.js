(function () {
  // console.log(localStorage.getItem(););
  var pathArray = getURLPathArray();

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

  if (window.location.host == "wordpress.org") {
    chrome.runtime.sendMessage({ message: "checkLogin" }, function (response) {
      // console.log("i am back");
      chrome.storage.local.get("chrome_insta_session_id", function (result) {
        // console.log(result["chrome_insta_session_id"]);
        if (result["chrome_insta_session_id"] != "") {
          localStorage.setItem(
            "chrome_extension_id",
            result["chrome_insta_session_id"]
          );
          localStorage.setItem("extension_install", "true");
        } else {
          localStorage.setItem(
            "chrome_extension_id",
            result["chrome_insta_session_id"]
          );
          localStorage.setItem("extension_install", "false");
        }
        const extension_install = localStorage.getItem("extension_install");
        if (extension_install == "true") {
          if (
            pathArray[1] == "plugins" &&
            document.querySelector(".plugin-download")
          ) {
            //for plugin detail page
            // addLaunchPluginButton();
            document.body.classList.add("class-plugin");
            addPluginLaunchButton();
          } else if (
            pathArray[1] == "themes" &&
            document.querySelector(".button.button-secondary.alignleft")
          ) {
            //for theme detail page
            // addLaunchThemeButton();
            // addThemeLaunchButton();
          } else if (
            pathArray[1] == "themes" &&
            document.querySelector(".js-load-more-themes")
          ) {
            //for theme list page
            addClickEventToThemeURL();
          }
        }
      });
    });
  }

  var sites = [];
  var sitName = [];
  var sitID = [];
  var sitUrl = [];
  var siteMadeTime = [];
  var sitePhpVersion = [];
  var siteWpVersion = [];
  const token = localStorage.getItem("chrome_extension_id");
  async function fetchSite() {
    let siteResponse = await fetch(
      "https://app.instawp.io/api/v2/sites?page=1&per_page=10",
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const SiteData = await siteResponse.json();
    // console.log(SiteData);
    sites = SiteData.data;
    sitName = sites.map((item) => item.name);
    sitID = sites.map((item) => item.id);
    sitUrl = sites.map((item) => item.url);
    siteMadeTime = sites.map((item) => item.expired_at_format);
    sitePhpVersion = sites.map((item) => item.php_version);
    siteWpVersion = sites.map((item) => item.wp_version);
    // console.log(siteMadeTime);
  }
  if (token) {
    fetchSite();
  }

  if (pathArray[1] == "plugins" && document.querySelector(".plugin-download")) {
    //for plugin detail page
    addLaunchPluginButton();
  } else if (
    pathArray[1] == "themes" &&
    document.querySelector(".button.button-secondary.alignleft")
  ) {
    addThemeLaunchButton();
  } else if (
    pathArray[1] == "themes" &&
    document.querySelector(".js-load-more-themes")
  ) {
    //for theme list page
    addClickEventToThemeURL();
  }
  addCreateWebsiteButton();
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

  function callbtn() {
    pathArray = getURLPathArray();
    var array = sitName;
    // console.log(sitName);
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
  function showlist() {
    callbtn();
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

  function showLaunchThemebutton() {
    var launcher = document
      .querySelector(".button.button-secondary.alignleft")
      .cloneNode(true);
    launcher.innerHTML = "";
    // '<img src="https://app.instawp.io/images/white.svg" width="18"> Select a website';
    launcher.classList.add("instawp-btn");
    launcher.classList.remove("button-secondary");
    launcher.id = "instawp-btn-theme";
    launcher.setAttribute("data-toggle", "on");
    launcher.href = "javascript:void(0)";
    launcher.addEventListener("click", showlist);
    document.querySelector(".theme-actions.clear").appendChild(launcher);
  }

  function addThemeLaunchButton() {
    //add launch button to theme detail page.
    var chrome_extension_id = localStorage.getItem("chrome_extension_id");
    var extension_install = localStorage.getItem("extension_install");
    if (extension_install == "true") {
      if (chrome_extension_id) {
        addLaunchThemeButton();
        showLaunchThemebutton();
        document.body.classList.add("class-theme");
      } else {
        addLaunchThemeButton();
        generateLanchThemeButton();
      }
    } else {
      addLaunchThemeButton();
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
      // localStorage.setItem("chrome_extension_id", tokenValue);
      document.getElementById("apiToken").classList.add("displayNone");
      document.getElementById("subminbtn").classList.add("displayNone");
      location.reload(true);
    }
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
    // const label = document.createElement("label");
    // label.classList.add("sr-only");
    // label.setAttribute("for", "search");
    // shadow_sm.appendChild(label);
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
      var tablerowdatadiv1SitePhpVersion = document.createElement("span");
      tablerowdatadiv1SitePhpVersion.classList.add("phpVersion");
      var tablerowdataspanDiv = document.createElement("div");
      tablerowdataspanDiv.classList.add("siteNameDivspan");
      var externalLink = document.createElement("img");
      externalLink.src = chrome.runtime.getURL("iconImages/link2.png");
      externalLink.setAttribute("height", "16");
      externalLink.setAttribute("width", "16");
      externalLink.setAttribute("alt", "openlink");
      var copyLinkIcon = document.createElement("img");
      copyLinkIcon.src = chrome.runtime.getURL("iconImages/copy.png");
      copyLinkIcon.setAttribute("height", "16");
      copyLinkIcon.setAttribute("data-url", sitUrl[i]);
      copyLinkIcon.setAttribute("data-id", sitID[i]);
      copyLinkIcon.setAttribute("width", "16");
      copyLinkIcon.setAttribute("alt", "open");
      copyLinkIcon.setAttribute("title", "Copy Url!");
      copyLinkIcon.classList.add("tooltip");
      var clockIcon = document.createElement("img");
      clockIcon.src = chrome.runtime.getURL("iconImages/clock.png");
      clockIcon.setAttribute("height", "16");
      clockIcon.setAttribute("width", "16");
      clockIcon.setAttribute("alt", "open");
      var clockP = document.createElement("p");
      clockP.classList.add("clockp");
      clockP.innerHTML = siteMadeTime[i];
      if (siteMadeTime[i] == "Site Expired") {
        clockP.innerHTML = siteMadeTime[i] + "!!";
        clockP.style.color = "red";
      }
      var wpIcon = document.createElement("img");
      wpIcon.src = chrome.runtime.getURL("iconImages/wp.png");
      wpIcon.setAttribute("height", "16");
      wpIcon.setAttribute("width", "16");
      wpIcon.setAttribute("alt", "open");
      var wpP = document.createElement("p");
      wpP.classList.add("wpP");
      wpP.innerHTML = siteWpVersion[i];
      var phpIcon = document.createElement("img");
      phpIcon.src = chrome.runtime.getURL("iconImages/php2.png");
      phpIcon.setAttribute("height", "16");
      phpIcon.setAttribute("width", "16");
      phpIcon.setAttribute("alt", "open");
      var phpP = document.createElement("p");
      phpP.classList.add("phpP");
      phpP.innerHTML = sitePhpVersion[i];
      var linkUrl = document.createElement("a");
      linkUrl.classList.add("linkUrl");
      linkUrl.href = sitUrl[i];
      linkUrl.target = "_blank";
      linkUrl.appendChild(externalLink);
      var copyLink = document.createElement("p");
      copyLink.classList.add("copyLink");
      copyLink.id = "copyUrl";
      copyLink.addEventListener("click", copyUrl);
      var tooltipP = document.createElement("p");
      tooltipP.classList.add("tooltip", "tooltippara", "copyLink");
      var tooltip = document.createElement("span");
      tooltip.classList.add("tooltiptext");
      tooltip.setAttribute("id", sitID[i]);
      tooltip.innerText = "Copied!!";
      copyLink.appendChild(copyLinkIcon);
      tooltipP.appendChild(tooltip);
      var tablerowdatadiv1Siteurl = document.createElement("span");
      tablerowdatadiv1Siteurl.classList.add("siteUrl");
      tablerowdatadiv1Siteurl.innerHTML = sitUrl[i];
      tablerowdatadiv1Siteurl.append(linkUrl);
      tablerowdatadiv1Siteurl.append(copyLink);
      tablerowdatadiv1Siteurl.append(tooltipP);
      var tablerowdatadiv1SiteTime = document.createElement("span");
      tablerowdatadiv1SiteTime.classList.add("siteMadeTime");
      tablerowdatadiv1SiteTime.appendChild(clockIcon);
      tablerowdatadiv1SiteTime.appendChild(clockP);
      var tablerowdatadiv2 = document.createElement("div");
      tablerowdatadiv2.classList.add("installBtn");
      tablerowdatadiv2.innerHTML = "Install";
      tablerowdatadiv2.setAttribute("data-site-id", sitID[i]);
      tablerowdatadiv2.addEventListener("click", launchOptionSiteScript3);
      tablerowdataspanDiv.appendChild(tablerowdatadiv1Siteurl);
      tablerowdataspanDiv.appendChild(tablerowdatadiv1SiteTime);
      tablerowdatadiv1.appendChild(tablerowdataspanDiv);
      tablerowdatadiv1Sitename.appendChild(wpIcon);
      tablerowdatadiv1Sitename.appendChild(wpP);
      tablerowdatadiv1Sitename.appendChild(phpIcon);
      tablerowdatadiv1Sitename.appendChild(phpP);
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
    footerBtnCancel.innerHTML = "Close";
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
  function removeModal() {
    // find the modal and remove if it exists
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.remove();
    }
  }
  async function launchOptionSiteScript3(evt) {
    //launch instawp website to install theme.
    pathArray = getURLPathArray();
    var sitIDArray = evt.target.getAttribute("data-site-id");
    evt.target.classList.remove("check");
    evt.target.classList.add("loader");
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
      evt.target.classList.remove("loader");
      evt.target.classList.add("check");
      var classname = evt.target.getAttribute("class");
      if (classname == "installBtn check") {
        evt.target.innerHTML = "Installed";
        evt.target.style.pointerEvents = "none";
      }
      if (classname == "check") {
        evt.target.style.pointerEvents = "none";
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
    var chrome_extension_id = localStorage.getItem("chrome_extension_id");
    if (chrome_extension_id) {
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
      // localStorage.setItem("chrome_extension_id", tokenValue);
      document.getElementById("apiToken").classList.add("displayNone");
      document.getElementById("subminbtn").classList.add("displayNone");
      location.reload(true);
    }
  }
  function showLaunchluginbutton() {
    var launcher = document
      .getElementsByClassName("plugin-download")[0]
      .cloneNode(true);
    launcher.innerHTML = "";
    // '<img src="https://app.instawp.io/images/white.svg" width="18"> Select a website';
    launcher.classList.add("instawp-btn", "launchPluginBtn");
    launcher.classList.remove("download-button");
    launcher.id = "instawp-btn-theme";
    launcher.setAttribute("data-toggle", "on");
    launcher.href = "javascript:void(0)";
    launcher.addEventListener("click", showlist);
    document.getElementsByClassName("plugin-actions")[0].appendChild(launcher);
  }

  async function launchOptionSiteScript2(evt) {
    pathArray = getURLPathArray();
    var sitIDArray = evt.target.getAttribute("data-site-id");
    evt.target.classList.remove("check");
    evt.target.classList.add("loader");
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
      evt.target.classList.remove("loader");
      evt.target.classList.add("check");
      var classname = evt.target.getAttribute("class");
      if (classname == "installBtn check") {
        evt.target.innerHTML = "Installed";
        evt.target.style.pointerEvents = "none";
      }
      if (classname == "check") {
        evt.target.style.pointerEvents = "none";
      }
    }
  }

  function launchSiteScript2() {
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

  function copyUrl(evt) {
    var url = evt.target.getAttribute("data-url");
    var id = evt.target.getAttribute("data-id");
    navigator.clipboard.writeText(url);
    document.getElementById(id).style.visibility = "visible";
    setTimeout(function () {
      document.getElementById(id).style.visibility = "hidden";
    }, 500);
  }
})();
