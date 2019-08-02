<script>
import CookieLaw from 'vue-cookie-law'

export default {
  name: 'TheFooter',
  components: {
    CookieLaw
  },
  methods: {
    enableTracking() {
      this.$ga.enable()
      this.$ga.page(this.$router)
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
      <CookieLaw theme="default-theme" @accept="enableTracking()">
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
