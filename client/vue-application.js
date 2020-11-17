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
    { path: '/composants', component: Composants },
    { path: '/boutique', component: Boutique },
    { path: '/avousdejouer', component: Avousdejouer },
    { path: '/quisommesnous', component: Quisommesnous }
]

const router = new VueRouter({
    routes
})

var app = new Vue({
    router,
    el: '#app',
    data: {
        composants: [],
        ordinateurs: []
    },
    async mounted() {
        axios.get('/api/composant').then(res =>this.composants = res.data)
        axios.get('/api/Avousdejouer').then(res =>this.ordinateurs = res.data)
    },
    methods: {
        async save(email, password) {
            const res = await axios.post('/api/register', { email: email, password: password })
            window.location.href = "#/"
        },
        async logUser(email, password) {
            try {
                const res = await axios.post('/api/connexion', { email: email, password: password })
                axios.get('/api/Avousdejouer').then(res =>this.ordinateurs = res.data)
                window.location.href = "#/"

            } catch (error) {
                alert("identifiants incorrects")
            }
            const res1 = await axios.get('/api/composant')
            this.composants = res1.data
        },
        async addComposant(composant) {
            const res = await axios.post('/api/composant', composant)
            this.composants.push(res.data)
        },
        async deleteComposant(composantid) {
            const res = await axios.delete('/api/composant/' + composantid)
            let index = this.composants.findIndex(c => c.id === composantid)
            this.composants.splice(index, 1)
        },
        async addOrdi(ordi) {
            const res = await axios.post('/api/Avousdejouer', ordi)
            this.ordinateurs.push(res.data)
        }
    }
})