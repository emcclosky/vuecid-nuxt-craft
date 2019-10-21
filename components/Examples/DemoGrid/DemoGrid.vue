<script>
import GridOverlay from '~/components/Examples/GridOverlay/GridOverlay.vue'

export default {
  name: 'DemoGrid',
  components: {
    GridOverlay
  }
}
</script>

<template>
  <div class="DemoGrid">
    <p>
      If you have susy installed try pressing:<br />
      <code>Ctrl + G</code>.<br />This should show a grid-overlay. You can use
      this by adding the component:<br />
      <code>/Examples/GridOverlay</code>
    </p>
    <GridOverlay />
    <p>
      If <a href="https://github.com/oddbird/susy">Susy</a> is installed you
      should see a proper grid layout. If not you see all colored rectangles in
      one line...
    </p>
    <div class="DemoGrid__box DemoGrid__box--three-one">
      <span class="DemoGrid__label DemoGrid__label--mobile">3/12</span>
      <span class="DemoGrid__label DemoGrid__label--desk">1/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--three-one">
      <span class="DemoGrid__label DemoGrid__label--mobile">3/12</span>
      <span class="DemoGrid__label DemoGrid__label--desk">1/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--three-one">
      <span class="DemoGrid__label DemoGrid__label--mobile">3/12</span>
      <span class="DemoGrid__label DemoGrid__label--desk">1/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--three-one">
      <span class="DemoGrid__label DemoGrid__label--mobile">3/12</span>
      <span class="DemoGrid__label DemoGrid__label--desk">1/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--six-one">
      <span class="DemoGrid__label DemoGrid__label--mobile">6/12</span>
      <span class="DemoGrid__label DemoGrid__label--desk">1/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--six-one">
      <span class="DemoGrid__label DemoGrid__label--mobile">6/12</span>
      <span class="DemoGrid__label DemoGrid__label--desk">1/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--four-one">
      <span class="DemoGrid__label DemoGrid__label--mobile">4/12</span>
      <span class="DemoGrid__label DemoGrid__label--desk">1/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--four-one">
      <span class="DemoGrid__label DemoGrid__label--mobile">4/12</span>
      <span class="DemoGrid__label DemoGrid__label--desk">1/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--four-one">
      <span class="DemoGrid__label DemoGrid__label--mobile">4/12</span>
      <span class="DemoGrid__label DemoGrid__label--desk">1/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--four-one">
      <span class="DemoGrid__label DemoGrid__label--mobile">4/12</span>
      <span class="DemoGrid__label DemoGrid__label--desk">1/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--four-one">
      <span class="DemoGrid__label DemoGrid__label--mobile">4/12</span>
      <span class="DemoGrid__label DemoGrid__label--desk">1/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--four-one">
      <span class="DemoGrid__label DemoGrid__label--mobile">4/12</span>
      <span class="DemoGrid__label DemoGrid__label--desk">1/12</span>
    </div>

    <div class="DemoGrid__box">
      <span class="DemoGrid__label">12/12</span>
    </div>

    <div class="DemoGrid__box DemoGrid__box--eleven">
      <span class="DemoGrid__label">11/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--one">
      <span class="DemoGrid__label">1/12</span>
    </div>

    <div class="DemoGrid__box DemoGrid__box--ten">
      <span class="DemoGrid__label">10/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--two">
      <span class="DemoGrid__label">2/12</span>
    </div>

    <div class="DemoGrid__box DemoGrid__box--nine">
      <span class="DemoGrid__label">9/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--three">
      <span class="DemoGrid__label">3/12</span>
    </div>

    <div class="DemoGrid__box DemoGrid__box--eight">
      <span class="DemoGrid__label">8/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--four">
      <span class="DemoGrid__label">4/12</span>
    </div>

    <div class="DemoGrid__box DemoGrid__box--seven">
      <span class="DemoGrid__label">7/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--five">
      <span class="DemoGrid__label">5/12</span>
    </div>

    <div class="DemoGrid__box DemoGrid__box--six">
      <span class="DemoGrid__label">6/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--six">
      <span class="DemoGrid__label">6/12</span>
    </div>

    <div class="DemoGrid__box DemoGrid__box--five">
      <span class="DemoGrid__label">5/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--seven">
      <span class="DemoGrid__label">7/12</span>
    </div>

    <div class="DemoGrid__box DemoGrid__box--four">
      <span class="DemoGrid__label">4/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--eight">
      <span class="DemoGrid__label">8/12</span>
    </div>

    <div class="DemoGrid__box DemoGrid__box--three">
      <span class="DemoGrid__label">3/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--nine">
      <span class="DemoGrid__label">9/12</span>
    </div>

    <div class="DemoGrid__box DemoGrid__box--two">
      <span class="DemoGrid__label">2/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--ten">
      <span class="DemoGrid__label">10/12</span>
    </div>

    <div class="DemoGrid__box DemoGrid__box--one">
      <span class="DemoGrid__label">1/12</span>
    </div>
    <div class="DemoGrid__box DemoGrid__box--eleven">
      <span class="DemoGrid__label">11/12</span>
    </div>
  </div>
</template>

<style src="./DemoGrid.scss" lang="scss" />
