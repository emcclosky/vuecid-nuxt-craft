# All about SCSS Guidelines and our mixins
To write consistent scss-code `sass-lint` does the work for us and lints all our scss files. 
To get this to work use an editor which supports sass-linting and make sure your project includes the `sass-lint` npm package.

### Mixins/Functions
Mixins and functions should always be written in hyphenated lowercase. No uppercase characters, no underscores.

_Bad_
``` scss
@mixin myMixin ()
@mixin my_mixin ()
```
_Good_
``` scss
@mixin my-mixin ()
```

### Variables
Variables should always be written in hyphenated lowercase. No uppercase characters, no underscores.

_Bad_
``` scss
$myVar: xx;
$my_Var: xx;
$my_var: xx;
$Myvar: xx;
$myvar--double-dash: xx;
```
_Good_
``` scss
$c-my-component-var
$s-my-settingss-var
$from
$to
```

### Selectors
Most important is our selector naming convention. We follow the [BEM](http://getbem.com/) **B** lock **E** lement **M** odifier methodology.

Our _Block_ is always the vue components name, written in PascalCase.
`MyComponent`
An element is always written in hyphenated lowercase starting with two underscroes:
`__item-longer-name`
A modifier is always written in hyphenated lowercase starting with two dashes:
`--modifier-name`

### Nesting components > Classnames
When using a component inside another component which requires specific styling it would be best to add a modifier (like `--custom-styling` below) to the nested component and style it within the component. To indicate nested components, always add a class expressing this:
```
<div class="MyWrappingComponent">
  <div class="MyWrappingComponent__other-element"
    <MyNestedComponent class="MyWrappingComponent__MyNestedComponent MyNestedComponent__other-selector"/>
  </div>
</div>
```

If this is not feasible use the added class `MyWrappingComponent__MyNestedComponent` to style it in the wrapping components scss:

``` scss
$c: 'MyWrappingComponent';

.#{$c} {
  &__other-selector {
    &.#{$c}__MyNestedComponent {
      // extra styling here
    }
  }
}
```  
  
This is necessary because of specificity. Sometimes styling `MyWrappingComponent__MyNestedComponent {}` would not override the `MyNestedComponent`s rules.


### Sass Linting
The linter tries to check these rules but unfortunately it cannot lint nested scss-rules.

Therefore
```
.Component {
  &__itemName {
  }
}
```
will evaluate correctly, although we don't allow camelCase in css-selectors except for the first part (component name). So please just make sure to follow the rules above.

#### Sass Linting rules
To change the sass linter rules edit the `scss-lint.yml` file (which has no effect) and after editing convert to a `sass-lint.yml` file using this [Sasstools-Converter](https://sasstools.github.io/make-sass-lint-config/).

### Important mixins

#### set-gutter()
It would be tempting to define page-gutter, max-width and padding on the layout or main content wrapper. But in most cases the page will include some full-width components (like a big header-image, or a full-width gallery). That's why we decided to set the gutter on the component itself.
For this use the mixin `set-gutter('size')`.
Check the [_tools.mixins.scss](https://github.com/wearelucid/vuecid-nuxt/blob/master/assets/css/_tools.mixins.scss) file for more information.
One size should be defined for texts (paragraph) to guarantee good typography. (We don't want more than 50-70 characters per line!) This size is calculated from the standard font-size and is currently use by `set-gutter('small')`.

#### Resets
There are a couple of useful reset-mixins.

#### ARIA Tab focus
To make your page tab accessible use the mixin `hocus-focus()`.

#### Fluid sizes
This can be very handy, if you don't want to provide responsive layouts but you don't want to define endless breakpoints.
Use the mixin `fluid-size` to get an ongoing size adaptation following the screens width and setting a min and max size.

