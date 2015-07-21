Introduction to Modulo
===================


#What is modulo ?


This is a plain view. Here is a link to [a first timeline](^^modulo-href:Test timeline).

And here is a note for readers[#][Gilster, Paul. *Digital Literacy*. New Ed. New York, NY: John Wiley & Sons, 1998.] and a second right after [#][Gilster, Paul. *Digital Literacy*. New Ed. New York, NY: John Wiley & Sons, 1998.].

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor laboriosam necessitatibus, iste possimus autem cumque assumenda, adipisci exercitationem. Ea perferendis tenetur quasi magnam aut ratione ipsam, quia soluta, asperiores. Perspiciatis.

Here is a link to the second timeline, and here a web page which is interesting.

And here is a second note for readers[#][Gilster, Paul. Digital Literacy. New Ed. New York, NY: John Wiley & Sons, 1998. ibid 2].

<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed voluptate, quidem aspernatur, tempore enim minima saepe numquam natus ratione eum vero? Cupiditate dolor explicabo labore veniam, nisi ab architecto consequuntur.</div>
<div>Quo adipisci sapiente voluptatum, nostrum quibusdam ipsa excepturi tempora dolore eum nam. Dolor odio, minima deleniti dicta obcaecati impedit perferendis, ipsum doloremque incidunt rerum similique architecto veritatis nemo eum officiis.</div>
<div>Ipsam voluptate, sint illo earum commodi molestias dolores minima quaerat numquam quisquam ipsa blanditiis assumenda sequi possimus laboriosam dolorem. Vel sit, est quidem nemo quibusdam aperiam quia facere nesciunt voluptatibus.</div>
<div>At possimus laboriosam officiis quas laudantium, facere consequuntur rem quidem iure provident maiores. Voluptatem omnis similique inventore obcaecati, error doloremque debitis dolor itaque voluptates quidem libero quasi illo quisquam quos!</div>
<div>Eum obcaecati doloremque odit sapiente. Repudiandae excepturi dolore vero asperiores et libero id tempora, animi nam fugiat iusto deleniti corrupti tempore in distinctio accusamus est vel rem necessitatibus unde? Asperiores.</div>


#Bibliography

And here is a note for readers[#][Gilster, Paul. *Digital Literacy*. New Ed. New York, NY: John Wiley & Sons, 1998. ibid 3].


<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium modi dicta soluta nulla quo nihil dolore illo dolor beatae neque! A enim labore at aut doloremque voluptas provident facere alias.</div>
<div>Possimus, amet voluptatum molestias provident, veritatis magnam. Commodi at, recusandae harum, aperiam asperiores fuga expedita velit mollitia quasi delectus voluptas alias ad. Nulla rem eveniet quae veniam earum temporibus ipsam.</div>
<div>Praesentium maiores soluta, tenetur accusantium exercitationem omnis quam voluptates, mollitia dignissimos cum earum molestias veritatis saepe odit possimus, magnam. Cumque saepe voluptatibus aspernatur mollitia, ipsa esse ducimus. Debitis rerum, enim!</div>
<div>Quos dignissimos rem distinctio, nemo aut provident ullam neque molestiae cumque. Eveniet nemo excepturi ipsa sed obcaecati voluptate maiores quam necessitatibus, consequatur quas impedit cumque, accusamus dignissimos id, aspernatur dolor.</div>
<div>Facilis eius eos, impedit deserunt! Soluta sit libero a nulla, aut id veritatis, autem architecto! Officia ut ullam, est fugit consequatur dolor animi quis neque, nesciunt voluptas ipsum esse reprehenderit!</div>
<div>Distinctio dolorum ullam, modi, ipsa expedita nesciunt ut numquam nemo ex consequatur amet excepturi natus, reiciendis laborum quos perspiciatis quaerat rerum dolores est magnam minus quidem? Mollitia quia commodi maiores.</div>
<div>Pariatur reprehenderit, eligendi nostrum error similique exercitationem quod delectus atque illo tenetur maxime dolore sapiente numquam voluptatem quidem ipsam repellendus sint, nihil soluta obcaecati! Facere, dicta, quisquam. Doloribus, commodi, quasi!</div>
<div>Ex nam, illo velit porro expedita aperiam at perspiciatis vel molestias? Cupiditate, dignissimos, repellat? Sit placeat dignissimos labore, hic officiis iusto voluptatem impedit laudantium reiciendis animi? A, incidunt dolor aspernatur?</div>
<div>Vel corrupti animi dolorem in aut iusto dolores quasi dolore libero, maiores error facilis fuga consectetur cumque similique quo nemo impedit laborum molestias harum rerum incidunt eveniet ab nobis. Distinctio?</div>
<div>Perspiciatis non voluptatum facilis totam dolor nesciunt quibusdam placeat, exercitationem dolore id laboriosam est porro sed quos vel ipsam. Omnis accusantium alias quas, temporibus maiores ratione saepe labore nobis tempora?</div>

And here is a second note for readers[#][Gilster, Paul. Digital Literacy. New Ed. New York, NY: John Wiley & Sons, 1998. ibid 4].



```json
{
    "role" : "modulo-view",
    "title" :"Test timeline",
    "type" : "timeline",
    "dateformat" : "%d/%m/%Y",
    "begindate" : "01/01/2013",
    "enddate" : "30/12/2015",
    "columns" : [
        {
            "layers" : [
                {
                    "data" : "data-nogit/hashtags.csv",
                    "type" : "metrics",
                    "models" : {
                        "objectsKey" : "hash",
                        "datesKey" : "mm-dd-yyyy"
                    },
                    "dateformat" : "%m-%d-%Y",
                    "title" : "AIME Hashtags"
                },
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
    "dateformat" : "%d/%m/%Y",
    "begindate" : "01/01/2012",
    "enddate" : "30/12/2014",
    "columns" : [
        {
            "layers" : [
                {
                    "data" : "data-nogit/hashtags.csv",
                    "type" : "metrics",
                    "models" : {
                        "objectsKey" : "hash",
                        "datesKey" : "mm-dd-yyyy"
                    },
                    "dateformat" : "%m-%d-%Y",
                    "title" : "Hashtags"
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


```json
{
    "role" : "modulo-view",
    "title" :"Test timeline 3",
    "type" : "timeline",
    "dateformat" : "%d/%m/%Y",
    "begindate" : "01/01/2013",
    "enddate" : "01/10/2015",
    "columns" : [
        {
            "layers" : [
                {
                    "data" : "data-nogit/hashtags.csv",
                    "type" : "metrics",
                    "models" : {
                        "objectsKey" : "hash",
                        "datesKey" : "mm-dd-yyyy"
                    },
                    "dateformat" : "%m-%d-%Y",
                    "title" : "AIME Hashtags"
                }
            ]
        },
        {
            "layers" : [
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
