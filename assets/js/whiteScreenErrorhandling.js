const enableWhiteScreenError = () => {
  var WHITESCREEN_EMPTY_APP_ROOT_DELAY = 8000;
  var WHITESCREEN_ERROR_DELAY = 5000;

  // Show white screen error
  var showWhiteScreenError = (error) => {
    console.error(error);
    var whitescreen = document.getElementById("k_whitescreen");
    if (whitescreen.style.display !== "block") {
      document.getElementById("k_whitescreen-stack").innerHTML = error.stack.replace(/\n/g, '<br/>');
      whitescreen.style.display = "block";
      document.body.style.display = "block"; // only for ionic
    }
  }

  // Handle global errors
  window.addEventListener("error", function (event) {
    setTimeout(() => {
      showWhiteScreenError(event.error);
    }, WHITESCREEN_ERROR_DELAY);
  });

  // Detect empty app-root
  setTimeout(function () {
    if (!document.getElementsByTagName("app-root")[0].children.length) {
      showWhiteScreenError(new Error("Empty app-root"));
    }
  }, WHITESCREEN_EMPTY_APP_ROOT_DELAY);
}

// Disable in prod
// enableWhiteScreenError();
