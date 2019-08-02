<script>
/*
 * Mailchimp Newsletter Embed:
 * 1. Get your mailchimp subscription link:
 *    Login > Choose list > Signup Forms > Embedded Forms > Unstyled
 *    Copy link from action="" and paste into data variable
 *    Change 'post?u' to 'post-json?u' (https://stackoverflow.com/questions/8425701/ajax-mailchimp-signup-form-integration)
 * 2. Add your Mailchimp Input names in the JSON request. E.g. ['EMAIL' | 'LNAME' | 'FNAME']
 *    You find them in your malchimp account in the naked tab, where you can copy your code
 *    You can also define them in your Signup settings > List fields
 * 3. Add your input fields and use the matching validation rules:
 *    https://baianat.github.io/vee-validate/guide/rules.html
 * 4. Test your fields and customize success message and emails
 *    Mailchimp > Form Builder > Translate it
 */

// https://github.com/baianat/vee-validate/issues/1646

import Vue from 'vue'
import { mapGetters } from 'vuex'
import VueJsonp from 'vue-jsonp'
import VeeValidate, { Validator } from 'vee-validate'

// TODO: Import validation messages for the required languages
import validationMessagesDe from 'vee-validate/dist/locale/de'
import validationMessagesEn from 'vee-validate/dist/locale/en'
import validationMessagesFr from 'vee-validate/dist/locale/fr'

Vue.use(VueJsonp)
Vue.use(VeeValidate, { locale: 'de' })

