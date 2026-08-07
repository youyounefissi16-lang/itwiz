(function () {

const L = {
  en: {
    nav:        { home:'Home', services:'Services', work:'Work', contact:'Contact' },
    hero: {
      tagline:  "we code magic into reality",
      title:    "Building Tomorrow's<br>Digital Experience",
      subtitle: "We are a creative IT company delivering innovative digital solutions that drive growth, efficiency, and lasting success for businesses worldwide."
    },
    services: {
      heading:  "Core Solutions & Capabilities",
      more:     "Learn more",
      web:      { title:"Web & Mobile Engineering",       desc:"Custom full-stack web platforms, iOS/Android apps, and responsive cross-platform architectures.",
                  extra:"From React and Next.js to Flutter and Swift, we build performant, accessible interfaces that scale. Every project follows a mobile-first approach with rigorous cross-browser testing, CI/CD pipelines, and performance budgets baked in from day one." },
      ai:       { title:"AI & Intelligent Automation",    desc:"Custom AI pipelines, automated audio-to-text microservices, smart workflows, and intelligent data systems.",
                  extra:"We design end-to-end AI systems — from data ingestion and model training to real-time inference at the edge. Whether it's speech recognition, NLP, or predictive analytics, our pipelines are built for reliability, low latency, and cost efficiency." },
      security: { title:"Systems & Security Infrastructure", desc:"Content protection, custom digital watermarking, network protocols, and secure data sync.",
                  extra:"Our security-first architecture covers everything from dynamic watermarking and DRM to custom encrypted protocols and zero-trust network designs. We build systems that protect intellectual property without compromising user experience." },
      custom:   { title:"Custom Platforms & Portals",     desc:"Bespoke management software, practice portals, e-learning environments, and offline-first LAN sync engines.",
                  extra:"Every business has unique workflows. We architect bespoke platforms — from dental clinics and driving schools to enterprise dashboards — with offline-first capabilities, local network sync, and seamless cloud backup when connectivity returns." }
    },
    work: {
      heading:   "Featured Projects & Built Systems",
      maitrisez: {
        title: "Ma\u00eetrisez \u2014 Med-Ed & Vocal Testing Platform",
        li: ["Interactive quiz engines & digital textbook reader for medical students",
             "Real-time vocal testing powered by an automated speech-to-text evaluation pipeline",
             "Custom dynamic video watermarking to safeguard copyrighted course material from unauthorized recording"],
        back: "Built a full-stack medical education platform featuring real-time vocal evaluation and dynamic video watermarking to protect intellectual property."
      },
      driving: {
        title: "Driving School Platform \u2014 Instructor Edition",
        li: ["Dedicated dashboard for instructors to track lesson hours, evaluations, and test readiness",
             "Serverless local-network sync that mirrors lesson data between devices without needing internet",
             "Automatic background synchronization to cloud servers once a connection becomes available"],
        back: "Designed an offline-first instructor dashboard with serverless local syncing and automatic cloud sync when connectivity returns."
      },
      dental: {
        title: "Dental Cabinet & Clinic Management Portal",
        li: ["Comprehensive patient management, treatment histories, and digital dental chart tracking",
             "Interactive appointment scheduling, automated reminders, and billing management",
             "High-reliability, secure database design built for patient privacy and instant record retrieval"],
        back: "Engineered a secure clinic management system with patient records, appointment scheduling, and automated billing for dental practices."
      }
    },
    contact: {
      title:         "Ready to Bring Your<br>Vision to Life?",
      btn:           "Contact Us",
      lead:          "Tell us about your project, and let's craft something extraordinary.",
      call_label:    "Call us directly",
      whatsapp_label:"WhatsApp",
      telegram_label:"Telegram",
      email_label:   "Email"
    },
    footer: "ITwiz \u2014 Code Magic into Reality",
    dialogue: {
      hero: [
        "Welcome to IT WIZ! \u2728",
        "Ready for magic?",
        "Scroll to explore! \uD83D\uDC47"
      ],
      services: [
        "Our digital toolkit! \uD83D\uDCA1",
        "Pick your superpower!",
        "Hover to explore! \u26A1"
      ],
      work: [
        "Real projects, real impact! \uD83C\uDFAF",
        "Flip for backstory! \uD83D\uDD04",
        "Built for real people! \uD83D\uDCAA"
      ],
      contact: [
        "Let's build something great! \uD83D\uDD2E",
        "Tell us your project! \uD83D\uDCAC",
        "Start the conversation!"
      ],
      "card-web": [
        "Flawless web and mobile!",
        "Web or mobile \u2014 both! \u2728"
      ],
      "card-ai": [
        "Smart AI automation!",
        "AI that works! \u2728"
      ],
      "card-security": [
        "Rock-solid security!",
        "Locked down tight!"
      ],
      "card-custom": [
        "Built for your workflow!",
        "Fits like a glove!"
      ],
      "card-maitrisez": [
        "Voice exam evaluation!",
        "Real-time voice assessment!"
      ],
      "card-driving": [
        "Offline-first syncing!",
        "Built for teachers!"
      ],
      "card-dental": [
        "Clean, secure records!",
        "Automated clinic management!"
      ],
      idle: [
        "Need a hand?",
        "Try flipping a card! \uD83D\uDD04",
        "We build custom solutions! \uD83D\uDCAA",
        "Hover over the cards! \uD83D\uDEE0\uFE0F",
        "Ready to talk? \uD83D\uDCAC",
        "Every project starts here. \uD83D\uDC40",
        "Explore away! \uD83D\uDE09"
      ],
      linger_hero:     ["Scroll to see more! \uD83D\uDC47"],
      linger_services: ["Hover a card! \uD83D\uDC46"],
      linger_work:     ["Flip a project card! \uD83D\uDD04"],
      linger_contact:  ["Contact us anytime! \uD83D\uDCEB"]
    }
  },

  fr: {
    nav:        { home:'Accueil', services:'Services', work:'R\u00e9alisations', contact:'Contact' },
    hero: {
      tagline:  "nous transformons le code en magie",
      title:    "Construisons l\u2019exp\u00e9rience<br>num\u00e9rique de demain",
      subtitle: "Nous sommes une entreprise IT cr\u00e9ative qui livre des solutions num\u00e9riques innovantes pour stimuler la croissance, l\u2019efficacit\u00e9 et le succ\u00e8s durable des entreprises dans le monde entier."
    },
    services: {
      heading:  "Solutions cl\u00e9s et comp\u00e9tences",
      more:     "En savoir plus",
      web:      { title:"Ing\u00e9nierie Web & Mobile",           desc:"Plateformes web full-stack sur mesure, applications iOS/Android et architectures cross-platform responsives.",
                  extra:"De React et Next.js \u00e0 Flutter et Swift, nous construisons des interfaces performantes et accessibles qui montent en charge. Chaque projet suit une approche mobile-first avec des tests rigoureux multi-navigateurs, des pipelines CI/CD et des budgets de performance d\u00e8s le premier jour." },
      ai:       { title:"IA & Automatisation Intelligente",      desc:"Pipelines IA personnalis\u00e9s, microservices de transcription audio automatis\u00e9e, workflows intelligents et syst\u00e8mes de donn\u00e9es adaptatifs.",
                  extra:"Nous concevons des syst\u00e8mes IA de bout en bout \u2014 de l\u2019ingestion de donn\u00e9es et l\u2019entra\u00eenelement de mod\u00e8les \u00e0 l\u2019inf\u00e9rence en temps r\u00e9el au bord du r\u00e9seau. Que ce soit la reconnaissance vocale, le NLP ou l\u2019analyse pr\u00e9dictive, nos pipelines sont con\u00e7us pour la fiabilit\u00e9, la faible latence et l\u2019efficacit\u00e9conomique." },
      security: { title:"Infrastructure R\u00e9seau & S\u00e9curit\u00e9", desc:"Protection de contenu, tatouage num\u00e9rique, protocoles r\u00e9seau et synchronisation s\u00e9curis\u00e9e des donn\u00e9es.",
                  extra:"Notre architecture security-first couvre tout, du tatouage dynamique et du DRM aux protocoles chiffr\u00e9s sur mesure et aux architectures r\u00e9seau zero-trust. Nous construisons des syst\u00e8mes qui prot\u00e8gent la propri\u00e9t\u00e9 intellectuelle sans compromettre l\u2019exp\u00e9rience utilisateur." },
      custom:   { title:"Plateformes & Portails Sur Mesure",     desc:"Logiciels de gestion sur mesure, portails m\u00e9dicaux, environnements e-learning et moteurs de synchronisation LAN hors ligne.",
                  extra:"Chaque entreprise a des flux de travail uniques. Nous architectons des plateformes sur mesure \u2014 des cliniques dentaires et auto-\u00e9coles aux tableaux de bord d\u2019entreprise \u2014 avec des capacit\u00e9s hors ligne, une synchronisation r\u00e9seau local et une sauvegarde cloud transparente d\u00e8s que la connexion revient." }
    },
    work: {
      heading:   "Projets phares & syst\u00e8mes int\u00e9gr\u00e9s",
      maitrisez: {
        title: "Ma\u00eetrisez \u2014 Plateforme M\u00e9dicale & Tests Vocaux",
        li: ["Moteurs de quiz interactifs et lecteur de manuels num\u00e9riques pour \u00e9tudiants en m\u00e9decine",
             "Tests vocaux en temps r\u00e9el propuls\u00e9s par un pipeline automatis\u00e9 de synth\u00e8se vocale",
             "Tatouage vid\u00e9o dynamique pour prot\u00e9ger le contenu p\u00e9dagogique contre tout enregistrement non autoris\u00e9"],
        back: "Plateforme d\u2019\u00e9ducation m\u00e9dicale full-stack avec \u00e9valuation vocale en temps r\u00e9el et tatouage vid\u00e9o dynamique."
      },
      driving: {
        title: "Plateforme Auto-\u00c9cole \u2014 Version Moniteur",
        li: ["Tableau de bord d\u00e9di\u00e9 au suivi des heures de conduite, \u00e9valuations et pr\u00e9paration aux examens",
             "Synchronisation locale sans serveur qui refl\u00e8te les donn\u00e9es entre appareils sans connexion Internet",
             "Synchronisation automatique vers le cloud d\u00e8s qu\u2019une connexion est disponible"],
        back: "Tableau de bord moniteur con\u00e7u pour fonctionner hors ligne avec synchronisation locale et cloud automatique."
      },
      dental: {
        title: "Portail de Gestion pour Cabinets Dentaires",
        li: ["Gestion compl\u00e8te des patients, historiques de traitement et suivi dentaire num\u00e9rique",
             "Planification interactive des rendez-vous, rappels automatiques et gestion de facturation",
             "Base de donn\u00e9es s\u00e9curis\u00e9e et fiable con\u00e7ue pour la confidentialit\u00e9 des patients et l\u2019acc\u00e8s instantan\u00e9"],
        back: "Syst\u00e8me de gestion clinique s\u00e9curis\u00e9 avec dossiers patients, planification et facturation automatis\u00e9e."
      }
    },
    contact: {
      title:         "Pr\u00eat \u00e0 donner vie<br>\u00e0 votre vision ?",
      btn:           "Contactez-nous",
      lead:          "Parlez-nous de votre projet et cr\u00e9ons ensemble quelque chose d\u2019extraordinaire.",
      call_label:    "Appelez-nous",
      whatsapp_label:"WhatsApp",
      telegram_label:"Telegram",
      email_label:   "E-mail"
    },
    footer: "ITwiz \u2014 Transformons le code en magie",
    dialogue: {
      hero: [
        "Bienvenue chez IT WIZ ! \u2728",
        "Pr\u00eat pour la magie ?",
        "Faites d\u00e9filer pour explorer ! \uD83D\uDC47"
      ],
      services: [
        "Notre bo\u00eete \u00e0 outils ! \uD83D\uDCA1",
        "Choisissez votre super-pouvoir !",
        "Survolez pour explorer ! \u26A1"
      ],
      work: [
        "Projets r\u00e9els, impact r\u00e9el ! \uD83C\uDFAF",
        "Retournez pour l'histoire ! \uD83D\uDD04",
        "Construit pour les gens ! \uD83D\uDCAA"
      ],
      contact: [
        "Construisons quelque chose ! \uD83D\uDD2E",
        "Dites-nous votre projet ! \uD83D\uDCAC",
        "Commen\u00e7ons la conversation !"
      ],
      "card-web": [
        "Web et mobile impeccables !",
        "Les deux, parfaitement ! \u2728"
      ],
      "card-ai": [
        "Automatisation IA intelligente !",
        "Une IA qui fonctionne !"
      ],
      "card-security": [
        "S\u00e9curit\u00e9 \u00e9tanche !",
        "Verrouill\u00e9 \u00e0 fond !"
      ],
      "card-custom": [
        "Con\u00e7u pour votre flux !",
        "S'adapte comme un gant !"
      ],
      "card-maitrisez": [
        "\u00c9valuation vocale d'examen !",
        "Temps r\u00e9el, \u00e9valuation vocale !"
      ],
      "card-driving": [
        "Synchro hors ligne !",
        "Con\u00e7u pour les moniteurs !"
      ],
      "card-dental": [
        "Dossiers propres et s\u00fbrs !",
        "Gestion de cabinet automatis\u00e9e !"
      ],
      idle: [
        "Besoin d'aide ?",
        "Retournez une carte ! \uD83D\uDD04",
        "Sur mesure ? On construit ! \uD83D\uDCAA",
        "Survolez les cartes ! \uD83D\uDEE0\uFE0F",
        "Pr\u00eat \u00e0 discuter ? \uD83D\uDCAC",
        "Tout projet commence ici. \uD83D\uDC40",
        "Explorez ! \uD83D\uDE09"
      ],
      linger_hero:     ["Faites d\u00e9filer ! \uD83D\uDC47"],
      linger_services: ["Survolez une carte ! \uD83D\uDC46"],
      linger_work:     ["Retournez une carte projet ! \uD83D\uDD04"],
      linger_contact:  ["Contactez-nous ! \uD83D\uDCEB"]
    }
  },

  ar: {
    nav:        { home:'\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629', services:'\u0627\u0644\u062e\u062f\u0645\u0627\u062a', work:'\u0623\u0639\u0645\u0627\u0644\u0646\u0627', contact:'\u0627\u062a\u0635\u0644 \u0628\u0646\u0627' },
    hero: {
      tagline:  "\u0646\u062d\u0648\u0651\u0644 \u0627\u0644\u0643\u0648\u062f \u0625\u0644\u0649 \u0633\u062d\u0631 \u0639\u0644\u0649 \u0623\u0631\u0636 \u0627\u0644\u0648\u0627\u0642\u0639",
      title:    "\u0646\u0628\u0646\u064a \u062a\u062c\u0631\u0628\u0629<br>\u0627\u0644\u0631\u0642\u0645 \u0627\u0644\u0645\u0633\u062a\u0642\u0628\u0644\u064a\u0629",
      subtitle: "\u0646\u062d\u0646 \u0634\u0631\u0643\u0629 IT \u0625\u0628\u062f\u0627\u0639\u064a\u0629 \u0646\u0642\u062f\u0651\u0645 \u062d\u0644\u0648\u0644\u0627\u064b \u0631\u0642\u0645\u064a\u0629 \u0645\u0628\u062a\u0643\u0631\u0629 \u062a\u062f\u0641\u0639 \u0627\u0644\u0646\u0645\u0648\u060c \u0627\u0644\u0643\u0641\u0627\u0621\u0629\u060c \u0648\u0627\u0644\u0646\u062c\u0627\u062d \u0627\u0644\u0645\u0633\u062a\u062f\u0627\u0645 \u0644\u0644\u0634\u0631\u0643\u0627\u062a \u0641\u064a \u062c\u0645\u064a\u0639 \u0623\u0646\u062d\u0627\u0621 \u0627\u0644\u0639\u0627\u0644\u0645."
    },
    services: {
      heading:  "\u0627\u0644\u062d\u0644\u0648\u0644 \u0627\u0644\u0623\u0633\u0627\u0633\u064a\u0629 \u0648\u0627\u0644\u0642\u062f\u0631\u0627\u062a",
      more:     "\u0627\u0643\u062a\u0634\u0641 \u0627\u0644\u0645\u0632\u064a\u062f",
      web:      { title:"\u0647\u0646\u062f\u0633\u0629 \u0627\u0644\u0648\u064a\u0628 \u0648\u0627\u0644\u062c\u0648\u0651\u0627\u0644",  desc:"\u0645\u0646\u0635\u0627\u062a \u0648\u064a\u0628 \u0643\u0627\u0645\u0644\u0629 \u0645\u062e\u0635\u0635\u0629\u060c \u062a\u0637\u0628\u064a\u0642\u0627\u062a iOS/Android \u0648\u0647\u064a\u0627\u0643\u0644 \u0645\u062a\u0639\u062f\u062f\u0629 \u0627\u0644\u0645\u0646\u0635\u0627\u062a \u0645\u062a\u0643\u064a\u0641\u0629.",
                  extra:"\u0645\u0646 React \u0648 Next.js \u0625\u0644\u0649 Flutter \u0648 Swift\u060c \u0646\u0628\u0646\u064a \u0648\u0636\u0639 \u0648\u0627\u062c\u0647\u0627\u062a \u0633\u0631\u064a\u0639\u0629 \u0627\u0644\u0623\u062f\u0627\u0621 \u0648\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u062a\u0635\u0645\u064a\u0645. \u0643\u0644 \u0645\u0634\u0631\u0648\u0639 \u064a\u062a\u0628\u0639 \u0645\u0646\u0647\u062c \u0623\u0648\u0644 \u0645\u0648\u062c\u0647 \u0627\u0644\u0645\u062d\u0635\u0644 \u0645\u0639 \u0627\u062e\u062a\u0628\u0627\u0631\u0627\u062a \u0635\u0627\u0631\u0645\u0629 \u0645\u062a\u0639\u062f\u062f\u0629\u060c \u062e\u0637\u0648\u0637 CI/CD\u060c \u0648\u0645\u064a\u0632\u0627\u0646\u064a\u0627\u062a \u0627\u0644\u0623\u062f\u0627\u0621 \u0645\u0646 \u0623\u0648\u0644 \u064a\u0648\u0645." },
      ai:       { title:"\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064a \u0648\u0627\u0644\u0623\u062a\u0645\u062a\u0629", desc:"\u062e\u0637\u0648\u0637 AI \u0645\u062e\u0635\u0635\u0629\u060c \u062e\u062f\u0645\u0627\u062a \u0635\u063a\u0631\u0649 \u0644\u0644\u062a\u062d\u0648\u064a\u0644 \u0627\u0644\u0635\u0648\u062a\u064a \u0625\u0644\u0649 \u0646\u0635\u060c \u0633\u064a\u0631 \u0639\u0645\u0644 \u0630\u0643\u064a\u0629 \u0648\u0623\u0646\u0638\u0645\u0629 \u0628\u064a\u0627\u0646\u0627\u062a \u0630\u0643\u064a\u0629.",
                  extra:"\u0646\u0635\u0645\u0645 \u0646\u0638\u0627\u0645\u0627\u062a AI \u0645\u0646 \u0627\u0644\u0628\u062f\u0621 \u0625\u0644\u0649 \u0627\u0644\u0646\u0647\u0627\u0621 \u2014 \u0645\u0646 \u062c\u0645\u0639 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0648\u062a\u062f\u0631\u064a\u0628 \u0627\u0644\u0646\u0645\u0627\u0637\u064a\u0642 \u0625\u0644\u0649 \u0627\u0644\u0627\u0633\u062a\u0646\u062a\u0627\u062c \u0627\u0644\u0641\u0648\u0642\u064a \u0639\u0644\u0649 \u0627\u0644\u062d\u0627\u0641\u0638. \u0633\u0648\u0627 \u0627\u0644\u062a\u0645\u064a\u064a\u0632 \u0627\u0644\u0635\u0648\u062a\u064a\u060c NLP\u060c \u0623\u0648 \u0627\u0644\u062a\u062d\u0644\u064a\u0644 \u0627\u0644\u062a\u0646\u0628\u0626\u064a\u060c \u062e\u0637\u0648\u0637\u0646\u0627 \u0645\u0628\u0646\u064a\u0629 \u0639\u0644\u0649 \u0627\u0644\u0645\u0648\u062b\u0648\u0642\u064a\u0629\u060c \u0627\u0644\u062a\u0623\u062e\u064a\u0631 \u0627\u0644\u0633\u0639\u064a\u0631\u060c \u0648\u0641\u0639\u0627\u0644\u064a\u0629 \u0627\u0644\u062a\u0643\u0644\u064a\u0641." },
      security: { title:"\u0627\u0644\u0628\u0646\u064a\u0629 \u0627\u0644\u062a\u062d\u062a\u064a\u0629 \u0648\u0627\u0644\u0623\u0645\u0627\u0646", desc:"\u062d\u0645\u0627\u064a\u0629 \u0627\u0644\u0645\u062d\u062a\u0648\u0649\u060c \u0627\u0644\u0639\u0644\u0627\u0645\u0627\u062a \u0627\u0644\u0645\u0627\u0626\u064a\u0629 \u0627\u0644\u0631\u0642\u0645\u064a\u0629\u060c \u0628\u0631\u0648\u062a\u0648\u0643\u0648\u0644\u0627\u062a \u0627\u0644\u0634\u0628\u0643\u0627\u062a \u0648\u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0622\u0645\u0646\u0629.",
                  extra:"\u0647\u0646\u062f\u0633\u062a\u0646\u0627 \u0627\u0644\u0623\u0645\u0627\u0646 \u0627\u0644\u0645\u0628\u0646\u064a\u0629 \u062a\u063a\u0637\u064a \u0643\u0644 \u0634\u064a\u0621\u060c \u0645\u0646 \u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0627\u0644\u0645\u0627\u0626\u064a\u0629 \u0627\u0644\u062f\u064a\u0646\u0627\u0645\u064a\u0643\u064a\u0629 \u0648DRM \u0625\u0644\u0649 \u0628\u0631\u0648\u062a\u0648\u0643\u0648\u0644\u0627\u062a \u0645\u0634\u0641\u0648\u0639\u0629 \u0645\u0634\u0641\u0648\u0639 \u0627\u0644\u062a\u0634\u0641\u064a\u0631 \u0627\u0644\u0645\u0639\u0643\u0633 \u0648\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0634\u0628\u0643\u0629 zero-trust. \u0646\u0628\u0646\u064a \u0646\u0638\u0627\u0645\u0627\u062a \u062a\u062d\u0645\u064a \u0627\u0644\u0645\u0644\u0643\u064a\u0629 \u0627\u0644\u0641\u0643\u0631\u064a\u0629 \u0628\u062f\u0648\u0646 \u0627\u0633\u062a\u0634\u0627\u0621 \u062a\u062c\u0631\u0628\u0629 \u0627\u0644\u0645\u0633\u062a\u062e\u062f\u0645." },
      custom:   { title:"\u0645\u0646\u0635\u0627\u062a \u0648\u0628\u0648\u0627\u0628\u0627\u062a \u0645\u062e\u0635\u0635\u0629", desc:"\u0628\u0631\u0627\u0645\u062c \u0625\u062f\u0627\u0631\u064a\u0629 \u0645\u062e\u0635\u0635\u0629\u060c \u0628\u0648\u0627\u0628\u0627\u062a \u0637\u0628\u064a\u0629\u060c \u0628\u064a\u0626\u0627\u062a \u062a\u0639\u0644\u064a\u0645 \u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a \u0648\u0645\u062d\u0631\u0643\u0627\u062a \u0645\u0632\u0627\u0645\u0646\u0629 \u0634\u0628\u0643\u0629 \u0645\u062d\u0644\u064a\u0629 \u062a\u0639\u0645\u0644 \u0628\u062f\u0648\u0646 \u0627\u062a\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a.",
                  extra:"\u0643\u0644 \u0634\u0631\u0643\u0629 \u0644\u0647\u0627 \u062a\u064a\u0627\u0631\u0627\u062a \u0639\u0645\u0644 \u0641\u0631\u064a\u062f\u0629. \u0646\u062d\u0646 \u0646\u0635\u0645\u0645 \u0645\u0646\u0635\u0627\u062a \u0645\u062e\u0635\u0635\u0629 \u2014 \u0645\u0646 \u0639\u064a\u0627\u062f\u0629 \u0627\u0644\u0637\u0628 \u0648\u0645\u0639\u0627\u0647\u062f \u0627\u0644\u0642\u064a\u0627\u062f\u0629 \u0625\u0644\u0649 \u0644\u0648\u062d\u0627\u062a \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u0643\u0628\u064a\u0631\u064a\u0629 \u2014 \u0628\u0642\u0631\u0627\u0626\u0631 \u0627\u0644\u062a\u0639\u0645\u064a\u0644 \u0627\u0644\u0645\u062d\u0644\u064a\u060c \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u0634\u0628\u0643\u0629 \u0627\u0644\u0645\u062d\u0644\u064a\u0629\u060c \u0648\u0646\u0638\u0627\u0645 \u0646\u0633\u062e \u0633\u063a\u064a\u0644 \u0639\u0646\u062f \u0639\u0648\u062f\u0629 \u0627\u0644\u0627\u062a\u0635\u0627\u0644." }
    },
    work: {
      heading:   "\u0645\u0634\u0627\u0631\u064a\u0639 \u0645\u0645\u064a\u0632\u0629 \u0648\u0623\u0646\u0638\u0645\u0629 \u0645\u0628\u0646\u064a\u0629",
      maitrisez: {
        title: "\u0645\u0627\u064a\u062a\u0631\u064a\u0632\u0647 \u2014 \u0645\u0646\u0635\u0629 \u062a\u0639\u0644\u064a\u0645 \u0637\u0628\u064a \u0648\u0627\u062e\u062a\u0628\u0627\u0631\u0627\u062a \u0635\u0648\u062a\u064a\u0629",
        li: ["\u0645\u062d\u0631\u0643\u0627\u062a \u0627\u062e\u062a\u0628\u0627\u0631 \u062a\u0641\u0627\u0639\u0644\u064a\u0629 \u0648\u0642\u0627\u0631\u0626 \u0631\u0642\u0645\u064a \u0644\u0644\u0643\u062a\u0628 \u0627\u0644\u062f\u0631\u0627\u0633\u064a\u0629 \u0644\u0637\u0644\u0627\u0628 \u0627\u0644\u0637\u0628",
             "\u0627\u062e\u062a\u0628\u0627\u0631\u0627\u062a \u0635\u0648\u062a\u064a\u0629 \u0641\u0648\u0631\u064a\u0629 \u0628\u0648\u0627\u0633\u0637\u0629 \u062e\u0637 \u0623\u0646\u0627\u0628\u064a\u0628 \u0622\u0644\u064a \u0644\u062a\u062d\u0648\u064a\u0644 \u0627\u0644\u0643\u0644\u0627\u0645 \u0625\u0644\u0649 \u0646\u0635",
             "\u0639\u0644\u0627\u0645\u0629 \u0645\u0627\u0626\u064a\u0629 \u0641\u064a\u062f\u064a\u0648 \u062f\u064a\u0646\u0627\u0645\u064a\u0643\u064a\u0629 \u0644\u062d\u0645\u0627\u064a\u0629 \u0627\u0644\u0645\u0648\u0627\u062f \u0627\u0644\u062a\u0639\u0644\u064a\u0645\u064a\u0629 \u0645\u0646 \u0627\u0644\u062a\u0633\u062c\u064a\u0644 \u063a\u064a\u0631 \u0627\u0644\u0645\u0635\u0631\u062d \u0628\u0647"],
        back: "\u0628\u0646\u064a\u0646\u0627 \u0645\u0646\u0635\u0629 \u062a\u0639\u0644\u064a\u0645 \u0637\u0628\u064a \u0643\u0627\u0645\u0644\u0629 \u062a\u0636\u0645 \u062a\u0642\u064a\u064a\u0645\u0627\u064b \u0635\u0648\u062a\u064a\u0627\u064b \u0641\u0648\u0631\u064a\u0627\u064b \u0648\u0639\u0644\u0627\u0645\u0629 \u0645\u0627\u0626\u064a\u0629 \u0641\u064a\u062f\u064a\u0648 \u062f\u064a\u0646\u0627\u0645\u064a\u0643\u064a\u0629 \u0644\u062d\u0645\u0627\u064a\u0629 \u0627\u0644\u0645\u0644\u0643\u064a\u0629 \u0627\u0644\u0641\u0643\u0631\u064a\u0629."
      },
      driving: {
        title: "\u0645\u0646\u0635\u0629 \u0645\u062f\u0631\u0633\u0629 \u062a\u0639\u0644\u064a\u0645 \u0627\u0644\u0642\u064a\u0627\u062f\u0629 \u2014 \u0646\u0633\u062e\u0629 \u0627\u0644\u0645\u062f\u0631\u0651\u0628",
        li: ["\u0644\u0648\u062d\u0629 \u062a\u062d\u0643\u0651\u0645 \u0644\u0644\u0645\u062f\u0631\u0628\u064a\u0646 \u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0633\u0627\u0639\u0627\u062a \u0627\u0644\u062f\u0631\u0648\u0633\u060c \u0627\u0644\u062a\u0642\u064a\u064a\u0645\u0627\u062a \u0648\u0627\u0644\u0627\u0633\u062a\u0639\u062f\u0627\u062f \u0644\u0644\u0627\u062e\u062a\u0628\u0627\u0631\u0627\u062a",
             "\u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u062d\u0644\u064a\u0629 \u0628\u062f\u0648\u0646 \u062e\u0627\u062f\u0645 \u062a\u0639\u0643\u0633 \u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u062f\u0631\u0648\u0633 \u0628\u064a\u0646 \u0627\u0644\u0623\u062c\u0647\u0632\u0629 \u0628\u062f\u0648\u0646 \u062d\u0627\u062c\u0629 \u0644\u0644\u0625\u0646\u062a\u0631\u0646\u062a",
             "\u0645\u0632\u0627\u0645\u0646\u0629 \u062a\u0644\u0642\u0627\u0626\u064a\u0629 \u0645\u0639 \u062e\u0648\u0627\u062f\u0645 \u0627\u0644\u0633\u062d\u0627\u0628\u0629 \u0639\u0646\u062f \u062a\u0648\u0641\u0631 \u0627\u0644\u0627\u062a\u0635\u0627\u0644"],
        back: "\u0635\u0645\u0645\u0646\u0627 \u0644\u0648\u062d\u0629 \u062a\u062d\u0643\u0651\u0645 \u0644\u0644\u0645\u062f\u0631\u0628\u064a\u0646 \u062a\u0639\u0645\u0644 \u0628\u062f\u0648\u0646 \u0627\u062a\u0635\u0627\u0644 \u0628\u0627\u0644\u0625\u0646\u062a\u0631\u0646\u062a \u0645\u0639 \u0645\u0632\u0627\u0645\u0646\u0629 \u0645\u062d\u0644\u064a\u0629 \u0648\u062a\u0644\u0642\u0627\u0626\u064a\u0629 \u0645\u0639 \u0627\u0644\u0633\u062d\u0627\u0628\u0629."
      },
      dental: {
        title: "\u0628\u0648\u0627\u0628\u0629 \u0625\u062f\u0627\u0631\u0629 \u0639\u064a\u0627\u062f\u0627\u062a \u0627\u0644\u0623\u0633\u0646\u0627\u0646",
        li: ["\u0625\u062f\u0627\u0631\u0629 \u0634\u0627\u0645\u0644\u0629 \u0644\u0644\u0645\u0631\u0636\u0649\u060c \u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0639\u0644\u0627\u062c \u0648\u0645\u062a\u0627\u0628\u0639\u0629 \u0627\u0644\u0633\u062c\u0644\u0627\u062a \u0627\u0644\u0633\u0646\u064a\u0629 \u0627\u0644\u0631\u0642\u0645\u064a\u0629",
             "\u062c\u062f\u0648\u0644\u0629 \u0645\u0648\u0627\u0639\u064a\u062f \u062a\u0641\u0627\u0639\u0644\u064a\u0629\u060c \u062a\u0630\u0643\u064a\u0631\u0627\u062a \u0622\u0644\u064a\u0629 \u0648\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0641\u0648\u0627\u062a\u064a\u0631",
             "\u0642\u0627\u0639\u062f\u0629 \u0628\u064a\u0627\u0646\u0627\u062a \u0622\u0645\u0646\u0629 \u0648\u0645\u0648\u062b\u0648\u0642\u0629 \u0645\u0635\u0645\u0645\u0629 \u0644\u062e\u0635\u0648\u0635\u064a\u0629 \u0627\u0644\u0645\u0631\u0636\u0649 \u0648\u0627\u0644\u0648\u0635\u0648\u0644 \u0627\u0644\u0641\u0648\u0631\u064a"],
        back: "\u0637\u0648\u0631\u0646\u0627 \u0646\u0638\u0627\u0645\u0627\u064b \u0622\u0645\u0646\u0627\u064b \u0644\u0625\u062f\u0627\u0631\u0629 \u0627\u0644\u0639\u064a\u0627\u062f\u0627\u062a \u064a\u0634\u0645\u0644 \u0633\u062c\u0644\u0627\u062a \u0627\u0644\u0645\u0631\u0636\u0649\u060c \u0645\u0648\u0627\u0639\u064a\u062f \u0648\u0641\u0648\u0627\u062a\u064a\u0631 \u0622\u0644\u064a\u0629."
      }
    },
    contact: {
      title:         "\u0645\u0633\u062a\u0639\u062f \u0644\u062a\u062d\u0642\u064a\u0642<br>\u0631\u0624\u064a\u062a\u0643\u061f",
      btn:           "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627",
      lead:          "\u0623\u062e\u0628\u0631\u0646\u0627 \u0639\u0646 \u0645\u0634\u0631\u0648\u0639\u0643\u060c \u0648\u062f\u0639\u0646\u0627 \u0646\u0628\u062f\u0639 \u0634\u064a\u0626\u0627\u064b \u0627\u0633\u062a\u062b\u0646\u0627\u0626\u064a\u0627\u064b.",
      call_label:    "\u0627\u062a\u0635\u0644 \u0628\u0646\u0627 \u0645\u0628\u0627\u0634\u0631\u0629",
      whatsapp_label:"\u0648\u0627\u062a\u0633\u0627\u0628",
      telegram_label:"\u062a\u064a\u0644\u064a\u063a\u0631\u0627\u0645",
      email_label:   "\u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a"
    },
    footer: "ITwiz \u2014 \u0646\u062d\u0648\u0651\u0644 \u0627\u0644\u0643\u0648\u062f \u0625\u0644\u0649 \u0633\u062d\u0631",
    dialogue: {
      hero: [
        "\u0645\u0631\u062d\u0628\u0627\u064b \u0628\u0643 \u0641\u064a IT WIZ \u2728",
        "\u0645\u0633\u062a\u0639\u062f \u0644\u0644\u0633\u062d\u0631\u061f",
        "\u0645\u0631\u0631 \u0644\u0644\u0627\u0633\u062a\u0643\u0634\u0627\u0641 \u061b \uD83D\uDC47"
      ],
      services: [
        "\u0639\u062f\u0629 \u0623\u062f\u0648\u0627\u062a\u0646\u0627 \u0627\u0644\u0631\u0642\u0645\u064a\u0629 \u061b \uD83D\uDCA1",
        "\u0627\u062e\u062a\u0631 \u0642\u0648\u062a\u0643 \u0627\u0644\u062e\u0627\u0631\u0642\u0629 \u061b",
        "\u0645\u0631\u0631 \u0641\u0648\u0642 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u061b \u26A1"
      ],
      work: [
        "\u0645\u0634\u0627\u0631\u064a\u0639 \u062d\u0642\u064a\u0642\u064a\u0629\u060c \u0623\u062b\u0631 \u062d\u0642\u064a\u0642\u064a \u061b \uD83C\uDFAF",
        "\u0627\u0642\u0644\u0628 \u0644\u0644\u0642\u0635\u0629 \u061b \uD83D\uDD04",
        "\u0645\u0628\u0646\u064a \u0644\u0623\u0646\u0627\u0633 \u062d\u0642\u064a\u0642\u064a\u064a\u0646 \u061b \uD83D\uDCAA"
      ],
      contact: [
        "\u0644\u0646\u0628\u0646\u0650 \u0634\u064a\u0626\u0627\u064b \u0639\u0638\u064a\u0645\u0627\u064b \u061b \uD83D\uDD2E",
        "\u0623\u062e\u0628\u0631\u0646\u0627 \u0628\u0645\u0634\u0631\u0648\u0639\u0643 \u061b \uD83D\uDCAC",
        "\u0627\u0628\u062f\u0623 \u0627\u0644\u0645\u062d\u0627\u062f\u062b\u0629 \u061b"
      ],
      "card-web": [
        "\u0648\u064a\u0628 \u0648\u0645\u0648\u0628\u0627\u064a\u0644 \u0645\u062a\u0642\u0646\u0627\u0646 \u061b",
        "\u0648\u064a\u0628 \u0623\u0648 \u0645\u0648\u0628\u0627\u064a\u0644 \u2014 \u0643\u0644\u0627\u0647\u0645\u0627 \u061b \u2728"
      ],
      "card-ai": [
        "\u0623\u062a\u0645\u062a\u0629 \u0630\u0643\u064a\u0629 \u061b",
        "\u0630\u0643\u0627\u0621 \u0627\u0635\u0637\u0646\u0627\u0639\u064a \u064a\u0639\u0645\u0644 \u061b"
      ],
      "card-security": [
        "\u0623\u0645\u0627\u0646 \u0645\u062d\u0643\u0645 \u061b",
        "\u0645\u0642\u0641\u0644 \u0628\u0625\u062d\u0643\u0627\u0645 \u061b"
      ],
      "card-custom": [
        "\u0645\u0635\u0645\u0645 \u0644\u0633\u064a\u0631 \u0639\u0645\u0644\u0643 \u061b",
        "\u064a\u0646\u0627\u0633\u0628 \u0643\u0627\u0644\u0642\u0641\u0627\u0632 \u061b"
      ],
      "card-maitrisez": [
        "\u062a\u0642\u064a\u064a\u0645 \u0635\u0648\u062a\u064a \u0644\u0644\u0627\u0645\u062a\u062d\u0627\u0646\u0627\u062a \u061b",
        "\u062a\u0642\u064a\u064a\u0645 \u0635\u0648\u062a\u064a \u0641\u0648\u0631\u064a \u061b"
      ],
      "card-driving": [
        "\u0645\u0632\u0627\u0645\u0646\u0629 \u0628\u062f\u0648\u0646 \u0625\u0646\u062a\u0631\u0646\u062a \u061b",
        "\u0645\u0635\u0645\u0645 \u0644\u0644\u0645\u062f\u0631\u0628\u064a\u0646 \u061b"
      ],
      "card-dental": [
        "\u0633\u062c\u0644\u0627\u062a \u0646\u0638\u064a\u0641\u0629 \u0648\u0622\u0645\u0646\u0629 \u061b",
        "\u0625\u062f\u0627\u0631\u0629 \u0639\u064a\u0627\u062f\u0629 \u0622\u0644\u064a\u0629 \u061b"
      ],
      idle: [
        "\u062a\u062d\u062a\u0627\u062c \u0645\u0633\u0627\u0639\u062f\u0629\u061f",
        "\u062c\u0631\u0651\u0628 \u0642\u0644\u0628 \u0628\u0637\u0627\u0642\u0629 \u061b \uD83D\uDD04",
        "\u062d\u0644 \u0645\u062e\u0635\u0635\u061f \u0646\u0628\u0646\u064a\u0647\u0627 \u061b \uD83D\uDCAA",
        "\u0645\u0631\u0631 \u0641\u0648\u0642 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062a \u061b \uD83D\uDEE0\uFE0F",
        "\u0645\u0633\u062a\u0639\u062f \u0644\u0644\u062a\u062d\u062f\u062b\u061f \uD83D\uDCAC",
        "\u0643\u0644 \u0645\u0634\u0631\u0648\u0639 \u064a\u0628\u062f\u0623 \u0647\u0646\u0627 \u061b \uD83D\uDC40",
        "\u0627\u0633\u062a\u0643\u0634\u0641 \u061b \uD83D\uDE09"
      ],
      linger_hero:     ["\u0645\u0631\u0631 \u0644\u0644\u0645\u0632\u064a\u062f \u061b \uD83D\uDC47"],
      linger_services: ["\u0645\u0631\u0631 \u0641\u0648\u0642 \u0628\u0637\u0627\u0642\u0629 \u061b \uD83D\uDC46"],
      linger_work:     ["\u0627\u0642\u0644\u0628 \u0628\u0637\u0627\u0642\u0629 \u0645\u0634\u0631\u0648\u0639 \u061b \uD83D\uDD04"],
      linger_contact:  ["\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627 \u061b \uD83D\uDCEB"]
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
    if (val !== undefined) el.textContent = val;
  });

  document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
    var val = t(el.getAttribute('data-i18n-html'));
    if (val !== undefined) el.innerHTML = val;
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
  applyLanguage(saved || 'en');

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLanguage(btn.getAttribute('data-lang'));
    });
  });
}

window.__i18n = { t: t, applyLanguage: applyLanguage, initLang: initLang };

})();
