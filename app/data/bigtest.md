Introduction to Modulo
===================


#What is modulo ?

Take a look at [this raw file](data/test.md). Ugly but simple, isn't it?
It uses a markup langage called Markdown to turn a plain text file into an html document.


Timeline : timeformatting with d3 : https://github.com/mbostock/d3/wiki/Time-Formatting

```json
{
    "role" : "modulo-view",
    "title" :"Test timeline",
    "type" : "timeline",
    "columns" : [
        {
            "layers" : [
                {
                    "data" : "data-nogit/nyc-opengov.csv",
                    "filters": [
                        "Type of Event==Website"
                    ],
                    "type" : "events",
                    "models" : {
                        "date" : "Date",
                        "end" : "END",
                        "title" : "Name",
                        "desc" : "Description"
                    },
                    "dateformat" : "%m-%d-%Y",
                    "title" : "NYC Open Gov'"
                },
                {
                    "data" : "data-nogit/AIME_timeline.csv",
                    "type" : "events",
                    "models" : {
                        "date" : "Start Date",
                        "end" : "End Date",
                        "title" : "Headline",
                        "desc" : "Text"
                    },
                    "dateformat" : "%d/%m/%Y",
                    "title" : "AIME timeline"
                }
            ]
        },
        {
            "layers" : [
                {
                    "data" : "data-nogit/seattletimes.csv",
                    "type" : "events",
                    "models" : {
                        "date" : "datetext",
                        "title" : "chatter"
                    },
                    "dateformat" : "%Y",
                    "title" : "seattle times"
                }
            ]
        }
    ]
}
```

```json
{
    "role" : "modulo-view",
    "title" :"Test timeline 2",
    "type" : "timeline",
    "columns" : [
        {
            "layers" : [
                {
                    "data" : "data-nogit/nyc-opengov.csv",
                    "filters": [
                        "Type of Event==Website"
                    ],
                    "type" : "events",
                    "models" : {
                        "date" : "Date",
                        "end" : "END",
                        "title" : "Name",
                        "desc" : "Description"
                    },
                    "dateformat" : "%m-%d-%Y",
                    "title" : "NYC Open Gov'"
                },
                {
                    "data" : "data-nogit/AIME_timeline.csv",
                    "type" : "events",
                    "models" : {
                        "date" : "Start Date",
                        "end" : "End Date",
                        "title" : "Headline",
                        "desc" : "Text"
                    },
                    "dateformat" : "%d/%m/%Y",
                    "title" : "AIME timeline"
                }
            ]
        }
    ]
}
```

^^modulo-aside:Test timeline

Modulo is an angular-based website seed that enhances a markdown document with multiple and design-rich possibilities.

Modulo features :

* a json-based boilerplate for making an interaction-rich textual document (by interacting with the table of contents, for instance)
* advanced embedding functionnalities
* scholarly-writing related functionnalities, with zotero references handling
* a framework for building advanced and interactive figures going along with the text with iframes, embeds, and moreover, visualizations/mini-application snippets aiming at supporting your argument

#Interface-related features

##Table of contents

It is generated as a json object - use it for an aside (like in this example) or do something else with it !

##Intelligent search

Enhances the classical browser's way of handling search in a page (ctrl + f).

##Markdown Tables powered by angular's ui grid

| Col 1   | Col 2                                              |
|======== |====================================================|
| Plain   | Value                                              |
| Plain1   | Value3                                              |
| Plain2   | Value                                             |
| Plain3   | Value4                                              |
| Plain4   | Value                                              |

##Zotero references manager

1. Connect to Zotero API
2. Insert zotero references through zotero urls
3. do what you want with your references

