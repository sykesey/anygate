


window.anygateConfig = {
  startElement : 'startbutton',
  audioElement : 'cadence',
  resetTime : 5000,
  loop: false,
  loopTime: 60,
};
window.gateStarted = false;
window.stopwatchRT1 = null;
window.stopwatchRT4 = null;

function StartCadence()
{
  if (window.gateStarted == false) {
    LoopSettingChange(document.getElementById("cbLoop").checked);
    LoopTimeChange(document.getElementById("selLoop").value);
    window.gateStarted = true;
    document.getElementById(window.anygateConfig.startElement).disabled = true;
    
    
    document.getElementById(window.anygateConfig.audioElement).onplay = function (e) {
      Log("OK riders...");
      $('#stopwatchResult').html("");
      var delay = Math.round( 5629 + ( Math.random() * 2600 ) );
      window.setTimeout(GateTone,delay);
      window.setTimeout(PauseAudio,5579);
      window.setTimeout(function(){ Log("Wait for it...") },5529);
      document.getElementById(window.anygateConfig.audioElement).onplay = null;
    };
    document.getElementById(window.anygateConfig.audioElement).play();
  }
}

function GateTone() {
    //document.getElementById('cadence').src = "asset/cadence_tones.mp3";
    document.getElementById(window.anygateConfig.audioElement).currentTime = 7.126;
    document.getElementById(window.anygateConfig.audioElement).play();
    RandomSnappage();
    InitRT1Stopwatch();
    Light1();
    window.setTimeout(Light2,120);
    window.setTimeout(Light3,240);
    window.setTimeout(Light4,360);
    window.setTimeout(GateUp, 4500);
    if (window.anygateConfig.loop == true) {
        console.log("Setting loop...");
        LoopCountdown( parseInt(window.anygateConfig.loopTime) );
        window.setTimeout(StartCadence, window.anygateConfig.loopTime * 1000 );
    }
}
function PauseAudio() {
    document.getElementById(window.anygateConfig.audioElement).pause();
}
function Light1()
{
    $('#gate_color1').addClass('red');
}
function Light2()
{
    $('#gate_color2').addClass('amber');
}
function Light3()
{
    $('#gate_color3').addClass('amber');
}
function Light4()
{
    $('#gate_color4').addClass('green');
    InitRT4Stopwatch();
    
}
function ResetLights() {
  $('#gate_color1').removeClass('red');
  $('#gate_color2').removeClass('amber');
  $('#gate_color3').removeClass('amber');
  $('#gate_color4').removeClass('green');
}

function GateUp()
{
    if (window.anygateConfig.loop == false) {
      document.getElementById(window.anygateConfig.startElement).disabled = false;
    }
    document.getElementById(window.anygateConfig.audioElement).currentTime = 0;
    Log("Gate up!");
   // document.getElementById('cadence').src = "asset/cadence_prep.mp3";
    ResetLights();
    ResetRTStopwatch();
    window.gateStarted = false;
}

function RandomSnappage() {
   var stuff = Array("NOM NOM NOM", "BAM", "LIKE YOU STOLE IT", "NICE GATE");
   Log( stuff[ Math.floor(Math.random() * stuff.length) ] );
}

function Log(string) {
    $('#log').html(string);
}

function LoopSettingChange(value)
{
  window.anygateConfig.loop = value;
  console.log("Setting loop to " + value);
}
function LoopTimeChange(value)
{
  window.anygateConfig.loopTime = value;
  
  console.log("Setting loop time to " + value);
}

function LoopCountdown(time)
{
  time = parseInt(time);
  if (time > 0) {
    $('#loopCountdown').html("Next gate in " + time + " seconds...");
    window.setTimeout(function() { LoopCountdown( Math.round(time - 1) ) } , 1000);
  }
  else
  {
    $('#loopCountdown').html('');
  }
}
function ResetRTStopwatch()
{
  window.stopwatchRT1 = null;
  window.stopwatchRT4 = null;
  document.body.onkeyup = null;
  document.body.onmousedown = null;
  
}

function InitRT1Stopwatch()
{
  window.stopwatchRT1 = new Stopwatch();
  window.stopwatchRT1.start();
   document.body.onkeyup = function (e) {
    CalcRTStopwatch();
  };
  document.body.onmousedown = function(e) {
    CalcRTStopwatch();
  };
  //IOS devices....
  $('body').bind( "touchstart", function(e){
        CalcRTStopwatch();
  });
}

function InitRT4Stopwatch() {
 // window.stopwatchRT4 = new Stopwatch();
 // window.stopwatchRT4.start();
 
}

function CalcRTStopwatch() {
  document.body.onkeyup = null;
  document.body.onmousedown = null;
  //IOS devices
  $('body').unbind( "touchstart");
  
  window.stopwatchRT1.stop();
  //window.stopwatchRT4.stop();
  
  var from1 = window.stopwatchRT1.getElapsed().seconds * 1000 + window.stopwatchRT1.getElapsed().milliseconds;
  //var from4 = window.stopwatchRT4.getElapsed().seconds * 1000 + window.stopwatchRT4.getElapsed().milliseconds;
  
  var text = "RT from 1st light: " + from1 + " msec ";
  
  $('#stopwatchResult').html(text);
  
}