<template>
  <div>
    <video
      class="video"
      fullscreen
      width="1920"
      height="1080"
      loop
      autoplay
      muted
      id="VideoId"
    >
      <source src="pc_showcase.mp4" type="video/mp4"/>
    </video>
    <br /><br />
    <div class="titre_index">Bienvenue sur le site L'intérieur des PC</div>

    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<script>
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
</script>