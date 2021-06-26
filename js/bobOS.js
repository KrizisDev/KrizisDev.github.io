$(document).ready(function() {
  var commandText = "",
  forceFocus = true,
  zrroARG = false,
  saidHello = false,
  saidGoodbye = false,
  helloWords = [
    "HELLO", "BOBBY"
  ],
  helloInterval = undefined,
  helloHistoryInterval = undefined;

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

  // download function
  function downloadFile(filePath){
      var link=document.createElement('a');
      link.target = "_parent";
      link.href = filePath;
      link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
      link.click();
  }

  // flicker the whole page
  setInterval(function() {
    $("body").css("opacity", (Math.random() * (1 - 0.85) + 0.85).toString());
  }, 50);

  // prevent special characters
  $("#textbox").keydown(function() {
    setTimeout(function() {
      var raw_text = $("#textbox").val();
      var return_text = raw_text.replace(/[^a-zA-Z0-9 ]/g, "");
      $("#textbox").val(return_text);
    }, 10);
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
    window.open("https://hellopengu.in", "_blank");
  })

  // commands
  function checkCommand() {
    $("#history").append("<p>> "+commandText+"</p>");

    var words = commandText.toLowerCase().split(" ");
    var str = "";

    switch(words[0]) {
      case "help":
        if (words.length == 1) {
          str = "help &lt;COMMAND&gt;"
        } else {
          str = "HELLO "+words.slice(1).join(" ").toUpperCase();
        }
      break;

      case "clear":
        $("#history").contents().each(function() {
          if(this.nodeType === Node.COMMENT_NODE) {
            // don't do anything
          } else {
            $(this).remove();
          }
        });
      break;

      case "exit":
        window.location.href = "https://krizisdev.github.io";
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

      case "hello":
        if (words.length == 1) {
          str = "To whom?"
        } else {
          switch(words[1]) {
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
              str = "<a href='https://cdn.discordapp.com/attachments/843595946579591218/856245025942929448/crack.zip' download>[DOWNLOAD CRACK.ZIP]</a>";
            break;

            case "zrro":
              str = "HYPIXEL SKYBLOCK FLOOR 7 WR（1分钟内????）固定的灵靴是否固定????如何通过15小时发现新的耐砂装甲（快速）AMD RYZEN第五代CPU来运行F7 ？？？ （高FPS）NVIDIA 3090降低您的游戏速度？？？ （神秘）仙人掌装甲1阶段NECRON？这是真的？？？？？？？？？？？？在7层HYPIXEL SKYBLOCK地下城RUN进行第3阶段NECRON比赛时，在CYBERPUNK 2077上进行游戏？ NVIDIA 4000系列显卡泄漏（用于F7的更高FPS）金质Bonzo头提升了雌激素水平？？骷髅大师被人一次真实的伤害击中了你（WTF !!）在第二个显示器上观看儿童色情影片，以降低尼康的健康？？我是公认的儿童贩卖者（现在在监狱里），有疾病（和电子女同伴）给您带来更大的伤害，对您的大腿有伤害吗？？？ WTF ？？如何！！使Intel第11代CPU使NECRON 1脱颖而出吗？而您却被终身剥夺了生命并被禁止了？什么鬼！是女的（跨性别不算数，或您有没有要让猫咪发生的任何性别）使NECRON陷入僵局？ STTRAFE现在是女孩吗？ 15H女孩？ LEOCTHL GIRL？ WTF !!!!!!!!!!!!!!!!!!!!!!! 1 EGOM是个女孩？？？我有一个巨大的金邦佐头收藏并正在开发女胸针？任何人都想RP ！？ （; WITHERMANCER DUPE回来了！！！！！！！！！！）-5英寸小圆使ZOMBIE GRUNTS与您发生性关系了吗？ 2021年3月2日的经济崩盘???我无法买得起!!!（WTF）7楼的片段已修复？我现在应该如何铸造硬币？伪造更新已延迟!!! ???????再次他妈的???这些懒惰的人：man_facepalming：真正的100％官方SBN泄漏：少数族裔无法在街区中利用??或他们可能在酒吧后面面对时间??? 1 !!!!!!!!!!!!尽管补上了4.35％的街区玩家，犹太人弥补了74％的经济崩溃!!!钛钻XR-555采矿故障可以为您提供1000000的采矿速度???允许您破坏监狱的酒吧（非常有帮助）!!! BONZO退出CP什么时候下一次转发：）"
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
              <img style='margin-top: 8px;'src='../img/bobOS/skippy.png'></p>";
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
              downloadFile("https://www.youtube.com/watch?v=zvHJXocDnD4");
            break;
          }
        }
      break;

      case "goodbye":
        switch(words[1]) {
          case "bobby":
            alert("[todo: code the \"goodbye bobby\" sequence]")
          break;
        }
      break;
    }

    if (zrroARG) {
      $("#history").append("<p style='color: red'>Pick an option. (y/n)</p>")
    } else {
      $("#history").append("<p>"+str+"</p>");
    }
  }

  // textbox thingamajik whatever
  $("#textbox").keypress(function() {
    var key = (event.keyCode ? event.keyCode : event.which);
    if (key == "13") {
      setTimeout(function() {
        commandText = $("#textbox").val();
        checkCommand();
        $("#textbox").val("");
      }, 1);
    } else {
      sounds.blip.play();
      setTimeout(function() {
        text = $("#textbox").val();
        text.toLowerCase();
        if (saidHello == false && text == "hello bobby") {
          saidHello = true;
          forceFocus = false;
          $("#textbox").prop("disabled", true);
          helloRandomize();
          helloInterval = setInterval(helloRandomize, 70);
          sounds.enter.play();
          setTimeout(function() {
            alert("[todo: download the \"bobby.zip\" file]");
          }, 2250)
        }
      }, 1)
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
