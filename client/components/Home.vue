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
    <div class="entete" id="bas">
      <br /><br />
      <p class="crédit">
        "L'intérieur des PC" est un site créé par 3 étudiants de L2 à EFREI
        Paris à l'occasion d'un projet de programmation en 2020
      </p>
      <nav role="navigation" class="primary-navigation" id="bas">
        <ul>
          <li><a href="Quisommesnous.html">Qui sommes-nous</a></li>
        </ul>
      </nav>
    </div>
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