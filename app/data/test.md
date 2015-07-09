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
    "dateformat" : "%d/%m/%Y",
    "begindate" : "01/01/2007",
    "enddate" : "01/01/2015",
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



#Aside column management

Modulo is designed to display rich aside content to a text.
As its name suggests, it is meaned at being an open system.

There are two ways of changing the aside content :
* through a text hyperlink
* through scroll-binding

##Hyperlink-based aside

As you can see in [this modulo view](^^modulo-href:A new era), I don't think it's worth explaining.

##Scroll-based aside


Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque adipisci maiores dignissimos illo exercitationem nam voluptates similique fuga, tenetur enim, expedita repellendus temporibus maxime magni. Accusantium deserunt voluptates placeat, impedit?

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque adipisci maiores dignissimos illo exercitationem nam voluptates similique fuga, tenetur enim, expedita repellendus temporibus maxime magni. Accusantium deserunt voluptates placeat, impedit?

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque adipisci maiores dignissimos illo exercitationem nam voluptates similique fuga, tenetur enim, expedita repellendus temporibus maxime magni. Accusantium deserunt voluptates placeat, impedit?

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque adipisci maiores dignissimos illo exercitationem nam voluptates similique fuga, tenetur enim, expedita repellendus temporibus maxime magni. Accusantium deserunt voluptates placeat, impedit?

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque adipisci maiores dignissimos illo exercitationem nam voluptates similique fuga, tenetur enim, expedita repellendus temporibus maxime magni. Accusantium deserunt voluptates placeat, impedit?

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque adipisci maiores dignissimos illo exercitationem nam voluptates similique fuga, tenetur enim, expedita repellendus temporibus maxime magni. Accusantium deserunt voluptates placeat, impedit?

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque adipisci maiores dignissimos illo exercitationem nam voluptates similique fuga, tenetur enim, expedita repellendus temporibus maxime magni. Accusantium deserunt voluptates placeat, impedit?
