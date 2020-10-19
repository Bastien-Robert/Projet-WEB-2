function addline(){


    var CPU= document.getElementById('CPU').value;
    var GPU= document.getElementById('GPU').value;
    var ram= document.getElementById('ram').value;
    var stockage= document.getElementById('stockage').value;
    var refroidissement= document.getElementById('refroidissement').value;
    var alim= document.getElementById('alim').value;
    var tableau= document.getElementById('table');
    var newRow= tableau.insertRow(-1);

    var cel1 = newRow.insertCell(0);
    var cel2 = newRow.insertCell(1);
    var cel3 = newRow.insertCell(2);
    var cel4 = newRow.insertCell(3);
    var cel5 = newRow.insertCell(4);
    var cel6 = newRow.insertCell(5);

    cel1.innerText= CPU;
    cel2.innerText= GPU;
    cel3.innerText= ram;
    cel4.innerText= refroidissement;
    cel5.innerText= stockage;
    cel6.innerText= alim;

}

function toggleMute() {

  var video=document.getElementById("videoId");

  if(video.muted){
    video.muted = false;
  } else {
    debugger;
    video.muted = true;
    video.play()
  }

}

$(document).ready(function(){
  setTimeout(toggleMute,3000);
})