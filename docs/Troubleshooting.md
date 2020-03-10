# Troubleshooting

## [No GraphQL results – No entry with 'home' slug?](#no-results)
You seem to try to call the index of the page. 
Did you maybe forget to add a page with your defined homeslug: `${config.env.HOMESLUG}` defined in `/config.js`?

## [Still no GraphQl results – Public Schema problem?](#no-results-2)
If you made sure that you have an entry with your homeslug (probably 'home'), and you doublechecked your GraphQl queries within Craft's GraphQL API explorer, you might want to check that your `Public Schema`, which can be found in your Craft Control Panel `GraphQL > Schemas`, has listed the sections you are currently querying!
