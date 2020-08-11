<script>
export default {
  name: 'Styleguide',
}
</script>

<template>
  <div>
    <BHeading :level="6" class="Styleguide__heading">// Headings</BHeading>
    <h1>Heading Level 1</h1>
    <h2>Heading Level 2</h2>
    <h3>Heading Level 3</h3>
    <h4>Heading Level 4</h4>
    <h5>Heading Level 5</h5>
    <h6>Heading Level 6</h6>

    <BHeading :level="6" class="Styleguide__heading">// Paragraphs</BHeading>
    <p>
      A paragraph. Lorem ipsum dolor amet quinoa banjo keytar, truffaut swag air
      plant waistcoat ugh tumblr YOLO distillery hashtag literally art party.
      90's tumeric letterpress banjo 8-bit. Narwhal intelligentsia man braid,
      succulents hashtag gluten-free four loko whatever pabst mustache salvia
      literally selfies next level. Venmo polaroid godard letterpress, master
      cleanse roof party squid knausgaard tumblr. Twee meggings hot chicken palo
      santo migas 90's wayfarers celiac street art ramps vegan.
    </p>
    <p>
      Single-origin coffee microdosing tote bag squid, pour-over vegan readymade
      master cleanse vexillologist. Mustache single-origin coffee blog,
      live-edge normcore +1 farm-to-table chillwave iPhone slow-carb echo park
      VHS glossier. Fixie raw denim brooklyn letterpress. Kogi hella schlitz,
      sartorial chambray listicle trust fund keffiyeh.
    </p>

    <BHeading :level="6" class="Styleguide__heading">// Lists</BHeading>
    <ul>
      <li>Some</li>
      <li>List</li>
      <li>Items</li>
    </ul>
  </div>
</template>

<style src="./Styleguide.scss" lang="scss" />
