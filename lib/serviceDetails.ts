export const industries=['Education & Training','Retail & E-Commerce','Tourism & Hospitality','Professional Services','Organizations & Institutions','Engineering & Infrastructure','Hydropower & Energy','Other / Not Sure'];
type Detail={overview:string;areas:string[];sectors:{name:string;example:string}[];projectTypes:string[];related:string[]};
export const serviceDetails:Record<string,Detail>={
  software:{
    overview:'Turn a specific business need into a useful application. We start with the people who will use it, map their workflow, and discuss the right platform and scope.',
    areas:['Custom web applications, mobile app planning, and business software','Workflow design, forms, records, dashboards, and reporting','User experience and interface design for practical everyday use','Integration planning, documentation, and future maintenance'],
    sectors:[{name:industries[0],example:'Student records, attendance, course administration, or a learning portal.'},{name:industries[1],example:'Inventory, sales records, product catalogs, or order workflows.'},{name:industries[2],example:'Booking inquiries, itinerary management, guest records, or tour operations.'},{name:industries[5],example:'Project tracking, field data collection, or document workflows.'}],
    projectTypes:['Custom Business Software','Web Application','Mobile App','Workflow & Reporting Tool'],related:['web','consulting','engineering']},
  web:{
    overview:'A website should help visitors understand your business and take the next step. Discuss a responsive website, customer portal, or web application that matches your audience and daily operations.',
    areas:['Business websites and service landing pages','Responsive layouts for phones, tablets, and desktops','Web portals, inquiry forms, and content management planning','UI/UX design, accessibility, performance, and maintenance planning'],
    sectors:[{name:industries[3],example:'A company website with clear services, a portfolio, and working inquiries.'},{name:industries[0],example:'School or training websites with courses, notices, and admission inquiries.'},{name:industries[2],example:'Tourism and hospitality sites with destinations, itineraries, or booking requests.'},{name:industries[1],example:'Product catalogs, online storefronts, and shopping workflows.'}],
    projectTypes:['Business Website','Website Redesign','Customer Portal','Web Application','E-Commerce Website'],related:['software','content','commerce']},
  consulting:{
    overview:'Choose technology with a clear purpose. We help you assess a need, compare practical options, and plan software, websites, apps, or infrastructure before committing to a project.',
    areas:['Review current tools, working processes, and technology needs','Plan websites, custom apps, business systems, and their user experience','Compare platforms, integrations, access needs, and maintenance options','Create a practical implementation roadmap and discuss priorities'],
    sectors:[{name:industries[0],example:'Plan learning tools, administrative systems, and technology training.'},{name:industries[1],example:'Review inventory, sales, storefront, and customer service workflows.'},{name:industries[3],example:'Improve client records, project collaboration, and digital service delivery.'},{name:industries[5],example:'Plan project data tools, reporting processes, and software requirements.'}],
    projectTypes:['Technology Review','Website or App Planning','System & Workflow Design','Technology Roadmap'],related:['software','web','networking']},
  ai:{
    overview:'Explore AI and digital marketing around a specific business goal. We discuss useful tasks, human review, content needs, and the channels that fit your audience.',
    areas:['AI use-case discovery and workflow automation planning','Content and campaign planning for relevant audiences','Digital marketing strategy and website content improvement','Human review, responsible data handling, and practical team guidance'],
    sectors:[{name:industries[3],example:'First drafts, information organization, or routine administrative workflows.'},{name:industries[1],example:'Product content and marketing plans for a store or catalog.'},{name:industries[2],example:'Destination content and inquiry-focused digital campaigns.'},{name:industries[0],example:'Course promotion and practical AI awareness sessions.'}],
    projectTypes:['AI Workflow Planning','Digital Marketing Strategy','Content & Campaign Planning'],related:['consulting','content','web']},
  support:{
    overview:'Get practical help with the computers and software you use every day. We begin with the problem and discuss setup, troubleshooting, maintenance, or the next step for your equipment.',
    areas:['Computer setup and software configuration','Hardware and software troubleshooting','Maintenance, updates, and backup guidance','Advice on suitable equipment and a manageable support plan'],
    sectors:[{name:industries[3],example:'Workstation setup and everyday office software assistance.'},{name:industries[0],example:'Computer lab setup and staff troubleshooting support.'},{name:industries[1],example:'Support for the devices and software used in retail operations.'}],
    projectTypes:['Computer Setup','Troubleshooting','Software Configuration','Maintenance Guidance'],related:['networking','training','consulting']},
  networking:{
    overview:'Connect your workplace with a network that fits its size, layout, and day-to-day needs. We discuss connectivity, devices, configuration, and the people responsible for ongoing support.',
    areas:['Office network and Wi-Fi planning','Network setup, configuration, and connectivity troubleshooting','Device access, sharing, and network documentation','Guidance for maintaining and expanding your network'],
    sectors:[{name:industries[3],example:'Office connectivity, shared resources, and team access.'},{name:industries[0],example:'Classroom, computer lab, and administrative connectivity.'},{name:industries[2],example:'Guest and staff connectivity planning for a hospitality business.'}],
    projectTypes:['Office Network Setup','Wi-Fi Planning','Connectivity Troubleshooting','Network Review'],related:['support','consulting']},
  training:{
    overview:'Build practical technology skills through training shaped around the learner. Discuss your starting point, the tools you use, and the tasks you want to do confidently.',
    areas:['Computer and everyday software skills','Website, digital tools, and IT fundamentals','Practical AI awareness and workflow guidance','Team training and learning plans tailored to agreed goals'],
    sectors:[{name:industries[0],example:'Technology learning for students, teachers, or training participants.'},{name:industries[3],example:'Staff development for office tools and everyday digital workflows.'},{name:industries[4],example:'Team sessions for collaboration tools and digital operations.'}],
    projectTypes:['Individual Training','Team Workshop','Software Skills','AI & Digital Tools Training'],related:['consulting','support']},
  commerce:{
    overview:'Bring your products online with a clear shopping and operating process. Discuss your catalog, customers, orders, fulfillment, and the platform that fits your business.',
    areas:['Online storefront and product catalog planning','Mobile-friendly product presentation and shopping experience','Order, payment, and delivery workflow planning','Store content, day-to-day management, and future integrations'],
    sectors:[{name:industries[1],example:'An online store for retail products, local goods, or a specialty catalog.'},{name:industries[3],example:'A product catalog or inquiry-based ordering portal for a small business.'}],
    projectTypes:['Online Store','Product Catalog','Store Redesign','Order Workflow Planning'],related:['web','software','content']},
  content:{
    overview:'Make your message easier to understand through clear visual content. Discuss the audience, format, and practical purpose of your design or video project.',
    areas:['Graphic design and digital content for websites and campaigns','Website and app interface design concepts','Video planning, editing, and digital media support','Consistent visual presentation using your supplied brand assets'],
    sectors:[{name:industries[3],example:'Company graphics, service presentations, or a website design direction.'},{name:industries[1],example:'Product visuals and content for an online store or campaign.'},{name:industries[0],example:'Course materials, event graphics, or training videos.'},{name:industries[2],example:'Destination and hospitality content for digital channels.'}],
    projectTypes:['Graphic Design','Website / App UI Design','Video & Digital Content','Brand Content'],related:['web','ai','commerce']},
  engineering:{
    overview:'Discuss software around an engineering or hydropower workflow. We start with your process, data, users, and specialist requirements so the proposed scope is clear.',
    areas:['Project data collection, organization, and reporting tools','Engineering and infrastructure workflow applications','Hydropower monitoring and operational reporting concepts','Integration planning and collaboration with domain specialists'],
    sectors:[{name:industries[5],example:'Site records, progress tracking, document workflows, or field reports.'},{name:industries[6],example:'Operational data records, maintenance workflows, or reporting dashboards.'}],
    projectTypes:['Project Tracking Software','Field Data Tool','Reporting Dashboard','Specialist Software Planning'],related:['software','consulting']},
};
