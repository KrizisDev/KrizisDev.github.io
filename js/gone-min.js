$(document).ready(function(){var e={unreality:new Howl({src:["../snd/gone/unreality.wav"]})},t=!1,n=void 0;$("img").on("click",function(){0==t&&(t=!0,$("title").text("DH&@*(!H(D&#&^TD!TDDDD^&^#D))"),$(".unreality").attr("src",""),$(".unrealityGif").css("opacity","100"),$(".unrealityBG").css("opacity","100"),setInterval(function(){var e=Math.floor(10*Math.random()+45),t=Math.floor(10*Math.random()+45);$(".glitch").css("transform","translate(-"+e+"%, -"+t+"%)")},50),e.unreality.play())}),n=setInterval(function(){1==t&&(clearInterval(n),setTimeout(function(){var e,t=document.body;(t=(e=t).requestFullScreen||e.webkitRequestFullScreen||e.mozRequestFullScreen||e.msRequestFullScreen)?t.call(e):void 0===window.ActiveXObject||null!==(e=new ActiveXObject("WScript.Shell"))&&e.SendKeys("{F11}")},75),setTimeout(function(){for($(".unrealityGif").trigger("pause"),$(".unrealityBG").trigger("pause");;)window.location.reload()},150))},1)});