Clues. Anomalies. Understanding.
======
Detecting divergent practices in the Digital Humanities through the AIME project.


```json
{
    "role" : "modulo-view",
    "title" :"Story of the AIME project",
    "type" : "timeline",
    "begindate" : "01/10/2013",
    "enddate" : "01/05/2015",
    "dateformat" : "%d/%m/%Y",
    "columns" : [
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
                    "dateformat" : "%m/%d/%Y",
                    "title" : "An Inquiry into Modes of Existence : restrospective of events"
                }
            ]
        }
    ]
}
```

^^modulo-aside:Story of the AIME project


An Inquiry into Modes of Existence (AIME) is a huge, probably incomplete, experiment in both humanities and digital humanities (DH). In a four year timespan, a vast and diversified *set-up* of technologies[#][Here the term set-up refers to the network of complementary instances of the project. They are media instances  (print, web interfaces, meetings) supporting an ecosystem of practices distributed all along the nodes of the network.] has been conceived, developed, tested, and modified. Some of them clearly achieved the foreseen objectives, some others not. For most of the set-up elements, we struggled to design their features and to understand their agency. Although painful from a management and scholarly point of view, this was not completely unexpected. AIME has provided the rare opportunity to craft at the same time a new method of inquiry in philosophy, its own content, its format, and its way to communicate and disseminate the result while striving to build a new relationship with a diversified spectrum of the publicpublic redefining the author-reader connection. In a more than chaotic trajectory, design practices played a major role acting as critical and speculative agent:

"Speculative design is an approach to design that emphasizes inquiry, experimentation, and expression, over usability, usefulness or desirability. A particular characteristic of speculative design is that it tends to be future-oriented." 

To make this projection towards the future relevant and to understand the role of AIME in the field of DH as well as what has to be retained as a good practice and what should be avoided in similar future projects, we propose a thoroughgoing observation. It is an empirical observation -to this extent we will try to adopt the same research posture as the AIME inquiry itself- based on the collection of the different public reactions collected with heterogeneous strategies: from digital methods of research to web analytics; from qualitative interviews to on-line questionnaire. 

Johanna Drucker stated that finding a vocabulary -and we would also add the meaning (what it is) and the sense (what it does)- of a new technology (and here the new technology is the entire AIME set-up) takes time. During the development of the AIME set-up, just a few elements were self-evident and apparent, with a clearly identifiable name. One of these is the AIME principal investigator (PI): Bruno Latour. In one of the first public presentations, in late 2011, he defined it as a collective procedure triggered by a series of troublesome anthropological and philosophical questions. AIME’s ambition was to invent a medium for an empirical[#][ It is empirical in the sense that the demonstration and discussion of the philosophical arguments are grounded on anthropological experiences fostered by diverse types of documents (iconic, audio visual, textual… ).] inquiry concerned with ontological pluralism. The inquiry started 25 years before as a personal endeavour. Given the huge scope and topic, it now has to be opened to other researchers willing to use the AIME protocol, its method and style (borrowed from William James) to validate and expand the results. 

In this presentation, the moments of hesitation are clear, the moments when the names for designating technologies and procedure were trembling, signaling something still to invent. Leaving it to the philosophical community to judge the relevance and the quality of the arguments produced by AIME, in this paper we dedicate ourselves to the evolution of these hesitations. All the hesitations evolved into a chimera, one of the "strange beasts" described by Alessandro Ludovico whose component parts do not have a clear identity: a collaborative inquiry presenting some results before the collaboration was even started; an academic book without footnotes and references; an open, on- and off-line platform to collaborate with peers where you must subscribe to a strict protocol. It is a composed network that we had to produce before being able to describe it[#][ Obviously this does not mean that we had no plan, no strategy. We had them as the  expression of a final philosophical achievement. This picture is among the very first comprehensive depictions of the project. https://drive.google.com/open?id=0B36QS0G92XjseHVLTmQ4OThFNmM
]. Eventually we produced a sort of **_{format and template dissonance}_** where the produced artifacts didn’t present all of the features expected from the broader type of media they belonged to. The  series acts of remediation of the original text implied new rules and incomplete materials.

# What AIME did: an anomalous hypothesis for Digital Humanities

```json
{
    "role" : "modulo-view",
    "title" :"Counting of book mentions",
    "type" : "image",
    "background":"#D5D8C8",
    "url" : "https://lh5.googleusercontent.com/O7fRsgosuIGCnLXuZmhWhRhz5LGCNeN9BUgjQ---dGhSPxOjmZQq1N3gE_Z8vUZwUEIXEBsPFyqJ3xM=w1857-h805-rw"
}
```

```json
{
    "role" : "modulo-view",
    "title" :"The report",
    "type" : "iframe",
    "url" : "http://www.modesofexistence.org/#the-tools/report"
}
```

```json
{
    "role" : "modulo-view",
    "title" :"Twitter reactions: before and after",
    "type" : "html",
    "url" : "data/html-modules/twitter-before-after.html"
}
```


```json
{
    "role" : "modulo-view",
    "title" :"Graph of correlations between hashtags and users around AIME",
    "comment" : "protocol : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis delectus iure ratione error, officiis atque eius esse adipisci suscipit in optio totam sunt fugit culpa, accusamus libero labore consectetur consequuntur.",
    "type" : "graph",
    "background" : "#d4d9c7",
    "data" : "data-nogit/user-hash-2.gexf",
    "colors" : {
        "keyAttribute" : "hash/user",
        "specialColors" :{
                "events": "#923626",
                "hash" : "#999999"
            },
        "default" : "#2a2b28"
    },
    "filters" : [
        {
            "nameActive" : "Show the two main nodes",
            "nameInactive" : "Hide the two main nodes",
            "hide" : [
            {
               "keyType" : "attribute",
               "keyAttribute" : "hash/user",
               "value" : "mega"
            }
            ],
            "active" : false,
            "settings" : {
              "labelThreshold": 5,
              "drawEdges": true,
              "drawNodes" : true,
              "labelSizeRatio" : 2
          }
        }
    ]
}
```

Observing how people identified and described AIME is enlightening. By analysing 39 web pages retrieved by employing five  different search-engine queries and selected according to their relevance and pertinence, almost all the [pages mentioned the book](^^modulo-href:Counting of book mentions). [#][On the basis of the AIME set-up, the first community-oriented instance of the project is a printed artifact called 'preliminary report' in the project’s jargon, that one could also call a philosophical book. However, the latter appellation may be dangerously misleading, as this book does not present the expected conventional cognitive and cultural features one could expect from a contemporary “philosophical book” : it features neither footnotes nor a glossary, nor any critical apparatus helping the reader to verify author’s the statements even as it presents additional characteristics atypical of  philosophical book templates, like a large margin and a report-like index that provides the reader a very precise overview of the contents. This first printed instance is therefore not a self-sufficient, incomplete and defective version of a “philosophical book”. This incompleteness is intentional; it is a call for reworking the project along with the other instantiations of the inquiry, and especially the digital interfaces of the project.] but only few of them [called it a report](^^modulo-href:The report) : while it is easy to label a published academic artifact as a book, “the very best ‘interface’ ever designed”[#][ As we will describe lately the connection between the printed matter and the digital environment it has been difficult to produce and endorse, regarding the first aspect apparently we did a great job.] to convey arguments, it has been fairly impossible to reinforce its unstable nature by associating it with the word “report”. It is a kind of **_{mismatching of lexical references}_**, where the labels used for an established artifact didn’t fit with the “new” device’s experimentation [as it was experimented](^^modulo-href:Twitter reactions: before and after).

Another interesting element of reflection emerge emergedfrom the relatively reduced quantity of pages mentioning AIME as an experiment in DH although looking at the twitter activity during the DH2014 meeting, Latour’s keynote speech received a great deal of attention. Attention anticipated by great expectations and then frustration caused by the clumpiness of the first version of the on-line platform and by the type of DH activities conducted. Aren’t these clues of a kind of **_{misaligned set-up practices}_** for DH, where data visualization and large datasets are supposed to be the "new" norm whereas the reading of large numbers of documents is not?
Almost all the pages mentioned the AIME collaborative aspects of the digital platform[#][The digital interfaces of the project find their unity in a shared URL (modesofexistence.org). Once passed through a first blog-like home website, a first interface to the inquiry, named “book entry”, features the elements of the project through a layout composed of four columns : the first presents the preliminary report (TXT), then comes aan vocabulary discussion and definition column (VOC), contextual documents along with bibliographical references (DOC), and last but not least collective contributions pointing at elements from the three previous columns (CONT). The reader is then left free to navigate through a non-linear logic by clickingjumping through the links bounding the diverse elements of the inquiry, reassembled through specific visual agencies depending on the main element read by the visitor.
The second interface of the project, called “crossings entry”, displays the elements of the inquiry as sorted through the theoretical framework of the MoE argument, that is modes and their crossings. It allows the tracingdrawing ofto draw several paths into the network of elements (called “scenarios”), in order to propose and draw representative sequences  of inquiry network's elements proposing a certain way of describing and accounting for the specified mode.] but only a few cited the face-to-face meetings[#][ Another instantiation of the project consisted ofin physical meetings gathering various people interested in specific modes and responding to a call for contributions on the digital version of the inquiry.] that had been widely announced and communicated. This is in marked  contrast to the other digital methods analysis that we conducted by using twitter. Having a look at the [graph produced](^^modulo-href:Graph of correlations between hashtags and users around AIME) by connecting hashtags and users certainly gives the impression of a complete contrast.


Evident at first glance is a polarization between AIME and its PI. It is probably a reflection of a **_{personality and status refraction}_** where the reputation/perception of a specific project actor multiplies the point of view on the project itself.If we remove the two main nodes a clearer view of the discussion around AIME arises. Are discussions that are revolving around the issues of DH (#digitalhumanities) and clustered around the many AIME workshops and side events (#thatcamplyon)?. Clearly appearing are the usual fields of study with which the PI is associated (#sociology, #ANT, #sts) as well as the other projects conducted by him (#mooc, #cop21). Here we can see a sort of **_{amalgamation of heterogeneous public}_**, where composition and scale of the communities being formed do not fit with the expected one. The publics that are supposed to be reached by the project exceed a specific discipline/community, thereby leading to misunderstandings.

This is just a shallow *understanding* of what the AIME project did, trying to recombine new techniques and usual intellectual technologies.  With different timing in  each case, the project created different expectations from various communities -philosophers, designers, DH researchers-, as well as a wide range of frustrations and protestations. We are proposing to reframe these different elements as *clues* allowing us to detect different *analogous* practices and representations at work in philosophy, collaboration-based projects, design and DH communities.

This paper will: 

* detail the methodical activity of collecting different criticisms, considered as clues for detecting anomalies (signaled by **_{anomaly}_**) and grouping them into 3 families[#][ A further family has been identified as well. We have temporarily dubbed it "Developing through publishing" and refers to the peculiar process of developing a project while having already constituted an audience around its first instance, and to the role of different team members in such an endeavour.  Since it is still under elaboration we prefer not to publish it here but to add it to a further communication.
], making AIME diverge from the established and analogous practices of (digital) humanities;

* look for a cause for these anomalies by eliciting the choices which, eventually, generated them;

* evaluate each anomaly as: a) future norms (innovations), b) useful mistakes for similar experiments in the future, c) non-fixable anomalies, which reveal underlying assumptions in the audience and participants.

While its assessment on the basis of users’ requirements and feedbacks[#][ Gibbs, F., & Owens, T. (2012). Building Better Digital Humanities Tools: Toward broader audiences and user-centered designs, 6(2). Retrieved from http://www.digitalhumanities.org/dhq/vol/6/2/000136/000136.html
], although difficult to be conducted in DH[#][ Kemman, M., & Kleppe, M. (n.d.). Too Many Varied User Requirements for Digital Humanities Projects. Retrieved from http://www.clarin.eu/sites/default/files/cac2014_submission_29_0.pdf
], could have been possible, more interesting is observingto observe to what extent has the "digital" aspect of the project has been embedded into the research. In a situation where the DH are still delineating their position, shape and role in a wider academic environment, our way to study the AIME project -focussing in what has done more than on what it is- will help to produce a wider understanding of some assumptions and expectations about DH itself.

The DH field is increasingly heading to a certain stabilization of formats, methods and goals[#][ Although with a not strictly rigid normative sense it could be cited as a clue towards this need of standardization noted in this passage from the book Digital_Humanities:

> "The capacity for the rapid creation, testing, and reworking of Digital Humanities projects goes hand-in-hand with the flexibility, mutability, and extensibility of digital media. But with the development of more Digital Humanities projects comes a new, normative center in which tool sets are stabilizing. Curation, collection, and data management are cohering around shared standards, while concrete rationales for the production and deployment of Digital Humanities methodologies have emerged in the academy." 
Burdick, Anne, Johanna Drucker, Peter Lunenfeld, Todd Presner, and Jeffrey Schnapp. Digital_Humanities. Cambridge, MA: The MIT Press, 2012.], supported by the installation of shared infrastructures[#][ See, for instance, the DARIAH Eeuropean infrastructure : https://www.dariah.eu/ and the Research Infrastructures in the Digital Humanities from ERS
http://www.esf.org/fileadmin/Public_documents/Publications/spb42_RI_DigitalHumanities.pdf]. This tendency towards a "conventionalization" is motivated by the need for technical interoperability (e.g. text encoding[#][ Renear, Allen H. “Text Encoding.” In A Companion to Digital Humanities, 218–39. Blackwell Companions to Literature and Culture. Wiley-Blackwell, 2008.] initiatives) and methodological comparativity of research programs and projects. It is also driven by empirical, trial-and-error procedures towards new research methods: a lot of projects are trying to establish a more stablestabler basis stemming from previous experiments and for further projects. This approach could be described as a *conventional*[#][ Manzini, Ezio, and Rachel Coad. Design, When Everybody Designs - An Introduction to Design for Social Innovation. Cambridge, Massachusetts: MIT Press, 2015.
] - we would rather say *analogous -* way of solving problems which is opposed to a *design* mode, grounded on our ability to “imagine something that is not there”. Acting in this mode, the highly idiosyncratic activity of AIME could be a useful trigger to observe which are the *conventions* populating, in terms of practices as much as values, the communities of digital humanities. Our investigation could then inform us about how much the AIME project has been an *anomaly* to these emerging and various conventions. Anomaly here, here, is not opposed to normativity (*nomos)* but to regularity (*omalos)*[#][ Canguilhem Georges, The normal and the pathological, New York : Zone Books, 1989.]*.* The notion is flexible enough to compare the project with its hosting environments avoiding too sharplymuch sharp-edged distinctions (normative vs exceptional) and respecting the highly empirical statements of digital humanists while questioning them.

To perform this anomaly-detection activity, we could draw our methodological framework on the basis of an ancient dispute about the nature and evolution of language[#][ Douay, Françoise, and Jean-Jacques Pinto. "Analogie/anomalie. Reflet de nos querelles dans un miroir antique." Communications 53, no. 1 (1991): 7–16.]. It was opposing, during the 2nd century B.C., the stoics of Pergame (the anomalist school) and the philologists of Alexandria (the analogist school). While analogists were looking for proportional repetitions to be instituted into grammatical rules, anomalists looked for exceptions that would question and criticize these rules. The situation ended up with a very fruitful debate where at stake was as much the description of language as the ethical rules for its further development. In other terms, whether to assess it in terms of respect to conventional rules or through its relevance inside a specific context. We argue here that both approaches are complementary in order to understand the activity patterns of an object of study such as Digital Humanities. However, as analogies rarely provoke reactions and are thus difficult to trace, focusing our attention on which DH *anomalies* the AIME project has produced would allow for a richer and softer interpretation of DH's implicit and explicit emerging regulatory principles. What is at stake here is the evaluation of the process of building and practicing material set-ups which is central to the DH building-based hermeneutics[#][ Ramsay, Stephen. “On Building,” January 11, 2011.
http://stephenramsay.us/text/2011/01/11/on-building/.]. Trying to grasp the intrinsic intellectual value of the *making* and use of DH artifacts is a complex task. It requires to question their very relation to the theoretical implications of the humanities endeavour they "serve" and interact with[#][ Ramsay, S. Rockwell, G. (2012). Developing Things: Notes toward an Epistemology of Building in the Digital Humanities, in: Gold, M. K. (2012). Debates in the Digital Humanities. U of Minnesota Press.].

# Setting up listening devices

In order to detect AIME's anomalies, we designed a serie of listening devices, both inquiry methods and visual instruments, helping to grasp reactions and practices produced by the project. They were purposed for both design research and for more pragmatical project management reasons, harvesting data from October 2013 to April 2015. These devices are:

* a systematic analysis of the project's mentions over the web

* a twitter activity analysis over AIME-related twitter activity[#][ Everything written by, addressed to or containing: @AIMEproject, modesofexistence, modes_of_existence, "Bruno Latour", brunolatour, modes?[_]?of[_]?existence|#brunolatour|aimeproject, aimeproject.org]

* a questionnaire analysis, based on a study concerning 220 of the 6000 registered users of project's platform

* a platform's database analysis featuring recordings about enlisted co-inquirers and their writing activities

* an analysis of google analytics data about the digital platform

* a series of interviews with team members conducted during the more active phase of the project by an external researcher

The above-mentioned devices allow to draw our analysis on both quantitative and qualitative, enunciative and practical, insiders’ and outsiders’ data. We analyzed each of these sources considering all the traces collected after the passage of the project as clues asking for an inferential explanation.[#][ This activity is largely inspired by the indiciary paradigm of Ginzburg.
Ginzburg, Carlo. Signes, Traces, Pistes. Vol. 6. 6. Gallimard, 1980. http://www.cairn.info/revue-le-debat-1980-6-p-3.htm.]

# Anomaly family #1: displacement in acknowledging on-and-offline practices ecosystem

<table>
  <tr>
    <td>Devices</td>
    <td>Clues</td>
    <td>Anomalies</td>
    <td>Understanding - explanation</td>
  </tr>
  <tr>
    <td>Web review</td>
    <td>External reviews revealing missing connexion between the different instances of the set-up, or confusing some of them with resembling templates</td>
    <td>People missing or expecting from some parts of the set-up certain features that were either present in another part/media or absent from the whole project

{media-related expectations}
{format and template dissonance}
{media concurrency}</td>
    <td>Projects usually comply with the existing functions and conventions of media
People considering as autonomous one of the many instances/media of the project</td>
  </tr>
</table>


AIME, since testing the same theoretical hypothesis within diverse media and towards diverse audiences, has been conceived to support a series of complementary -on and offline, textual and visual, specific and generic media- scholarly practices. Looking at the project reviews and external online reports, some reactions were "well-aligned" as perceptions regarding this *multimodal*[#][ As McPherson stated, a multimodal scholar should make profit of a variegated array of literacy forms. She goes further posing a question that was at the very core of AIME: "How do you 'experience' or 'feel' an argument in a more immersive and sensory-rich space?". ] strategy. However, some others revealed that this distributed media organization ended up in some **_{missing connections}_** between the elements of the project. Some descriptions simply did not take into account one or several of the project's instances -pointing out some lacks of consistency or solidity-, while other ones reproached to one element not to propose the functionalities it was aimed at, that, indeed, were fulfilled by another one-. The printed instance was blamed to not provide the contextual references - they were available in the 'book entry' of the digital platform-; the 'book entry' of the platform was accused to be "non democratic" as it did not allow for debate and methodological discussions -that were designed to be held during physical events-; and so on. What had been conceived as a distributed environment of complementary workplaces, the very AIME set-up, may have been received in these cases as an hegemonic factory for digital intellectual labour[#][ This latter feeling could also have been favored by the platform initial technical problems, which made it sometimes slow and irritating, due to its experimental and evolutive history.  The lack of seamlessness may have provoke some doubts about the very relevance of such an ecosystem of instances: 
"In any case, it is faster and easier to negotiate the book via a PDF file than through the web interface, or certainly it is better to keep ready to hand the PDF or the paper copy when waiting for the website to slowly grind back into life."].

Another source of displacement in the understanding of the project came from **_{template-related expectations}_** and the -deceptive although natural- comparisons they made explicitly or implicitly between AIME specific artifacts and more widespread new media templates[#][ Namely: social media platforms, blogging platforms, wiki websites, academic documents online repositories, digital archives.] with which they shared some features or methodological resonance. Indeed, while the printed artifact has been flawed as an defective version of a "philosophical book" due to its lack of critical apparatus, more subtle analogies were made regarding the digital instances. 
The principle of a collective endeavour supported by digital means and framed through systematic guidelines conducted quickly the project to be recurrently compared to the figure of an encyclopedia[#][ This distinction has been underlined several times and in different writing, for further discussion see: 
Ricci, Donato and De Mourat, R. Forthcoming. An account of Digital Humanities from the AIME Project. échappées, no. 2.
Ricci, Donato. 2013. Documenti di scena. Progetto Grafico, no. 23.
De Mourat, R., Donato Ricci and P.L. Boulanger. 2014. AIME: opening the context of a Humanities inquiry. In di2014 - digital intelligence | intelligences numériques proceedings. Nantes.]. Features such as the extended glossary (VOC column of the 'book entry'), the very systematic organization of the inquiry, the organization of project content as a network of linked entries, and the ability to search them, may have strengthened such a comparison. They ended up in recurrent doleances about the absence of some topics judged as mandatory in the AIME database (e.g. feminist history, petro-chemicals, etc.) or more broadly criticized as an hegemonic approach to modernity vocabulary, contradictory to the scope of the project. 
We also noticed the project being compared to the archetypal figure of Wikipedia encyclopedia and its corresponding principles of organization and goals. Wikipedia's approaches to *crowdsourcing*, *source citing*, or *content mutability*, were substituted to the project's specific undertakings of these terms, and seem to have produced misaligned requirements about content's management policy and collective organization[#][ See also anomaly family #3.].
Another recurrent digital comparison was done with blogs, whether it be from within the team presenting blogs as an anti-model for the web instances of the project's principles of collaboration, or from external critiques emphasizing the similarities between the two forms -and thus the lack of "originality" of the set-up regarding its claims of exceptionality. Comparison with blogs became the instrument of an evaluation of the project in terms of innovation and its distance to this *conventional* point of reference. It carried along as well its own expectation about the platform modes of collective management, especially through the modes of selection of AIME co-inquirers' contributions - compared to blogs' habitus of allowing more freely for commentary and discussion. 
One last observation regarding the question of templates is related with the scarce reference to scholarly journals, monographs or other academic templates.

We could try to explain the **_{missed connections}_** provoked by the project as a clash between humanities tradition of using (one) text as the main (and only) media to be used for an intellectual argument, while here the team rather bet on multimodal shifts and specifically designed interfaces. But, if we then try to understand them in the specific context of DH experiments, some **_{media-related expectations}_** may also have been caused by the set-up heterogeneity in terms of templates compliance or divergence: on the one hand various generic media and tools used for the project life (twitter, AIME blog, mailing list, google drive meeting materials), and on the other hand the parts which were specifically designed for the inquiry. The latter presented a strong visual and organizational homogeneity (e.g. book and interfaces were presented with the same typesetting and colors, dialoguing with similar visual codes). It could be stated that, firstly, their peculiarity asked for some linking with existing templates, provoking the displacements that we have described. Secondly, that the specifically new artifacts were perceived as being supposed to fulfil every cognitive and intellectual requirements of such a project while some of them, like project discussion and scholarly debate, could (and have) also have been fulfilled by more generic media such as twitter or blogs. 

# Anomaly family #2: interface-driven methodology and its encounters with scholarly publics

<table>
  <tr>
    <td>Device</td>
    <td>Clues</td>
    <td>Anomalies</td>
    <td>Understanding - explanation</td>
  </tr>
  <tr>
    <td>Database of users
Website analytics
Questionnaire
Twitter activity
</td>
    <td>People practicing the whole set-up were more likely to contribute successfully to the project, otherwise people of high digital literacy were the more likely to take advantage of the whole set up

</td>
    <td>The practices proposed to co-inquirers in order to fulfill project's peculiar methodology did not fit with the large spectrum of skills that such an endeavour demanded

{requiring an evolving set of skills}

{unusual blend of practices}
{mismatching of lexical references}
{misaligned set-up practices}
</td>
    <td>The design of specific interfaces for supporting humanities inquiry needs, while being successful on a qualitative plan, proved to demand a certain amount of learning from collaborators, highlighting a tension between interface-driven methodologies and scholars digital literacies level. Relying on complementary, non-digital, instances, helped to engage such readers in complex scenarios of use.</td>
  </tr>
</table>


Once observed and analyzed the different reactions provoked by the AIME, we could focus on the very activity of people engaged with it. The possibility of contributing to the inquiry was meant to be open to diverse practitioners and scholars able to witness the clash between the "modes of existence". This process was **_{requiring an evolving set of skills}_**: the co-inquirers should have known the main inquiry narrative by having reading the report, then navigated through the extended contextual contents on the "book entry". They could bookmark some pieces through a specific functionality. Eventually, they were proposed to contribute by attaching to one part of existing content a production of their own in order to amend/expand the original PI work. 
In this process a huge role role was played by the face-to-face meetings. Comparing the platform overall reading activity and the project events agenda, it seems quite clear that the digital platform activity was correlated to AIME workshops and events agenda. 
Comparing events agenda with the rhythm of contributions on the platform, a similar correlation can be observed. 
Looking, then, at project reading metrics with more details, it can be seen how the "contributions column" was more and more consulted as the project developed and multiplied workshops. These correlations show that the co-inquirers subscribed rather well to the proposed sequence of activities. Accordingly, while looking at the questionnaire sent to platform subscribers it can be seen that [people participating to workshops were more likely to be published and to write contributions](^^modulo-href:Workshops and contributions). Furthermore, most of those who declared to have actually read the report, owned and used a hard-copy of the inquiry and read also the document of the project (VOC and DOC). These is a good indication of AIME multimodal plan of action. It seems that this multimodal awareness was the main condition to have people successfully engaged in the project methodology.



```json
{
    "role" : "modulo-view",
    "title" :"Workshops and contributions",
    "type" : "sankey",
    "data" : "data-nogit/AIME_questionnaire.csv",
    "keys" : [
        "Are you registered on the digital platform ?",
        "Are you female or male ?",
        "How would you rate your digital litteracy ?"
    ]
}
```

The **_{unusual blend of practices} _**required by the project online contribution scenario asked as well to pass through a series of peculiar steps designed to make their intervention become an empirical contribution. To do so -following the suggestion to react to specific parts of the text, rather than addressing general remarks- they were firstly supposed to select an anchor point, being a report or vocabulary word or paragraph, and then attach to it a "contribution"[#][ In order to emphasize the role of empiricism and evidence according to the project's mindest, the "contribution" entity was a composite and constrained format composed of a short abstract and a series of slides presenting commented documents.
]. It is clear that a first condition for being able to contribute was to know how to navigate and get acquainted with the contents available on the web. Users with the highest digital literacy level were able to profit of the writing and bookmarking functionalities. If we look more deeply into the platform database of co-inquirers activity[#][ Collecting personal anonymized information declared at sign-up, and information related to bookmarking and annotation/contribution activity
], it can be clearly seen that these diverse demanding practices were deployed by a rather small part of the community. Furthermore, it can be noticed a correlation between the community of contributors and the community of "bookmarkers", which means that people who had discovered/used one of the website's features were more likely to enter the complete scenario of use that was proposed to them.

Digital literacy[#][ Gilster, Paul. Digital Literacy. New Ed. New York, NY: John Wiley & Sons, 1998.
] proved as well to be an important factor for subscribing to the project methodological affordances of the interface. An insightful clue about the digital literacy required by the project is the observation that none of the respondents declaring to have a low or very low level in this skill wrote a contribution. Similarly, we can observe that people declaring a higher level were more likely to be published on the platform, eventually. Therefore, looking at this questionnaire, it seems that the project overall set-up was well-fitted for a really specific category of users, presenting both content and research-related skills and familiarity with digital environment. Having a look at qualitative feedbacks from the person in charge of managing contributors, some explanations can be found. Besides the difficulty of finding, understanding and using such features[#][ It has to be said that the UI/UX elements for performing this actions is pretty similar to the ones present in the vast majority of reading/annotation softwares and annotations.
], it was demanded a strong intellectual compliance to contribution content organization (an abstract, followed by a series of documents).

Another explanation could rely on the ways of presenting the project features to the reader. While the website was designed to focus attention and help navigating inside a dense network of contents with a neat but packed aspect, it produced at the same time a certain intimidation for the potential contributors. The design of *rhetorical expression*[#][ Buchanan, R. (1985). Declaration by Design: Rhetoric, Argument, and Demonstration in Design Practice. Design Issues, 2(1), 4–22. http://doi.org/10.2307/1511524] developed in the AIME platform granted the access to a huge amount of very sophisticated contents, and simultaneously asked to contribute and expand them.**_ _**While multimodal inquiry and composition seem to be one of the most promising aspect of DH experiments, we have experienced how such an endeavour needed to take into account scholars various digital literacies, and sometimes collided with them: encouraging a specific mindset through very specific interfaces requires a long learning curve and inevitably excludes some users. However, mixing of digital activities with other types of undertaking helps to strengthen on-screen practices and seems to participate to the development of a *multilayered literacy*[#][ Selfe, Cynthia. "Computers in English Departments: The Rhetoric of Technopower." ADE Bulletin 90 (Fall 1988): 63–67.].

# Anomaly family #3: the shock of collaboration's ethoses

<table>
  <tr>
    <td>Devices</td>
    <td>Clues</td>
    <td>Anomalies</td>
    <td>Understanding - explanation</td>
  </tr>
  <tr>
    <td>Team's interview analysis</td>
    <td>People contesting the principle of contribution, both in its goal (helping Latour’s work) and modalities (a closed process)</td>
    <td>People expecting from the web platform to present a transparent and open process of participation
{ethical disjunction}
{ambivalent status identification}
{middle-state publishing}
{personality and status refraction}</td>
    <td>The project website requirements collided with general expectations about scholarly collectives opening thanks to the web
</td>
  </tr>
</table>


The collective and collaborative nature of the AIME project, during a French digital humanities event, was challenged as presenting a certain non-reciprocity between the main authors and contributors: co-inquirers were asked to dedicate a huge amount of time while not clearly enough being acknowledged as genuine contributors to the inquiry. During the meeting, the very principle of contribution was under discussion, as a matter of intellectual work reward.

If we compare the project idea of a contribution to *analogical* academic publishing habitus, the AIME contribution activity is indeed somehow perturbing: it could be framed on the one hand as an open reviewing process -where co-inquirers propose modifications and improvements- and on the other hand as a journal call for contributions, for which accepted submitters get to the status of author. It has to be said that the PI considered contributors to have specific and autonomous interests in the project and a shared -though limited- status of author. Although limited, the acknowledgement of the co-inquirers' authorship has been done by featuring them on platform credits. Probably, the very format of the contributions, a sort of **_{middle-state publishing}_**[#][ Wilcox, S. (2013, June 12). Feed-forward scholarship: Why games studies needs middle-state publishing. First Person Scholar. Retrieved from http://www.firstpersonscholar.com/feed-forward-scholarship/
] between traditional academic contribution and academic blogpost argumentation[#][ See for instance the scientific blogging platform hypotheses: http://hypotheses.org
], coupled with an **_{ambivalent status identification} _**may have caused this difficulty.

The contributions validation process itself has been under discussion. Since asked to comply with a specific research methodology, strategy and empirical protocol, the contributions followed a definite process of mediation and review. They were evaluated and followed by a reduced collective of scholars  acquainted with certain intellectual regions of the inquiry: these peculiar reviewers were labeled as mediators. This distribution provoked some critique. Some co-inquirers argued for the lack of transparency of the process[#][ The AIME team published 2 'AIME leaks' to inform user about the revision process. For instance, see at http://www.modesofexistence.org/answer-to-a-reader-reponse-a-un-lecteur/ the disclosure of a non-published contribution and its justification; and at http://www.modesofexistence.org/contribution-recognizing-the-risk-how-to-navigate-between-att-and-hab a successful contribution email exchanges.
] and questioned the "testability" of AIME methodology as a closed process. Here we face an intellectual critique highlighting an **_{ethical disjunction}_**** **between design project choices and some philosophers advocating for other ways of doing philosophy. 

Other similar **_{ethical disjunction}_** can be seen through the reactions to some public presentations of the project to DH audiences, presenting *closeness* as one of the core values of the project. Closeness was presented as *distance*: a close arguments analysis required as well a *close reading* activity rather than *distant *one[#][ Moretti, Franco. Distant Reading. London; New York: Verso, 2013.]. Closeness was also presented as *focus: *a close arguments analysis required to avoid web browsing casual sequential practices[#][ This concern has been expressed through design choices such as not pointing to external websites inside the digital instances of the project while allowing to embed inside this protected workplace a variety of media and contents coming from external sources.
]. This declarations provoked strong reactions inside DH communities since openness[#][ "The digital is the realm of the : open source, open resources. Anything that attempts to close this space should be recognized for what it is: the enemy." Digital humanities manifesto 2.0, http://manifesto.humanities.ucla.edu/2009/05/29/the-digital-humanities-manifesto-20/ ] is one of the key values to allow humanities to address contemporary issues and reframe their role inside society[#][ Spiro, Lisa. "’This Is Why We Fight:’ Defining the Values of the Digital Humanities." In Debates in the Digital Humanities, edited by Matthew K. Gold. U of Minnesota Press, 2012.].
Although the gap between the ethos of collaboration and closeness claims could be minimized by the fact that the whole inquiry content is freely available to anyone, and that its generated contents (not being formerly copyrighted) are published under Creative Commons license[#][ The websites were nevertheless password protected because of legal reasons concerning quoted documents such as texts and videos, and the source code of digital interfaces was not at first published because it was not reusable as is. At the moment of writing, interfaces are on the process of being open sourced.
], the question of controlling the process of collaboration remains under question. While the team members, interviewed valued, unanimously, the opening of access as mandatory, some others also, argued for the need of a protection to maintain homogeneity and coherence within inquiry. Underneath the values statements discussion laid also a practical tension between the need for a methodological quality and broader political wishes and projects about the scholarly community formation in digital ages. 

On an ethical plan, we have seen that the complex undertaking of the project towards the constitution of a collective body of inquiry provoked important reactions among its publics, that were motivated by several cultural references and agendas (advocates of alternative academy, of open access, of open software…). We see through this anomaly how DH projects may gather under the same roof a broad variety of ethical guidelines and value systems. While openness seems to be a shared value of digital humanists, it seems to us that the expression of such a notion would need somehow to be precisely casted regarding the several underlying meanings it is given[#][ Tkacz, Nathaniel. Wikipedia and the Politics of Openness. The University of Chicago Press, 2015.
], and modeled according to one's project's specific needs and methodological goals.

# Qualifying anomalies for better (understanding of) digital humanities projects

Our critical review of AIME conducted by collecting clues and spotting anomalies helped us to get a better understanding of the reaction coming from different communities of users. In this last part we will focus on operationalising these anomalies to assess, debrief the AIME project itself and hopefully inform future projects transforming them into recommendations, warnings or observational remarks. 

Some anomalies we detected could be seen as *future* *analogies* and *future* *conventions*, they might become a base for *future norms* if reaching a certain level of dissemination[#][We would here follow Canguilhem's definition of anomaly regarding biologic life, as a successful mutation that "spreads into space rather than time" nd sometimes eventually recast as a normativity producer. Here the distinction established by Canguilhem with illness seems highlighting: "Another reason for avoiding confusion between anomaly and disease is that human attention is not sensitized to each as being divergences of the same kind. An anomaly manifests itself in spatial multiplicity, disease, in chronological succession. It is a characteristic of disease that it interrupts a course; in fact it is critical." Canguilhem, Georges. op. cit., 1991 edition, p. 138]. Anomalies like **_{missed connections}_** could be attenuated by the proliferation of multimodal and distributed projects, and the **_{peculiar formatting of practices}_** which was proposed could have been better accepted after a longer period of use.

It is inevitable, for not saying correct from an project ethical point of view, to consider some anomalies as mistakes or even illness, being transgressions of justified norms. These are not able (and for our case, not wished) to come back into any normative status. Such anomalies as **_{template-related expectations}_** and **_{ambivalent status identifications}_** could have been handled in a clearer ways[#][ We could have for instance tried to feature inquiry's contents through a wider range of points of view, acknowledging the work of particular contributors. We could as well have put a priority on providing co-inquirers with a way to reference their work and embed it on other places on the web.]. The understanding of their genesis will inform other projects that would want to walk down similar paths.

Some other anomalies could be qualified as specific, undecidable features. These are not castable into the former categories or linked to any guidelines or recommendations, either because they constitute purely phenomenological (observation-based) anomalies or completely idiosyncratic to the project. They present some features of the project as aspect that will be seen "this way or that way" by one or the other community without any possibility to decide how to cast them. For example, the **_{ethical disjunctions}_** provoked by the project remain still to be discussed, as the **_{matching skills and affordances}_** issue remains attached to a peculiar methodological bet of the project. These are therefore anomalies of epistemological interest, informing about "the ways" digital humanities publics expect and preconceive the artifacts they are dealing with.

In the introduction of his book David M. Berry framed DH latest developments as an anomaly producer agent, allowing to question and challenge humanities traditional values, expectations and methodologies[#][ "Indeed, we could say that third-wave digital humanities points the way in which digital technology highlights the anomalies generated in a humanities research project and which leads to a questioning of the assumptions implicit in such research, e.g. close reading, canon formation, periodization, liberal humanism, etc". Introduction, in Berry, David M. Understanding Digital Humanities. Palgrave Macmillan, 2012.]. Although this assertion is probably crucial for framing DH inside the broader humanities, we could also admit that DH are themselves in a process of normalization or "conventionalization", following necessarily the installation of shared standards, infrastructures, but also values and practices based on the feedback given from the first experiments in the field.
In that sense, DH could be addressed as an anomaly themselves, as the temporary and preliminary sign of an imminent change of paradigm within the humanities. However, we argue that this conception is a perilous move, because it would swipe out the privileged capacity of DH to continuously interrogate, through an experimentation dealing with technical, social and experiential *means*, the very *ends* and groundings on the basis of which research is conducted. As Drucker & al. stated:

*When new norms establish themselves, when new procedures and techniques become naturalized, assumptions can become invisible. […] the new routines that structure this world of practice have the potential to become just as sedimented and automatic as those of the print era, and when they do, they sound the death knell for Digital Humanities as a practice that is both critical and experimental.*

The anomaly-tracking hypothesis seems to be a good antidote to this risk. Anomalous dimensions of DH experiments are essential features for its critical activity towards the contemporary condition of humanistic knowledge. We advocate that they should not be left out for the future developments of the field, but rather deliberately produced and then observed for their reflective qualities. Drawing back to the antique grammarian quarrel at the core of this paper methodological framework, we would like to recommend a little more stoican and a little less aristotelian digital humanities, that is acknowledging that the nature of DH lies less in essential regulating principles than in a corpus of irregularities, tropes or spontaneous moves that give its reflective and transgressive value to Digital Humanities practice.

# Additional sources

Adema, Janneke. "On Open Books and Fluid Humanities." *Scholarly and Research Communication* 3, no. 3 (2012).

Andersen, Christian Ulrik, and Soren Bro Pold, eds. *Interface Criticism: Aesthetics Beyond the Buttons*. Aarhus Denmark: Aarhus University Press, 2011.

Fallen, Camille. *L’anomalie créatrice*. Paris: Kimé, 2012.

Long, Pamela O., and Pamela O. Long. *Openness, Secrecy, Authorship: Technical Arts and the Culture of Knowledge from Antiquity to the Renaissance*. Baltimore: The Johns Hopkins University Press, 2001.