Here is an example of reference [^^zotero:https://www.zotero.org/cathedrale/items/HGDNGPRH]. In this example I use references for creating a bibliography at the end of the page.

^^modulo-aside:Welcome


#Embeds in text

##Google Spreadsheet table

^^gspreadsheet:https://docs.google.com/spreadsheets/d/1l7HaiK1w-kYcDzMM0Jr6jWoRWDaIjitrE2PZl650b3Y/pubhtml

##Vimeo embed

^^vimeo:https://vimeo.com/129051743

##Youtube embed

^^youtube:https://www.youtube.com/watch?v=G5OicZrhkHg

##Tableau visualization embedding

^^tableau-embed:<script type='text/javascript' src='https://public.tableau.com/javascripts/api/viz_v1.js'></script><div class='tableauPlaceholder' style='width: 1004px; height: 669px;'><noscript><a href='#'><img alt='Countries and their participation to IPCC ARs ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ma&#47;map_medea3&#47;Dash&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz' width='1004' height='669' style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='site_root' value='' /><param name='name' value='map_medea3&#47;Dash' /><param name='tabs' value='no' /><param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;ma&#47;map_medea3&#47;Dash&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='showVizHome' value='no' /><param name='showTabs' value='y' /><param name='bootstrapWhenNotified' value='true' /></object></div>

##Twitter message

^^twitter-msg-oembed:https://twitter.com/Strabic/status/565086840370528256

##Image gallery

^^modulo-aside:Test timeline 2


^^carousel:/data/images/1.png,/data/images/2.png,/data/images/3.png

##Slideshare embed

^^slideshare://fr.slideshare.net/slideshow/embed_code/key/rGQLsk1BvwQ2Ik

##PDF embed

^^pdf-embed:data/pdf/Mémoire - Castelletti A. (2013) - la place du public dans les nouveaux médias.pdf

##Iframe embed
^^iframe:http://www.w3schools.com/jsref/jsref_regexp_nxy.asp

#Aside column management

Modulo is designed to display rich aside content to a text.
As its name suggests, it is meaned at being an open system.

There are two ways of changing the aside content :
* through a text hyperlink
* through scroll-binding

##Hyperlink-based aside

As you can see in [this modulo view](^^modulo-href:A new era), I don't think it's worth explaining.

##Scroll-based aside

Here a match in modulo :

^^modulo-aside:Vimeo embed:^^vimeo:https://vimeo.com/129051743


Here is a first aside called "a new era"

^^modulo-aside:A new era

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque adipisci maiores dignissimos illo exercitationem nam voluptates similique fuga, tenetur enim, expedita repellendus temporibus maxime magni. Accusantium deserunt voluptates placeat, impedit?

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque adipisci maiores dignissimos illo exercitationem nam voluptates similique fuga, tenetur enim, expedita repellendus temporibus maxime magni. Accusantium deserunt voluptates placeat, impedit?

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque adipisci maiores dignissimos illo exercitationem nam voluptates similique fuga, tenetur enim, expedita repellendus temporibus maxime magni. Accusantium deserunt voluptates placeat, impedit?

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque adipisci maiores dignissimos illo exercitationem nam voluptates similique fuga, tenetur enim, expedita repellendus temporibus maxime magni. Accusantium deserunt voluptates placeat, impedit?

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque adipisci maiores dignissimos illo exercitationem nam voluptates similique fuga, tenetur enim, expedita repellendus temporibus maxime magni. Accusantium deserunt voluptates placeat, impedit?

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque adipisci maiores dignissimos illo exercitationem nam voluptates similique fuga, tenetur enim, expedita repellendus temporibus maxime magni. Accusantium deserunt voluptates placeat, impedit?

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque adipisci maiores dignissimos illo exercitationem nam voluptates similique fuga, tenetur enim, expedita repellendus temporibus maxime magni. Accusantium deserunt voluptates placeat, impedit?

Here is an aside containing an iframe.

^^modulo-aside:Terence Blake

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi iusto dicta corporis laborum maxime molestias impedit, quo, enim accusantium, obcaecati soluta quidem cum maiores quaerat, itaque reprehenderit adipisci iure voluptate!


```json
{
    "role" : "modulo-view",
    "title" :"Welcome",
    "type" : "html",
    "url" : "data/html-modules/welcome.html"
}
```

```json
{
    "role" : "modulo-view",
    "title" :"A new era",
    "type" : "timeline"
}
```

```json
{
    "role" : "modulo-view",
    "title" :"Terence Blake",
    "type" : "iframe",
    "url" : "https://terenceblake.wordpress.com/"
}
```


```json
{
    "role" : "not-a-modulo-view",
}
```
