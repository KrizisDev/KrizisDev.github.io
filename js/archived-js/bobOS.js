$(document).ready(function() {
    var commandText = "",
    forceFocus = true,
    zrroARG = false,
    saidHello = false,
    saidGoodbye = false,
    helloInterval = undefined,
    helloHistoryInterval = undefined,
    helloWords = [
      "HELLO", "BOBBY"
    ],
    goodbyeWords = [
      ["&nbsp;", "THIS", "IS", "THE", "STORY", "OF<br>",
      "&nbsp;", "SOMEONE", "WHO", "DECIDED<br>",
      "&nbsp;", "TO", "DOWNLOAD", "\"BOBBY.ZIP\".<br>", "&nbsp;"],
      ["<br>&nbsp;", "ONE", "DAY", "THERE", "WAS<br>",
      "&nbsp;", "SOMEONE", "WHO", "OPENED<br>",
      "&nbsp;", "\"bobOS.html\".<br>", "&nbsp;"],
      ["<br>&nbsp;", "ONE", "DAY", "THEY", "TYPED", "IN<br>", "&nbsp;"],
      ["&nbsp;<br>", "&nbsp;", "AND<br>", "&nbsp;", "THEN...<br>", "&nbsp;<br>", "&nbsp;<br>", "&nbsp;<br>"]
    ],
    goodbyeArray = 0,
    goodbyeIndex = 0;
  
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
      })
    }
  
    // redirect function
    function urlRedirect(url){
      var X = setTimeout(function(){
          window.location.replace(url);
          return true;
      },300);
  
      if( window.location = url ){
          clearTimeout(X);
          return true;
      } else {
          if( window.location.href = url ){
              clearTimeout(X);
              return true;
          }else{
              clearTimeout(X);
              window.location.replace(url);
              return true;
          }
      }
      return false;
  };
    // flicker the whole page
    setInterval(function() {
      $("body").css("opacity", (Math.random() * (1 - 0.85) + 0.85).toString());
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
  
    // play a sound when the "hello penguin" link is clicked
    $(document).on("click", "#penguin", function() {
      sounds.hello.play();
    });
  
    // redirect to hello penguin page once sound stops playing
    sounds.hello.on("end", function() {
      urlRedirect("https://hellopengu.in");
    });
  
    // commands
    function checkCommand() {
      var words = $("#textbox").val().toLowerCase().split(" ");
      var str = "";
  
      switch(words[0]) {
        /*
        case "help":
          if (words.length == 1) {
            str = "help &lt;COMMAND&gt;"
          } else {
            str = "HELLO "+words.slice(1).join(" ").toUpperCase();
          }
        break;
  
        case "clear":
          setTimeout(function() {
            $("#history").contents().each(function() {
              if(this.nodeType === Node.COMMENT_NODE) {
                // don't do anything
              } else {
                $(this).remove();
              }
            });
          }, 2);
        break;
  
        case "exit":
          urlRedirect("https://krizisdev.github.io");
        break;
  
        case "y":
          if (zrroARG) {
            zrroARG = false;
            str = "<p style='font-size: 1.5vw; padding: 2vh 0; font-weight: 100;'>\
            Thank you for being a part of project <a style='color: magenta'>Z.R.R.O.</a>\
            <br><br>\
            For the past 12 months <a style='color: magenta'>Z.R.R.O.</a> has been used to monitor and track RCC for future scientific studies. <br>\
            In the process of this experiment RCC had unfortunately died, so we will have to cut <a style='color: magenta'>Z.R.R.O.</a> short.\
            <br><br>\
            People under investigation: Discord server \"Kokujin Gang\" and its members, mainly: josh, Isu Mocholas, tigui, Rez, WaveFlux, big chungus fan 30, AtheistDestroyer and others.\
            <br><br>\
            Our intentions may not be clear, but that's the point. Any and all incriminating information has either been reported to Discord, or the police. <br>\
            We will be releasing all of our findings on our YouTube channel (<a href='https://youtube.com/channel/UCRXEBgwMAhoED5HmZ_uTpzQ' target='_blank'>https://youtube.com/channel/UCRXEBgwMAhoED5HmZ_uTpzQ</a>).\
            <br><br>\
            Researchers: TraoX_, lilDafty, deotime, Grizzled1242, Blobert, Archi, Quaglet, Quakiy, Zeroing, FaasNax, _XoarT, woodchuck, ic, Perian, Shy, NullObsidian, Joey, Simple, dj no, nothingbutluck, hisheman and most importantly UltraZdravko.\
            <br><br>\
            Thank you for the cooperation.\
            </p>"
          }
        break;
  
        case "n":
          if (zrroARG) {
            zrroARG = false;
          }
        break;
        */
  
        case "hello":
          if (words.length == 1) {
            str = "..."
          } else {
            switch(words[1]) {
              /*
              case "penguin":
                str = "<a id='penguin'>https://hellopengu.in/</a>";
              break;
  
              case "quote":
              str = '\
              "Can we really say that <br>\
              BOBBY exists?\
              <br><br>\
              Can you really say that <br>\
              you exist?\
              <br><br>\
              These are questions that <br>\
              no mortal can answer.\
              <br>\
              But BOBBY knows."\
              <br><br>\
              - Ancient proverb';
              break;
  
              case "sun":
              str = "\
              The weather today is: <br>\
              INESCAPABLE CHAOS";
              break;
  
              case "krizis":
                str = "\
                I've done all I can; <br>\
                The rest is up to you.";
              break;
  
              case "tigui":
                str = "Proud Portuguese."
              break;
  
              case "gavin":
                str = "<a href='https://cdn.discordapp.com/attachments/843595946579591218/856245025942929448/crack.zip' download>[ DOWNLOAD CRACK.ZIP ]</a>";
              break;
  
              case "zrro":
                str = "HYPIXEL SKYBLOCK FLOOR 7 WR???1???????????????????????????????????????????????????????????15??????????????????????????????????????????AMD RYZEN?????????CPU?????????F7 ????????? ??????FPS???NVIDIA 3090????????????????????????????????? ???????????????????????????1??????NECRON??????????????????????????????????????????????????????7???HYPIXEL SKYBLOCK?????????RUN?????????3??????NECRON???????????????CYBERPUNK 2077?????????????????? NVIDIA 4000???????????????????????????F7?????????FPS?????????Bonzo???????????????????????????????????????????????????????????????????????????????????????WTF !!???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? WTF ?????????????????????Intel???11???CPU???NECRON 1????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????NECRON??????????????? STTRAFE????????????????????? 15H????????? LEOCTHL GIRL??? WTF !!!!!!!!!!!!!!!!!!!!!!! 1 EGOM??????????????????????????????????????????????????????????????????????????????????????????????????????RP ?????? ???; WITHERMANCER DUPE??????????????????????????????????????????-5???????????????ZOMBIE GRUNTS?????????????????????????????? 2021???3???2???????????????????????????????????????!!!???WTF???7?????????????????????????????????????????????????????????????????????????????????!!! ??????????????????????????????????????????????man_facepalming????????????100?????????SBN???????????????????????????????????????????????????????????????????????????????????????????? 1 !!!!!!!!!!!!???????????????4.35???????????????????????????????????????74??????????????????!!!??????XR-555??????????????????????????????1000000?????????????????????????????????????????????????????????????????????!!! BONZO??????CP?????????????????????????????????"
              break;
  
              case "jawsh":
                str = "<img id='jawsh' src='../img/bobOS/meth.png'>";
              break;
  
              case "vandylism":
                str = '"The vandylism inside my graphics card <br>\
                when I tell him to render [thing] in 4k"\
                <br><br>\
                - tigui, probably';
              break;
  
              case "anzoruno":
                str = "#1 Mr. DoucheBag fan.";
              break;
  
              case "justynz":
                str = "Previously a dedicated RCC moderator, now a professional punching bag.";
              break;
  
              case "himiko":
                str = "Would do anything just to get a crumb of Justynz's dumptruck cheeks.";
              break;
  
              case "skippy":
                str = "<p style='font-size: 1.8vw;'>\
                Never played [insert game here]. <br>\
                None of it. <br>\
                Never will.\
                <br><br>\
                \"Omg you're missing out\"\
                <br><br>\
                Maybe. <br>\
                You're missing out on being a top 50 canadian osu! player.\
                <br><br>\
                Keep your game. <br>\
                <img style='margin-top: 1vw; height: 18vw;' src='../img/bobOS/skippy.png'></p>";
              break;
  
              case "extra":
                str = "<a style='color: red'>[DATA EXPUNGED]</a>";
              break;
  
              case "faren":
                str = "<a style='color: red'>[DATA EXPUNGED]</a>";
              break;
  
              case "waveflux":
                str = "<a style='color: red'>[DATA EXPUNGED]</a>";
              break;
  
              case "crepls":
                str = "<a style='color: red'>[DATA EXPUNGED]</a>";
              break;
  
              case "pinky":
                str = "<p style='font-size: 1.6vw'>Ever since I was a child I was cast out for making ape sounds. \"Stop that!\" my mother said, \"WeirdChamp\" the kids said. I never felt like I had a home. Nowhere was safe for me to just make monkey sounds. Desperate, I took a trip to the tropical regions of panama, where the tribes of panama apes reside. I walked up to their clan and began hollering the most beautiful monkey sounds I could. I screamed OOAA's into the sky and beat my chest with pride. Alas, even the apes would not accept me. Dejected, I returned home. I decided to pursue other interests. I tried joining the space force, but they didn't let me bring bananas into space. I tried to become a banker, but customers didn't like when I pissed on their money and made sensual monkey grunts. I tried to become a chemist, but monkey piss is not an acceptable ingredient when trying to make solvents. As my final attempt I went into math, but triangles didn't make any sense with my monkey brain. All I knew was banana. Until one day, when the greatest skyblock player ever, polytrix, invited me to their guild, <a style='color: magenta'>Flexing Chimps</a>. Alas, I had found my home. Like minded monkeys who I could banana and grunt with. I've learned a lot in my years with them. My past experiences scared me, so I learned to reject chemists, specifically <a style='color: magenta'>Trouble Brewing</a>, by criticizing their guild members with dignity, like by calling them b***es, then pissing on their skill average. I have shunned bankers, for they do not see the grace in having a fat on a crisp dollar bill, which led to my hate in <a style='color: magenta'>Money Moves</a> members. Tringles remained the bane of my monkey brain, so I naturally rejected Triades, and led many hunts with great people like Dogify and w1q against them. I was taught and I teached, I rose and I fell, but I found my home in FC. Finally I was accepted. A great guild with great monkeys, just pissing and ting everywhere, what more could a man want? I'll stick with my monkeys until the day I die because ITS FC ON TOP OO AA OO AA<br>\
                <img style='margin-top: 1vw; height: 16vw;' src='../img/bobOS/pinky.png'></p>"
              break;
              case "arg":
                str = "The following entry has been classified <br>\
                <a style='color: red; font-size: 4vw'>[TOP SECRET]</a> <br>\
                by order of the administrator.\
                <br><br>\
                View the entry anyways? (y/n)"
                setTimeout(function() {
                  zrroARG = true;
                }, 10);
              break;
  
              case "booby":
                urlRedirect("https://www.youtube.com/watch?v=zvHJXocDnD4");
              break;
  
              case "mario":
                str = "[ Mario has logged in. ]";
              break;
              */
  
              case "bobby":
                str = "...";
              break;
            }
          }
        break;
  
        case "goodbye":
          switch(words[1]) {
            case "bobby":
              if (zrroARG == false && goodbyeArray != 4) {
                saidGoodbye = true;
                forceFocus = false;
                $("#textbox").prop("disabled", true);
  
                setTimeout(function() {
                  str = words.join(" ").toUpperCase();
                  $("#textbox").val(str);
                }, 1);
  
                var goodbyeStr = "";
                var timer = (goodbyeArray == 3 ? 2000 : 500);
  
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
        } else if(goodbyeArray == 3) {
          sounds.doom.play();
          $("#textbox").val("");
          $("#history").append("<p id='goodbye'>> "+commandText.toUpperCase()+"</p>");
        } else if(goodbyeArray == 4) {
          forceFocus = false;
          $("#textbox").prop("disabled", true);
          sounds.goodbye.play();
          setTimeout(function() {
            urlRedirect("../html/gone.html");
          }, 1800);
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
  
    // textbox thingamajik whatever
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
            if (saidHello == false && text.match(/hello bobby/i)) {
              saidHello = true;
              forceFocus = false;
              $("#textbox").prop("disabled", true);
              helloRandomize();
              helloInterval = setInterval(helloRandomize, 70);
              sounds.enter.play();
              setTimeout(function() {
                urlRedirect("https://cdn.discordapp.com/attachments/858652063483428874/858652564093665280/bobby.zip");
                setTimeout(function() {
                  urlRedirect("https://krizisdev.github.io");
                }, 1000);
              }, 2250)
            }
          }, 1)
        }
      }
    });
  
    // randomize strings during "hello bobby" sequence
    var helloDebounce = false;
    function helloRandomize() {
      var wordLength = Math.floor((Math.random() * 12) + 2)
      var words = "";
      for (var i = 0; i < wordLength; i++) {
        words += helloWords[Math.floor(Math.random() * 2)]+" ";
      }
  
      if (helloDebounce == false) {
        helloDebounce = true;
        $("#history").append("<p>> HELLO BOBBY</p>");
      }
  
      $("#textbox").val(words);
      if (helloHistoryInterval == undefined) {
        helloHistoryInterval = setInterval(function() {
          $("#history").append("<p>> "+$("#textbox").val()+"</p>");
        }, 70);
      }
    }
  });
  