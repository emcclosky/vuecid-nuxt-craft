<script>
import CookieLaw from 'vue-cookie-law'

export default {
  name: 'CookieBar',
  components: {
    CookieLaw
  },
  data: () => {
    return {
      cookieName: 'cookies-accepted'
    }
  },
  methods: {
    /*
     * Google Analytics/Google Tag Manager
     * Depending on what you use you need to do different things.
     * Use $ga.enable for analytics and trigger a gtm event if using GTM.
     */
    enableTracking() {
      // this.enableGoogleAnalytics()
      // this.enableGTM()
    },
    enableGoogleAnalytics() {
      // Google Analytics:
      if (!this.$ga) {
        console.warn('Google Analytics is not yet set up!') // eslint-disable-line
        return
      }
      this.$ga.enable()
      this.$ga.page(this.$router)
    },
    enableGTM() {
      // Google Tag Manager:
      if (!this.$gtm) {
        console.warn('Google Tag Manager is not yet set up!') // eslint-disable-line
        return
      }
      // because first page is not tracked we want to trigger an event as soon as the user accepts
      this.$gtm.pushEvent({
        event: 'nuxtRoute',
        pageType: 'PageView',
        pageUrl: this.$route.fullPath,
        routeName: this.$route.name
      })
    }
  }
}
</script>

<template>
  <div class="CookieBar">
    <client-only>
      <CookieLaw
        theme="default-theme"
        :storage-name="cookieName"
        storage-type="cookies"
        @accept="enableTracking()"
      >
        <div slot-scope="props" class="Cookie__content">
          <p class="Cookie__text">{{ $t('cookieLaw.message') }}</p>
          <div class="Cookie__buttons">
            <BBtn class="Cookie__button" @click.native="props.accept">
              {{ $t('cookieLaw.buttonText') }}
            </BBtn>
            <BBtn
              class="Cookie__button"
              href="https://cookiesandyou.com/"
              external
            >
              {{ $t('cookieLaw.buttonLinkText') }}
            </BBtn>
            <BBtn class="Cookie__button" @click.native="props.close">
              {{ $t('cookieLaw.buttonClose') }}
            </BBtn>
          </div>
        </div>
      </CookieLaw>
    </client-only>
  </div>
</template>

<style src="./CookieBar.scss" lang="scss" />
