# NuxtChild
**[Nuxt child](https://nuxtjs.org/api/components-nuxt-child/) once and forever explained:**
```
-| pages/
---| _slug/ // directory to nest nuxt child
------| childslug.vue // Template file for child
------| index.vue // Fallback template file for missing childslug
---| _slug.vue // file with <NuxtChild /> inside
```

- Every file named with a `_` underscore is a dynamic route and is replaced by whatever stands in the url
- Every folder with named with a `_` underscore is a dynamic route
- If the `_slug.vue` mentions a `<NuxtChild />` it will display the .vue template within the folder which has the same name as the parent – in this case `_slug`.
- within the router the params `slug` and `childslug` will be populated. domain.ch/level1/childlevel will result in `slug` = _level1_ and `childslug` = _childlevel_.
- Whenever the `childslug` param is missing the `pages/_slug/index.vue` template is taken. In this case we leave it empty and do nothing.

## In Action (Examples)
Go to `/examples/hasnuxtchild/` to see it in action.
You can also see what happens with dynamic routes: `/examples/hasnuxtchild/YOUR_DESIRED_ROUTE`.
For the files check out `/pages/examples/hasnuxtchild/` and `/pages/examples/hasnuxtchild.vue`.

## Transitions on nuxt-child
If you want a custom transition on nuxt child pages, you need to make sure that the nuxt-child component rerenders after a route change. You can do this by adding a `key` like `<NuxtChild :key="$route.params.slugchild" />`.
Additionally you have to set a transition within the child template.
```
transition: {
  name: 'slugchild',
  mode: 'out-in'
},
```
And also define the transition, for example in the layout.scss:
```
// transitions child pages by making them red during the transition.
.slugchild-enter-active,
.slugchild-leave-active {
  position: relative;
  transition: background-color 1s;
}

.slugchild-enter,
.slugchild-leave-active {
  background-color: red;
}
```

For understandable transitions with leave, leave-to and leave-active etc.
check the `layout.scss` file with the defined slugchild animations and also check this image:

<img src="https://vuejs.org/images/transition.png?_sw-precache=5990c1dff7dc7a8fb3b34b4462bd0105" width="500">
