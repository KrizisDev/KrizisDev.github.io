$(document).ready(function() {
  var commandText = "",
  forceFocus = true,
  zrroARG = false,
  saidGoodbye = false,
  goodbyeWords = [
    ["&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;<br>&nbsp;", "..."],
    ["<br>&nbsp;", "I'VE", "HAD", "A", "BLAST", "FOR<br>",
    "&nbsp;", "THE", "PAST", "6", "YEARS<br>",
    "&nbsp;", "WORKING", "AT", "HYPIXEL.<br>", "&nbsp;"],
    ["<br>&nbsp;", "BUT", "I", "FEEL", "LIKE<br>",
    "&nbsp;", "IT'S", "TIME", "FOR", "ME<br>",
    "&nbsp;", "TO", "MOVE", "ON", "TO", "SOMETHING", "DIFFERENT.<br>", "&nbsp;"],
    ["<br>&nbsp;", "LOTS", "OF", "LOVE<br>",
    "&nbsp;", "FOR", "THE", "TEAM<br>",
    "&nbsp;", "AND", "THE", "PLAYERS.<br>", "&nbsp;"],
    ["&nbsp;<br>", "&nbsp;", "THANKS<br>", "&nbsp;", "FOR<br>", "&nbsp;", "EVERYTHING.<br>", "&nbsp;"]
  ],
  goodbyeArray = 0,
  goodbyeIndex = 0,
  farewell = false;

  setTimeout(function() {
    $("#textbox").val("");
  }, 50);

  // sound array
  var sounds = {
    bootup: new Howl ({
      src: ["../snd/bobOS/bootup.ogg"]
    }),
    blip: new Howl ({
      src: ["../snd/bobOS/blip.ogg"]
    }),
    enter: new Howl ({
      src: ["../snd/bobOS/enter.ogg"]
    }),
    err: new Howl ({
      src: ["../snd/bobOS/err.ogg"]
    }),
    doom: new Howl ({
      src: ["../snd/bobOS/doom.ogg"]
    }),
    goodbye: new Howl ({
      src: ["../snd/bobOS/goodbye.ogg"]
    }),
    hello: new Howl ({
      src: ["../snd/bobOS/hello.wav"]
    }),
    farewell: new Howl ({
      src: ["../snd/bobOS/farewell.ogg"]
    })
  }

  // flicker the whole page
  setInterval(function() {
    if(farewell == false) {
        $("body").css("opacity", (Math.random() * (1 - 0.85) + 0.85).toString());
    }
  }, 50);

  // prevent special characters
  $("#textbox").keydown(function(e) {
    setTimeout(function() {
      var raw_text = $("#textbox").val();
      var return_text = raw_text.replace(/[^a-zA-Z0-9 ]/g, "");
      $("#textbox").val(return_text);
    }, 10);
    if (saidGoodbye == true) {
      e.preventDefault();
      if (e.which == 13) {
        checkCommand();
      }
    }
  });

  // keep focus on the textbox
  $("#textbox").on("blur", function () {
    if (forceFocus == true) {
      var blurEl = $("#textbox");
      setTimeout(function(){
        blurEl.focus()
      }, 1);
    }
  });

  // commands
  function checkCommand() {
    var words = $("#textbox").val().toLowerCase().split(" ");
    var str = "";

    switch(words[0]) {
      case "hello":
        if (words.length == 1) {
          str = "..."
        } else {
          switch(words[1]) {
            case "bobby":
              str = "...";
            break;
          }
        }
      break;

      case "goodbye":
        switch(words[1]) {
          case "bobby":
            if (zrroARG == false && goodbyeArray != 5) {
              saidGoodbye = true;
              forceFocus = false;
              $("#textbox").prop("disabled", true);

              setTimeout(function() {
                str = words.join(" ").toUpperCase();
                $("#textbox").val(str);
              }, 1);

              var goodbyeStr = "";
              var timer = (goodbyeArray == 4 ? 2000 : 500);

              setTimeout(function goodbyeFunction() {
                goodbyeStr = goodbyeWords[goodbyeArray][goodbyeIndex];
                $("#history").append(goodbyeStr+" ");
                goodbyeIndex ++;

                sounds.err.play();

                if (goodbyeIndex != goodbyeWords[goodbyeArray].length) {
                  setTimeout(goodbyeFunction, Math.floor(Math.random() * (800 - 400) + 400));
                } else {
                  setTimeout(function() {
                    goodbyeArray ++;
                    goodbyeIndex = 0;
                    forceFocus = true;
                    $("#textbox").prop("disabled", false).focus();
                  }, 500);
                }
              }, timer);
            }
          break;
        }
      break;
    }

    setTimeout(function() {
      if (saidGoodbye == false) {
        $("#history").append("<p>> "+commandText+"</p>");
      } else if(goodbyeArray == 4) {
        sounds.doom.play();
        $("#textbox").val("");
        $("#history").append("<p id='goodbye'>> "+commandText.toUpperCase()+"</p>");
        setTimeout(function() {
          $("body").empty();
          farewell = true;
        }, 10000);
        setTimeout(function() {
          $("body").append("<div id='farewell'><p>here lies bobby horth</p><p>2016 - 2022</p><p>rest in piss</p><br><img src='../img/bobOS/bobby.png'></div>")
          $("#farewell").animate({ "opacity": "100%" }, 5000);
          sounds.farewell.play();
        }, 12500);
        setTimeout(function() {
          $("body").empty();
        }, 65000);
      }
    }, 1);

    setTimeout(function() {
      if (zrroARG) {
        $("#history").append("<p style='color: red'>Pick an option. (y/n)</p>")
      } else if (saidGoodbye == false) {
        $("#history").append("<p>"+str+"</p>");
      }
    }, 2);
  }

  // textbox thingamajig whatever
  $("#textbox").keypress(function(e) {
    var key = (event.keyCode ? event.keyCode : event.which);
    if (key == "13") {
      if (saidGoodbye == false) {
        setTimeout(function() {
          commandText = $("#textbox").val();
          checkCommand();
          $("#textbox").val("");
        }, 1);
      }
    } else {
      if (saidGoodbye == false) {
        sounds.blip.play();
        setTimeout(function() {
          text = $("#textbox").val();
          text.toLowerCase();
        }, 1)
      }
    }
  });
});
