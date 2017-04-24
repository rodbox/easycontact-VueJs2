<template>
  <div id="contacts" class="container contacts pb-5" style="margin-top:5rem;" >
    <h1 class="text-center mb-2" style="font-weight: 700;">Easy Contact</h1>
    <div class="row mt-3 mb-3">
      <div class="col-8 p-0">
        <input type="text" v-model="search" class="form-control form-control-lg">
      </div>
      <div class="col-3 pl-2 pr-1">
        <modal-button id="contact-edit" title="Créer un contact" class="btn btn-success btn-block btn-lg"><i class="fa fa-plus fa-fw "></i> Créer</modal-button>
      </div>
      <div class="col-1 p-0">
        <span @click="newContact">
          <button @click.prevent="setContacts" class="btn btn-success btn-lg btn-block"><i class="fa fa-refresh"></i></button>
        </span>
      </div>
    </div>
    <modal id="contact-edit">
      <form @submit.prevent="saveContact()">
        <div class="text-right" v-if="contacteditaction === 'update'">
          <a href="#" class="btn btn-danger btn-sm " @click="delContact"><i class="fa fa-remove"></i> {{'action.remove' | trans}}</a>
        </div>
        <div class="form-group">
          <label for="firstname">{{'label.firstname' | trans}}</label>
          <input id="firsname" type="text" class="form-control" v-model="contactedit.firstname">
        </div>
        <div class="form-group">
          <label for="lastname">{{'label.lastname' | trans}}</label>
          <input id="lastname" type="text" class="form-control" v-model="contactedit.lastname">
        </div>
        <div class="form-group">
          <label for="phone">{{'label.phone' | trans}}</label>
          <input id="phone" type="text" class="form-control" maxlength="11" v-model.number="contactedit.phone">
        </div>
        <hr>
        <button type="submit" class="btn btn-success btn-block">{{'action.' + contacteditaction|trans}}</button>
      </form>
    </modal>
    <div class="row">
    <div v-for="contact in filterList(contacts)" class="col-4 p-0">
      <contact-card :contact="contact"></contact-card>
    </div>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'
  import ContactCard from './ContactCard'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Contacts',
    components: { ContactCard },
    data () {
      return {
        search: ''
      }
    },
    computed: {
      ...mapGetters('contactModule', ['contactedit', 'contacts', 'contacteditaction'])
    },
    methods: {
      ...mapActions(['addUi']),
      ...mapActions('contactModule', ['setContacts', 'newContact', 'saveContact', 'delContact']),
      filterList (contacts) {
        let reg = ''
        let regexp = '[a-zA-Z0-9]{0,}'
        let search = this.search
        if (search.length > 2) {
          for (let i = 0; i < search.length; i++) reg = reg + search[i] + '{1}(' + regexp + ')'
          let filtred = _.filter(contacts, (item) => {
            let value = item.lastname + item.firstname
            let r = value.match(new RegExp(reg, 'i'))
            return _.isArray(r)
          })
          return _.sortBy(filtred, ['lastname'])
        } else {
          return _.sortBy(contacts, ['lastname'])
        }
      }
    },
    mounted () {
      this.setContacts()
    }
  }
</script>
<style lang="less">
</style>