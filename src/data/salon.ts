export type ServiceCategory = "Hair" | "Nails" | "Skin" | "Makeup" | "Spa";

export interface SalonService {
  id: string;
  slug: string;
  category: ServiceCategory;
  name: string;
  tagline: string;
  description: string;
  includes: string[];
  price: number;
  durationMinutes: number;
  image: string;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  discipline: ServiceCategory;
  categories: ServiceCategory[];
  specialties: string[];
  yearsExperience: number;
  bio: string;
  quote: string;
  instagram: string;
  image: string;
}

export interface Transformation {
  id: string;
  category: ServiceCategory;
  title: string;
  subtitle: string;
  stylistName: string;
  stylistId: string;
  serviceSlug: string;
  durationLabel: string;
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  beforeFilter: string;
  notes: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: ServiceCategory | "Interior";
  image: string;
  stylist: string;
  treatment: string;
  serviceSlug?: string;
  aspect: "portrait" | "landscape" | "square";
  caption: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientTitle: string;
  serviceName: string;
  rating: number;
  quote: string;
  dateLabel: string;
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export const SALON_INFO = {
  name: "Bella Salon",
  shortMark: "BELLA",
  established: "2019",
  heroHeadline: "BEAUTY IS AN EXPERIENCE. NOT JUST A SERVICE.",
  heroSubheading:
    "Discover a world of beauty, elegance and self-care in the heart of Victoria Island, Lagos. Experience exceptional treatments designed to bring out your most confident self.",
  addressLine1: "14 Adeola Odeku Crescent, Penthouse Atelier",
  addressLine2: "Victoria Island, Lagos, Nigeria",
  fullAddress:
    "14 Adeola Odeku Crescent, Penthouse Atelier, Victoria Island, Lagos, Nigeria",
  phoneDisplay: "+234 809 555 0184",
  phoneHref: "tel:+2348095550184",
  whatsappNumber: "2348095550184",
  whatsappDisplay: "+234 809 555 0184",
  email: "concierge@bellasalon.ng",
  instagramHandle: "@bellasalon.lagos",
  instagramUrl: "https://instagram.com",
  tiktokHandle: "@bellasalon.ng",
  tiktokUrl: "https://tiktok.com",
  googleMapsUrl:
    "https://maps.google.com/?q=Adeola+Odeku+Street+Victoria+Island+Lagos+Nigeria",
  coordinates: {
    lat: 6.4281,
    lng: 3.4219,
  },
  hours: [
    { days: "Tuesday – Friday", time: "9:00 AM – 8:00 PM" },
    { days: "Saturday", time: "8:30 AM – 8:00 PM" },
    { days: "Sunday", time: "11:00 AM – 6:00 PM" },
    { days: "Monday", time: "Closed · Private Editorial & Bridal Bookings" },
  ],
};

export const CATEGORY_SUMMARIES: Record<
  ServiceCategory,
  {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  }
> = {
  Hair: {
    title: "Hair Architecture & Luxury Installs",
    subtitle: "Silk Press, Raw Hair Wig Installs, Balayage & Braids",
    description:
      "Seamless HD lace melts, luminous silk presses, dimensional espresso-honey color, and tailored Lagos bridal hair crafted to move effortlessly.",
    image: "/images/lagos-service-hair.png",
  },
  Nails: {
    title: "Couture Nail & BIAB Atelier",
    subtitle: "Russian BIAB Gel, Sculpted Extensions & Hibiscus Pedicures",
    description:
      "Immaculate Russian cuticle refinement, structural BIAB builder overlays, glazed pearl finishes, and soothing botanical foot rituals.",
    image: "/images/lagos-service-nails.png",
  },
  Skin: {
    title: "Melanin-Safe Clinical & Gold Skin",
    subtitle: "24K Gold Leaf Facial, Hyperpigmentation Glow & Buccal Lift",
    description:
      "Dermal longevity rituals formulated specifically for melanin-rich skin—pairing pure 24K gold leaf, gentle enzyme resurfacing, and sculpting facial massage.",
    image: "/images/lagos-service-skin.png",
  },
  Makeup: {
    title: "Nigerian Bridal & Owambe Glam",
    subtitle: "Traditional Engagement, White Wedding & Red-Carpet Skin",
    description:
      "Humidity-proof, radiant skin-first artistry built to photograph impeccably from early morning Traditional Engagement ceremonies through twilight receptions.",
    image: "/images/lagos-service-makeup.png",
  },
  Spa: {
    title: "Sanctuary Spa & Hammam Rituals",
    subtitle: "Basalt Stone, Dudu-Osun Black Soap Polish & Cashmere Wraps",
    description:
      "Candlelit Victoria Island escape suites featuring warm volcanic basalt therapy, Nigerian shea-amber oils, and restorative full-body rituals.",
    image: "/images/lagos-service-spa.png",
  },
};

export const SERVICES: SalonService[] = [
  // HAIR
  {
    id: "hair-silk-press",
    slug: "couture-silk-press-blowout",
    category: "Hair",
    name: "Couture Silk Press, Trim & Shea-Argan Blowout",
    tagline: "Fluid, humidity-resistant mirror shine tailored for natural texture",
    description:
      "Begins with a detoxifying hibiscus scalp cleanse, steam hydration mask, precision split-end dusting, and weightless ceramic silk press for effortless bounce.",
    includes: [
      "Hibiscus scalp cleanse & steam hydration",
      "Precision structural trim & heat shield",
      "Humidity-sealed Lagos silk blowout",
    ],
    price: 55000,
    durationMinutes: 75,
    image: "/images/lagos-service-hair.png",
    featured: true,
  },
  {
    id: "hair-frontal-install",
    slug: "luxury-raw-hair-frontal-install",
    category: "Hair",
    name: "Luxury Raw Hair Wig Install & HD Frontal Melt",
    tagline: "Undetectable hairline customization with signature Victoria Island waves",
    description:
      "Includes braid-down foundation, custom hairline plucking, knot tinting, adhesive-free or waterproof HD melt, and glamorous body-wave or bone-straight styling.",
    includes: [
      "Custom knot-bleaching & scalp tint match",
      "Breathable protective braid foundation",
      "HD lace melt & editorial wave styling",
    ],
    price: 95000,
    durationMinutes: 120,
    image: "/images/lagos-transform-hair-after.png",
    featured: true,
  },
  {
    id: "hair-honey-balayage",
    slug: "lived-in-dimensional-balayage",
    category: "Hair",
    name: "Lived-In Honey & Espresso Balayage",
    tagline: "Hand-painted golden caramel ribbons on natural hair or luxury bundles",
    description:
      "Sunlit, custom-toned color calibrated for deeper warmth and shine. Hand-painted micro-ribbons paired with bond-building amino gloss for soft grow-out.",
    includes: [
      "Custom tone & undertone mapping",
      "Bond-multiplier restorative complex",
      "Mirror-shine gloss & signature wave finish",
    ],
    price: 165000,
    durationMinutes: 180,
    image: "/images/lagos-transform-hair-after.png",
  },
  {
    id: "hair-bridal-styling",
    slug: "bridal-editorial-updo",
    category: "Hair",
    name: "Traditional & White Wedding Bridal Hair",
    tagline: "Sleek pearl chignons, gele prep foundation & reception restyle",
    description:
      "Crafted inside our private VI bridal suite—designed to transition gracefully from morning gele tying into effortless sculpted waves or pearl-pinned chignons.",
    includes: [
      "Gele-ready crown sculpting & secure pins",
      "Freshwater pearl or bridal accessory placement",
      "Chilled hibiscus spritz & champagne service",
    ],
    price: 145000,
    durationMinutes: 120,
    image: "/images/lagos-service-makeup.png",
  },
  {
    id: "hair-boho-braids",
    slug: "boho-knotless-braids-scalp-spa",
    category: "Hair",
    name: "Boho Knotless Braids & Botanical Scalp Spa",
    tagline: "Tension-free neat parting finished with raw human curls",
    description:
      "Performed by two master braiders for reduced chair time—starting with warm tea-tree scalp steam and finished with lightweight human-hair curls and mousse set.",
    includes: [
      "Pre-braid scalp steam & moringa oil seal",
      "Dual-stylist tension-free knotless braiding",
      "Hot-water dip & silk curl foam finish",
    ],
    price: 110000,
    durationMinutes: 180,
    image: "/images/lagos-look-boho-braids.png",
  },

  // NAILS
  {
    id: "nails-russian-biab",
    slug: "russian-couture-biab-manicure",
    category: "Nails",
    name: "Russian BIAB Structured Gel Manicure",
    tagline: "Precision e-file cuticle refinement & architectural builder strength",
    description:
      "Our signature Lagos nail ritual delivers ultra-clean cuticles, natural nail strengthening BIAB overlay, and timeless neutral, champagne, or sheer milky rose shades.",
    includes: [
      "Precision dry Russian e-file cuticle care",
      "Strength-building BIAB gel overlay",
      "Whipped Nigerian shea-rose hand massage",
    ],
    price: 45000,
    durationMinutes: 60,
    image: "/images/lagos-service-nails.png",
    featured: true,
  },
  {
    id: "nails-sculpted-extensions",
    slug: "sculpted-almond-gel-extensions",
    category: "Nails",
    name: "Sculpted Almond Extensions & 24K Gold Foil",
    tagline: "Featherlight custom length with pearl glaze or gold-leaf inlay",
    description:
      "Tailored form-sculpted acrylic or hard-gel extensions shaped cleanly to elongate the hand, accented with whisper-thin 24K gold foil or pearl sheen.",
    includes: [
      "Custom hand-sculpted almond or coffin forms",
      "24K gold leaf or pearl chrome finish",
      "Warm botanical cuticle elixir",
    ],
    price: 72000,
    durationMinutes: 105,
    image: "/images/lagos-service-nails.png",
  },
  {
    id: "nails-hibiscus-pedicure",
    slug: "hibiscus-shea-rose-pedicure",
    category: "Nails",
    name: "Hibiscus (Zobo) & Shea Rose Spa Pedicure",
    tagline: "Antioxidant hibiscus soak, sugar exfoliation & hot stone reflexology",
    description:
      "Soak into plush champagne loungers with warm hibiscus-petal mineral soak, raw brown-sugar heel polish, shea-butter mask, and mirror-shine gel finish.",
    includes: [
      "Warm hibiscus & sea-salt mineral bath",
      "Callus smoothing & whipped shea cocoon",
      "15-minute warm basalt foot reflexology",
    ],
    price: 58000,
    durationMinutes: 75,
    image: "/images/lagos-salon-interior-2.png",
  },
  {
    id: "nails-chrome-art",
    slug: "minimalist-pearl-chrome-art",
    category: "Nails",
    name: "Minimalist Glazed Pearl & Micro-French",
    tagline: "Quiet-luxury neutral glazing & fine metallic French tips",
    description:
      "Inspired by fine gold jewelry—delicate micro-French tips, champagne glazed pearl dust, and effortless everyday poise.",
    includes: [
      "Structured gel foundation",
      "Hand-painted micro-French or pearl glaze",
      "Sweet almond cuticle treatment",
    ],
    price: 55000,
    durationMinutes: 75,
    image: "/images/lagos-service-nails.png",
  },

  // SKIN
  {
    id: "skin-gold-leaf",
    slug: "24k-gold-leaf-anti-aging-facial",
    category: "Skin",
    name: "24K Gold Leaf Cellular Anti-Aging Facial",
    tagline: "Pure gold leaf dermal compression, peptide serums & LED lift",
    description:
      "Our flagship luxury treatment designed for radiant skin longevity—pairing lymphatic drainage, pure 24K gold leaf sheets massaged with warm hyaluronic serum, and LED radiance.",
    includes: [
      "Gentle botanical double cleanse & enzyme glow",
      "24K pure gold leaf dermal infusion",
      "LED collagen therapy & neck-shoulder sculpt",
    ],
    price: 150000,
    durationMinutes: 90,
    image: "/images/lagos-service-skin.png",
    featured: true,
  },
  {
    id: "skin-melanin-glow",
    slug: "melanin-safe-diamond-hyperpigmentation-glow",
    category: "Skin",
    name: "Melanin-Safe Diamond & Hyperpigmentation Glow",
    tagline: "Even-tone brightening without post-inflammatory sensitivity",
    description:
      "Calibrated specifically for melanin-rich skin—uses gentle diamond exfoliation, tranexamic acid, vitamin C esters, and calming licorice root to fade dark marks safely.",
    includes: [
      "Melanin-safe gentle diamond resurfacing",
      "Tranexamic & vitamin-C brightening dome",
      "Cooling hydro-jelly barrier mask",
    ],
    price: 115000,
    durationMinutes: 75,
    image: "/images/lagos-service-skin.png",
  },
  {
    id: "skin-buccal-sculpt",
    slug: "sculptural-buccal-lymphatic-facial",
    category: "Skin",
    name: "Sculptural Buccal & Lymphatic Lift Facial",
    tagline: "Deep myofascial release for lifted cheekbones & jawline clarity",
    description:
      "An intensive holistic sculpting ritual combining external facial contour massage with intra-oral buccal release to depuff, lift, and restore natural radiance.",
    includes: [
      "Lymphatic drainage awakening",
      "Intra-oral buccal myofascial release",
      "Cooling rose-quartz finishing compression",
    ],
    price: 120000,
    durationMinutes: 75,
    image: "/images/lagos-team-funke.png",
  },
  {
    id: "skin-oxygen-therapy",
    slug: "cellular-oxygen-moringa-hydration",
    category: "Skin",
    name: "Cellular Oxygen & Moringa Hydration Therapy",
    tagline: "Pressurized oxygen mist for instant event-ready glass skin",
    description:
      "Ideal before Lagos weddings, flights, or shoots—floods thirsty skin with pressurized pure oxygen, moringa peptides, and soothing ceramides.",
    includes: [
      "Hyperbaric oxygen serum mist",
      "20-minute cryo-globe lift",
      "Ceramide humidity-lock veil",
    ],
    price: 98000,
    durationMinutes: 60,
    image: "/images/lagos-salon-interior-1.png",
  },

  // MAKEUP
  {
    id: "makeup-bridal-couture",
    slug: "signature-bridal-couture-glam",
    category: "Makeup",
    name: "Nigerian Bridal Couture Glam (Trad / White)",
    tagline: "Sweat-proof luminous satin finish engineered for all-day celebration",
    description:
      "Luxury skin prep massage, seamless multi-undertone foundation layering, soft bronze-gold shimmer eyes, individual silk lashes, and a personalized bridal lip touch-up kit.",
    includes: [
      "Hydrating glass-skin pre-makeup prep",
      "Lagos humidity-proof velvet setting seal",
      "Complimentary custom bridal lip kit",
    ],
    price: 280000,
    durationMinutes: 150,
    image: "/images/lagos-look-traditional-bride.png",
    featured: true,
  },
  {
    id: "makeup-owambe-editorial",
    slug: "owambe-red-carpet-soft-glam",
    category: "Makeup",
    name: "Owambe, Gala & Red-Carpet Soft Glam",
    tagline: "Radiant warm bronze sculpt, glass glow & long-wear precision",
    description:
      "Tailored for Lagos milestone celebrations, galas, and evening receptions—calibrated to look opulent both up close and under flash photography.",
    includes: [
      "Illuminating pore-blur primer ritual",
      "Custom mink or individual silk lashes",
      "16-hour transfer-proof finishing mist",
    ],
    price: 110000,
    durationMinutes: 75,
    image: "/images/lagos-transform-makeup-after.png",
  },
  {
    id: "makeup-luminous-day",
    slug: "soft-luminous-day-glam",
    category: "Makeup",
    name: "Soft Second-Skin Day Editorial",
    tagline: "Effortless skin-like glow for studio shoots, brunch & boardrooms",
    description:
      "Feather-light complexion polishing with brushed brows, sunlit champagne lids, and satin nude-cocoa lip gloss.",
    includes: [
      "Dewy serum base preparation",
      "Feathered brow & soft bronze eye",
      "Hydrating satin lip glaze",
    ],
    price: 85000,
    durationMinutes: 60,
    image: "/images/lagos-team-zainab.png",
  },
  {
    id: "makeup-private-lesson",
    slug: "private-artistry-masterclass",
    category: "Makeup",
    name: "Private One-on-One Artistry Masterclass",
    tagline: "Personal vanity audit, undertone matching & guided application",
    description:
      "Ninety private minutes with our Senior Makeup Director mastering everyday complexion perfection, brow architecture, and effortless evening transition.",
    includes: [
      "Personal vanity edit & shade prescription",
      "Half-face guided hands-on technique",
      "Curated Lagos & global product list",
    ],
    price: 135000,
    durationMinutes: 90,
    image: "/images/lagos-service-makeup.png",
  },

  // SPA
  {
    id: "spa-basalt-stone",
    slug: "warm-basalt-shea-amber-ritual",
    category: "Spa",
    name: "Warm Basalt & Shea-Amber Stone Ritual",
    tagline: "Heated volcanic stones paired with raw West African shea & amber oil",
    description:
      "Performed inside our candlelit Victoria Island sanctuary suite. Heated basalt stones glide across deep fascia with warm whipped shea and sandalwood oil to melt away traffic and city fatigue.",
    includes: [
      "Aromatic inhalation ritual",
      "Full-body heated basalt stone therapy",
      "Warm spiced hibiscus tea post-treatment",
    ],
    price: 115000,
    durationMinutes: 90,
    image: "/images/lagos-service-spa.png",
    featured: true,
  },
  {
    id: "spa-black-soap-hammam",
    slug: "nigerian-black-soap-honey-hammam",
    category: "Spa",
    name: "Dudu-Osun Black Soap & Wild Honey Hammam",
    tagline: "Traditional West African botanical purification & silk body glow",
    description:
      "Honors heritage ingredients elevated to five-star spa luxury: warm steam softening, gentle Nigerian black-soap and brown-sugar polish, wild honey wrap, and shea-neroli hydration.",
    includes: [
      "Warm steam & eucalyptus inhalation",
      "Artisanal black-soap & cane sugar exfoliation",
      "Wild honey body wrap & scalp massage",
    ],
    price: 95000,
    durationMinutes: 75,
    image: "/images/lagos-salon-interior-2.png",
  },
  {
    id: "spa-aromatherapy-deep",
    slug: "aromatherapy-deep-tissue-ritual",
    category: "Spa",
    name: "Aromatherapy Deep Tissue Restoration",
    tagline: "Targeted tension release with warm lemongrass & cedarwood oil",
    description:
      "Custom pressure calibration focused on shoulders, lower back, and legs—ideal after long weeks or flights into Murtala Muhammed.",
    includes: [
      "Custom botanical oil blend selection",
      "Hot herbal towel compress prep",
      "75-minute targeted bodywork",
    ],
    price: 98000,
    durationMinutes: 75,
    image: "/images/lagos-service-spa.png",
  },
  {
    id: "spa-couples-sanctuary",
    slug: "twilight-couples-sanctuary",
    category: "Spa",
    name: "Victoria Island Twilight Suite for Two",
    tagline: "Side-by-side bespoke massages, botanical foot soak & champagne",
    description:
      "Two uninterrupted hours in our candlelit double suite featuring dual customized body therapies, warm rose-hibiscus foot rituals, and chilled champagne or mocktails.",
    includes: [
      "Private candlelit double sanctuary suite",
      "90-minute bespoke couples massage",
      "Chilled refreshments & takeaway body oil",
    ],
    price: 240000,
    durationMinutes: 120,
    image: "/images/lagos-salon-interior-2.png",
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "toluwani-adeyemi",
    name: "Toluwani Adeyemi",
    role: "Creative Director & Master Color / Wig Architect",
    discipline: "Hair",
    categories: ["Hair"],
    specialties: [
      "HD Frontal Customization",
      "Lived-In Balayage",
      "Editorial Color Correction",
    ],
    yearsExperience: 12,
    bio: "Trained in London and Paris before returning home to Lagos, Toluwani founded Bella Salon in Victoria Island to marry global editorial luxury with mastery of textured hair and bespoke raw-hair artistry.",
    quote:
      "Luxury hair should move like silk in Lagos heat and feel completely effortless as your own.",
    instagram: "@toluwani.bellalagos",
    image: "/images/lagos-team-toluwani.png",
  },
  {
    id: "chidinma-okafor",
    name: "Chidinma Okafor",
    role: "Lead Texture, Silk Press & Bridal Stylist",
    discipline: "Hair",
    categories: ["Hair"],
    specialties: [
      "Silk Press & Health Care",
      "Boho Knotless Braids",
      "Traditional Bridal Hair",
    ],
    yearsExperience: 9,
    bio: "Celebrated across Ikoyi and Victoria Island for restoring shine and length to natural curls, Chidinma crafts fluid silk presses and iconic gele-to-reception bridal silhouettes.",
    quote:
      "Healthy scalp foundations and gentle precision always outshine shortcuts.",
    instagram: "@chidinma.hairatelier",
    image: "/images/lagos-team-chidinma.png",
  },
  {
    id: "zainab-bello",
    name: "Zainab Bello",
    role: "Senior Bridal & Owambe Makeup Director",
    discipline: "Makeup",
    categories: ["Makeup"],
    specialties: [
      "Nigerian Bridal Couture",
      "Melanin Glass Skin",
      "Humidity-Proof Glam",
    ],
    yearsExperience: 8,
    bio: "A fixture behind Lagos Fashion Week and society weddings from Abuja to Lagos, Zainab crafts luminous, crease-proof complexions that elevate every skin undertone effortlessly.",
    quote:
      "True bridal artistry lets your own joy and skin radiance shine through from morning prayers to the afterparty.",
    instagram: "@zainab.beautyatelier",
    image: "/images/lagos-team-zainab.png",
  },
  {
    id: "funke-adesina",
    name: "Dr. Funke Adesina",
    role: "Lead Melanin-Safe Clinical Aesthetician",
    discipline: "Skin",
    categories: ["Skin"],
    specialties: [
      "24K Gold Leaf Facials",
      "Hyperpigmentation Safe Care",
      "Buccal Myofascial Lift",
    ],
    yearsExperience: 11,
    bio: "Combining dermal science with sculpted myofascial release, Funke pioneered Bella Salon’s melanin-safe resurfacing protocols so deeper complexions achieve luminous glass glow without irritation.",
    quote:
      "Melanin skin deserves intelligent, gentle actives—never harsh stripping.",
    instagram: "@drfunke.skinlagos",
    image: "/images/lagos-team-funke.png",
  },
  {
    id: "amaka-nwosu",
    name: "Amaka Nwosu",
    role: "Master BIAB & Nail Couture Artist",
    discipline: "Nails",
    categories: ["Nails"],
    specialties: [
      "Russian BIAB Overlay",
      "24K Gold Leaf Extensions",
      "Micro-French Couture",
    ],
    yearsExperience: 7,
    bio: "Known for razor-clean Russian cuticle precision and structural BIAB strength, Amaka turns manicures into understated fine-jewelry accents.",
    quote:
      "Immaculate nail architecture in warm champagne tones completes every look before you speak a word.",
    instagram: "@amaka.nailatelier",
    image: "/images/lagos-team-amaka.png",
  },
  {
    id: "damilola-balogun",
    name: "Damilola Balogun",
    role: "Master Holistic Spa & Hammam Therapist",
    discipline: "Spa",
    categories: ["Spa"],
    specialties: [
      "Warm Basalt Stone Therapy",
      "Dudu-Osun Botanical Hammam",
      "Myofascial Release",
    ],
    yearsExperience: 10,
    bio: "Trained in therapeutic bodywork and West African botanical hydrotherapy, Damilola creates deeply grounding sanctuary rituals tailored to melt away Lagos pace.",
    quote:
      "True beauty begins the instant the outside noise fades and your shoulders finally exhale.",
    instagram: "@damilola.sanctuary",
    image: "/images/lagos-team-damilola.png",
  },
];

export const TRANSFORMATIONS: Transformation[] = [
  {
    id: "honey-balayage",
    category: "Hair",
    title: "Dimensional Honey Frontal Melt & Silk Waves",
    subtitle: "Natural baseline prepped into undetectable caramel-kissed luxury waves",
    stylistName: "Toluwani Adeyemi",
    stylistId: "toluwani-adeyemi",
    serviceSlug: "luxury-raw-hair-frontal-install",
    durationLabel: "2 Hours",
    beforeLabel: "Before · Natural Puff",
    afterLabel: "After · HD Frontal + Honey Melt",
    beforeImage: "/images/lagos-transform-hair-before.png",
    afterImage: "/images/lagos-transform-hair-after.png",
    beforeFilter: "",
    notes:
      "Hand-plucked HD hairline matched to skin undertone, bonded seamlessly and finished with mirror-shine barrel waves.",
  },
  {
    id: "bridal-radiance",
    category: "Makeup",
    title: "Luminous Nigerian Bridal Skin & Bronze Sculpt",
    subtitle: "Clean bare skin elevated into humidity-proof satin bridal glam",
    stylistName: "Zainab Bello",
    stylistId: "zainab-bello",
    serviceSlug: "signature-bridal-couture-glam",
    durationLabel: "2.5 Hours",
    beforeLabel: "Before · Bare Skin Prep",
    afterLabel: "After · Bridal Couture Glam",
    beforeImage: "/images/lagos-transform-makeup-before.png",
    afterImage: "/images/lagos-transform-makeup-after.png",
    beforeFilter: "",
    notes:
      "Lymphatic facial prep followed by micro-layered satin foundation, warm champagne shimmer lids, and velvety cocoa-rose lip.",
  },
  {
    id: "gold-leaf-infusion",
    category: "Skin",
    title: "24K Gold Leaf Cellular Radiance Ritual",
    subtitle: "Fatigued skin revitalized with pure gold leaf & melanin-safe peptides",
    stylistName: "Dr. Funke Adesina",
    stylistId: "funke-adesina",
    serviceSlug: "24k-gold-leaf-anti-aging-facial",
    durationLabel: "90 Minutes",
    beforeLabel: "Before · Dehydrated Baseline",
    afterLabel: "After · 24K Gold Infusion",
    beforeImage: "/images/lagos-service-skin.png",
    afterImage: "/images/lagos-service-skin.png",
    beforeFilter: "saturate(0.35) contrast(0.88) brightness(0.90)",
    notes:
      "Gentle enzyme brightening, pure 24K gold leaf dermal infusion, and cooling lymphatic sculpt visibly restore bounce and even glow.",
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Victoria Island Styling Floor",
    category: "Interior",
    image: "/images/lagos-hero-salon.png",
    stylist: "Bella Architectural Atelier",
    treatment: "Adeola Odeku Penthouse Salon",
    aspect: "landscape",
    caption:
      "Warm honed travertine counters, arched bronze mirrors, and champagne bouclé chairs bathed in golden Lagos afternoon light.",
  },
  {
    id: "gal-2",
    title: "Espresso-Honey Silk Press Waves",
    category: "Hair",
    image: "/images/lagos-service-hair.png",
    stylist: "Chidinma Okafor",
    treatment: "Couture Silk Press & Blowout",
    serviceSlug: "couture-silk-press-blowout",
    aspect: "landscape",
    caption:
      "Humidity-sealed liquid shine with fluid barrel movement finished with weightless argan serum.",
  },
  {
    id: "gal-3",
    title: "24K Gold Leaf Melanin Glow Ritual",
    category: "Skin",
    image: "/images/lagos-service-skin.png",
    stylist: "Dr. Funke Adesina",
    treatment: "24K Gold Leaf Cellular Facial",
    serviceSlug: "24k-gold-leaf-anti-aging-facial",
    aspect: "landscape",
    caption:
      "Medical-grade gold leaf infused with hyaluronic botanical elixir for even tone and luminous dermal lift.",
  },
  {
    id: "gal-4",
    title: "Champagne & 24K Gold Foil BIAB Nails",
    category: "Nails",
    image: "/images/lagos-service-nails.png",
    stylist: "Amaka Nwosu",
    treatment: "Sculpted Almond Extensions",
    serviceSlug: "sculpted-almond-gel-extensions",
    aspect: "landscape",
    caption:
      "Sheer milky pearl almond overlays accented with delicate 24K gold leaf details.",
  },
  {
    id: "gal-5",
    title: "Timeless Lagos White Wedding Glam",
    category: "Makeup",
    image: "/images/lagos-service-makeup.png",
    stylist: "Zainab Bello",
    treatment: "Nigerian Bridal Couture Glam",
    serviceSlug: "signature-bridal-couture-glam",
    aspect: "landscape",
    caption:
      "Pearl-pinned sleek bridal chignon paired with radiant satin complexion and brushed editorial brows.",
  },
  {
    id: "gal-6",
    title: "Warm Basalt & Shea-Amber Suite",
    category: "Spa",
    image: "/images/lagos-service-spa.png",
    stylist: "Damilola Balogun",
    treatment: "Warm Basalt & Shea-Amber Ritual",
    serviceSlug: "warm-basalt-shea-amber-ritual",
    aspect: "landscape",
    caption:
      "Heated volcanic stones and warm West African shea-amber botanical oil inside our candlelit suite.",
  },
  {
    id: "gal-7",
    title: "Honey-Caramel HD Frontal Install",
    category: "Hair",
    image: "/images/lagos-transform-hair-after.png",
    stylist: "Toluwani Adeyemi",
    treatment: "Luxury Raw Hair Wig Install",
    serviceSlug: "luxury-raw-hair-frontal-install",
    aspect: "landscape",
    caption:
      "Seamless hairline melt and dimensional sunlit highlights crafted inside our VI styling studio.",
  },
  {
    id: "gal-8",
    title: "Owambe & Reception Satin Glam",
    category: "Makeup",
    image: "/images/lagos-transform-makeup-after.png",
    stylist: "Zainab Bello",
    treatment: "Owambe, Gala & Soft Glam",
    serviceSlug: "owambe-red-carpet-soft-glam",
    aspect: "landscape",
    caption:
      "Luminous bronze lid shimmer balanced with velvety cocoa-rose lip and sleek center-parted bun.",
  },
  {
    id: "gal-9",
    title: "Reception & Hibiscus Tea Lounge",
    category: "Interior",
    image: "/images/lagos-salon-interior-1.png",
    stylist: "Bella Concierge",
    treatment: "Guest Arrival Sanctuary",
    aspect: "landscape",
    caption:
      "Monolithic travertine concierge desk, curved plaster walls, and complimentary spiced zobo welcome infusion.",
  },
  {
    id: "gal-10",
    title: "Private Candlelit Hammam Suite",
    category: "Interior",
    image: "/images/lagos-salon-interior-2.png",
    stylist: "Bella Spa Sanctuary",
    treatment: "Private Treatment Suite",
    aspect: "landscape",
    caption:
      "Cashmere throws, warm beeswax taper candles, and complete acoustic calm above Victoria Island.",
  },
  {
    id: "gal-11",
    title: "Boho Knotless Braids & Gold Cuffs",
    category: "Hair",
    image: "/images/lagos-look-boho-braids.png",
    stylist: "Chidinma Okafor",
    treatment: "Boho Knotless Braids & Scalp Spa",
    serviceSlug: "boho-knotless-braids-scalp-spa",
    aspect: "landscape",
    caption:
      "Feather-light waist-length knotless braids with raw curly tendrils and botanical scalp misting.",
  },
  {
    id: "gal-12",
    title: "Traditional Engagement Champagne Gele",
    category: "Makeup",
    image: "/images/lagos-look-traditional-bride.png",
    stylist: "Zainab Bello",
    treatment: "Nigerian Bridal Couture Glam",
    serviceSlug: "signature-bridal-couture-glam",
    aspect: "landscape",
    caption:
      "Regal aso-oke gele paired with coral accents, warm bronze lids, and humidity-proof melanin glass skin.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "rev-1",
    clientName: "Folake Coker",
    clientTitle: "Creative Director, Victoria Island",
    serviceName: "Luxury Raw Hair Wig Install & HD Melt",
    rating: 5,
    quote:
      "Stepping off Adeola Odeku into Bella Salon feels like entering an international sanctuary. Toluwani’s HD frontal melt stayed flawless through four days of Lagos humidity and meetings.",
    dateLabel: "October 2026",
  },
  {
    id: "rev-2",
    clientName: "Adaeze Eze",
    clientTitle: "Ikoyi Traditional & White Bride",
    serviceName: "Nigerian Bridal Couture Glam & Hair",
    rating: 5,
    quote:
      "Zainab and Chidinma kept my entire wedding morning calm and joyful. My skin stayed luminous from morning Traditional prayers straight through the midnight afterparty.",
    dateLabel: "September 2026",
  },
  {
    id: "rev-3",
    clientName: "Simi Williams",
    clientTitle: "Private Equity Executive, Ikoyi",
    serviceName: "24K Gold Leaf Cellular Facial",
    rating: 5,
    quote:
      "Dr. Funke transformed my post-sun marks without a hint of irritation. Her 24K Gold Leaf facial paired with buccal sculpting gave my skin an effortless glass glow.",
    dateLabel: "October 2026",
  },
  {
    id: "rev-4",
    clientName: "Kemi Ogunleye",
    clientTitle: "Interior Architect, Lekki Phase 1",
    serviceName: "Russian BIAB & Dudu-Osun Hammam",
    rating: 5,
    quote:
      "From Amaka’s flawless Russian BIAB cuticles to Damilola’s warm black-soap and shea hammam afterward, every detail at Bella Lagos is sheer excellence.",
    dateLabel: "August 2026",
  },
];

export const SALON_POLICIES = [
  {
    title: "Arrival & Zobo-Botanical Welcome",
    content:
      "We kindly invite guests to arrive 10–15 minutes prior to their appointment at our Adeola Odeku sanctuary to enjoy complimentary spiced hibiscus (zobo) or herbal tea during consultation.",
  },
  {
    title: "24-Hour Rescheduling Policy",
    content:
      "Your reserved window is held exclusively for you and your specialist. Should Lagos traffic or plans shift, kindly notify our concierge via WhatsApp at least 24 hours ahead.",
  },
  {
    title: "Bridal & Payment Methods",
    content:
      "We accept Instant Nigerian Bank Transfers (GTBank, Zenith, Providus), Paystack, Visa/Mastercard/Verve POS, and cash in-atelier. Bridal and couples suites require a 30% booking deposit.",
  },
  {
    title: "Complimentary Adjustments",
    content:
      "Your confidence comes first. Within seven days of any silk press, wig install, color, or nail service, complimentary refinements are warmly arranged.",
  },
];