export default {
  name: 'NewsletterForm',
  data() {
    return {
      email: '',
      emailString: '',
      name: '',
      firstName: '',
      formSuccess: false,
      formMessage: '',
      loading: false,
      title: this.$t('ui.titleFemale'),
      emailFieldName: this.$t('ui.mail'),
      nameFieldName: this.$t('ui.name'),
      firstNameFieldName: this.$t('ui.firstName'),
      titleFieldName: this.$t('ui.salutation'),
      subscription_link: false
    }
  },
  computed: {
    ...mapGetters(['currentLang']),
    ...mapGetters('data', ['options'])
  },
  mounted() {
    // Prepare Mailchimp List URL
    if (this.options.localized.newsletter_list_url) {
      this.subscription_link = this.prepareSubscriptionURL(
        this.options.localized.newsletter_list_url
      )
    }

    // Localize validator
    // TODO: Remove or add required languages
    const locale = this.currentLang
    if (locale === 'en') {
      Validator.localize('en', validationMessagesEn)
    } else if (locale === 'fr') {
      Validator.localize('fr', validationMessagesFr)
    } else {
      Validator.localize('de', validationMessagesDe)
    }
  },
  methods: {
    prepareSubscriptionURL(list) {
      return list.replace('post?u', 'post-json?u')
    },
    sendData() {
      this.loading = true
      if (
        !this.errors.has(
          this.emailFieldName && this.nameFieldName && this.firstNameFieldName
        ) &&
        this.emailString.length &&
        this.firstName.length &&
        this.name.length
      ) {
        this.$jsonp(this.subscription_link, {
          // Add your Mailchimp Input names here
          EMAIL: this.emailString,
          TITLE: this.title,
          LNAME: this.name,
          FNAME: this.firstName,
          callbackQuery: 'c',
          callbackName: 'jsonpFunc'
        }).then(json => {
          this.loading = false
          if (json.result === 'success') {
            this.formSuccess = true
            this.formMessage = json.msg
          } else {
            this.formSuccess = false
            this.formMessage = json.msg || this.$t('error.problem')
          }
        })
      } else {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div v-if="subscription_link" class="NewsletterForm">
    <div class="NewsletterForm__form">
      <div v-if="!formMessage" class="NewsletterForm__form-fields">
        <div
          class="NewsletterForm__fieldset NewsletterForm__fieldset--radios"
          role="group"
        >
          <legend class="NewsletterForm__legend">
            {{ $t('ui.salutation') }}
          </legend>
          <div class="NewsletterForm__radio-wrap">
            <input
              id="radio-mrs"
              v-model="title"
              v-validate="'required'"
              class="NewsletterForm__radio"
              type="radio"
              :name="titleFieldName"
              :value="$t('ui.titleFemale')"
              checked
            />
            <label class="NewsletterForm__radio-label" for="radio-mrs">
              {{ $t('ui.titleFemale') }}
            </label>
          </div>
          <div class="NewsletterForm__radio-wrap">
            <input
              id="radio-mr"
              v-model="title"
              v-validate="'required'"
              class="NewsletterForm__radio"
              type="radio"
              :name="titleFieldName"
              :value="$t('ui.titleMale')"
            />
            <label class="NewsletterForm__radio-label" for="radio-mr">
              {{ $t('ui.titleMale') }}
            </label>
          </div>
        </div>

        <div
          v-if="errors.has(titleFieldName)"
          class="NewsletterForm__error-messages"
        >
          <p class="NewsletterForm__error">
            {{ errors.first(titleFieldName) }}
          </p>
        </div>

        <div class="NewsletterForm__form-fields-item">
          <label
            class="NewsletterForm__label NewsletterForm__label--desktop-only"
            :for="firstNameFieldName"
          >
            {{ firstNameFieldName }}
          </label>
          <input
            :id="firstNameFieldName"
            v-model="firstName"
            v-validate="'required|alpha_dash'"
            :class="[
              'NewsletterForm__input NewsletterForm__input--text',
              {
                'NewsletterForm__input--error': errors.has(firstNameFieldName),
                'has-content': firstName.length
              }
            ]"
            :name="firstNameFieldName"
            :placeholder="$t('ui.firstName')"
            type="text"
            :aria-label="$t('ui.nameAriaHint')"
          />
        </div>

        <div
          v-if="errors.has(firstNameFieldName)"
          class="NewsletterForm__error-messages"
        >
          <p class="NewsletterForm__error">
            {{ errors.first(firstNameFieldName) }}
          </p>
        </div>

        <div class="NewsletterForm__form-fields-item">
          <label
            class="NewsletterForm__label NewsletterForm__label--desktop-only"
            :for="nameFieldName"
          >
            {{ nameFieldName }}
          </label>
          <input
            :id="nameFieldName"
            v-model="name"
            v-validate="'required|alpha_dash'"
            :class="[
              'NewsletterForm__input NewsletterForm__input--text',
              {
                'NewsletterForm__input--error': errors.has(nameFieldName),
                'has-content': name.length
              }
            ]"
            :name="nameFieldName"
            :placeholder="$t('ui.name')"
            type="text"
            :aria-label="$t('ui.nameAriaHint')"
          />
        </div>

        <div
          v-if="errors.has(nameFieldName)"
          class="NewsletterForm__error-messages"
        >
          <p class="NewsletterForm__error">
            {{ errors.first(nameFieldName) }}
          </p>
        </div>

        <div class="NewsletterForm__form-fields-item">
          <label
            class="NewsletterForm__label NewsletterForm__label--desktop-only"
            :for="emailFieldName"
          >
            {{ emailFieldName }}
          </label>
          <input
            :id="emailFieldName"
            v-model="emailString"
            v-validate="'required|email'"
            :class="[
              'NewsletterForm__input',
              {
                'NewsletterForm__input--error': errors.has(emailFieldName),
                'has-content': emailString.length
              }
            ]"
            :name="emailFieldName"
            :placeholder="$t('ui.mail')"
            type="email"
            :aria-label="$t('ui.mailAriaHint')"
          />
        </div>

        <div
          v-if="errors.has(emailFieldName)"
          class="NewsletterForm__error-messages"
        >
          <p class="NewsletterForm__error">
            {{ errors.first(emailFieldName) }}
          </p>
        </div>

        <div
          class="NewsletterForm__form-fields-item NewsletterForm__form-fields-item--submit"
        >
          <!-- prettier-ignore-attribute -->
          <BBtn
            v-if="!loading"
            :disabled="errors.has(emailFieldName) || errors.has(nameFieldName) || formSuccess || !emailString.length || !name.length"
            :click="sendData"
            class="NewsletterForm__submit-button NewsletterForm__BBtn"
          >
            {{ $t('ui.subscribe') }}
          </BBtn>
          <img
            v-if="loading"
            class="NewsletterForm__Loader"
            src="~/static/media/icons/loader-circle.svg"
            alt="Loader Image"
          />
        </div>
      </div>

      <transition name="u-anim-fade">
        <div
          v-if="formMessage"
          :class="[
            'NewsletterForm__message-container',
            {
              'NewsletterForm__message-container--success': formSuccess,
              'NewsletterForm__message-container--error':
                !formSuccess && formMessage
            }
          ]"
        >
          <!-- vhtml is needed to properly display return message from Mailchimp -->
          <!-- eslint-disable-next-line -->
          <p class="NewsletterForm__message" v-html="formMessage" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style src="./NewsletterForm.scss" lang="scss" />
