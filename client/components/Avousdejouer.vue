<template>
  <div>
    <body class="AVDJ">
      <p class="titre">A Vous de Jouer</p>

      <br /><br /><br /><br />

      <div class="form">
        <select name="CPU" id="CPU">
          <option value="">Saisir votre marque de CPU</option>
          <option value="Intel">Intel</option>
          <option value="AMD">AMD</option>
        </select>

        <select name="GPU" id="GPU">
          <option value="">Saisir votre marque de GPU</option>
          <option value="Nvidia">Nvidia</option>
          <option value="AMD">AMD</option>
        </select>

        <select name="ram" id="ram">
          <option value="">Saisir votre RAM</option>
          <option value="4 Go">4 Go</option>
          <option value="8 Go">8 Go</option>
          <option value="16 Go">16 Go</option>
          <option value="32 Go">32 Go</option>
          <option value="64 Go">64 Go</option>
        </select>

        <select name="refroidissement" id="refroidissement">
          <option value="">Choisissez un refroidissement</option>
          <option value="aircooling">aircooling</option>
          <option value="watercooling">watercooling</option>
        </select>

        <select name="stockage" id="stockage">
          <option value="">Choisissez un format de stockage</option>
          <option value="HDD">HDD</option>
          <option value="SSD">SSD</option>
        </select>

        <select name="alim" id="alim">
          <option value="">Choisissez une alimentation</option>
          <option value="250 W">250 W</option>
          <option value="450 W">450 W</option>
          <option value="500 W">500 W</option>
          <option value="550 W">550 W</option>
          <option value="750 W">750 W</option>
          <option value="1000 W">1000 W</option>
        </select>
      </div>
      <br /><br />
      <button id="button1" type="submit" onclick="addline()">Ajouter</button>

      <br /><br /><br /><br />
      <table cellpadding="15" id="table" class="case">
        <caption>
          Votre ordinateur :
        </caption>
        <tr>
          <td>CPU</td>
          <td>GPU</td>
          <td>RAM</td>
          <td>Refroidissement</td>
          <br />
          <td>Stockage</td>
          <td>Alimentation</td>
        </tr>
      </table>

      <br /><br /><br /><br /><br /><br />
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
    </body>
  </div>
</template>

<script>
function addline() {
  var CPU = document.getElementById("CPU").value;
  var GPU = document.getElementById("GPU").value;
  var ram = document.getElementById("ram").value;
  var stockage = document.getElementById("stockage").value;
  var refroidissement = document.getElementById("refroidissement").value;
  var alim = document.getElementById("alim").value;
  var tableau = document.getElementById("table");
  var newRow = tableau.insertRow(-1);

  var cel1 = newRow.insertCell(0);
  var cel2 = newRow.insertCell(1);
  var cel3 = newRow.insertCell(2);
  var cel4 = newRow.insertCell(3);
  var cel5 = newRow.insertCell(4);
  var cel6 = newRow.insertCell(5);

  cel1.innerText = CPU;
  cel2.innerText = GPU;
  cel3.innerText = ram;
  cel4.innerText = refroidissement;
  cel5.innerText = stockage;
  cel6.innerText = alim;
}
</script>