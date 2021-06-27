$(document).ready(function() {
  var sounds = {
    unreality: new Howl ({
      src: ["../snd/gone/unreality.wav"]
    })
  }

  var unrealityBool = false,
  unrealityInterval = undefined;

  function requestFullScreen(element) {
      // Supports most browsers and their versions.
      var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

      if (requestMethod) { // Native full screen.
          requestMethod.call(element);
      } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
          var wscript = new ActiveXObject("WScript.Shell");
          if (wscript !== null) {
              wscript.SendKeys("{F11}");
          }
      }
  }

  $("img").on("click", function() {
    if (unrealityBool == false) {
      unrealityBool = true;
      $("title").text("DH&@*(!H(D&#&^TD!TDDDD^&^#D))");
      $(".unreality").attr("src", "");
      $(".unrealityGif").css("opacity", "100");
      $(".unrealityBG").css("opacity", "100");
      setInterval(function() {
        var randomX = Math.floor(Math.random() * (55 - 45) + 45);
        var randomY = Math.floor(Math.random() * (55 - 45) + 45);
        $(".glitch").css("transform", "translate(-"+randomX+"%, -"+randomY+"%)")
      }, 50);
      sounds.unreality.play();
    }
  });

  unrealityInterval = setInterval(function() {
    if (unrealityBool == true) {
      clearInterval(unrealityInterval);
      setTimeout(function() {
        var elem = document.body; // Make the body go full screen.
        requestFullScreen(elem);
      }, 75);
      setTimeout(function() {
        $(".unrealityGif").trigger("pause");
        $(".unrealityBG").trigger("pause");
        while(1) {
          window.location.reload();
        }
      }, 150);
    }
  }, 1);
});
