


window.anygateConfig = {
  startElement : 'startbutton',
  audioElement : 'cadence',
  resetTime : 5000,
  loop: false,
  loopTime: 60,
};
window.gateStarted = false;

function StartCadence()
{
  if (window.gateStarted == false) {
    window.gateStarted = true;
    document.getElementById(window.anygateConfig.startElement).disabled = true;
    Log("OK riders...");
    document.getElementById(window.anygateConfig.audioElement).play();
    //calculate random number
    // cadence_prep is 5529 msec long
    // random gate cadence is 100 msec to 2700msec long
    // so generate a random number between 0 and 2600msec and add it to 5629msec
    var delay = Math.round( 5629 + ( Math.random() * 2600 ) );
    window.setTimeout(GateTone,delay);
    window.setTimeout(PauseAudio,5579);
    //tones is at 7126msec   
  }
}

function GateTone() {
    //document.getElementById('cadence').src = "asset/cadence_tones.mp3";
    document.getElementById(window.anygateConfig.audioElement).currentTime = 7.126;
    document.getElementById(window.anygateConfig.audioElement).play();
    Log("Gate drop!");
    GoGreen();
    window.setTimeout(GateUp, 5000);
    if (window.anygateConfig.loop == true) {
        console.log("Setting loop...");
        LoopCountdown( parseInt(window.anygateConfig.loopTime) );
        window.setTimeout(StartCadence, window.anygateConfig.loopTime * 1000 );
    }
}
function PauseAudio() {
    document.getElementById(window.anygateConfig.audioElement).pause();
}
function GoRed()
{
    $('#gate_color').addClass('red');
}
function GoGreen()
{
    $('#gate_color').addClass('green');
}

function GateUp()
{
    if (window.anygateConfig.loop == false) {
      document.getElementById(window.anygateConfig.startElement).disabled = false;
    }
    document.getElementById(window.anygateConfig.audioElement).currentTime = 0;
    Log("Gate up!");
   // document.getElementById('cadence').src = "asset/cadence_prep.mp3";
    $('#gate_color').removeClass('green');
    window.gateStarted = false;
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