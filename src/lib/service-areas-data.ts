export interface ServiceAreaData {
  name: string;
  slug: string;
  county: string;
  zipCodes: string[];
  population: string;
  description: string;
  neighborhoods: string[];
  localLandmarks: string[];
  electricalChallenges: string[];
  testimonialName?: string;
  testimonialText?: string;
}

export const serviceAreasData: ServiceAreaData[] = [
  {
    name: "East Atlanta",
    slug: "east-atlanta",
    county: "DeKalb/Fulton",
    zipCodes: ["30316", "30317", "30307"],
    population: "35,000+",
    description: "East Atlanta is a vibrant, eclectic neighborhood known for its historic bungalows, trendy shops, and thriving arts scene. Many homes in this area were built in the early 1900s and require electrical system updates to meet modern safety standards and power demands.",
    neighborhoods: ["East Atlanta Village", "Ormewood Park", "Grant Park", "Gresham Park"],
    localLandmarks: ["East Atlanta Village", "Brownwood Park", "Gresham Park"],
    electricalChallenges: [
      "Outdated knob-and-tube wiring in historic homes",
      "Insufficient electrical panel capacity for modern appliances",
      "Old fuse boxes requiring circuit breaker upgrades",
      "Aluminum wiring concerns in 1960s-70s construction"
    ],
    testimonialName: "Robert Davis",
    testimonialText: "We've used Mr. Wise for both our home and our small business. Always reliable, always honest. They explain everything clearly."
  },
  {
    name: "West Side Atlanta",
    slug: "west-side-atlanta",
    county: "Fulton",
    zipCodes: ["30314", "30318", "30310"],
    population: "40,000+",
    description: "Atlanta's West Side has experienced tremendous growth with new developments alongside historic properties. From the BeltLine-adjacent areas to established neighborhoods, residents need reliable electrical services that understand both renovation requirements and new construction standards.",
    neighborhoods: ["Westview", "West End", "Mozley Park", "Ashview Heights", "Hunter Hills"],
    localLandmarks: ["Atlanta BeltLine Westside Trail", "Westview Cemetery", "West End Mall"],
    electricalChallenges: [
      "Renovation electrical upgrades for historic properties",
      "New construction requiring full electrical systems",
      "Panel upgrades for home additions and ADUs",
      "EV charger installations for new homeowners"
    ]
  },
  {
    name: "Southwest Atlanta",
    slug: "southwest-atlanta",
    county: "Fulton",
    zipCodes: ["30310", "30311", "30331", "30344"],
    population: "85,000+",
    description: "Southwest Atlanta encompasses diverse communities from historic neighborhoods to growing suburban areas. With homes spanning multiple decades of construction, electrical needs range from complete rewiring of vintage properties to panel upgrades for growing families.",
    neighborhoods: ["Cascade Heights", "Adamsville", "Ben Hill", "Camp Creek", "Greenbriar"],
    localLandmarks: ["Cascade Springs Nature Preserve", "Camp Creek Marketplace", "Greenbriar Mall"],
    electricalChallenges: [
      "Whole-home rewiring for 1950s-60s ranch homes",
      "Service upgrades from 100A to 200A panels",
      "Outdoor lighting for larger properties",
      "Generator installations for storm preparedness"
    ]
  },
  {
    name: "City of South Fulton",
    slug: "south-fulton",
    county: "Fulton",
    zipCodes: ["30213", "30268", "30291", "30296", "30349"],
    population: "107,000+",
    description: "As Georgia's newest city, South Fulton combines established communities with rapid new development. Whether you're in a brand-new subdivision or an established neighborhood, Mr. Wise Electric provides the licensed, insured electrical services South Fulton residents trust.",
    neighborhoods: ["Old National", "Campbellton Road", "Welcome All", "Stonewall Tell", "Red Oak"],
    localLandmarks: ["Wolf Creek Amphitheater", "South Fulton Tennis Center", "Welcome All Park"],
    electricalChallenges: [
      "New construction electrical installations",
      "Smart home wiring and automation",
      "Commercial electrical for new businesses",
      "Landscape and security lighting"
    ],
    testimonialName: "Michael Johnson",
    testimonialText: "Mr. Wise Electric upgraded our entire panel in one day. Professional, clean work, and fair pricing. 42 years of experience really shows."
  },
  {
    name: "Fairburn",
    slug: "fairburn",
    county: "Fulton",
    zipCodes: ["30213"],
    population: "18,000+",
    description: "Fairburn offers small-town charm with convenient access to Atlanta. The mix of historic downtown properties and newer subdivisions means varied electrical needs - from updating century-old wiring to installing modern smart home systems in new construction.",
    neighborhoods: ["Downtown Fairburn", "Cascade Palmetto", "Duncan Memorial"],
    localLandmarks: ["Historic Downtown Fairburn", "Duncan Park", "Fairburn City Hall"],
    electricalChallenges: [
      "Historic building electrical restoration",
      "New subdivision complete electrical",
      "Storm damage repairs and upgrades",
      "Agricultural and barn electrical services"
    ]
  },
  {
    name: "College Park",
    slug: "college-park",
    county: "Fulton/Clayton",
    zipCodes: ["30337", "30349"],
    population: "15,000+",
    description: "College Park, home to the Georgia International Convention Center and Hartsfield-Jackson Airport access, serves both residential neighborhoods and commercial districts. Our electricians understand the unique demands of properties near major transportation infrastructure.",
    neighborhoods: ["Main Street District", "Godby Road", "Princeton Lakes", "Camp Creek"],
    localLandmarks: ["Gateway Center Arena", "Georgia International Convention Center", "Woodward Academy"],
    electricalChallenges: [
      "Commercial electrical for businesses",
      "Residential upgrades in established areas",
      "Three-phase power for industrial properties",
      "Emergency backup power systems"
    ],
    testimonialName: "Sarah Williams",
    testimonialText: "Had an emergency with flickering lights late evening. They came out first thing the next morning and fixed the issue quickly. Highly recommend!"
  },
  {
    name: "Mableton",
    slug: "mableton",
    county: "Cobb",
    zipCodes: ["30126", "30106"],
    population: "45,000+",
    description: "Mableton is a thriving Cobb County community with a mix of mid-century homes and newer developments. Many properties built in the 1960s-80s need electrical updates to safely handle today's power demands from air conditioning, home offices, and modern appliances.",
    neighborhoods: ["Mableton Parkway", "Floyd Road", "Nickajack", "Veterans Memorial Highway"],
    localLandmarks: ["Silver Comet Trail", "Mable House Arts Center", "Six Flags Over Georgia (nearby)"],
    electricalChallenges: [
      "1970s-80s home panel upgrades",
      "Basement finishing electrical work",
      "Home office dedicated circuits",
      "Pool and hot tub electrical installations"
    ],
    testimonialName: "Jennifer Martinez",
    testimonialText: "Best electrician in Atlanta. Period. They rewired our 1960s home and it was a huge job. Done on time, on budget. Can't say enough good things."
  },
  {
    name: "Union City",
    slug: "union-city",
    county: "Fulton",
    zipCodes: ["30291", "30213"],
    population: "22,000+",
    description: "Union City has grown significantly as families seek affordable housing with Atlanta access. The expanding community includes both commercial corridors requiring three-phase power and residential areas needing reliable home electrical services.",
    neighborhoods: ["Shannon Parkway", "Flat Shoals Road", "South Fulton Parkway"],
    localLandmarks: ["Shannon Southpark Mall", "Union City Parks", "South Fulton Medical Center (nearby)"],
    electricalChallenges: [
      "Retail and commercial electrical services",
      "New construction homes electrical",
      "Service upgrades for home additions",
      "Energy-efficient lighting retrofits"
    ]
  },
  {
    name: "Stockbridge",
    slug: "stockbridge",
    county: "Henry",
    zipCodes: ["30281"],
    population: "30,000+",
    description: "Stockbridge serves as a major Henry County hub with extensive retail, healthcare facilities, and diverse housing. From single-family homes to commercial properties, our licensed electricians provide comprehensive electrical services throughout the Stockbridge area.",
    neighborhoods: ["Eagles Landing", "Lake Spivey", "Flippen", "Hudson Bridge"],
    localLandmarks: ["Piedmont Henry Hospital", "Eagles Landing Golf Club", "Henry County Schools"],
    electricalChallenges: [
      "Medical facility electrical compliance",
      "Large home electrical systems",
      "Commercial tenant buildouts",
      "Emergency generator installations"
    ]
  },
  {
    name: "McDonough",
    slug: "mcdonough",
    county: "Henry",
    zipCodes: ["30252", "30253"],
    population: "28,000+",
    description: "McDonough blends historic charm with modern growth as Henry County's seat. The historic downtown square features buildings requiring careful electrical updates, while surrounding subdivisions need contemporary electrical installations meeting current codes.",
    neighborhoods: ["Downtown Square", "Lake Dow", "Kelleytown", "Ola"],
    localLandmarks: ["Historic McDonough Square", "Heritage Park", "Henry County Courthouse"],
    electricalChallenges: [
      "Historic building code-compliant upgrades",
      "New construction subdivision work",
      "Restaurant and retail electrical",
      "Outdoor event and landscape lighting"
    ]
  },
  {
    name: "East Point",
    slug: "east-point",
    county: "Fulton",
    zipCodes: ["30344", "30364"],
    population: "38,000+",
    description: "East Point offers urban convenience with neighborhood character, attracting young professionals and families. The walkable downtown and surrounding residential areas feature homes from various eras, each with specific electrical service needs.",
    neighborhoods: ["Downtown East Point", "Jefferson Park", "Conley Hills", "Colonial Hills"],
    localLandmarks: ["East Point Velodrome", "Hapeville MARTA Station (nearby)", "Downtown East Point"],
    electricalChallenges: [
      "Craftsman bungalow electrical updates",
      "Split-level home rewiring",
      "Commercial storefront electrical",
      "MARTA-adjacent property services"
    ]
  },
  {
    name: "West Midtown Atlanta",
    slug: "west-midtown-atlanta",
    county: "Fulton",
    zipCodes: ["30318", "30309", "30327"],
    population: "25,000+",
    description: "West Midtown has transformed from industrial warehouses to one of Atlanta's hottest neighborhoods. The mix of converted lofts, new construction, restaurants, and creative businesses creates diverse electrical demands from residential to commercial.",
    neighborhoods: ["Atlantic Station", "Home Park", "Loring Heights", "Berkeley Park", "Blandtown"],
    localLandmarks: ["Atlantic Station", "Georgia Tech", "Northside Drive Corridor"],
    electricalChallenges: [
      "Loft conversion electrical systems",
      "Restaurant and bar electrical installations",
      "High-rise residential services",
      "Commercial three-phase power"
    ]
  },
  {
    name: "Atlanta Northwest",
    slug: "atlanta-northwest",
    county: "Fulton/Cobb",
    zipCodes: ["30327", "30339", "30342"],
    population: "50,000+",
    description: "Northwest Atlanta encompasses prestigious neighborhoods and major commercial corridors. From the estates of Tuxedo Park to the businesses along Cobb Parkway, our electricians serve this diverse area with residential and commercial expertise.",
    neighborhoods: ["Tuxedo Park", "Buckhead Forest", "Chastain Park", "Mount Paran"],
    localLandmarks: ["Chastain Park Amphitheatre", "Atlanta History Center", "Cumberland Mall"],
    electricalChallenges: [
      "Estate home complete electrical systems",
      "Pool house and guest house wiring",
      "Landscape and driveway lighting",
      "Home theater and automation wiring"
    ]
  },
  {
    name: "Decatur",
    slug: "decatur",
    county: "DeKalb",
    zipCodes: ["30030", "30032", "30033", "30034"],
    population: "24,000+",
    description: "Decatur is known for excellent schools, walkable downtown, and charming neighborhoods filled with historic homes. Many properties feature original 1920s-1940s construction requiring careful electrical updates that preserve character while ensuring safety.",
    neighborhoods: ["Downtown Decatur", "Oakhurst", "Winnona Park", "Great Lakes", "Medlock Park"],
    localLandmarks: ["Decatur Square", "Agnes Scott College", "DeKalb History Center"],
    electricalChallenges: [
      "1920s-40s home complete rewiring",
      "Knob-and-tube replacement",
      "Kitchen and bathroom circuit additions",
      "Historic fixture compatibility"
    ]
  },
  {
    name: "Sandy Springs",
    slug: "sandy-springs",
    county: "Fulton",
    zipCodes: ["30328", "30338", "30342", "30350"],
    population: "110,000+",
    description: "Sandy Springs is an affluent North Atlanta city with upscale residential areas and major corporate headquarters. From executive homes requiring sophisticated electrical systems to commercial properties needing three-phase power, we serve all of Sandy Springs' electrical needs.",
    neighborhoods: ["Riverside", "Powers Ferry", "Dunwoody", "Heards Ferry", "Mount Vernon"],
    localLandmarks: ["Morgan Falls Overlook Park", "City Springs", "Perimeter Center"],
    electricalChallenges: [
      "Luxury home automation systems",
      "Corporate office electrical services",
      "Data center power requirements",
      "EV charging station installations"
    ]
  }
];

export function getServiceAreaBySlug(slug: string): ServiceAreaData | undefined {
  return serviceAreasData.find(area => area.slug === slug);
}

export function getAllServiceAreaSlugs(): string[] {
  return serviceAreasData.map(area => area.slug);
}
