$(document).ready(function(){var r=["AST","A","M","K","H","KY","S","SP","R","IE","TS","TT","G","JGF","V","II","TC","IS","DE","OH","CH","T","SD","DD","FaF","TF","ES","DC","FT","IC","DS","AT","F","WER","SI","WH","LD","D","C","SH","GG","L","E","TM","DaD","LL","HF","NP","CN","I","NV","GKD","RS","DM","OC","FF","TH","EA","FO","GaH","FN","FJ","EP","RR","TI","IaOS","ADF","ISC","DR","N","SM","IM","RB","FL","CC","DA","OOO","NGUE","NED","U","YV","EH","TB","ER","SSS","NBA","VA","AA","ITI","III","US","MT","VE","SO","EI","GF","GO","QT","BBB","PP","BT","HA","FaCT","CA","BK","NS","AM","CR","CP","AB","PHaT","AD","HS","P","MH","CO","YS","WEL","AV","UT","RNI","ED","Z","TL","CI","TTT","B","SA","GLA","TA","UD","DaC","SaS","PF","TT","EE","AZ","GD","O","DT","IA","SFU","OD","BB","COF","CCC","X","MA","DH","RCH","CaS","IO","MC","QC","CaUP","HH","FSC","AC","UID","FaST","OSE","WW","ET","PC","MIM","FG","SS","DDD","TV","IF","AAA","ST","SSSS","BS","FV","StS","UE","HK","GT","AO","HE","BaBT","ZA","PZ","AR","AH","HCF","YM","RP","UA","HG","DB"];$("#acronym-taken").hide(),$('input[type="number"]').keydown(function(a){a.preventDefault()}),$("#acronym-find").click(function(){var a=$("#acronym").val();""==a&&$("#acronym-taken").hide();for(var n,e=a.split(" "),o="To"+a.match(/\b(\w)/g).join("").toUpperCase(),t=0;t<e.length;t++)"And"!=e[t]&&"and"!=e[t]||((n=o.split(""))[t+2]="a",o=n.join(""));"And"!=e[0]&&"and"!=e[0]||((n=o.split(""))[2]=n[2].toUpperCase(),o=n.join("")),"And"!=e[e.length-1]&&"and"!=e[e.length-1]||((n=o.split(""))[n.length-1]=n[n.length-1].toUpperCase(),o=n.join(""));for(t=0;t<r.length;t++){if("To"+r[t]==o){$("#acronym-taken").css("color","red").text("Sorry, "+o+" has already been taken!").show();break}$("#acronym-taken").css("color","green").text(o+" is available!").show()}}),$("#acronym-create").click(function(){for(var a=$("#acronym-length").val(),n="ABCDEFGHIJKLMNOPQRSTUVWXYZ",e="To",o=0;o<a;o++)e+=n.charAt(Math.floor(Math.random()*n.length)),$("#acronym-generate").val(e);for(var t=0;t<r.length;t++)"To"+r[t]==e&&(console.log("FUCK"),$("#acronym-create").trigger("click"))}),$("#acronym").keydown(function(a){var n;!a.altKey&&(8==(n=a.keyCode)||32==n||46==n||35<=n&&n<=40||65<=n&&n<=90)||a.preventDefault()})});