import $ from 'jquery'
import Vue from 'vue'
import { ls } from '../Core/localstorage.js'

const state = {
  contactedit: {
    firstname: '',
    lastname: '',
    phone: ''
  },
  contacteditaction: 'add',
  contacts: ls.get('contactModule.contacts', 'json', [])
}

const mutations = {
  SET_CONTACTS (state, contacts) {
    state.contacts = ls.set('contactModule.contacts', contacts)
  },
  SET_CONTACT_ACTION (state, contactsaction) {
    state.contacteditaction = contactsaction
  },
  SET_CONTACT (state, contact) {
    state.contactedit = contact
    state.contacteditaction = 'update'
  },
  SET_CONTACT_NEW (state) {
    state.contactedit = {
      firstname: '',
      lastname: '',
      phone: ''
    }
    state.contacteditaction = 'add'
  }
}

const getters = {
  contacts (state) { return state.contacts },
  contactedit (state) { return state.contactedit },
  contacteditaction (state) { return state.contacteditaction }
}

const actions = {
  setContacts ({state, commit, rootState}) {
    window.$contact.query().then((response) => {
      commit('SET_CONTACTS', response.data)
    })
  },
  newContact ({state, commit, rootState}) {
    commit('SET_CONTACT_NEW')
  },
  setContact ({state, commit, rootState}, contact) {
    commit('SET_CONTACT', contact)
  },
  delContact ({state, commit, dispatch}, contact) {
    /* eslint-disable  */
    if (confirm('Confirm')) {
      commit('SET_CONTACT_ACTION', 'del')
      dispatch('saveContact')
    }
  },
  saveContact ({state, commit, dispatch}) {
    let id = (state.contacteditaction === 'update' || state.contacteditaction === 'del') ? '/' + state.contactedit.id : ''
    $.ajax({
      url: Vue.http.options.root + '/contact/' + state.contacteditaction + id,
      data: {
        contact: state.contactedit
      },
      crossDomain: true,
      type: 'POST',
      dataType: 'JSON',
      success (json) {
        $('#contact-edit').modal('hide')
        dispatch('setContacts')
      }
    })
  }
}
/**
* TODO : Corriger l'insertion d'une fiche en utilisant vueResource
**/

/**
* TODO : Créer un champ de recherche par Nom et un filtre pour ordonné le resultat par ordre alphabétique
**/

/**
* TODO : Ajouter un systeme pour ajouter plusieur numéro a une fiche
**/

/**
* TODO : Ajouter un Loader global a vueResource
**/

/**
* TODO : Rajouter les prefixes internationaux
**/

/**
* TODO : Créer les autres filtres de presentations de numéro par trois avec l'indicatif...
**/
export const contactModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
