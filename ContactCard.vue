<template>
 <div class="card contact-card m-1" @click="setContact(contact)">
  <img class="card-img-top" src="http://www.fillmurray.com/180/180" alt="Card image cap">
  <modal-button id="contact-edit" title="Contact" :subtitle="contact.firstname + ' ' + contact.lastname" class="btn btn-link btn-sm">
    <div class="card-block">
      <h5 class="card-title mb-0"><strong>{{contact.lastname}}</strong> {{contact.firstname}}</h5>
    </div>
  </modal-button>
  <ul class="list-group list-group-flush">
      <a :href="'tel:' + contact.phone" class="list-group-item text-muted pt-1 pb-1 pl-1" ><i class="fa fa-phone-square fa-fw" aria-hidden="true"></i> <span class="ml-1">{{contact.phone | phone}}</span> <span class="text-muted " style="font-size: .7rem; position: absolute; right: .5rem; top: 0.4rem"></span></a>
  </ul>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'ContactCard',
    props: {
      contact: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      ...mapGetters('contactModule', [])
    },
    methods: {
      ...mapActions('contactModule', ['delContact', 'setContact'])
    }
  }
</script>
<style lang="less">
.card.contact-card {
  background-color: #fff !important;
  h5{
    font-size: 1.1rem;
  }
}
</style>