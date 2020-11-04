const Home = window.httpVueLoader('./components/Home.vue')
const Connexion = window.httpVueLoader('./components/Connexion.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Avousdejouer = window.httpVueLoader('./components/Avousdejouer.vue')
const Boutique = window.httpVueLoader('./components/Boutique.vue')
const Composants = window.httpVueLoader('./components/Composants.vue')
const Quisommesnous = window.httpVueLoader('./components/Quisommesnous.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/connexion', component: Connexion },
  { path: '/register', component: Register },
  { path: '/composants', component: Composants},
  { path: '/boutique', component: Boutique },
  { path: '/avousdejouer', component: Avousdejouer },
  { path: '/quisommesnous', component: Quisommesnous },
]

const router = new VueRouter({
  routes
})

var app= new Vue({
    router,
    el: '#app',
    methods:{
        async save(email, password){
          const res = await axios.post('/api/register',{email:email, password:password})
          window.location.href="#/"
        },
    
        async logUser(email, password){
          try {
            const res = await axios.post('/api/connexion',{email:email, password:password})
            window.location.href="#/"
    
          } catch (error) {
            alert("identifiants incorrects")
          }      
        }
    }
})

