# EasyContact Compontents VueJs

Version Beta fonctionnel VueJs du front EasyContact en connextion avec ContactBundle
Voir la TODO pour les améliorations.

## Configuration

Ajouter le ContactModule dans le strore Vuex
vuex
`import { contactModule } from './components/Contact/ContactModule.js'`

vueResource
`Vue.http.options.root = '[URL_API]'
let customActions = {
  del: {method: 'DELETE', url: 'contact/del{/id}'},
  udp: {method: 'PUT', url: 'contact/upd{/id}'},
  add: {method: 'POST', url: 'contact/add'}
}
window.$contact = Vue.resource('contact{/id}', {}, customActions)`

vueRouter
`{
  name: 'contact',
  title: 'contact',
  path: '/contact',
  components: {
    default: require('./components/Contact/Contacts.vue')
  }
}`

Rajouter le filtre Phone
`Vue.filter('phone', (value) => {
  return value.substr(0, 2) + ' ' + value.substr(2, 2) + ' ' + value.substr(4, 2) + ' ' + value.substr(6, 2) + ' ' + value.substr(8, 2)
})`