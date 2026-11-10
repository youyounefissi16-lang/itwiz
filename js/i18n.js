(function () {

const L = {
  en: {
    nav:        { home:'Home', services:'Services', work:'Work', method:'Method', about:'About', contact:'Contact' },
    skip:       "Skip to content",
    hero: {
      tagline:  "Software that moves your business forward",
      title:    "Software that moves<br>your business forward",
      subtitle: "We design and build websites, apps and internal tools that cut the busywork \u2014 so your team can focus on the work that matters.",
      cta: "Start your project", explore: "See our work",
      swarm_skip: "Skip",
      swarm_start: "Rebuilding the page…",
      swarm_done: "The page has been rebuilt."
    },
    services: {
      heading:  "What can we build for you?",
      eyebrow:  "ITWIZ / WHAT WE CREATE",
      sub:      "Pick the closest fit. We'll tell you honestly if another one suits you better.",
      more:     "Learn more",
      dialog:   { kicker:"ITWIZ / SERVICE", create:"What we can create", techHeading:"Tools we might use", cta:"Let's build it", close:"Close" },
      web:      { title:"Websites & Apps",
                  desc:"A fast, modern site or app that makes it easy for people to find you, trust you, and buy from you.",
                  extra:"We build it to load quickly, work on every phone and screen, and grow with you \u2014 so you're not rebuilding in two years. You get a site you can update yourself, and a team that answers when something needs changing.",
                  examples:"Business websites \u00b7 Web platforms & portals \u00b7 Landing pages \u00b7 iOS & Android apps",
                  tech:"React \u00b7 Next.js \u00b7 Flutter \u00b7 Swift \u00b7 TypeScript" },
      ai:       { title:"AI & Automation",
                  desc:"Let software handle the repetitive work \u2014 so your team can spend their time on customers, not copy-paste.",
                  extra:"We look at the tasks that eat your week \u2014 sorting documents, transcribing calls, flagging what needs attention \u2014 and automate the ones worth automating. You keep the final say; the software does the boring part.",
                  examples:"Document & audio processing \u00b7 Transcription \u00b7 Smart workflows \u00b7 Predictive tools",
                  tech:"Python \u00b7 LLMs \u00b7 NLP \u00b7 REST APIs \u00b7 Automation" },
      data:     { title:"Data & Reporting",
                  desc:"One clear view of your numbers \u2014 so decisions stop depending on whose spreadsheet is right.",
                  extra:"We bring your sales, stock and operations data into one place, clean it up, and turn it into the handful of reports you actually check. Less time building spreadsheets, more confidence in the answer.",
                  examples:"Dashboards & reports \u00b7 Data cleanup \u00b7 SQL analysis \u00b7 Spreadsheet automation",
                  tech:"Python \u00b7 SQL \u00b7 PostgreSQL \u00b7 Pandas \u00b7 REST APIs" },
      custom:   { title:"Custom Platforms",
                  desc:"Software shaped around how your team already works \u2014 instead of forcing your team to work around the software.",
                  extra:"Clinics, schools, workshops, shops: we build the dashboards and portals that fit your day, including the parts that have to keep running without internet. Fewer workarounds, fewer mistakes, less time lost.",
                  examples:"Management dashboards \u00b7 Practice & clinic portals \u00b7 E-learning platforms \u00b7 Offline-first LAN sync",
                  tech:"Laravel \u00b7 PHP \u00b7 MySQL \u00b7 PWA \u00b7 REST APIs" }
    },
    work: {
      heading:   "Real projects, shipped and running",
      maitrisez: {
        title: "Ma\u00eetrisez \u2014 Medical Exam Prep",
        constraint: "Medical students were revising from scattered PDFs, with no way to know what examiners actually look for.",
        decision: "One place for practice questions, timed mock exams, course PDFs, progress tracking, and recorded oral answers marked against the key points examiners expect.",
        shipped: "Live at maitrisez.app, with an admin dashboard so the team can manage content and see activity.",
        stack: "React 18 \u00b7 Express \u00b7 MongoDB \u00b7 Clerk \u00b7 Docker",
        li: ["Practice questions and a digital textbook in one app",
             "Oral exams recorded and scored against key points",
             "Progress tracking plus a live admin dashboard"],
      },
      driving: {
        title: "Driving School Platform \u2014 Instructor Edition",
        constraint: "Several instructors, several computers, no server \u2014 and often no internet in the car.",
        decision: "A desktop app installed on the instructors' own computers, syncing everything between them over the local network \u2014 add a device with a QR code, remove one just as easily.",
        shipped: "Students, lesson hours, fees, payments and exam results stay in sync between devices. No cloud account, no monthly bill.",
        stack: "Tauri 2 \u00b7 Rust \u00b7 React 19 \u00b7 TypeScript",
        li: ["A dashboard made for instructors: lesson hours, evaluations, and exam readiness",
             "Everything stays on their own computers, syncing device to device over the local network",
             "Pair a device with a QR code, revoke it just as easily \u2014 no cloud, no monthly bill"],
      },
      dental: {
        title: "Dental Cabinet \u2014 Tulip",
        constraint: "A clinic that can't count on the internet being up \u2014 and can't let patient data leave the building.",
        decision: "A desktop app that keeps the clinic's records in a database on its own network, shared between reception and the treatment rooms.",
        shipped: "Patient records, appointments and billing in one app that works with no internet. Data never leaves the clinic.",
        stack: "Electron \u00b7 React 18 \u00b7 PostgreSQL (PGlite)",
        li: ["Every patient record, treatment history and dental chart in one organised place",
             "Appointments and billing handled inside the app, fully offline",
             "The clinic's own database on its own network \u2014 patient data never leaves the building"],
      },
      checklist: {
        title: "Checklist Audit \u2014 Field Inspections",
        constraint: "Inspectors check kitchens, workshops and warehouses where the internet is unreliable \u2014 and a failed item needs to become a tracked follow-up, not a line in a notebook.",
        decision: "An app that installs from the browser and keeps its records on the inspector's own computer, working with no connection at all and syncing when there is one.",
        shipped: "Zones and criteria, pass/fail thresholds, issues with an owner and a deadline, photo evidence, PDF reports and trends over time. Available as a web app and an Android app, in English and French.",
        stack: "Vanilla JS \u00b7 Service Worker \u00b7 IndexedDB \u00b7 Capacitor",
        li: ["Zones, criteria and inspections with clear pass thresholds",
             "Issues with an owner, a deadline, and a full history",
             "Records live on the inspector's own computer \u2014 no connection needed"],
      },
      hub: {
        title: "Cultural & Sports Hub \u2014 Scheduling",
        constraint: "Each room runs a weekly schedule, but one-off events need to replace an activity for a day \u2014 and cancelling the event must bring the original back.",
        decision: "The app works out the real calendar for each day from the weekly schedule plus any exceptions, without ever touching the original schedule.",
        shipped: "Day, week and month views; edits to one occurrence or a whole series; overlap warnings when two things collide \u2014 and a scheduling engine covered by automated tests.",
        stack: "Electron \u00b7 SQLite \u00b7 FullCalendar \u00b7 esbuild",
        li: ["Each room keeps its own recurring weekly schedule",
             "One-off events replace an activity \u2014 and deleting them brings it back",
             "Overlap warnings when two bookings collide"],
      },
      inventory: {
        title: "InventoryApp \u2014 Stock & Invoicing",
        constraint: "A shop's stock, purchases, customer debts and invoices all have to agree \u2014 and counter staff shouldn't see the admin screens.",
        decision: "A desktop app that keeps everything on the shop's computer, with invoices that keep the prices they were issued at even after a price change.",
        shipped: "Dashboard, stock, checkout, invoices, customers, suppliers, purchase orders, debts, returns, barcode scanner and settings. PDF invoices, backups, staff permissions, and English, French and Arabic. Installs on Windows.",
        stack: "Kotlin \u00b7 Compose Desktop \u00b7 Nitrite \u00b7 PDFBox",
        li: ["Stock, checkout, invoices and PDF receipts in one desktop app",
             "Everything lives on the shop's own computer \u2014 no server, no internet needed",
             "Staff permissions, with English, French and Arabic built in"],
      },
      cover: {
        title: "Every system here started as a brief. Want yours next?",
        cta: "Start yours"
      },
      front: {
        eyebrow: "Selected works",
        title: "Six builds, from brief to launch"
      },
      welcome: {
        eyebrow: "ITWIZ / PORTFOLIO",
        title: "Welcome to the build notebook",
        hint: "Scroll to turn the pages"
      },
      visit: "Visit platform ↗",
      visit_live: "Live product ↗",
      walkthrough: "Request a walkthrough →",
      details: "Details",
      shot_enlarge: "View screenshot full size",
      shot_close: "Close",
      label: {
        constraint: "Constraint",
        decision: "Decision",
        shipped: "Shipped"
      },
      walkthrough_msg: "Hi ITWIZ — I'd like a walkthrough of the {project} platform. Please include access details."
    },
    about: {
      eyebrow: "WHO WE ARE",
      title: "Senior work, without the agency layers.",
      p1: "ITwiz is an independent software studio based in Algeria. We keep the team deliberately small: the engineer who scopes your project is the engineer who builds it, and the person who answers your email is the person who wrote the code.",
      p2: "We're at our best on the systems a business depends on every day \u2014 the ones that have to keep working when the internet drops, keep data private, and still be running years from now.",
      c1: "One point of contact",
      c2: "Scope and price agreed before work starts",
      c3: "You own the code and the accounts",
      c4: "A reply within one business day",
      note: "We take on a small number of projects at a time. Ask for references, or a walkthrough of any project here."
    },
    method: {
      eyebrow:  "ITWIZ / THE METHOD",
      heading:  "How we work",
      sub:      "Four steps, from first call to launch.",
      discover: { title:"Discover", desc:"We listen first: your goals, your customers, and what's getting in the way \u2014 then agree on what success looks like." },
      design:   { title:"Design",   desc:"We sketch the screens and the flow, so you can see and approve the product before we build it." },
      build:    { title:"Build",    desc:"We build in short rounds and show you working software as we go \u2014 no surprises at the end." },
      launch:   { title:"Launch",   desc:"We test, deploy, and hand over the keys \u2014 then we stay reachable for questions and fixes." }
    },
    contact: {
      title:         "Ready to make<br>it real?",
      btn:           "Contact Us",
      lead:          "Tell us what's slowing you down. We'll reply with an honest answer \u2014 including if we're not the right fit.",
      call_label:    "Call us directly",
      whatsapp_label:"WhatsApp",
      telegram_label:"Telegram",
      email_label:   "Email",
      form: {
        name_label: "Your name",
        name_ph: "Ada Lovelace",
        email_label: "Email",
        email_ph: "ada@company.com",
        email_error: "That email doesn't look right.",
        email_typo: "Did you mean {email}?",
        type_label: "What are we building?",
        type_none: "Select one…",
        type_web: "Web & Mobile",
        type_ai: "AI & Automation",
        type_data: "Data & Reporting",
        type_custom: "Custom Platforms",
        type_undecided: "Not sure yet",
        message_label: "Tell us about the project",
        message_ph: "What problem are we solving, for whom, and what does success look like?",
        submit: "Send the brief",
        sending: "Sending…",
        mail_subject: "Project brief",
        success_title: "Brief received.",
        success_text: "We'll reply to {email} within one business day.",
        success_edit: "Wrong email? Edit",
        consent: "We only use these details to reply to your brief. Never sold, never used for marketing. <a href=\"privacy.html\">Privacy notice</a>"
      }
    },
    footer: "ITwiz \u2014 Code Magic into Reality",
    footer_legal: "ITwiz \u2014 Independent software studio, Algeria",
    footer_privacy: "Privacy notice",
    band:   { text: "Let\u2019s build something extraordinary \u2722 Design \u00b7 Engineering \u00b7 Intelligence \u2722" },
    dialogue: {
      hero: [
        "Welcome to ITWIZ \u2728",
        "Software that works as hard as you do.",
        "Scroll to see what we've built."
      ],
      services: [
        "Four things we can build for you.",
        "Pick what fits.",
        "Hover to peek inside."
      ],
      work: [
        "Six builds, from brief to launch.",
        "Keep scrolling \u2014 the pages turn themselves.",
        "Every one of these started as a brief."
      ],
      method: [
        "From brief to launch, in four moves.",
        "Discover. Design. Build. Launch."
      ],
      contact: [
        "Tell us what you're building.",
        "Every build starts as a brief. Yours next?",
        "Start the conversation."
      ],
      about: [
        "Independent. Direct. Close to the code.",
        "No account managers. No handoffs."
      ],
      "card-web": [
        "Sites that turn visitors into customers.",
        "Fast on every device."
      ],
      "card-ai": [
        "The repetitive work, done for you.",
        "You keep the final say."
      ],
      "card-data": [
        "Numbers that answer questions.",
        "Dashboards built on your data."
      ],
      "card-custom": [
        "Built around your workflow.",
        "Fitted to clinics, schools, and teams."
      ],
      "card-maitrisez": [
        "Oral exams, scored to criteria.",
        "QCM, mock exams, and a PDF library."
      ],
      "card-driving": [
        "Works with no internet.",
        "Built for instructors, not dashboards."
      ],
      "card-dental": [
        "Records that stay tidy.",
        "Scheduling and billing, handled."
      ],
      idle: [
        "Need a hand?",
        "Hover a card. It flips.",
        "Scroll \u2014 the notebook does the rest.",
        "Six projects. All shipped.",
        "Every build starts like this: a brief.",
        "Say the word, and we start."
      ],
      linger_hero:     ["Scroll to see more! \uD83D\uDC47"],
      linger_services: ["Hover to peek inside"],
      linger_work:     ["Keep scrolling \u2014 pages turn themselves"],
      linger_method:   ["Discover \u2192 design \u2192 build \u2192 launch"],
      linger_about:    ["The engineer who scopes it builds it"],
      linger_contact:  ["Ready when you are \u2709"]
    }
  },

  fr: {
    nav:        { home:'Accueil', services:'Services', work:'R\u00e9alisations', method:'M\u00e9thode', about:'\u00c0 propos', contact:'Contact' },
    skip:       "Aller au contenu",
    hero: {
      tagline:  "Un logiciel qui fait avancer votre entreprise",
      title:    "Un logiciel qui fait avancer<br>votre entreprise",
      subtitle: "Nous concevons et construisons des sites, des applications et des outils internes qui vous d\u00e9barrassent des t\u00e2ches r\u00e9p\u00e9titives \u2014 pour que votre \u00e9quipe se concentre sur le travail qui compte vraiment.",
      cta: "Lancez votre projet", explore: "Voir nos r\u00e9alisations",
      swarm_skip: "Passer",
      swarm_start: "Reconstruction de la page…",
      swarm_done: "La page a \u00e9t\u00e9 reconstruite."
    },
    services: {
      heading:  "Que pouvons-nous cr\u00e9er pour vous ?",
      eyebrow:  "ITWIZ / CE QUE NOUS CR\u00c9ONS",
      sub:      "Choisissez ce qui s'en rapproche le plus. Si une autre solution vous convient mieux, nous vous le dirons franchement.",
      more:     "En savoir plus",
      dialog:   { kicker:"ITWIZ / SERVICE", create:"Ce que nous pouvons cr\u00e9er", techHeading:"Outils que nous pourrions utiliser", cta:"Construisons-le", close:"Fermer" },
      web:      { title:"Sites & Applications",           desc:"Un site ou une application rapide et moderne qui permet \u00e0 vos clients de vous trouver, de vous faire confiance et d'acheter chez vous en toute simplicit\u00e9.",
                  extra:"Nous le construisons pour qu'il se charge vite, fonctionne sur tous les t\u00e9l\u00e9phones et tous les \u00e9crans, et grandisse avec vous \u2014 pas besoin de tout refaire dans deux ans. Vous recevez un site que vous pouvez mettre \u00e0 jour vous-m\u00eame, et une \u00e9quipe qui r\u00e9pond quand quelque chose doit changer.",
                  examples:"Sites d'entreprise \u00b7 Plateformes & portails web \u00b7 Pages d'atterrissage \u00b7 Applis iOS & Android",
                  tech:"React \u00b7 Next.js \u00b7 Flutter \u00b7 Swift \u00b7 TypeScript" },
      ai:       { title:"IA & Automatisation",      desc:"Laissez le logiciel g\u00e9rer le travail r\u00e9p\u00e9titif \u2014 votre \u00e9quipe garde son temps pour les clients, pas pour le copier-coller.",
                  extra:"Nous regardons les t\u00e2ches qui occupent votre semaine \u2014 trier des documents, transcrire des appels, rep\u00e9rer ce qui demande une action \u2014 et nous automatisons celles qui valent le coup. Vous gardez la d\u00e9cision finale ; le logiciel s'occupe de la partie p\u00e9nible.",
                  examples:"Traitement de documents & audio \u00b7 Transcription \u00b7 Workflows intelligents \u00b7 Outils pr\u00e9dictifs",
                  tech:"Python \u00b7 LLMs \u00b7 NLP \u00b7 REST APIs \u00b7 Automation" },
      data:     { title:"Donn\u00e9es & Reportings", desc:"Une vue claire de vos chiffres \u2014 fini les d\u00e9cisions qui d\u00e9pendent du tableur qui a raison.",
                  extra:"Nous r\u00e9unissons vos donn\u00e9es de ventes, de stock et d'op\u00e9rations au m\u00eame endroit, nous les nettoyons, et nous les transformons en la poign\u00e9e de rapports que vous consultez vraiment. Moins de temps \u00e0 construire des tableurs, plus de confiance dans la r\u00e9ponse.",
                  examples:"Tableaux de bord & rapports \u00b7 Nettoyage de donn\u00e9es \u00b7 Analyse SQL \u00b7 Automatisation des tableurs",
                  tech:"Python \u00b7 SQL \u00b7 PostgreSQL \u00b7 Pandas \u00b7 REST APIs" },
      custom:   { title:"Plateformes sur mesure",     desc:"Un logiciel fa\u00e7onn\u00e9 autour de votre fa\u00e7on de travailler \u2014 au lieu de forcer votre \u00e9quipe \u00e0 contourner le logiciel.",
                  extra:"Cliniques, \u00e9coles, ateliers, boutiques : nous construisons les tableaux de bord et portails qui correspondent \u00e0 votre quotidien, y compris les parties qui doivent continuer \u00e0 fonctionner sans internet. Moins de bricolages, moins d'erreurs, moins de temps perdu.",
                  examples:"Tableaux de bord \u00b7 Portails m\u00e9dicaux \u00b7 Plateformes e-learning \u00b7 Sync LAN hors ligne",
                  tech:"Laravel \u00b7 PHP \u00b7 MySQL \u00b7 PWA \u00b7 REST APIs" }
    },
    work: {
      heading:   "Des projets r\u00e9els, livr\u00e9s et en service",
      maitrisez: {
        title: "Ma\u00eetrisez \u2014 Pr\u00e9paration aux examens de m\u00e9decine",
        constraint: "Des \u00e9tudiants en m\u00e9decine r\u00e9visaient \u00e0 partir de PDF \u00e9parpill\u00e9s, sans savoir ce que les examinateurs attendent vraiment.",
        decision: "Un seul endroit pour les questions d'entra\u00eenement, les examens blancs chronom\u00e9tr\u00e9s, les PDF de cours, le suivi de progression, et des r\u00e9ponses orales enregistr\u00e9es not\u00e9es sur les points attendus par les examinateurs.",
        shipped: "En ligne sur maitrisez.app, avec un tableau de bord d'administration pour g\u00e9rer le contenu et suivre l'activit\u00e9.",
        stack: "React 18 \u00b7 Express \u00b7 MongoDB \u00b7 Clerk \u00b7 Docker",
        li: ["Questions d'entra\u00eenement et manuel num\u00e9rique dans une seule appli",
             "Examens oraux enregistr\u00e9s et not\u00e9s sur les points attendus",
             "Suivi de progression et tableau de bord d'administration en direct"],
      },
      driving: {
        title: "Plateforme Auto-\u00c9cole \u2014 Version Moniteur",
        constraint: "Plusieurs instructeurs, plusieurs ordinateurs, aucun serveur \u2014 et souvent pas d'internet dans la voiture.",
        decision: "Une application install\u00e9e sur les ordinateurs des instructeurs, qui synchronise tout entre eux via le r\u00e9seau local \u2014 on ajoute un appareil par QR code, et on le retire tout aussi simplement.",
        shipped: "\u00c9l\u00e8ves, heures de conduite, frais, paiements et r\u00e9sultats d'examen restent synchronis\u00e9s entre les appareils. Pas de compte cloud, pas d'abonnement mensuel.",
        stack: "Tauri 2 \u00b7 Rust \u00b7 React 19 \u00b7 TypeScript",
        li: ["Un tableau de bord pens\u00e9 pour les moniteurs : heures, \u00e9valuations, pr\u00e9paration aux examens",
             "Tout reste sur leurs propres ordinateurs, synchronis\u00e9 d'un appareil \u00e0 l'autre sur le r\u00e9seau local",
             "Appairer un appareil par QR code, le r\u00e9voquer tout aussi simplement \u2014 ni cloud ni abonnement"],
      },
      dental: {
        title: "Dental Cabinet \u2014 Tulip",
        constraint: "Un cabinet qui ne peut pas compter sur internet \u2014 et ne peut pas laisser les donn\u00e9es patients sortir du b\u00e2timent.",
        decision: "Une application install\u00e9e au cabinet, qui garde les dossiers dans une base sur le r\u00e9seau du cabinet lui-m\u00eame, partag\u00e9e entre l'accueil et les salles de soins.",
        shipped: "Dossiers patients, rendez-vous et facturation dans une seule appli qui fonctionne sans internet. Les donn\u00e9es ne quittent jamais le cabinet.",
        stack: "Electron \u00b7 React 18 \u00b7 PostgreSQL (PGlite)",
        li: ["Chaque dossier patient, historique de traitement et sch\u00e9ma dentaire au m\u00eame endroit",
             "Rendez-vous et facturation g\u00e9r\u00e9s dans l'appli, enti\u00e8rement hors ligne",
             "La base appartient au cabinet, sur son propre r\u00e9seau \u2014 les donn\u00e9es patients ne sortent jamais du b\u00e2timent"],
      },
      checklist: {
        title: "Checklist Audit \u2014 Inspections de terrain",
        constraint: "Les inspecteurs contr\u00f4lent des cuisines, des ateliers et des entrep\u00f4ts o\u00f9 internet n'est pas fiable \u2014 et un point non conforme doit devenir un suivi trac\u00e9, pas une note dans un carnet.",
        decision: "Une appli qui s'installe depuis le navigateur et garde ses dossiers sur l'ordinateur de l'inspecteur m\u00eame : fonctionne sans aucune connexion, et se synchronise quand il y en a une.",
        shipped: "Zones et crit\u00e8res, seuils de r\u00e9ussite clairs, non-conformit\u00e9s avec un responsable et une \u00e9ch\u00e9ance, preuves photo, rapports PDF et tendances dans le temps. Disponible en appli web et appli Android, en anglais et en fran\u00e7ais.",
        stack: "Vanilla JS \u00b7 Service Worker \u00b7 IndexedDB \u00b7 Capacitor",
        li: ["Zones, crit\u00e8res et inspections avec des seuils clairs",
             "Non-conformit\u00e9s avec responsable, \u00e9ch\u00e9ance et historique complet",
             "Les dossiers restent sur l'ordinateur de l'inspecteur \u2014 aucune connexion requise"],
      },
      hub: {
        title: "Cultural & Sports Hub \u2014 Planification",
        constraint: "Chaque salle a son emploi du temps hebdomadaire, mais un \u00e9v\u00e9nement ponctuel doit remplacer une activit\u00e9 pour un jour \u2014 et annuler l'\u00e9v\u00e9nement doit rendre l'activit\u00e9 d'origine.",
        decision: "L'appli calcule le vrai calendrier de chaque jour \u00e0 partir de l'emploi du temps hebdomadaire et des exceptions, sans jamais toucher \u00e0 l'emploi du temps d'origine.",
        shipped: "Vues jour, semaine et mois ; modifications pour une seule occurrence ou toute la s\u00e9rie ; alertes en cas de chevauchement \u2014 et un moteur de planification couvert par des tests automatis\u00e9s.",
        stack: "Electron \u00b7 SQLite \u00b7 FullCalendar \u00b7 esbuild",
        li: ["Chaque salle garde son emploi du temps hebdomadaire r\u00e9current",
             "Un \u00e9v\u00e9nement ponctuel remplace une activit\u00e9 \u2014 le supprimer la fait r\u00e9appara\u00eetre",
             "Alertes quand deux r\u00e9servations se chevauchent"],
      },
      inventory: {
        title: "InventoryApp \u2014 Stock & Facturation",
        constraint: "Le stock, les achats, les dettes clients et les factures d'une boutique doivent concorder \u2014 et la personne \u00e0 la caisse ne doit pas voir les \u00e9crans d'administration.",
        decision: "Une application install\u00e9e sur l'ordinateur de la boutique, avec des factures qui gardent les prix du jour o\u00f9 elles ont \u00e9t\u00e9 \u00e9mises, m\u00eame apr\u00e8s un changement de tarif.",
        shipped: "Tableau de bord, stock, caisse, factures, clients, fournisseurs, commandes d'achat, dettes, retours, scanner de codes-barres et r\u00e9glages. Factures PDF, sauvegardes, permissions du personnel, interface en anglais, fran\u00e7ais et arabe. S'installe sous Windows.",
        stack: "Kotlin \u00b7 Compose Desktop \u00b7 Nitrite \u00b7 PDFBox",
        li: ["Stock, caisse, factures et PDF dans une seule appli desktop",
             "Tout vit sur l'ordinateur de la boutique \u2014 ni serveur ni internet requis",
             "Permissions du personnel, interface en anglais, fran\u00e7ais et arabe"],
      },
      cover: {
        title: "Chaque syst\u00e8me ici a commenc\u00e9 par un brief. Et le v\u00f4tre ?",
        cta: "Lancez le v\u00f4tre"
      },
      front: {
        eyebrow: "Travaux s\u00e9lectionn\u00e9s",
        title: "Six projets, du brief au lancement"
      },
      welcome: {
        eyebrow: "ITWIZ / PORTFOLIO",
        title: "Bienvenue dans le carnet des r\u00e9alisations",
        hint: "D\u00e9filez pour tourner les pages"
      },
      visit: "Visiter la plateforme ↗",
      visit_live: "Produit en ligne ↗",
      walkthrough: "Demander une d\u00e9mo →",
      details: "D\u00e9tails",
      shot_enlarge: "Afficher la capture en taille r\u00e9elle",
      shot_close: "Fermer",
      label: {
        constraint: "Contrainte",
        decision: "D\u00e9cision",
        shipped: "Livr\u00e9"
      },
      walkthrough_msg: "Bonjour ITWIZ — je souhaite une d\u00e9monstration de la plateforme {project}. Merci d'inclure les acc\u00e8s."
    },
    about: {
      eyebrow: "QUI NOUS SOMMES",
      title: "Un travail d'expert, sans les couches d'agence.",
      p1: "ITwiz est un studio logiciel ind\u00e9pendant bas\u00e9 en Alg\u00e9rie. Nous gardons une \u00e9quipe volontairement petite : l'ing\u00e9nieur qui cadre votre projet est celui qui le construit, et la personne qui r\u00e9pond \u00e0 votre e-mail a \u00e9crit le code.",
      p2: "Nous sommes \u00e0 notre meilleur sur les syst\u00e8mes dont une entreprise d\u00e9pend chaque jour \u2014 ceux qui continuent de fonctionner quand internet tombe, gardent les donn\u00e9es priv\u00e9es, et tournent encore dans des ann\u00e9es.",
      c1: "Un seul interlocuteur",
      c2: "P\u00e9rim\u00e8tre et prix fix\u00e9s avant le d\u00e9but des travaux",
      c3: "Vous \u00eates propri\u00e9taire du code et des comptes",
      c4: "R\u00e9ponse sous un jour ouvr\u00e9",
      note: "Nous prenons un nombre limit\u00e9 de projets \u00e0 la fois. R\u00e9f\u00e9rences et d\u00e9monstration disponibles sur demande."
    },
    method: {
      eyebrow:  "ITWIZ / LA M\u00c9THODE",
      heading:  "Comment nous travaillons",
      sub:      "Quatre \u00e9tapes, du premier appel au lancement.",
      discover: { title:"D\u00e9couvrir", desc:"D'abord, nous \u00e9coutons : vos objectifs, vos clients, ce qui vous freine \u2014 puis nous nous mettons d'accord sur \u00e0 quoi ressemble la r\u00e9ussite." },
      design:   { title:"Concevoir",  desc:"Nous dessinons les \u00e9crans et le parcours, pour que vous puissiez voir et valider le produit avant sa construction." },
      build:    { title:"Construire", desc:"Nous construisons par \u00e9tapes courtes et vous montrons le logiciel qui fonctionne au fil de l'eau \u2014 aucune surprise \u00e0 la fin." },
      launch:   { title:"Lancer",     desc:"Nous testons, d\u00e9ployons et vous remettons les cl\u00e9s \u2014 puis nous restons joignables pour vos questions et corrections." }
    },
    contact: {
      title:         "Pr\u00eat \u00e0 passer<br>au concret ?",
      btn:           "Contactez-nous",
      lead:          "Dites-nous ce qui vous ralentit. Nous r\u00e9pondrons franchement \u2014 y compris si nous ne sommes pas le bon choix.",
      call_label:    "Appelez-nous",
      whatsapp_label:"WhatsApp",
      telegram_label:"Telegram",
      email_label:   "E-mail",
      form: {
        name_label: "Votre nom",
        name_ph: "Ada Lovelace",
        email_label: "E-mail",
        email_ph: "ada@entreprise.com",
        email_error: "Cet e-mail semble incorrect.",
        email_typo: "Vouliez-vous dire {email} ?",
        type_label: "Que construisons-nous ?",
        type_none: "Choisissez…",
        type_web: "Web & mobile",
        type_ai: "IA & Automatisation",
        type_data: "Données & Reportings",
        type_custom: "Plateformes sur mesure",
        type_undecided: "Pas encore sûr",
        message_label: "Parlez-nous du projet",
        message_ph: "Quel problème résout-on, pour qui, et à quoi ressemble le succès ?",
        submit: "Envoyer le brief",
        sending: "Envoi…",
        mail_subject: "Brief projet",
        success_title: "Brief reçu.",
        success_text: "Nous r\u00e9pondrons \u00e0 {email} sous un jour ouvr\u00e9.",
        success_edit: "Mauvaise adresse ? Modifier",
        consent: "Ces informations servent uniquement à répondre à votre brief. Jamais vendues, jamais utilisées pour du marketing. <a href=\"privacy-fr.html\">Notice de confidentialité</a>"
      }
    },
    footer: "ITwiz \u2014 Transformons le code en magie",
    footer_legal: "ITwiz \u2014 Studio logiciel ind\u00e9pendant, Alg\u00e9rie",
    footer_privacy: "Notice de confidentialité",
    band:   { text: "Construisons quelque chose d\u2019extraordinaire \u2722 Design \u00b7 Ing\u00e9nierie \u00b7 Intelligence \u2722" },
    dialogue: {
      hero: [
        "Bienvenue chez ITWIZ \u2728",
        "Le logiciel sur lequel votre entreprise tourne.",
        "D\u00e9filez pour voir ce que nous avons construit."
      ],
      services: [
        "Quatre choses que nous pouvons cr\u00e9er pour vous.",
        "Choisissez ce qui vous convient.",
        "Survolez pour jeter un \u0153il."
      ],
      work: [
        "Six projets, du brief au lancement.",
        "Continuez \u2014 les pages tournent toutes seules.",
        "Chacun a commenc\u00e9 par un brief."
      ],
      method: [
        "Du brief au lancement, en quatre temps.",
        "D\u00e9couvrir. Concevoir. Construire. Lancer."
      ],
      contact: [
        "Dites-nous ce que vous construisez.",
        "Chaque projet commence par un brief. Et le v\u00f4tre ?",
        "Lancez la conversation."
      ],
      about: [
        "Ind\u00e9pendant. Direct. Pr\u00e8s du code.",
        "Pas de charg\u00e9 de comptes. Pas d'interm\u00e9diaires."
      ],
      "card-web": [
        "Des sites qui transforment vos visiteurs en clients.",
        "Rapide sur tous les appareils."
      ],
      "card-ai": [
        "Le travail r\u00e9p\u00e9titif, fait pour vous.",
        "Vous gardez la d\u00e9cision finale."
      ],
      "card-data": [
        "Des chiffres qui r\u00e9pondent.",
        "Des tableaux de bord sur vos donn\u00e9es."
      ],
      "card-custom": [
        "Pens\u00e9 autour de votre flux de travail.",
        "Sur mesure pour cliniques, \u00e9coles et \u00e9quipes."
      ],
      "card-maitrisez": [
        "Examens oraux not\u00e9s selon crit\u00e8res.",
        "QCM, examens blancs et biblioth\u00e8que PDF."
      ],
      "card-driving": [
        "Fonctionne sans internet.",
        "Con\u00e7u pour les moniteurs, pas les dashboards."
      ],
      "card-dental": [
        "Des dossiers qui restent bien rang\u00e9s.",
        "Planning et facturation, g\u00e9r\u00e9s."
      ],
      idle: [
        "Un petit coup de main ?",
        "Survolez une carte. Elle se retourne.",
        "D\u00e9filez \u2014 le carnet fait le reste.",
        "Six projets. Tous livr\u00e9s.",
        "Tout projet commence ainsi : par un brief.",
        "Un mot, et nous commen\u00e7ons."
      ],
      linger_hero:     ["D\u00e9filez pour voir plus \uD83D\uDC47"],
      linger_services: ["Survolez pour jeter un \u0153il"],
      linger_work:     ["Continuez \u2014 les pages tournent toutes seules"],
      linger_method:   ["D\u00e9couvrir \u2192 concevoir \u2192 construire \u2192 lancer"],
      linger_about:    ["Celui qui cadre le projet le construit"],
      linger_contact:  ["Pr\u00eat quand vous l\u2019\u00eates \u2709"]
    }
  },

  ar: {
    nav:        { home:'\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629', services:'\u0627\u0644\u062e\u062f\u0645\u0627\u062a', work:'\u0623\u0639\u0645\u0627\u0644\u0646\u0627', method:'\u0627\u0644\u0645\u0646\u0647\u062c\u064a\u0629', about:'\u0645\u0646 \u0646\u062d\u0646', contact:'\u0627\u062a\u0635\u0644 \u0628\u0646\u0627' },
    skip:       "\u062a\u062e\u0637\u0649 \u0625\u0644\u0649 \u0627\u0644\u0645\u062d\u062a\u0648\u0649",
    hero: {
      tagline:  "\u0628\u0631\u0645\u062c\u064a\u0627\u062a \u062a\u062f\u0641\u0639 \u0639\u0645\u0644\u0643 \u0625\u0644\u0649 \u0627\u0644\u0623\u0645\u0627\u0645",
      title:    "\u0628\u0631\u0645\u062c\u064a\u0627\u062a \u062a\u062f\u0641\u0639<br>\u0639\u0645\u0644\u0643 \u0625\u0644\u0649 \u0627\u0644\u0623\u0645\u0627\u0645",
      subtitle: "\u0646\u0635\u0645\u0645 \u0648\u0646\u0628\u0646\u064a \u0645\u0648\u0627\u0642\u0639 \u0648\u062a\u0637\u0628\u064a\u0642\u0627\u062a \u0648\u0623\u062f\u0648\u0627\u062a \u062f\u0627\u062e\u0644\u064a\u0629 \u062a\u064f\u062e\u0644\u0651\u0635 \u0641\u0631\u064a\u0642\u0643 \u0645\u0646 \u0627\u0644\u0623\u0639\u0645\u0627\u0644 \u0627\u0644\u0645\u062a\u0643\u0631\u0631\u0629 \u2014 \u0644\u064a\u062a\u0641\u0631\u0651\u063a \u0641\u0631\u064a\u0642\u0643 \u0644\u0644\u0639\u0645\u0644 \u0627\u0644\u0630\u064a \u064a\u0647\u0645 \u0641\u0639\u0644\u064b\u0627.",
      cta: "\u0627\u0628\u062f\u0623 \u0645\u0634\u0631\u0648\u0639\u0643", explore: "\u0634\u0627\u0647\u062f \u0623\u0639\u0645\u0627\u0644\u0646\u0627",
      swarm_skip: "\u062a\u062e\u0637\u064a",
      swarm_start: "\u064a\u062c\u0631\u064a \u0625\u0639\u0627\u062f\u0629 \u0628\u0646\u0627\u0621 \u0627\u0644\u0635\u0641\u062d\u0629\u2026",
      swarm_done: "\u062a\u0645 \u0625\u0639\u0627\u062f\u0629 \u0628\u0646\u0627\u0621 \u0627\u0644\u0635\u0641\u062d\u0629."
    },
    services: {
      heading:  "\u0645\u0627\u0630\u0627 \u064a\u0645\u0643\u0646\u0646\u0627 \u0623\u0646 \u0646\u0628\u0646\u064a \u0644\u0643\u061f",
      eyebrow:  "ITWIZ / \u0645\u0627 \u0646\u0635\u0646\u0639\u0647",
      sub:      "\u0627\u062e\u062a\u0631 \u0627\u0644\u0623\u0642\u0631\u0628 \u0644\u0627\u062d\u062a\u064a\u0627\u062c\u0643. \u0625\u0646 \u0643\u0627\u0646 \u062e\u064a\u0627\u0631\u0627\u064b \u0622\u062e\u0631 \u0623\u0646\u0633\u0628 \u0644\u0643\u060c \u0633\u0646\u0642\u0648\u0644\u0647\u0627 \u0644\u0643 \u0628\u0635\u0631\u0627\u062d\u0629.",
      more:     "\u0627\u0643\u062a\u0634\u0641 \u0627\u0644\u0645\u0632\u064a\u062f",
      dialog:   { kicker:"ITWIZ / SERVICE", create:"\u0645\u0627 \u064a\u0645\u0643\u0646\u0646\u0627 \u0625\u0646\u0634\u0627\u0624\u0647", techHeading:"\u0623\u062f\u0648\u0627\u062a \u0642\u062f \u0646\u0633\u062a\u062e\u062f\u0645\u0647\u0627", cta:"\u0644\u0646\u0628\u0646\u0650\u0647 \u0645\u0639\u0627\u064b", close:"\u0625\u063a\u0644\u0627\u0642" },
      web:      { title:"\u0627\u0644\u0645\u0648\u0627\u0642\u0639 \u0648\u0627\u0644\u062a\u0637\u0628\u064a\u0642\u0627\u062a",  desc:"\u0645\u0648\u0642\u0639 \u0623\u0648 \u062a\u0637\u0628\u064a\u0642 \u0633\u0631\u064a\u0639 \u0648\u0639\u0635\u0631\u064a \u064a\u062c\u0639\u0644 \u0645\u0646 \u0627\u0644\u0633\u0647\u0644 \u0623\u0646 \u064a\u062c\u062f\u0648\u0643\u060c \u0648\u064a\u062b\u0642\u0648\u0627 \u0628\u0643\u060c \u0648\u064a\u0634\u062a\u0631\u0648\u0627 \u0645\u0646\u0643.",
                  extra:"\u0646\u0628\u0646\u064a\u0647 \u0644\u064a\u064f\u062d\u0645\u0651\u0644 \u0628\u0633\u0631\u0639\u0629\u060c \u0648\u064a\u0639\u0645\u0644 \u0639\u0644\u0649 \u0643\u0644 \u0627\u0644\u0647\u0648\u0627\u062a\u0641 \u0648\u0627\u0644\u0634\u0627\u0634\u0627\u062a\u060c \u0648\u064a\u0646\u0645\u0648 \u0645\u0639\u0643 \u2014 \u0641\u0644\u0627 \u062a\u062d\u062a\u0627\u062c \u0644\u0625\u0639\u0627\u062f\u0629 \u0628\u0646\u0627\u0626\u0647 \u0645\u0639 \u0627\u0644\u0646\u0645\u0648. \u062a\u062d\u0635\u0644 \u0639\u0644\u0649 \u0645\u0648\u0642\u0639 \u064a\u0645\u0643\u0646\u0643 \u062a\u062d\u062f\u064a\u062b\u0647 \u0628\u0646\u0641\u0633\u0643\u060c \u0648\u0641\u0631\u064a\u0642 \u064a\u0631\u062f \u0639\u0644\u064a\u0643 \u0645\u062a\u0649 \u0627\u062d\u062a\u062c\u062a \u062a\u063a\u064a\u064a\u0631\u064b\u0627.",
                  examples:"\u0645\u0648\u0627\u0642\u0639 \u0634\u0631\u0643\u0627\u062a \u00b7 \u0645\u0646\u0635\u0627\u062a \u0648\u0645\u0648\u0627\u0642\u0639 \u0648\u064a\u0628 \u00b7 \u0635\u0641\u062d\u0627\u062a \u0647\u0628\u0648\u0637 \u00b7 \u062a\u0637\u0628\u064a\u0642\u0627\u062a iOS \u0648Android",
                  tech:"React \u00b7 Next.js \u00b7 Flutter \u00b7 Swift \u00b7 TypeScript" },
      ai:       { title:"\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0648\u0627\u0644\u0623\u062a\u0645\u062a\u0629", desc:"\u062f\u0639 \u0627\u0644\u0628\u0631\u0645\u062c\u064a\u0627\u062a \u062a\u062a\u0648\u0644\u0649 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062a\u0643\u0631\u0631 \u2014 \u0644\u064a\u0642\u0636\u064a \u0641\u0631\u064a\u0642\u0643 \u0648\u0642\u062a\u0647 \u0645\u0639 \u0627\u0644\u0639\u0645\u0644\u0627\u0621\u060c \u0644\u0627 \u0641\u064a \u0627\u0644\u0646\u0633\u062e \u0648\u0627\u0644\u0644\u0635\u0642.",
                  extra:"\u0646\u0646\u0637\u0631\u0650\u062d\u064f \u0627\u0644\u0645\u0647\u0627\u0645 \u0627\u0644\u062a\u064a \u062a\u0633\u062a\u0647\u0644\u0643 \u0623\u0633\u0628\u0648\u0639\u0643 \u2014 \u062a\u0631\u062a\u064a\u0628 \u0627\u0644\u0645\u0633\u062a\u0646\u062f\u0627\u062a\u060c \u062a\u0641\u0631\u064a\u063a \u0627\u0644\u0645\u0643\u0627\u0644\u0645\u0627\u062a \u0635\u0648\u062a\u064a\u0627\u064b\u060c \u0648\u062a\u062d\u062f\u064a\u062f \u0645\u0627 \u064a\u062d\u062a\u0627\u062c \u0625\u0644\u0649 \u0625\u062c\u0631\u0627\u0621 \u2014 \u0648\u0646\u0623\u062a\u0645\u062a \u0645\u0627 \u064a\u0633\u062a\u062d\u0642 \u0627\u0644\u0623\u062a\u0645\u062a\u0629. \u0627\u0644\u0642\u0631\u0627\u0631 \u0627\u0644\u0646\u0647\u0627\u0626\u064a \u0644\u0643\u061b \u0648\u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062c \u064a\u062a\u0643\u0641\u0644 \u0628\u0627\u0644\u062c\u0632\u0621 \u0627\u0644\u0645\u0645\u0644.",
                  examples:"معالجة مستندات وصوت · تفريغ صوتي · سير عمل ذكية · أدوات تنبؤية",
                  tech:"Python \u00b7 LLMs \u00b7 NLP \u00b7 REST APIs \u00b7 Automation" },
      data:     { title:"البيانات والتقارير", desc:"صورة واحدة واضحة لأرقامك — حتى تتوقف القرارات عن الاعتماد على أي جدول هو الصحيح.",
                  extra:"نجمع بيانات مبيعاتك ومخزونك وعملياتك في مكان واحد، وننقّيها، ونحوّلها إلى القليل من التقارير التي تفحصها فعلًا. وقت أقل في بناء الجداول، وثقة أكبر في الجواب.",
                  examples:"لوحات وتقارير · تنظيف البيانات · تحليل SQL · أتمتة الجداول",
                  tech:"Python \u00b7 SQL \u00b7 PostgreSQL \u00b7 Pandas \u00b7 REST APIs" },
      custom:   { title:"منصات مخصصة", desc:"برمجيات مصممة حول طريقة عمل فريقك الحالية — بدلًا من إجبار فريقك على الالتفاف حول البرنامج.",
                  extra:"عيادات ومدارس وورشات ومحلات: نبني لوحات التحكم والبوابات التي تناسب يومك، بما في ذلك الأجزاء التي يجب أن تستمر في العمل بدون إنترنت. حلول مؤقتة أقل، أخطاء أقل، ووقت مهدور أقل.",
                  examples:"\u0644\u0648\u062d\u0627\u062a \u0625\u062f\u0627\u0631\u0629 \u00b7 \u0628\u0648\u0627\u0628\u0627\u062a \u0639\u064a\u0627\u062f\u0627\u062a \u00b7 \u0645\u0646\u0635\u0627\u062a \u062a\u0639\u0644\u0651\u0645 \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u00b7 \u0645\u0632\u0627\u0645\u0646\u0629 LAN \u062f\u0648\u0646 \u0627\u062a\u0635\u0627\u0644",
                  tech:"Laravel \u00b7 PHP \u00b7 MySQL \u00b7 PWA \u00b7 REST APIs" }
    },
    work: {
      heading:   "مشاريع حقيقية، مُسلَّمة وتعمل",
      maitrisez: {
        title: "\u0645\u0627\u064a\u062a\u0631\u064a\u0632\u0647 \u2014 \u0627\u0644\u062a\u0636\u0631 \u0644\u0627\u0645\u062a\u062d\u0627\u0646\u0627\u062a \u0627\u0644\u0637\u0628",
        constraint: "كان طلاب الطب يراجعون من ملفات PDF متناثرة، دون أي وسيلة لمعرفة ما ينتظره الممتحنون فعلًا.",
        decision: "مكان واحد لأسئلة التدريب، والامتحانات التجريبية الموقوتة، وملفات PDF للدروس، وتتبّع التقدم، وإجابات شفهية مسجلة تُقيَّم على النقاط التي ينتظرها الممتحنون.",
        shipped: "يعمل مباشرة على maitrisez.app، مع لوحة إدارة لإدارة المحتوى ومتابعة النشاط.",
        stack: "React 18 \u00b7 Express \u00b7 MongoDB \u00b7 Clerk \u00b7 Docker",
        li: ["أسئلة تدريب وقراءة رقمية للكتب الدراسية في تطبيق واحد",
             "امتحانات شفهية مسجلة وتُقيَّم على النقاط المطلوبة",
             "تتبّع التقدم ولوحة إدارة مباشرة"]
      },
      driving: {
        title: "\u0645\u0646\u0635\u0629 \u0645\u062f\u0631\u0633\u0629 \u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0642\u064a\u0627\u062f\u0629 \u2014 \u0646\u0633\u062e\u0629 \u0627\u0644\u0645\u062f\u0631\u0651\u0628",
        constraint: "عدة مدربين، وعدة أجهزة، بلا خادم — وغالبًا بلا إنترنت داخل السيارة.",
        decision: "تطبيق مثبَّت على أجهزة المدربين أنفسهم، يزامن كل شيء بينها عبر الشبكة المحلية — أضف جهازًا برمز QR، وألغِه بهذه السهولة ذاتها.",
        shipped: "الطلبة وساعات الدروس والرسوم والمدفوعات ونتائج الامتحانات تبقى متزامنة بين الأجهزة. لا حساب سحابي ولا اشتراك شهري.",
        stack: "Tauri 2 \u00b7 Rust \u00b7 React 19 \u00b7 TypeScript",
        li: ["لوحة مصممة للمدربين: ساعات الدروس، التقييمات، وجاهزية الامتحان",
             "كل شيء يبقى على أجهزتهم، متزامنًا بين الأجهزة عبر الشبكة المحلية",
             "اقتران جهاز برمز QR وإلغاؤه بهذه البساطة — لا حساب سحابي ولا اشتراك"]
      },
      dental: {
        title: "\u0639\u064a\u0627\u062f\u0629 \u0627\u0644\u0623\u0633\u0646\u0627\u0646 \u2014 Tulip",
        constraint: "عيادة لا تستطيع الاعتماد على توفر الإنترنت — ولا أن تغادر بيانات المرضى المبنى.",
        decision: "تطبيق مثبَّت داخل العيادة، يحفظ السجلات في قاعدة بيانات على شبكتها الخاصة، مشتركة بين الاستقبال وغرف العلاج.",
        shipped: "سجلات المرضى والمواعيد والفواتير في تطبيق واحد يعمل دون إنترنت. البيانات لا تغادر العيادة أبدًا.",
        stack: "Electron \u00b7 React 18 \u00b7 PostgreSQL (PGlite)",
        li: ["كل سجل مريض وتاريخ علاج ومتابعة السجلات السنية في مكان مرتّب واحد",
             "المواعيد والفواتير داخل التطبيق، بمعزل عن الإنترنت تمامًا",
             "قاعدة بيانات العيادة على شبكتها الخاصة — بيانات المرضى لا تغادر المبنى أبدًا"]
      },
      checklist: {
        title: "Checklist Audit \u2014 \u062a\u0641\u062a\u064a\u0634 \u0645\u064a\u062f\u0627\u0646\u064a",
        constraint: "يفحص المفتشون مطابخ وورشات ومستودعات لا يكون الإنترنت فيها موثوقًا — والعنصر غير المطابق يجب أن يتحول إلى متابعة مُتتبَّعة، لا ملاحظة في دفتر.",
        decision: "تطبيق يثبَّت من المتصفح ويحتفظ بسجلاته على جهاز المفتش نفسه: يعمل بلا أي اتصال، ويزامن عندما يتوفر اتصال.",
        shipped: "مناطق ومعايير، وعتبات نجاح واضحة، ومخالفات بمسؤول وموعد نهائي، وأدلة بالصور، وتقارير PDF واتجاهات مع الزمن. متوفر كتطبيق ويب وتطبيق أندرويد، بالإنجليزية والفرنسية.",
        stack: "Vanilla JS \u00b7 Service Worker \u00b7 IndexedDB \u00b7 Capacitor",
      },
      hub: {
        title: "Cultural & Sports Hub \u2014 \u0627\u0644\u062c\u062f\u0648\u0644\u0629",
        constraint: "لكل قاعة جدول أسبوعي، لكن مناسبة خاصة يجب أن تحل محل نشاط ليوم واحد — وإلغاء المناسبة يجب أن يُعيد النشاط الأصلي.",
        decision: "يحسب التطبيق الجدول الحقيقي لكل يوم من الجدول الأسبوعي والاستثناءات، دون تعديل الجدول الأصلي أبدًا.",
        shipped: "عروض يوم وأسبوع وشهر؛ تعديل لمناسبة واحدة أو للسلسلة كاملة؛ تنبيهات عند التعارض — ومحرك جدولة مغطى باختبارات آلية.",
        stack: "Electron \u00b7 SQLite \u00b7 FullCalendar \u00b7 esbuild",
      },
      inventory: {
        title: "InventoryApp \u2014 \u0627\u0644\u0645\u062e\u0632\u0648\u0646 \u0648\u0627\u0644\u0641\u0648\u062a\u0631\u0629",
        constraint: "مخزون المحل ومشترياته وديون زبائنه وفواتيره يجب أن تتطابق جميعها — ويجب ألا يرى موظف الصندوق شاشات الإدارة.",
        decision: "تطبيق مثبَّت على جهاز المحل نفسه، مع فواتير تحتفظ بأسعار لحظة إصدارها حتى بعد تغيير الأسعار.",
        shipped: "لوحة معلومات، ومخزون، وصندوق، وفواتير، وزبائن، وموردون، وطلبات شراء، وديون، وإرجاعات، وماسح باركود وإعدادات. فواتير PDF ونسخ احتياطية وصلاحيات للموظفين وواجهة بالإنجليزية والفرنسية والعربية. يثبَّت على ويندوز.",
        stack: "Kotlin \u00b7 Compose Desktop \u00b7 Nitrite \u00b7 PDFBox",
      },
      cover: {
        title: "\u0643\u064f\u0644 \u0646\u0638\u0627\u0645 \u0647\u0646\u0627 \u0628\u062f\u0623 \u0628\u0645\u0644\u062e\u0635 \u062a\u0637\u0648\u064a\u0631. \u0647\u0644 \u0623\u0646\u062a \u0627\u0644\u062a\u0627\u0644\u064a\u061f",
        cta: "\u0627\u0628\u062f\u0623 \u0645\u0634\u0631\u0648\u0639\u0643"
      },
      front: {
        eyebrow: "\u0623\u0639\u0645\u0627\u0644 \u0645\u062e\u062a\u0627\u0631\u0629",
        title: "\u0633\u062a\u0629 \u0645\u0634\u0627\u0631\u064a\u0639\u060c \u0645\u0646 \u0627\u0644\u0641\u0643\u0631\u0629 \u0625\u0644\u0649 \u0627\u0644\u0625\u0637\u0644\u0627\u0642"
      },
      welcome: {
        eyebrow: "ITWIZ / \u0627\u0644\u0623\u0639\u0645\u0627\u0644",
        title: "\u0645\u0631\u062d\u0628\u064b\u0627 \u0628\u0643 \u0641\u064a \u062f\u0641\u062a\u0631 \u0627\u0644\u0645\u0634\u0627\u0631\u064a\u0639",
        hint: "\u0645\u0631\u0651\u0631 \u0644\u0642\u0644\u0628 \u0627\u0644\u0635\u0641\u062d\u0627\u062a"
      },
      visit: "\u0632\u064a\u0627\u0631\u0629 \u0627\u0644\u0645\u0646\u0635\u0629 ↗",
      visit_live: "\u0627\u0644\u0645\u0646\u062a\u062c \u0627\u0644\u062d\u064a \u2197",
      walkthrough: "\u0637\u0644\u0628 \u0639\u0631\u0636 \u062a\u0642\u062f\u064a\u0645\u064a \u2192",
      details: "\u0627\u0644\u062a\u0641\u0627\u0635\u064a\u0644",
      shot_enlarge: "\u0639\u0631\u0636 \u0644\u0642\u0637\u0629 \u0627\u0644\u0634\u0627\u0634\u0629 \u0628\u0627\u0644\u062d\u062c\u0645 \u0627\u0644\u0643\u0627\u0645\u0644",
      shot_close: "\u0625\u063a\u0644\u0627\u0642",
      label: {
        constraint: "\u0627\u0644\u0642\u064a\u062f",
        decision: "\u0627\u0644\u0642\u0631\u0627\u0631",
        shipped: "\u0645\u0627 \u062a\u0645 \u062a\u0633\u0644\u064a\u0645\u0647"
      },
      walkthrough_msg: "\u0645\u0631\u062d\u0628\u064b\u0627 ITWIZ \u2014 \u0623\u0631\u063a\u0628 \u0641\u064a \u0639\u0631\u0636 \u062a\u0642\u062f\u064a\u0645\u064a \u0644\u0645\u0646\u0635\u0629 {project}. \u064a\u0631\u062c\u0649 \u0625\u0631\u0641\u0627\u0642 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062f\u062e\u0648\u0644."
    },
    about: {
      eyebrow: "\u0645\u0646 \u0646\u062d\u0646",
      title: "عمل من مستوى الخبراء، دون طبقات الوكالات.",
      p1: "ITwiz \u0627\u0633\u062a\u0648\u062f\u064a\u0648 \u0628\u0631\u0645\u062c\u064a \u0645\u0633\u062a\u0642\u0644 \u0645\u0642\u0631\u0647 \u0627\u0644\u062c\u0632\u0627\u0626\u0631. \u0646\u0628\u0642\u064a \u0627\u0644\u0641\u0631\u064a\u0642 \u0635\u063a\u064a\u0631\u0627\u064b \u0639\u0645\u062f\u0627\u064b: \u0627\u0644\u0645\u0647\u0646\u062f\u0633 \u0627\u0644\u0630\u064a \u064a\u062d\u062f\u062f \u0646\u0637\u0627\u0642 \u0645\u0634\u0631\u0648\u0639\u0643 \u0647\u0648 \u0646\u0641\u0633\u0647 \u0627\u0644\u0630\u064a \u064a\u0628\u0646\u064a\u0647\u060c \u0648\u0627\u0644\u0634\u062e\u0635 \u0627\u0644\u0630\u064a \u064a\u0631\u062f \u0639\u0644\u0649 \u0628\u0631\u064a\u062f\u0643 \u0647\u0648 \u0645\u0646 \u0643\u062a\u0628 \u0627\u0644\u0634\u064a\u0641\u0631\u0629.",
      p2: "نفي على أفضل حال في الأنظمة التي تعتمد عليها المنشأة كل يوم — تلك التي تواصل العمل حين ينقطع الإنترنت، وتحفظ البيانات خاصة، وتبقى تشتغل بعد سنوات.",
      c1: "\u0646\u0642\u0637\u0629 \u062a\u0648\u0627\u0635\u0644 \u0648\u0627\u062d\u062f\u0629",
      c2: "\u0627\u0644\u0646\u0637\u0627\u0642 \u0648\u0627\u0644\u0633\u0639\u0631 \u0645\u062a\u0641\u0642 \u0639\u0644\u064a\u0647\u0645\u0627 \u0642\u0628\u0644 \u0628\u062f\u0621 \u0627\u0644\u0639\u0645\u0644",
      c3: "\u062a\u0645\u0644\u0643 \u0627\u0644\u0634\u064a\u0641\u0631\u0629 \u0648\u0627\u0644\u062d\u0633\u0627\u0628\u0627\u062a",
      c4: "\u0631\u062f \u062e\u0644\u0627\u0644 \u064a\u0648\u0645 \u0639\u0645\u0644 \u0648\u0627\u062d\u062f",
      note: "نقبل عددًا محدودًا من المشاريع في كل مرة. مراجع وعرض توضيحي متاحان عند الطلب."
    },
    method: {
      eyebrow:  "ITWIZ / \u0627\u0644\u0645\u0646\u0647\u062c\u064a\u0629",
      heading:  "كيف نعمل",
      sub:      "أربع خطوات، من أول مكالمة إلى الإطلاق.",
      discover: { title:"الاستكشاف", desc:"ننصت أولًا: أهدافك، وعملاؤك، وما يعيق التقدم — ثم نتفق على شكل النجاح." },
      design:   { title:"التصميم", desc:"نرسم الشاشات والمسارات، لتشاهد وتعتمد المنتج قبل بنائه." },
      build:    { title:"البناء", desc:"نبني على دفعات قصيرة ونريك البرنامج وهو يعمل أثناء المشوار — لا مفاجآت في النهاية." },
      launch:   { title:"الإطلاق", desc:"نختبر وننشر ونمنحك المفاتيح — ثم نبقى على مرمى أسئلتك وطلبات الإصلاح." }
    },
    contact: {
      title:         "مستعد لجعله<br>حقيقيًا؟",
      btn:           "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627",
      lead:          "أخبرنا بما يعطّلك. سنرد بكلمة صريحة — حتى لو لم نكن الخيار المناسب.",
      call_label:    "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627 \u0645\u0628\u0627\u0634\u0631\u0629",
      whatsapp_label:"\u0648\u0627\u062a\u0633\u0627\u0628",
      telegram_label:"\u062a\u064a\u0644\u064a\u063a\u0631\u0627\u0645",
      email_label:   "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a",
      form: {
        name_label: "\u0627\u0633\u0645\u0643",
        name_ph: "\u0622\u062f\u0627 \u0644\u0648\u0641\u0644\u0627\u064a\u0633",
        email_label: "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a",
        email_ph: "ada@company.com",
        email_error: "\u064a\u0628\u062f\u0648 \u0623\u0646 \u0647\u0630\u0627 \u0627\u0644\u0628\u0631\u064a\u062f \u063a\u064a\u0631 \u0635\u062d\u064a\u062d.",
        email_typo: "\u0647\u0644 \u062a\u0642\u0635\u062f {email}\u061f",
        type_label: "\u0645\u0627\u0630\u0627 \u0646\u0628\u0646\u064a\u061f",
        type_none: "\u0627\u062e\u062a\u0631\u2026",
        type_web: "\u0627\u0644\u0648\u064a\u0628 \u0648\u0627\u0644\u062c\u0648\u0627\u0644",
        type_ai: "\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0648\u0627\u0644\u0623\u062a\u0645\u062a\u0629",
        type_data: "\u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0648\u0627\u0644\u062a\u0642\u0627\u0631\u064a\u0631",
        type_custom: "\u0645\u0646\u0635\u0627\u062a \u0645\u062e\u0635\u0635\u0629",
        type_undecided: "\u0644\u0633\u062a \u0645\u062a\u0623\u0643\u062f\u064b\u0627 \u0628\u0639\u062f",
        message_label: "\u062d\u062f\u062b\u0646\u0627 \u0639\u0646 \u0627\u0644\u0645\u0634\u0631\u0648\u0639",
        message_ph: "\u0645\u0627 \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0627\u0644\u062a\u064a \u0646\u062d\u0644\u0647\u0627\u060c \u0648\u0644\u0645\u0646\u060c \u0648\u0643\u064a\u0641 \u064a\u0628\u062f\u0648 \u0627\u0644\u0646\u062c\u0627\u062d\u061f",
        submit: "\u0623\u0631\u0633\u0644 \u0627\u0644\u0641\u0643\u0631\u0629",
        sending: "\u062c\u0627\u0631\u064d \u0627\u0644\u0625\u0631\u0633\u0627\u0644\u2026",
        mail_subject: "\u0641\u0643\u0631\u0629 \u0645\u0634\u0631\u0648\u0639",
        success_title: "\u0648\u0635\u0644\u062a\u0646\u0627 \u0641\u0643\u0631\u062a\u0643.",
        success_text: "سنرد على {email} خلال يوم عمل واحد.",
        success_edit: "\u0639\u0646\u0648\u0627\u0646 \u062e\u0627\u0637\u0626\u061f \u0639\u062f\u0644",
        consent: "\u0646\u0633\u062a\u062e\u062f\u0645 \u0647\u0630\u0647 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0641\u0642\u0637 \u0644\u0644\u0631\u062f \u0639\u0644\u0649 \u0645\u0648\u062c\u0632\u0643. \u0644\u0627 \u0646\u0628\u064a\u0639\u0647\u0627 \u0648\u0644\u0627 \u0646\u0633\u062a\u062e\u062f\u0645\u0647\u0627 \u0644\u0644\u062a\u0633\u0648\u064a\u0642. <a href=\"privacy-ar.html\">\u0625\u0634\u0639\u0627\u0631 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629</a>"
      }
    },
    footer: "ITwiz \u2014 \u0646\u062d\u0648\u0651\u0644 \u0627\u0644\u0643\u0648\u062f \u0625\u0644\u0649 \u0633\u062d\u0631",
    footer_legal: "ITwiz \u2014 \u0627\u0633\u062a\u0648\u062f\u064a\u0648 \u0628\u0631\u0645\u062c\u064a \u0645\u0633\u062a\u0642\u0644\u060c \u0627\u0644\u062c\u0632\u0627\u0626\u0631",
    footer_privacy: "\u0625\u0634\u0639\u0627\u0631 \u0627\u0644\u062e\u0635\u0648\u0635\u064a\u0629",
    band:   { text: "\u0644\u0646\u0635\u0645\u0639 \u0634\u064a\u0626\u0627\u064b \u0627\u0633\u062a\u062b\u0646\u0627\u0626\u064a\u0627\u064b \u2722 \u062a\u0635\u0645\u064a\u0645 \u00b7 \u0647\u0646\u062f\u0633\u0629 \u00b7 \u0630\u0643\u0627\u0621 \u2722" },
    dialogue: {
      hero: [
        "\u0623\u0647\u0644\u064b\u0627 \u0628\u0643 \u0641\u064a ITWIZ \u2728",
        "البرمجيات التي يعتمد عليها عملك.",
        "مرّر لترى ما بنيناه."
      ],
      services: [
        "أربعة أشياء يمكننا بناءها لك.",
        "اختر ما يناسبك.",
        "\u0645\u0631\u0631 \u0644\u062a\u0637\u0644\u0639 \u0639\u0644\u0649 \u0627\u0644\u062f\u0627\u062e\u0644."
      ],
      work: [
        "ستة مشاريع، من الفكرة إلى الإطلاق.",
        "\u062a\u0627\u0628\u0639 \u0627\u0644\u062a\u0645\u0631\u064a\u0631 \u2014 \u0627\u0644\u0635\u0641\u062d\u0627\u062a \u062a\u062a\u0642\u0644\u0628 \u0628\u0646\u0641\u0633\u0647\u0627.",
        "\u0643\u0644 \u0645\u0646\u0647\u0627 \u0628\u062f\u0623 \u0628\u0641\u0643\u0631\u0629."
      ],
      method: [
        "\u0645\u0646 \u0627\u0644\u0641\u0643\u0631\u0629 \u0625\u0644\u0649 \u0627\u0644\u0625\u0637\u0644\u0627\u0642\u060c \u0641\u064a \u0623\u0631\u0628\u0639 \u062e\u0637\u0648\u0627\u062a.",
        "\u0627\u0633\u062a\u0643\u0634\u0627\u0641. \u062a\u0635\u0645\u064a\u0645. \u0628\u0646\u0627\u0621. \u0625\u0637\u0644\u0627\u0642."
      ],
      contact: [
        "\u0623\u062e\u0628\u0631\u0646\u0627 \u0628\u0645\u0627 \u062a\u0628\u0646\u064a\u0647.",
        "\u0643\u0644 \u0645\u0634\u0631\u0648\u0639 \u064a\u0628\u062f\u0623 \u0628\u0641\u0643\u0631\u0629. \u0648\u0645\u0627 \u0645\u0634\u0631\u0648\u0639\u0643\u061f",
        "\u0627\u0628\u062f\u0623 \u0627\u0644\u062d\u0648\u0627\u0631."
      ],
      about: [
        "\u0645\u0633\u062a\u0642\u0644. \u0645\u0628\u0627\u0634\u0631. \u0642\u0631\u064a\u0628 \u0645\u0646 \u0627\u0644\u0634\u064a\u0641\u0631\u0629.",
        "\u0644\u0627 \u0645\u062f\u0631\u0627\u0621 \u062d\u0633\u0627\u0628\u0627\u062a. \u0644\u0627 \u0648\u0633\u0637\u0627\u0621."
      ],
      "card-web": [
        "\u0645\u0648\u0627\u0642\u0639 \u062a\u062d\u0648\u0644 \u0627\u0644\u0632\u0648\u0627\u0631 \u0625\u0644\u0649 \u0639\u0645\u0644\u0627\u0621.",
        "\u0633\u0631\u064a\u0639 \u0639\u0644\u0649 \u0643\u0644 \u062c\u0647\u0627\u0632."
      ],
      "card-ai": [
        "العمل المتكرر على البرنامج.",
        "القرار النهائي لك."
      ],
      "card-data": [
        "\u0623\u0631\u0642\u0627\u0645 \u062a\u062c\u064a\u0628 \u0639\u0646 \u0623\u0633\u0626\u0644\u062a\u0643.",
        "\u0644\u0648\u062d\u0627\u062a \u0645\u0628\u0646\u064a\u0629 \u0639\u0644\u0649 \u0628\u064a\u0627\u0646\u0627\u062a\u0643."
      ],
      "card-custom": [
        "\u0645\u0628\u0646\u064a \u062d\u0648\u0644 \u0633\u064a\u0631 \u0639\u0645\u0644\u0643.",
        "\u0645\u0635\u0645\u0645 \u0644\u0644\u0639\u064a\u0627\u062f\u0627\u062a \u0648\u0627\u0644\u0645\u062f\u0627\u0631\u0633 \u0648\u0627\u0644\u0641\u0631\u0642."
      ],
      "card-maitrisez": [
        "\u0627\u0645\u062a\u062d\u0627\u0646\u0627\u062a \u0634\u0641\u0647\u064a\u0629 \u062a\u0641\u0635\u0644 \u0628\u0645\u0639\u0627\u064a\u064a\u0631.",
        "\u0623\u0633\u0626\u0644\u0629 \u0627\u062e\u062a\u064a\u0627\u0631 \u0648\u0627\u0645\u062a\u062d\u0627\u0646\u0627\u062a \u062a\u062c\u0631\u064a\u0628\u064a\u0629 \u0648\u0645\u0643\u062a\u0628\u0629 PDF."
      ],
      "card-driving": [
        "يعمل بدون إنترنت.",
        "مصمم من أجل المدربين، لا لاستعراض الجداول."
      ],
      "card-dental": [
        "\u0633\u062c\u0644\u0627\u062a \u0645\u0646\u0637\u0645\u0629 \u062f\u0627\u0626\u0645\u064b\u0627.",
        "\u0645\u0648\u0627\u0639\u064a\u062f \u0648\u0641\u0627\u062a\u0648\u0631\u0629\u060c \u0645\u062f\u0628\u0631\u0629."
      ],
      idle: [
        "\u062a\u062d\u062a\u0627\u062c \u0645\u0633\u0627\u0639\u062f\u0629\u061f",
        "\u0645\u0631\u0631 \u0641\u0648\u0642 \u0628\u0637\u0627\u0642\u0629 \u2014 \u062a\u0646\u0642\u0644\u0628.",
        "\u0645\u0631\u0631 \u2014 \u0627\u0644\u062f\u0641\u062a\u0631 \u064a\u062a\u0643\u0641\u0644 \u0628\u0627\u0644\u0628\u0627\u0642\u064a.",
        "ستة مشاريع. كلها منجزة.",
        "\u0643\u0644 \u0645\u0634\u0631\u0648\u0639 \u064a\u0628\u062f\u0623 \u0647\u0643\u0630\u0627: \u0628\u0641\u0643\u0631\u0629.",
        "\u0643\u0644\u0645\u0629 \u0648\u0627\u062d\u062f\u0629 \u0648\u0646\u0628\u062f\u0623."
      ],
      linger_hero:     ["\u0645\u0631\u0631 \u0644\u0631\u0624\u064a\u0629 \u0627\u0644\u0645\u0632\u064a\u062f \uD83D\uDC47"],
      linger_services: ["\u0645\u0631\u0631 \u0644\u062a\u0637\u0644\u0639 \u0639\u0644\u0649 \u0627\u0644\u062f\u0627\u062e\u0644"],
      linger_work:     ["\u062a\u0627\u0628\u0639 \u0627\u0644\u062a\u0645\u0631\u064a\u0631 \u2014 \u0627\u0644\u0635\u0641\u062d\u0627\u062a \u062a\u062a\u0642\u0644\u0628 \u0628\u0646\u0641\u0633\u0647\u0627"],
      linger_method:   ["\u0627\u0633\u062a\u0643\u0634\u0627\u0641 \u2190 \u062a\u0635\u0645\u064a\u0645 \u2190 \u0628\u0646\u0627\u0621 \u2190 \u0625\u0637\u0644\u0627\u0642"],
      linger_about:    ["\u0645\u0646 \u064a\u062d\u062f\u062f \u0646\u0637\u0627\u0642 \u0627\u0644\u0645\u0634\u0631\u0648\u0639 \u064a\u0628\u0646\u064a\u0647"],
      linger_contact:  ["\u062c\u0627\u0647\u0632 \u0639\u0646\u062f\u0645\u0627 \u062a\u0643\u0648\u0646 \u2709"]
    }
  }
};

function t(key) {
  var lang = window.__lang || 'en';
  return key.split('.').reduce(function (o, k) { return (o && o[k] !== undefined) ? o[k] : undefined; }, L[lang]);
}

function applyLanguage(lang) {
  window.__lang = lang;
  try { localStorage.setItem('lang', lang); } catch (_) {}
  document.documentElement.lang = lang === 'ar' ? 'ar' : (lang === 'fr' ? 'fr' : 'en');
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var val = t(el.getAttribute('data-i18n'));
    if (val === undefined) return;
    el.textContent = val;
    /* StringTune's word-split caches the original copy and restores it on
       every DOM mutation — keep that cache in sync with the translation so
       the headline re-splits in the active language. */
    if (el.hasAttribute('string-split-original')) el.setAttribute('string-split-original', val);
    if (el.hasAttribute('string-split-original-html')) el.setAttribute('string-split-original-html', val);
    if (el.hasAttribute('aria-label') && el.hasAttribute('string')) el.setAttribute('aria-label', val);
  });

  document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
    var val = t(el.getAttribute('data-i18n-html'));
    if (val === undefined) return;
    el.innerHTML = val;
    /* Same StringTune split-cache sync as above, but the HTML flavour:
       `string-split-original-html` keeps the markup (so <br> survives the
       re-split) while `string-split-original` / aria-label keep the text. */
    if (el.hasAttribute('string-split-original-html')) el.setAttribute('string-split-original-html', val);
    if (el.hasAttribute('string-split-original') || (el.hasAttribute('aria-label') && el.hasAttribute('string'))) {
      var box = document.createElement('div');
      box.innerHTML = val;
      var plain = box.textContent || '';
      if (el.hasAttribute('string-split-original')) el.setAttribute('string-split-original', plain);
      if (el.hasAttribute('aria-label') && el.hasAttribute('string')) el.setAttribute('aria-label', plain);
    }
  });

  document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
    var val = t(el.getAttribute('data-i18n-ph'));
    if (val === undefined) return;
    el.setAttribute('placeholder', val);
  });

  /* privacy notice: point every in-page privacy link at the matching
     language page, falling back to English. */
  var privacyHref = (lang === 'fr' ? 'privacy-fr.html'
    : lang === 'ar' ? 'privacy-ar.html'
    : 'privacy.html');
  document.querySelectorAll('.site-footer__privacy, .brief-form__consent a').forEach(function (a) {
    a.setAttribute('href', privacyHref);
  });

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.classList.toggle('is-active', btn.getAttribute('data-lang') === lang);
    btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
  });

  window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
}

function initLang() {
  var saved;
  try { saved = localStorage.getItem('lang'); } catch (_) {}
  if (saved) {
    applyLanguage(saved);
  } else {
    /* first visit: follow the browser's language (fr/ar audiences land in their own language) */
    var lang = 'en';
    var navLangs = (navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || '']).map(function (l) { return (l || '').toLowerCase(); });
    if (navLangs.some(function (l) { return l.indexOf('ar') === 0; })) lang = 'ar';
    else if (navLangs.some(function (l) { return l.indexOf('fr') === 0; })) lang = 'fr';
    applyLanguage(lang);
    try { localStorage.setItem('lang', lang); } catch (_) {}
  }

  /* switcher — attached for every user, saved or first-visit */
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(btn.getAttribute('data-lang'));
    });
  });
}

window.__i18n = { t: t, applyLanguage: applyLanguage, initLang: initLang };

})();
