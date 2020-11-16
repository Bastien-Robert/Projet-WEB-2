<template>
  <div>
    <body class="AVDJ">
      <p class="titre">A Vous de Jouer</p>
      <br /><br /><br /><br />

      <div class="form">
        <select name="CPU" id="CPU" v-model="newOrdi.cpu">
          <option value="">Saisir le nom de votre CPU</option>
          <option v-for="composant in composants" :key="composant.id" :value="composant.nom" v-show="IsTypeOf('CPU', composant.type)">
              {{composant.nom}}
          </option>
        </select>

        <select name="GPU" id="GPU" v-model="newOrdi.gpu">
          <option value="">Saisir le nom de votre GPU</option>
          <option v-for="composant in composants" :key="composant.id" :value="composant.nom" v-show="IsTypeOf('GPU', composant.type)">
              {{composant.nom}}
          </option>
        </select>

        <select name="ram" id="ram" v-model="newOrdi.ram">
          <option value="">Saisir votre RAM</option>
          <option v-for="composant in composants" :key="composant.id" :value="composant.nom" v-show="IsTypeOf('RAM', composant.type)">
              {{composant.nom}}
          </option>
        </select>

        <select name="refroidissement" id="refroidissement" v-model="newOrdi.refroidissement">
          <option value="">Choisissez un refroidissement</option>
          <option v-for="composant in composants" :key="composant.id" :value="composant.nom" v-show="IsTypeOf('Refroidissement', composant.type)">
              {{composant.nom}}
          </option>
        </select>

        <select name="stockage" id="stockage" v-model="newOrdi.stockage">
          <option value="">Choisissez un format de stockage</option>
          <option v-for="composant in composants" :key="composant.id" :value="composant.nom" v-show="IsTypeOf('Stockage', composant.type)">
              {{composant.nom}}
          </option>
        </select>

        <select name="alim" id="alim" v-model="newOrdi.alimentation">
          <option value="">Choisissez une alimentation</option>
          <option v-for="composant in composants" :key="composant.id" :value="composant.nom" v-show="IsTypeOf('Alimentation', composant.type)">
              {{composant.nom}}
          </option>
        </select>
      </div>
      <br /><br />
      <button class="button1" type="submit" @click="addOrdi()">Ajouter</button>

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
          <td>Stockage</td>
          <td>Alimentation</td>
        </tr>
        <tr v-for="ordinateur in ordinateurs" :key="ordinateur.id">
          <td>{{ordinateur.cpu}}</td>
          <td>GPU</td>
          <td>RAM</td>
          <td>Refroidissement</td>
          <td>Stockage</td>
          <td>Alimentation</td>
        </tr>
      </table>

      <br /><br /><br /><br /><br /><br />
    </body>
  </div>
</template>

<script>
module.exports ={
    props: {
    composants: { type: Array, default: [] },
    ordinateurs: { type: Array, default: [] }
  },
  data(){
    return{
      newOrdi:{
        cpu: "",
        gpu: "",
        refroidissement: "",
        stockage: "",
        ram: "",
        alimentation: ""
      }
    }
  },
  methods:{
  addline() {
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
  },
  addOrdi(){
    this.$emit('add-ordi', this.newOrdi)
  },

  IsTypeOf(of_type, composantType){
    if ((of_type==composantType)||(of_type=="")){
        return true;
      }
      else{
        return false;
      }

  }
}
}



</script>