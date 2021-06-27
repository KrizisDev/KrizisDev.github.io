$(document).ready(function() {
  // create acronym array
  let acronymList = [
    "AST", "A", "M", "K", "H", "KY", "S", "SP", "R", "IE", "TS", "TT", "G",                                   // Ring 1
    "JGF", "V", "II", "TC", "IS", "DE",                                                                       // Forgotten Ridge
    "OH", "CH", "T", "SD", "DD", "FaF", "TF", "ES", "DC",                                                     // Ring 2
    "FT", "IC", "DS", "AT", "F", "WER", "SI", "WH", "LD", "D", "C",                                           // Ring 3
    "SH", "GG", "L", "E", "TM", "DaD", "LL", "HF", "NP", "CN", "I",                                           // Ring 4
    "NV", "GKD", "RS", "DM", "OC", "FF", "TH", "EA", "FO", "GaH", "FN",                                       // Ring 5
    "FJ", "EP", "RR", "TI", "IaOS", "ADF", "ISC", "DR", "N", "SM", "IM",                                      // Ring 6
    "RB", "FL", "CC", "DA", "OOO", "NGUE", "NED", "U", "YV", "EH", "TB", "ER",                                // Ring 7
    "SSS", "NBA", "VA", "AA", "ITI", "III", "US", "MT", "VE", "SO", "EI", "GF",                               // Ring 8
    "GO", "QT", "BBB", "PP", "BT", "HA", "FaCT", "CA", "BK", "NS", "AM", "CR", "CP",                          // Ring 9
    "AB", "PHaT", "AD", "HS", "P", "MH", "CO", "YS", "WEL", "AV", "UT", "RNI", "ED", "Z", "TL",               // Zone 1
    "B", "SA", "GLA", "TA", "UD", "DaC", "SaS", "PF", "TT", "EE", "AZ", "GD", "O", "DT",                      // Zone 2
    "IA",                                                                                                     // Arcane Area
    "SFU", "OD", "BB", "COF", "CCC", "X", "MA", "DH", "RCH", "CaS", "IO", "MC", "QC", "CaUP", "HH",           // Zone 3
    "FSC", "AC", "UID", "FaST", "OSE", "WW", "ET", "PC", "MIM", "FG", "SS", "DDD", "TV", "IF", "AAA",         // Zone 4
    "AH", "HCF", "YM", "RP", "UA", "HG", "DB"                                                                 // Event Towers (excluding Baldi Tower)
  ]

  $("#acronym-taken").hide();

  // disable directly writing text in the "acronym length" input
  $('input[type="number"]').keydown(function (e){
    e.preventDefault();
  });

  // check if the acronym has already been taken
  $("#acronym-find").click(function() {
    var str = $("#acronym").val();
    if (str == "") {
      $("#acronym-taken").hide();
    }
    var words = str.split(" ");
    var charArray = str.match(/\b(\w)/g);
    var acronym = "To" + charArray.join("").toUpperCase();
    for (var i = 0; i < words.length; i ++) {
      if ((words[i] == "And" || words[i] == "and")) {
        var stuff = acronym.split("");
        stuff[i + 2] = "a";
        acronym = stuff.join("");
      }
    }
    // messy code inbound
    if (words[0] == "And" || words[0] == "and") {
      var stuff = acronym.split("");
      stuff[2] = stuff[2].toUpperCase();
      acronym = stuff.join("");
    }
    if (words[words.length - 1] == "And" || words[words.length - 1] == "and") {
      var stuff = acronym.split("");
      stuff[stuff.length - 1] = stuff[stuff.length - 1].toUpperCase();
      acronym = stuff.join("");
    }
    for (var i = 0; i < acronymList.length; i ++) {
      if ("To"+acronymList[i] == acronym) {
        $("#acronym-taken").css("color", "red").text("Sorry, "+acronym+" has already been taken!").show();
        break;
      } else {
        $("#acronym-taken").css("color", "green").text(acronym+" is available!").show();
      }
    }
  });

  // generate an acronym
  $("#acronym-create").click(function() {
    var length = $("#acronym-length").val();
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var str = "To";
    for (var i = 0; i < length; i ++) {
      str += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
      $("#acronym-generate").val(str);
    }
    for (var j = 0; j < acronymList.length; j ++) {
      if ("To"+acronymList[j] == str) {
        console.log("FUCK");
        $("#acronym-create").trigger("click");
      }
    }
  });

  // allow only letters in the "acronym check" input
  $("#acronym").keydown(function (e) {
    if (e.altKey) {
      e.preventDefault();
    } else {
      var key = e.keyCode;
      if (!((key == 8) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
        e.preventDefault();
      }
    }
  });
});
