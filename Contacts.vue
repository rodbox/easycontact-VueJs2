<template>
  <div id="contacts" class="container contacts pb-5" style="margin-top:5rem;" >
    <h1 class="text-center mb-2" style="font-weight: 700;">Easy Contact</h1>
    <button @click.prevent="setContacts" class="btn btn-success">Refresh</button>
    <span @click="newContact">
      <modal-button id="contact-edit" title="Créer un contact" class="btn btn-primary"><i class="fa fa-plus fa-fw "></i> Créer</modal-button>
    </span>
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
          <input id="phone" type="phone" class="form-control" v-model.number="contactedit.phone">
        </div>
        <hr>
        <button type="submit" class="btn btn-success btn-block">{{'action.' + contacteditaction|trans}}</button>
      </form>
    </modal>
    <div class="row">
    <div v-for="contact in contacts" class="col-4 p-0">
      <contact-card :contact="contact"></contact-card>
    </div>
    </div>
  </div>
</template>
<script>
  import ContactCard from './ContactCard'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Contacts',
    components: { ContactCard },
    computed: {
      ...mapGetters('contactModule', ['contactedit', 'contacts', 'contacteditaction'])
    },
    methods: {
      ...mapActions(['addUi']),
      ...mapActions('contactModule', ['setContacts', 'newContact', 'saveContact', 'delContact'])
    },
    mounted () {
      this.setContacts()
    }
  }
</script>
<style lang="less">
</style>