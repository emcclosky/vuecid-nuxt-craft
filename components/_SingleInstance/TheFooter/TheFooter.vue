<script>
import CookieLaw from 'vue-cookie-law'

export default {
  name: 'TheFooter',
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
  <footer class="TheFooter">
    <div class="TheFooter__content">
      Created by
      <a href="https://www.wearelucid.ch" target="_blank" rel="noopener">
        Lucid
      </a>
      &nbsp;&nbsp;/&nbsp;&nbsp; Fork on
      <a
        href="https://github.com/wearelucid/vuecid-nuxt"
        target="_blank"
        rel="noopener"
      >
        GitHub
      </a>
    </div>
    <no-ssr>
      <CookieLaw theme="default-theme"
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
    </no-ssr>
  </footer>
</template>

<style src="./TheFooter.scss" lang="scss" />
