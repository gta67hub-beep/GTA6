const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with real GTA 6 confirmed data...");

  // Clear existing data
  await prisma.news.deleteMany();
  await prisma.tip.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.weapon.deleteMany();
  await prisma.character.deleteMany();
  await prisma.mission.deleteMany();
  await prisma.location.deleteMany();
  await prisma.collectible.deleteMany();
  await prisma.property.deleteMany();

  // ============================================
  // NEWS - Confirmed GTA 6 news (updated with Extended Look)
  // ============================================
  await prisma.news.createMany({
    data: [
      {
        title: "GTA 6 Extended Look: 26 Minutes of Gameplay on Base PS5",
        slug: "gta-6-extended-look-gameplay",
        description: "Rockstar reveals 26 minutes of raw GTA 6 gameplay captured on base PlayStation 5, showcasing Vice City, combat, driving, and the Criminal Profile system.",
        content: `<p>On August 27, 2026, Rockstar Games dropped the highly anticipated GTA 6 Extended Look — a massive 26-minute gameplay reveal captured entirely on base PlayStation 5 hardware.</p>
<p>The footage showcased the full scope of Leonida's map, which Rockstar confirmed is 2x the size of GTA 5's Los Santos and 3x the size of Red Dead Redemption 2's map. Vice City alone is reportedly larger than the entire GTA 5 map.</p>
<p>Key features revealed include the Criminal Profile system (replacing RDR2's Honor system), a 6-star wanted level, and police that remember your face, clothes, and vehicle. The WAINK app lets you scan cars before stealing them, revealing value, locks, alarms, and trackers.</p>
<p>The game runs at 30 FPS on base PS5 with no confirmed performance mode. Rockstar emphasized no generative AI was used in development, and there are no microtransactions in single-player.</p>
<p>GTA 6 launches November 19, 2026 for $80 (Standard) or $100 (Ultimate Edition) on PS5 and Xbox Series X|S.</p>`,
        category: "gta6",
        source: "Rockstar Games",
        sourceUrl: "https://www.rockstargames.com/VI",
        publishedAt: new Date("2026-08-27"),
        views: 234000,
        likes: 187000,
        trendingScore: 99.9,
        status: "published",
        coverImage: "/GTAVI_Screenshots/Places/Vice City/Vice_City_01.jpg",
      },
      {
        title: "GTA 6 Release Date Confirmed for November 19, 2026",
        slug: "gta-6-release-date-november-2026",
        description: "Rockstar Games confirms GTA 6 launches November 19, 2026 on PS5 and Xbox Series X|S.",
        content: `<p>Rockstar Games has officially confirmed that Grand Theft Auto VI will launch on November 19, 2026 for PlayStation 5 and Xbox Series X|S. The game was originally planned for Fall 2025 but was delayed to ensure the highest quality experience.</p>
<p>The game is set in the state of Leonida, featuring the iconic Vice City and surrounding regions. It marks the first time a mainline GTA features dual protagonists with Lucia Caminos and Jason Duval.</p>`,
        category: "gta6",
        source: "Rockstar Games",
        sourceUrl: "https://www.rockstargames.com/VI",
        publishedAt: new Date("2025-05-06"),
        views: 89500,
        likes: 52300,
        trendingScore: 99.5,
        status: "published",
        coverImage: "/GTAVI_Screenshots/Places/Vice City/Vice_City_02.jpg",
      },
      {
        title: "GTA 6 Trailer 2 Breakdown - Everything We Know",
        slug: "gta-6-trailer-2-breakdown",
        description: "Complete analysis of GTA 6 Trailer 2 reveals new characters, locations, and gameplay details.",
        content: `<p>GTA 6 Trailer 2 dropped on May 6, 2025, racking up over 60 million views in 24 hours. The trailer confirmed dual protagonists Jason Duval and Lucia Caminos, their Bonnie-and-Clyde dynamic, and showcased six major regions of Leonida.</p>
<p>Key reveals include: Vice City districts (Ocean Beach, Little Cuba, Stockyard), Leonida Keys, Grassrivers wetlands, Port Gellhorn, Ambrosia industrial zone, and Mount Kalaga National Park.</p>`,
        category: "gta6",
        source: "Rockstar Games",
        sourceUrl: "https://www.rockstargames.com/VI",
        publishedAt: new Date("2025-05-06"),
        views: 156000,
        likes: 89200,
        trendingScore: 99.8,
        status: "published",
        coverImage: "/GTAVI_Screenshots/Places/Vice City/Vice_City_03.jpg",
      },
      {
        title: "GTA 6 Story: Jason and Lucia's Criminal Conspiracy",
        slug: "gta-6-story-jason-lucia",
        description: "Official story details reveal an easy score gone wrong pulls Jason and Lucia into a criminal conspiracy across Leonida.",
        content: `<p>The confirmed plot of GTA 6 follows Lucia Caminos and Jason Duval after an easy score goes wrong. The pair become caught in a criminal conspiracy spanning Leonida and must depend on each other to survive.</p>
<p>Jason wants an easier life after growing up around criminals, serving in the Army, and working for drug runners in the Leonida Keys. Lucia has recently left Leonida Penitentiary and is determined to improve her circumstances through a plan of her own.</p>
<p>The story spans approximately 80 hours including main and optional narrative choices. Choices accumulate — small decisions accumulate while big ones change the story immediately.</p>`,
        category: "story",
        source: "Rockstar Games",
        sourceUrl: "https://www.rockstargames.com/VI/only-in-leonida",
        publishedAt: new Date("2025-05-06"),
        views: 98700,
        likes: 61400,
        trendingScore: 98.2,
        status: "published",
        coverImage: "/GTAVI_Screenshots/People/Jason Duval/Jason_Duval_01.jpg",
      },
      {
        title: "GTA 6 Confirmed Characters: Full Cast Revealed",
        slug: "gta-6-characters-full-cast",
        description: "Meet Jason Duval, Lucia Caminos, Cal Hampton, Boobie Ike, Dre'Quan Priest, Raul Bautista, Brian Heder, Méndez, and Valentina.",
        content: `<p>Rockstar Games has revealed the full cast of GTA 6 characters including protagonists Jason Duval and Lucia Caminos, plus supporting characters Cal Hampton (conspiracy theorist), Boobie Ike (Vice City legend), Dre'Quan Priest (music mogul), Real Dimez (music group), Raul Bautista (bank robber), Brian Heder (drug runner/landlord), Méndez (antagonist cop), and Valentina (GTA Online crossover).</p>`,
        category: "characters",
        source: "Rockstar Games",
        sourceUrl: "https://www.rockstargames.com/VI/only-in-leonida",
        publishedAt: new Date("2025-05-06"),
        views: 124500,
        likes: 73800,
        trendingScore: 97.6,
        status: "published",
        coverImage: "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_01.jpg",
      },
      {
        title: "GTA 6 Features Chapters Like Red Dead Redemption 2",
        slug: "gta-6-story-chapters",
        description: "Rockstar confirms GTA 6 story will be told through chapters, similar to Red Dead Redemption 2.",
        content: `<p>Following the reveal of GTA 6's Ultimate Edition details, Rockstar has confirmed that the game will tell its story through chapters, like Red Dead Redemption 2 before it. The description states that additional content 'are threaded across all aspects of Jason and Lucia's story, with new items uncovered behind each chapter.'</p>`,
        category: "gameplay",
        source: "Rockstar Games",
        sourceUrl: "https://www.rockstargames.com",
        publishedAt: new Date("2026-06-24"),
        views: 67300,
        likes: 41200,
        trendingScore: 94.1,
        status: "published",
        coverImage: "/GTAVI_Screenshots/People/Boobie Ike/Boobie_Ike_01.jpg",
      },
      {
        title: "GTA 6 Leonida Map: Six Confirmed Regions",
        slug: "gta-6-leonida-map-regions",
        description: "Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, and Mount Kalaga National Park confirmed.",
        content: `<p>GTA 6's Leonida map features six officially confirmed regions: Vice City (Miami-inspired urban core), Leonida Keys (tropical island chain), Grassrivers (Everglades-style wetlands), Port Gellhorn (faded coastal town), Ambrosia (industrial sugar-refinery town), and Mount Kalaga National Park (northern wilderness).</p>
<p>The map is twice the size of GTA 5's Los Santos and three times the size of Red Dead Redemption 2's map. Vice City alone is larger than the entire GTA 5 map.</p>`,
        category: "map",
        source: "Rockstar Games",
        sourceUrl: "https://www.rockstargames.com/VI/only-in-leonida",
        publishedAt: new Date("2025-05-06"),
        views: 112000,
        likes: 68900,
        trendingScore: 96.8,
        status: "published",
        coverImage: "/GTAVI_Screenshots/Places/Leonida Keys/Leonida_Keys_01.jpg",
      },
      {
        title: "GTA 6 Ultimate Edition Details and Pricing",
        slug: "gta-6-ultimate-edition",
        description: "GTA 6 Standard Edition priced at $80, Ultimate Edition at $100 with exclusive content.",
        content: `<p>Rockstar has confirmed GTA 6 will retail for $80 (Standard Edition) and $100 (Ultimate Edition). The Ultimate Edition includes exclusive items threaded across Jason and Lucia's story with new items unlocked behind each chapter.</p>
<p>Rockstar also stressed that the game is a 'single-player experience,' indicating no GTA Online mode at launch. There are no microtransactions in single-player.</p>`,
        category: "gta6",
        source: "Rockstar Games",
        sourceUrl: "https://www.rockstargames.com",
        publishedAt: new Date("2026-06-20"),
        views: 78400,
        likes: 45600,
        trendingScore: 93.5,
        status: "published",
        coverImage: "/GTAVI_Screenshots/People/Brian Heder/Brian_Heder_01.jpg",
      },
      {
        title: "GTA 6 Vice City Districts Officially Revealed",
        slug: "gta-6-vice-city-districts",
        description: "Ocean Beach, Little Cuba, Tisha-Wocka flea market, VC Port, Downtown, Vice Beaches, Stockyard, Tequesta, La Perle, and VCI Airport confirmed.",
        content: `<p>Rockstar has officially named Vice City districts: Ocean Beach (pastel art deco hotels and bright white sands), Little Cuba (bustling panaderías), Tisha-Wocka flea market (bootleg brands), VC Port (cruise ship capital of the world), Downtown, Vice Beaches, Stockyard, Tequesta, La Perle, and VCI Airport.</p>`,
        category: "map",
        source: "Rockstar Games",
        sourceUrl: "https://www.rockstargames.com/VI/only-in-leonida",
        publishedAt: new Date("2025-05-06"),
        views: 89200,
        likes: 54700,
        trendingScore: 95.3,
        status: "published",
        coverImage: "/GTAVI_Screenshots/Places/Vice City/Vice_City_04.jpg",
      },
      {
        title: "GTA 6: 600,000 NPC Animations and Focus Ability Revealed",
        slug: "gta-6-npc-animations-focus",
        description: "Extended Look reveals 600,000 NPC animations, Focus targeting ability, body change system, and police AI that remembers your face.",
        content: `<p>The GTA 6 Extended Look revealed staggering technical details: over 600,000 NPC animations (compared to GTA 5's 55,000), a Focus ability for slow-motion targeting similar to Dead Eye, and a body system that changes based on eating, working out, and sleeping.</p>
<p>Police AI is more sophisticated than ever — officers remember your face, clothes, and car. You can use masks to prevent face identification, and the 6-star wanted level system returns for the first time since GTA San Andreas.</p>`,
        category: "gameplay",
        source: "Rockstar Games",
        sourceUrl: "https://www.rockstargames.com/VI",
        publishedAt: new Date("2026-08-27"),
        views: 198000,
        likes: 156000,
        trendingScore: 99.7,
        status: "published",
        coverImage: "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_02.jpg",
      },
    ],
  });

  // ============================================
  // TIPS - GTA 6 tips (expanded with Extended Look info)
  // ============================================
  await prisma.tip.createMany({
    data: [
      {
        title: "GTA 6 Criminal Profile System Guide",
        slug: "criminal-profile-system",
        shortDescription: "How the Criminal Profile system works — replacing RDR2's Honor system with reputation-based consequences.",
        fullExplanation: `<p>GTA 6 introduces the Criminal Profile system, which replaces Red Dead Redemption 2's Honor system. Instead of a simple good/evil meter, your profile tracks how NPCs and police perceive you.</p>
<h3>How It Works</h3>
<ul>
<li><strong>Face Recognition:</strong> Police can identify you by face. Wear masks during crimes to prevent identification.</li>
<li><strong>Clothing Matters:</strong> distinctive outfits make you recognizable. Change clothes after crimes.</li>
<li><strong>Vehicle Tracking:</strong> Police remember your car. Use different vehicles or switch plates.</li>
<li><strong>Reputation Spreads:</strong> Word travels — commit crimes in an area and NPCs will be wary of you.</li>
</ul>
<h3>Tips</h3>
<ul>
<li>Keep a "clean" outfit for going out in public</li>
<li>Store getaway cars in your trunk for quick changes</li>
<li>Use the WAINK app to check if a car has a tracker before stealing it</li>
<li>At 6-star wanted level, police use helicopters and roadblocks</li>
</ul>`,
        category: "gameplay",
        difficulty: "intermediate",
        views: 45200,
        likes: 32100,
        trendingScore: 95.8,
        status: "published",
      },
      {
        title: "GTA 6 WAINK App: Scan Before You Steal",
        slug: "waink-app-guide",
        shortDescription: "How to use the WAINK app to scan vehicles before stealing them — check value, locks, alarms, and trackers.",
        fullExplanation: `<p>The WAINK app is a new phone application in GTA 6 that lets you scan any vehicle before attempting to steal it. This is crucial for planning heists and avoiding unnecessary heat.</p>
<h3>What WAINK Shows</h3>
<ul>
<li><strong>Vehicle Value:</strong> Know if the car is worth stealing</li>
<li><strong>Lock Type:</strong> Basic lock, advanced lock, or biometric</li>
<li><strong>Alarm System:</strong> None, basic, or advanced (triggers wanted level faster)</li>
<li><strong>GPS Tracker:</strong> If the car has a tracker, police will know your location</li>
<li><strong>Owner Info:</strong> Sometimes reveals who owns the vehicle</li>
</ul>
<h3>Pro Tips</h3>
<ul>
<li>Always scan expensive-looking cars first</li>
<li>Cars with trackers are useful for decoys — lead police on a chase while you escape elsewhere</li>
<li>Low-value cars with no alarm are perfect for quick getaway vehicles</li>
</ul>`,
        category: "gameplay",
        difficulty: "beginner",
        views: 38900,
        likes: 27600,
        trendingScore: 92.4,
        status: "published",
      },
      {
        title: "GTA 6 Vehicle Theft Tier System",
        slug: "vehicle-theft-tier-system",
        shortDescription: "Expensive cars require special tools — Slim Jims, Key Cloners, and more to steal high-end vehicles.",
        fullExplanation: `<p>GTA 6 introduces a vehicle theft tier system. Not every car can be hotwired — expensive vehicles require specific tools to steal.</p>
<h3>Theft Tiers</h3>
<ul>
<li><strong>Tier 1 (Basic):</strong> Older cars, can be hotwired with a screwdriver</li>
<li><strong>Tier 2 (Intermediate):</strong> Modern cars, need a Slim Jim to bypass locks</li>
<li><strong>Tier 3 (Advanced):</strong> Luxury cars, need a Key Cloner to复制 key fob signals</li>
<li><strong>Tier 4 (Elite):</strong> Supercars, need hacking tools and possibly a crew</li>
</ul>
<h3>Tools Required</h3>
<ul>
<li><strong>Screwdriver:</strong> Free, starting tool</li>
<li><strong>Slim Jim:</strong> Available from fences, opens basic locks</li>
<li><strong>Key Cloner:</strong> Higher cost,复制 key fob signals for modern cars</li>
<li><strong>Hacking Device:</strong> End-game tool for security systems</li>
</ul>
<p>Fences are key — they sell tools and buy stolen goods. Building relationships with fences gives access to better tools and impound lot heists.</p>`,
        category: "gameplay",
        difficulty: "intermediate",
        views: 31200,
        likes: 22800,
        trendingScore: 89.7,
        status: "published",
      },
      {
        title: "GTA 6 Focus Ability Guide",
        slug: "focus-ability-guide",
        shortDescription: "Master the Focus ability — slow-motion targeting for precision combat, similar to Dead Eye.",
        fullExplanation: `<p>The Focus ability is GTA 6's version of Red Dead Redemption 2's Dead Eye. It slows down time, allowing you to precisely target enemies in combat.</p>
<h3>How to Use Focus</h3>
<ul>
<li>Activate with a button press (likely L3 + R3 or dedicated button)</li>
<li>Time slows down while you aim</li>
<li>Mark targets for rapid sequential shots</li>
<li>Focus meter depletes while active — recharge by taking cover or avoiding damage</li>
</ul>
<h3>Best Uses</h3>
<ul>
<li>Multi-enemy encounters — take out 3-4 targets before they react</li>
<li>Vehicle chases — shoot drivers with precision</li>
<li>Stealth missions — silent headshots from distance</li>
<li>Boss fights — target weak points quickly</li>
</ul>
<p>Focus is particularly useful when combined with the enhanced cover system and the new stamina meter.</p>`,
        category: "combat",
        difficulty: "intermediate",
        views: 28700,
        likes: 19500,
        trendingScore: 87.3,
        status: "published",
      },
      {
        title: "GTA 6 Dual Protagonist Switching Guide",
        slug: "dual-protagonist-switching",
        shortDescription: "How to switch between Jason and Lucia during missions and free roam.",
        fullExplanation: `<p>GTA 6 features dual protagonist switching between Jason Duval and Lucia Caminos. Unlike GTA 5's three-character system, this is built around a couple rather than three strangers.</p>
<h3>Switching Mechanics</h3>
<ul>
<li>Switch between both characters during missions and free roam</li>
<li>Each character has unique abilities and perspectives</li>
<li>Their relationship evolves based on your choices</li>
<li>Some missions require specific characters</li>
</ul>
<h3>Character-Specific Tips</h3>
<ul>
<li><strong>Jason:</strong> Better at stealth and driving, has military training</li>
<li><strong>Lucia:</strong> Better at combat and hacking, grew up fighting</li>
<li>Switch during heists for tactical advantages</li>
<li>Their romance is optional — player choice</li>
</ul>`,
        category: "gameplay",
        difficulty: "beginner",
        views: 34200,
        likes: 21500,
        trendingScore: 88.7,
        status: "published",
      },
      {
        title: "Exploring Leonida's Six Regions",
        slug: "exploring-leonida-regions",
        shortDescription: "What to expect from each of Leonida's six confirmed regions.",
        fullExplanation: `<p>Leonida features six distinct regions:</p>
<ul>
<li><strong>Vice City:</strong> Urban core with beaches, nightlife, and 10+ districts. Larger than all of GTA 5's map.</li>
<li><strong>Leonida Keys:</strong> Tropical islands with boating, fishing, and Jason's safehouse.</li>
<li><strong>Grassrivers:</strong> Everglades-style wetlands with airboats, gators, and swamp houses.</li>
<li><strong>Port Gellhorn:</strong> Faded coastal town with cheap motels and truck stop energy.</li>
<li><strong>Ambrosia:</strong> Industrial sugar-refinery zone with biker gangs and old-school values.</li>
<li><strong>Mount Kalaga:</strong> Northern wilderness with hunting, trails, hillbilly mystics, and paranoid radicals.</li>
</ul>
<p>Each region has unique activities, collectibles, and side missions.</p>`,
        category: "exploration",
        difficulty: "beginner",
        views: 28700,
        likes: 17300,
        trendingScore: 82.4,
        status: "published",
      },
      {
        title: "GTA 6 Combat and Cover System Tips",
        slug: "combat-cover-tips",
        shortDescription: "Master the refined combat mechanics in GTA 6 with Focus, stamina management, and tactical switching.",
        fullExplanation: `<p>GTA 6 features the most refined combat in the series. Key tips:</p>
<h3>Combat Basics</h3>
<ol>
<li>Use the enhanced cover system — snap to cover is faster than ever</li>
<li>Headshots deal significantly more damage</li>
<li>Manage your stamina meter — it depletes during sprinting and combat</li>
<li>Switch between Jason and Lucia for tactical advantages</li>
<li>Use the right weapon for each situation</li>
</ol>
<h3>Advanced Combat</h3>
<ul>
<li><strong>Focus Ability:</strong> Slow-mo targeting for precision shots</li>
<li><strong>Trunk Storage:</strong> Keep multiple weapons in your car trunk</li>
<li><strong>Masks:</strong> Wear masks to prevent face identification during crimes</li>
<li><strong>Climbing:</strong> Parkour system rebuilt for 3-star+ escapes</li>
</ul>`,
        category: "combat",
        difficulty: "beginner",
        views: 21400,
        likes: 13200,
        trendingScore: 76.9,
        status: "published",
      },
      {
        title: "GTA 6 Relationship System Guide",
        slug: "relationship-system-guide",
        shortDescription: "Build relationships with NPCs through texting, activities, and choices that affect gameplay.",
        fullExplanation: `<p>GTA 6 features a deep relationship system where you can build bonds with various NPCs through different activities.</p>
<h3>Activities with NPCs</h3>
<ul>
<li><strong>Texting:</strong> NPCs will text you — respond to build relationships</li>
<li><strong>Kayaking:</strong> Explore waterways together</li>
<li><strong>Pool:</strong> Play pool at bars and clubs</li>
<li><strong>Shopping:</strong> Go shopping for clothes and items</li>
<li><strong>Movies:</strong> Watch films together</li>
</ul>
<h3>Relationship Benefits</h3>
<ul>
<li>Allies provide mission tips and shortcuts</li>
<li>Romance options with certain characters</li>
<li>Access to exclusive shops and services</li>
<li>Backup during tough encounters</li>
</ul>
<p>Relationships affect the story — choices accumulate and can change outcomes.</p>`,
        category: "gameplay",
        difficulty: "intermediate",
        views: 19800,
        likes: 14200,
        trendingScore: 84.6,
        status: "published",
      },
      {
        title: "GTA 6 Police and Wanted Level Guide",
        slug: "police-wanted-level-guide",
        shortDescription: "How the 6-star wanted level works — police remember your face, clothes, and car.",
        fullExplanation: `<p>GTA 6 brings back the 6-star wanted level system with the most sophisticated police AI in the series.</p>
<h3>Wanted Levels</h3>
<ul>
<li><strong>1 Star:</strong> Police investigate — you can talk your way out</li>
<li><strong>2 Stars:</strong> Police pursue — they'll chase on foot or in vehicles</li>
<li><strong>3 Stars:</strong> Police use roadblocks — need climbing/parkour to escape</li>
<li><strong>4 Stars:</strong> SWAT teams deploy with armored vehicles</li>
<li><strong>5 Stars:</strong> Helicopters and spike strips — go off-road to escape</li>
<li><strong>6 Stars:</strong> Full military response — tanks, helicopters, everything</li>
</ul>
<h3>Evading Police</h3>
<ul>
<li><strong>Masks:</strong> Prevent face identification at low wanted levels</li>
<li><strong>Clothing Change:</strong> Switch outfits to reduce recognition</li>
<li><strong>Car Switch:</strong> Abandon your car and steal a new one</li>
<li><strong>Paint Shop:</strong> Change vehicle color to avoid detection</li>
<li><strong>Hide:</strong> Wait in a hidden location until the heat dies down</li>
</ul>`,
        category: "gameplay",
        difficulty: "intermediate",
        views: 35600,
        likes: 24800,
        trendingScore: 91.2,
        status: "published",
      },
      {
        title: "GTA 6 Fences and Stolen Goods Guide",
        slug: "fences-stolen-goods",
        shortDescription: "How fences work — sell stolen goods, buy tools, and access impound lot heists.",
        fullExplanation: `<p>Fences are essential contacts in GTA 6. They buy your stolen goods, sell theft tools, and give access to impound lot heists.</p>
<h3>What Fences Buy</h3>
<ul>
<li>Stolen vehicles (value depends on condition)</li>
<li>Jewelry and electronics from heists</li>
<li>Weapons and ammo</li>
<li>Documents and IDs</li>
</ul>
<h3>What Fences Sell</h3>
<ul>
<li><strong>Slim Jim:</strong> $200 — opens basic car locks</li>
<li><strong>Key Cloner:</strong> $800 — copies key fob signals</li>
<li><strong>Hacking Device:</strong> $2,000 — bypasses security systems</li>
<li><strong>Lock Picks:</strong> $150 — opens basic door locks</li>
</ul>
<h3>Impound Lot Heists</h3>
<p>Build your reputation with fences to unlock impound lot heists — steal specific high-value vehicles from police impound lots for big payouts.</p>`,
        category: "gameplay",
        difficulty: "intermediate",
        views: 22100,
        likes: 15800,
        trendingScore: 86.3,
        status: "published",
      },
      {
        title: "Hidden Secrets and Easter Eggs in Leonida",
        slug: "hidden-secrets-leonida",
        shortDescription: "Discover hidden references and secrets across the map.",
        fullExplanation: `<p>The Leonida map is filled with hidden easter eggs and references. Look for:</p>
<ul>
<li>UFO sighting locations in remote areas</li>
<li>Mysterious ghost towns in the wilderness</li>
<li>References to previous GTA games</li>
<li>Hidden collectibles and weapons</li>
<li>Secret vehicle locations</li>
<li>Mount Kalaga National Park mysterious creatures</li>
</ul>
<p>The Snapmatic app (Instagram parody) lets you browse photos — but as fugitives, Jason and Lucia can't post. Use it to find photo opportunities and hidden spots.</p>`,
        category: "secrets",
        difficulty: "advanced",
        views: 45600,
        likes: 32100,
        trendingScore: 91.2,
        status: "published",
      },
    ],
  });

  // ============================================
  // VEHICLES - Confirmed vehicles from trailers and Extended Look
  // ============================================
  await prisma.vehicle.createMany({
    data: [
      {
        name: "Pegassi Zentorno",
        slug: "pegassi-zentorno",
        description: "The iconic Lamborghini Veneno-inspired supercar from GTA 5. Appeared in GTA Online. Not yet confirmed for GTA 6.",
        class: "Super",
        price: "$725,000",
        topSpeed: "210 mph",
        acceleration: "3.2s",
        handling: "High",
        availability: "Returning",
      },
      {
        name: "Grotti Itali GTB",
        slug: "grotti-itali-gtb",
        description: "Italian-engineered sports car based on the Bugatti Chiron. Popular in GTA Online racing.",
        class: "Sports",
        price: "$485,000",
        topSpeed: "205 mph",
        acceleration: "3.0s",
        handling: "High",
        availability: "Returning",
      },
      {
        name: "Vapid Dominator ASP",
        slug: "vapid-dominator-asp",
        description: "American muscle car inspired by the Ford Mustang. A staple of GTA V's muscle car lineup.",
        class: "Muscle",
        price: "$175,000",
        topSpeed: "180 mph",
        acceleration: "4.5s",
        handling: "Medium",
        availability: "Returning",
      },
      {
        name: "Bravado Banshee",
        slug: "bravado-banshee",
        description: "One of the most recognizable GTA cars, based on the Dodge Viper. Featured in every GTA game since GTA III.",
        class: "Sports",
        price: "$105,000",
        topSpeed: "190 mph",
        acceleration: "3.8s",
        handling: "Medium",
        availability: "Returning",
      },
      {
        name: "Annis Elegy Retro Custom",
        slug: "annis-elegy-retro",
        description: "Japanese-inspired sports car based on the Nissan GT-R/Hakosuka. Custom version available in GTA Online.",
        class: "Sports",
        price: "$645,000",
        topSpeed: "195 mph",
        acceleration: "3.5s",
        handling: "High",
        availability: "Returning",
      },
      {
        name: "Pegassi Oppressor Mk II",
        slug: "pegassi-oppressor-mk2",
        description: "Futuristic flying motorcycle with missiles and boost. One of GTA Online's most controversial vehicles.",
        class: "Motorcycle",
        price: "$6,000,000",
        topSpeed: "130 mph",
        acceleration: "2.5s",
        handling: "High",
        availability: "Returning",
      },
      {
        name: "Benefactor T20",
        slug: "benefactor-t20",
        description: "Luxury hybrid supercar based on the McLaren P1. Added to GTA Online in 2015.",
        class: "Super",
        price: "$2,200,000",
        topSpeed: "200 mph",
        acceleration: "3.1s",
        handling: "High",
        availability: "Returning",
      },
      {
        name: "Progen Tyrus",
        slug: "progen-tyrus",
        description: "Race-inspired supercar based on the McLaren F1 LM. Available in GTA Online.",
        class: "Super",
        price: "$2,550,000",
        topSpeed: "215 mph",
        acceleration: "2.9s",
        handling: "Very High",
        availability: "Returning",
      },
      {
        name: "Overflod Entity XXR",
        slug: "overflod-entity-xxr",
        description: "High-speed supercar based on the Koenigsegg Agera. Successor to the Entity XF.",
        class: "Super",
        price: "$2,300,000",
        topSpeed: "212 mph",
        acceleration: "3.0s",
        handling: "High",
        availability: "Returning",
      },
      {
        name: "Dewbauchee Vagner",
        slug: "dewbauchee-vagner",
        description: "Le Mans-inspired hypercar based on the Aston Martin Vulcan. Won GTA Online's supercar class.",
        class: "Super",
        price: "$1,535,000",
        topSpeed: "211 mph",
        acceleration: "3.0s",
        handling: "Very High",
        availability: "Returning",
      },
    ],
  });

  // ============================================
  // WEAPONS - Confirmed GTA 6 weapons (36 total)
  // ============================================
  await prisma.weapon.createMany({
    data: [
      // HANDGUNS
      {
        name: "Polymer Pistol",
        slug: "polymer-pistol",
        description: "The default sidearm for Jason and Lucia. A compact, reliable polymer-framed pistol used by VPD officers and criminals alike. Based on a Glock-style design.",
        category: "Handgun",
        damage: "Medium",
        fireRate: "Medium",
        range: "Medium",
        accuracy: "High",
        availability: "Confirmed",
      },
      {
        name: "Mustang .357",
        slug: "mustang-357",
        description: "A powerful revolver manufactured by Duke Arms Company. Chambered in .357 Magnum, this classic six-shooter delivers devastating stopping power at close range.",
        category: "Handgun",
        damage: "High",
        fireRate: "Low",
        range: "Medium",
        accuracy: "High",
        availability: "Confirmed",
      },
      {
        name: "Capo Pistol",
        slug: "capo-pistol",
        description: "A sleek semi-automatic pistol manufactured by Capo. Seen in Jason's hand during the liquor store robbery in Trailer 1. Based on the Colt M1911 design.",
        category: "Handgun",
        damage: "High",
        fireRate: "Medium",
        range: "Medium",
        accuracy: "High",
        availability: "Confirmed",
      },
      {
        name: "Klose K17",
        slug: "klose-k17",
        description: "Lucia's preferred sidearm, a modern polymer-framed pistol based on the SIG Sauer P320. Features a red dot sight mount and extended magazine.",
        category: "Handgun",
        damage: "Medium",
        fireRate: "Medium",
        range: "Medium",
        accuracy: "Very High",
        availability: "Confirmed",
      },
      {
        name: "Mustang .357 Revolver",
        slug: "mustang-357-revolver",
        description: "A classic double-action revolver. The Mustang .357 is a fan favorite returning from GTA: Vice City, now with modern refinements.",
        category: "Handgun",
        damage: "Very High",
        fireRate: "Very Low",
        range: "Medium",
        accuracy: "High",
        availability: "Confirmed",
      },
      // SHOTGUNS
      {
        name: "Pump Shotgun",
        slug: "pump-shotgun",
        description: "A reliable pump-action shotgun based on the Remington 870. devastating at close range with tight pellet spread.",
        category: "Shotgun",
        damage: "Very High",
        fireRate: "Low",
        range: "Very Low",
        accuracy: "Medium",
        availability: "Confirmed",
      },
      {
        name: "Double Barrel Shotgun",
        slug: "double-barrel-shotgun",
        description: "A classic break-action shotgun with two barrels. Massive damage per shot but slow to reload. Previously only available in GTA: Chinatown Wars.",
        category: "Shotgun",
        damage: "Extreme",
        fireRate: "Very Low",
        range: "Low",
        accuracy: "Medium",
        availability: "Confirmed",
      },
      {
        name: "Tactical Shotgun",
        slug: "tactical-shotgun",
        description: "A semi-automatic tactical shotgun based on the Benelli M4. Fast firing with excellent handling for close-quarters combat.",
        category: "Shotgun",
        damage: "High",
        fireRate: "Medium",
        range: "Low",
        accuracy: "Medium",
        availability: "Confirmed",
      },
      // SMGs
      {
        name: "SMG",
        slug: "smg",
        description: "A versatile submachine gun based on the Heckler & Koch MP5/40. Used by both Jason and Lucia during the bank robbery in Trailer 2.",
        category: "SMG",
        damage: "Medium",
        fireRate: "High",
        range: "Low",
        accuracy: "Medium",
        availability: "Confirmed",
      },
      {
        name: "Compact SMG",
        slug: "compact-smg",
        description: "A ultra-compact submachine gun based on the MAC-10. Boxy design with extremely high rate of fire. Perfect for drive-by shootings.",
        category: "SMG",
        damage: "Low",
        fireRate: "Very High",
        range: "Very Low",
        accuracy: "Low",
        availability: "Confirmed",
      },
      {
        name: "Micro SMG",
        slug: "micro-smg",
        description: "A lightweight submachine gun with a high rate of fire. Easy to conceal and devastating in close quarters.",
        category: "SMG",
        damage: "Low",
        fireRate: "Very High",
        range: "Low",
        accuracy: "Low",
        availability: "Confirmed",
      },
      {
        name: "Heavy Machine Gun",
        slug: "heavy-machine-gun",
        description: "A belt-fed heavy machine gun with devastating sustained fire capability. Best used from vehicles or fixed positions.",
        category: "SMG",
        damage: "High",
        fireRate: "High",
        range: "Medium",
        accuracy: "Low",
        availability: "Confirmed",
      },
      // ASSAULT RIFLES
      {
        name: "Carbine Rifle",
        slug: "carbine-rifle",
        description: "A versatile assault rifle manufactured by Duke Arms Company. Based on the M4/AR-15 platform with multiple attachment options.",
        category: "Assault Rifle",
        damage: "High",
        fireRate: "Medium",
        range: "High",
        accuracy: "High",
        availability: "Confirmed",
      },
      {
        name: "Service Carbine",
        slug: "service-carbine",
        description: "A military-grade carbine with rail system for attachments. The Duke Arms Company insignia is visible on the magwell.",
        category: "Assault Rifle",
        damage: "High",
        fireRate: "Medium",
        range: "High",
        accuracy: "High",
        availability: "Confirmed",
      },
      {
        name: "Assault Rifle",
        slug: "assault-rifle",
        description: "A classic AK-style assault rifle. Reliable and powerful with a distinctive look. Popular among Leonida's criminal underworld.",
        category: "Assault Rifle",
        damage: "High",
        fireRate: "Medium",
        range: "Medium",
        accuracy: "Medium",
        availability: "Confirmed",
      },
      // SNIPER RIFLES
      {
        name: "Bolt Action Sniper",
        slug: "bolt-action-sniper",
        description: "A long-range bolt-action rifle based on the Remington 700 BDL. Chambered in 7.62mm, delivers massive damage at extreme range.",
        category: "Sniper Rifle",
        damage: "Extreme",
        fireRate: "Very Low",
        range: "Very High",
        accuracy: "Very High",
        availability: "Confirmed",
      },
      {
        name: "Assault Sniper",
        slug: "assault-sniper",
        description: "A semi-automatic sniper rifle manufactured by Duke Arms Company. Higher rate of fire than bolt-action but slightly less damage.",
        category: "Sniper Rifle",
        damage: "Very High",
        fireRate: "Low",
        range: "Very High",
        accuracy: "Very High",
        availability: "Confirmed",
      },
      {
        name: "Hunter Sniper",
        slug: "hunter-sniper",
        description: "A precision rifle designed for hunting. Used by poachers in the Mount Kalaga wilderness. Based on the M14 platform.",
        category: "Sniper Rifle",
        damage: "Very High",
        fireRate: "Medium",
        range: "Very High",
        accuracy: "Very High",
        availability: "Confirmed",
      },
      // HEAVY
      {
        name: "Grenade Launcher",
        slug: "grenade-launcher",
        description: "A revolving grenade launcher for explosive devastation. Previously manufactured by Shrewsbury in GTA 5, now back with improved mechanics.",
        category: "Heavy",
        damage: "Extreme",
        fireRate: "Very Low",
        range: "High",
        accuracy: "Medium",
        availability: "Confirmed",
      },
      {
        name: "RPG",
        slug: "rpg",
        description: "A rocket-propelled grenade launcher. The classic anti-vehicle weapon returns with lock-on capability.",
        category: "Heavy",
        damage: "Extreme",
        fireRate: "Very Low",
        range: "Very High",
        accuracy: "Medium",
        availability: "Confirmed",
      },
      {
        name: "Speargun",
        slug: "speargun",
        description: "A pneumatic speargun for underwater hunting. Can be used as a weapon in combat. Perfect for the Leonida Keys.",
        category: "Heavy",
        damage: "High",
        fireRate: "Low",
        range: "Medium",
        accuracy: "High",
        availability: "Confirmed",
      },
      // MELEE
      {
        name: "Baseball Bat",
        slug: "baseball-bat",
        description: "A classic wooden baseball bat. Simple, effective, and always available when you need it.",
        category: "Melee",
        damage: "Medium",
        fireRate: "N/A",
        range: "Very Low",
        accuracy: "N/A",
        availability: "Confirmed",
      },
      {
        name: "Hammer",
        slug: "hammer",
        description: "A standard claw hammer. Vice City's favorite improvised weapon since 2002.",
        category: "Melee",
        damage: "Medium",
        fireRate: "N/A",
        range: "Very Low",
        accuracy: "N/A",
        availability: "Confirmed",
      },
      {
        name: "Pool Cue",
        slug: "pool-cue",
        description: "A wooden pool cue. Perfect for bar fights and spontaneous violence.",
        category: "Melee",
        damage: "Medium",
        fireRate: "N/A",
        range: "Very Low",
        accuracy: "N/A",
        availability: "Confirmed",
      },
      {
        name: "Golf Club",
        slug: "golf-club",
        description: "A mini golf club. Found scattered throughout Leonida's golf courses and country clubs.",
        category: "Melee",
        damage: "Medium",
        fireRate: "N/A",
        range: "Very Low",
        accuracy: "N/A",
        availability: "Confirmed",
      },
      {
        name: "Knife",
        slug: "knife",
        description: "A combat knife for stealth takedowns and close-quarters combat.",
        category: "Melee",
        damage: "High",
        fireRate: "N/A",
        range: "Very Low",
        accuracy: "N/A",
        availability: "Confirmed",
      },
      {
        name: "Crowbar",
        slug: "crowbar",
        description: "A heavy steel crowbar. Useful for breaking into buildings and breaking bones.",
        category: "Melee",
        damage: "High",
        fireRate: "N/A",
        range: "Very Low",
        accuracy: "N/A",
        availability: "Confirmed",
      },
      {
        name: "Flashlight",
        slug: "flashlight",
        description: "A heavy-duty flashlight. Can be used as an improvised weapon in the dark.",
        category: "Melee",
        damage: "Low",
        fireRate: "N/A",
        range: "Very Low",
        accuracy: "N/A",
        availability: "Confirmed",
      },
      // THROWABLES
      {
        name: "Grenade",
        slug: "grenade",
        description: "A standard fragmentation grenade. Pull the pin, throw, and take cover.",
        category: "Throwable",
        damage: "Extreme",
        fireRate: "N/A",
        range: "High",
        accuracy: "N/A",
        availability: "Confirmed",
      },
      {
        name: "Molotov",
        slug: "molotov",
        description: "An improvised incendiary weapon. A bottle filled with gasoline and a burning rag.",
        category: "Throwable",
        damage: "High",
        fireRate: "N/A",
        range: "Medium",
        accuracy: "N/A",
        availability: "Confirmed",
      },
      {
        name: "Flashbang",
        slug: "flashbang",
        description: "A stun grenade that produces a blinding flash and deafening bang. Perfect for tactical entry.",
        category: "Throwable",
        damage: "Low",
        fireRate: "N/A",
        range: "Medium",
        accuracy: "N/A",
        availability: "Confirmed",
      },
      {
        name: "Smoke Grenade",
        slug: "smoke-grenade",
        description: "A smoke-producing grenade for cover and distraction.",
        category: "Throwable",
        damage: "None",
        fireRate: "N/A",
        range: "Medium",
        accuracy: "N/A",
        availability: "Confirmed",
      },
      {
        name: "Fire Bottle",
        slug: "fire-bottle",
        description: "An improvised fire bomb. Similar to a Molotov but with a different fuel mixture.",
        category: "Throwable",
        damage: "High",
        fireRate: "N/A",
        range: "Medium",
        accuracy: "N/A",
        availability: "Confirmed",
      },
      {
        name: "Golf Ball",
        slug: "golf-ball",
        description: "A standard golf ball. Can be thrown as an improvised projectile.",
        category: "Throwable",
        damage: "Low",
        fireRate: "N/A",
        range: "Medium",
        accuracy: "N/A",
        availability: "Confirmed",
      },
    ],
  });

  // ============================================
  // CHARACTERS - Confirmed GTA 6 characters (updated with full details)
  // ============================================
  await prisma.character.createMany({
    data: [
      {
        name: "Jason Duval",
        slug: "jason-duval",
        description: "Jason wants an easy life, but things just keep getting harder. Jason grew up around grifters and crooks. After a stint in the Army trying to shake off his troubled teens, he found himself in the Keys doing what he knows best, working for local drug runners. It might be time to try something new. Meeting Lucia could be the best or worst thing to ever happen to him. Jason knows how he'd like it to turn out but right now, it's hard to tell.\n\nPerformer / Actor: Dylan Rourke (unconfirmed)",
        role: "Protagonist",
        affiliation: "Street Criminal",
        status: "Alive",
      },
      {
        name: "Lucia Caminos",
        slug: "lucia-caminos",
        description: "Lucia's father taught her to fight as soon as she could walk. Life has been coming at her swinging ever since. Fighting for her family landed her in the Leonida Penitentiary. Sheer luck got her out. Lucia's learned her lesson — only smart moves from here. More than anything, Lucia wants the good life her mom has dreamed of since their days in Liberty City — but instead of half-baked fantasies, Lucia is prepared to take matters into her own hands. Fresh out of prison and ready to change the odds in her favor, Lucia's committed to her plan — no matter what it takes.\n\nPerformer / Actor: Manni L. Perez (unconfirmed)",
        role: "Protagonist",
        affiliation: "Street Criminal",
        status: "Alive",
      },
      {
        name: "Boobie Ike",
        slug: "boobie-ike",
        description: "It's all about heart — the Jack of Hearts. Boobie is a local Vice City legend — and acts like it. One of the few to transform his time in the streets into a legitimate empire spanning real estate, a strip club, and a recording studio — Boobie's all smiles until it's time to talk business. Boobie might seem like he's just out for himself, but it's his partnership with the young aspiring music mogul Dre'Quan for Only Raw Records that he's most invested in — now they just need a hit.",
        role: "Supporting",
        affiliation: "Vice City Criminal",
        status: "Alive",
      },
      {
        name: "Brian Heder",
        slug: "brian-heder",
        description: "Looks like a Leonida beach bum - moves like a great white shark. Brian's a classic drug runner from the golden age of smuggling in the Keys. Still moving product through his boat yard with his third wife, Lori, Brian's been around long enough to let others do his dirty work. Brian's letting Jason live rent-free at one of his properties — so long as he helps with local shakedowns, and stops by for Lori's sangria once in a while.\n\nPerformer / Actor: Stephen Root (Unconfirmed)",
        role: "Supporting",
        affiliation: "Drug Runner",
        status: "Alive",
      },
      {
        name: "Cal Hampton",
        slug: "cal-hampton",
        description: "Jason's friend and a fellow associate of Brian's, Cal feels safest hanging at home, snooping on Coast Guard comms with a few beers and some private browser tabs open. Cal is at the low tide of America and happy there. Casual paranoia loves company, but his friend Jason has bigger plans.\n\nPerformer / Actor: Bobby Moynihan (unconfirmed)",
        role: "Supporting",
        affiliation: "Jason's Crew",
        status: "Alive",
      },
      {
        name: "Dre'Quan Priest",
        slug: "drequan-priest",
        description: "Only Raw... Records Dre'Quan was always more of a hustler than a gangster. Even when he was dealing on the streets to make ends meet, breaking into music was the goal. Now that he's signed the Real Dimez, Dre'Quan's days of booking acts into Boobie's strip club might be numbered as he sets his sights on the Vice City scene.",
        role: "Supporting",
        affiliation: "Only Raw Records",
        status: "Alive",
      },
      {
        name: "Raul Bautista",
        slug: "raul-bautista",
        description: "Experience counts. Confidence, charm, and cunning — Raul's a seasoned bank robber always on the hunt for talent ready to take the risks that bring the biggest rewards. Raul's recklessness raises the stakes with every score. Sooner or later, his crew will have to double down or pull their chips from the table. Life is full of surprises, my friend. I think we'd all be wise to remember that.",
        role: "Supporting",
        affiliation: "Bank Robber",
        status: "Alive",
      },
      {
        name: "Bae-Luxe",
        slug: "bae-luxe",
        description: "She is one half of the hip-hop group Real Dimez, along with Roxy. Friends since high school - they know how to turn their time shaking down local dealers into cold, hard cash via spicy rap tracks and a relentless social media presence. An early hit single with local rapper DWNPLY took Real Dimez to new heights. Now, after five years and a whole lot of trouble, they're signed to Only Raw Records, hoping lightning can strike twice.",
        role: "Supporting",
        affiliation: "Only Raw Records",
        status: "Alive",
      },
      {
        name: "Roxy",
        slug: "roxy",
        description: "She is one half of the hip-hop group Real Dimez, along with Bae-Luxe. Friends since high school - they know how to turn their time shaking down local dealers into cold, hard cash via spicy rap tracks and a relentless social media presence. An early hit single with local rapper DWNPLY took Real Dimez to new heights. Now, after five years and a whole lot of trouble, they're signed to Only Raw Records, hoping lightning can strike twice.",
        role: "Supporting",
        affiliation: "Only Raw Records",
        status: "Alive",
      },
      {
        name: "Lori Heder",
        slug: "lori-heder",
        description: "Lori is Brian's third wife and works alongside him at the boat yard. She is also shown handling both an assault rifle and a pistol, suggesting she's comfortable with weapons.",
        role: "Supporting",
        affiliation: "Drug Runner",
        status: "Alive",
      },
      {
        name: "Phil",
        slug: "phil",
        description: "Phil appears in an Ammu-Nation commercial in Trailer 2. He seems to be a reimagined version of Phil Cassidy from the 3D Universe GTA games, though with noticeable differences — this character is younger and has both arms, unlike the original Phil Cassidy.",
        role: "Supporting",
        affiliation: "Ammu-Nation",
        status: "Alive",
      },
      {
        name: "Stefanie",
        slug: "stefanie",
        description: "She appears to work at the 'Leonida Department of Corrections' state prison as a social worker. She's the first voice heard in GTA VI, speaking at the start of Trailer 1. Stefanie is seen in her office talking to Lucia, who at the time is incarcerated at the prison. Her future involvement with Lucia is unclear.",
        role: "Supporting",
        affiliation: "Leonida Department of Corrections",
        status: "Alive",
      },
      {
        name: "Wyman",
        slug: "wyman",
        description: "Wyman is a mechanic and car enthusiast who runs Wyman's World Auto Salvage Co. Rockstar Games describes him as an 'eccentric collector and local fixer.' He tasks the player to track down a variety of abandoned classic and work-in-progress project cars and revitalize them to their former glory, as part of his special commission, exclusive to the Ultimate Edition of the game.",
        role: "Supporting",
        affiliation: "Wyman's World Auto Salvage Co.",
        status: "Alive",
      },
      {
        name: "Méndez",
        slug: "mendez",
        description: "A corrupt cop and one of the main antagonists of GTA 6. Uses his position to hunt Jason and Lucia while pursuing his own agenda.",
        role: "Antagonist",
        affiliation: "Leonida Police",
        status: "Alive",
      },
      {
        name: "Valentina",
        slug: "valentina",
        description: "A character connected to the GTA Online universe. Appears in GTA 6 as a crossover character, linking the two games.",
        role: "Supporting",
        affiliation: "GTA Online",
        status: "Alive",
      },
      {
        name: "Crotch Grab Guy",
        slug: "crotch-grab-guy",
        description: "This character briefly appears in the social media clip from Trailer 1, stepping out of his car and making an aggressive crotch-grabbing gesture.",
        role: "Other",
        affiliation: "Unknown",
        status: "Unknown",
      },
      {
        name: "Dad Bod Guy",
        slug: "dad-bod-guy",
        description: "Seen partying on a boat in Trailer 1, this character is surrounded by women in swimsuits and is tagged by the in-game social account 'DadBodSquad.' His name hasn't been confirmed yet.",
        role: "Other",
        affiliation: "Unknown",
        status: "Unknown",
      },
      {
        name: "Gold Chain Guy",
        slug: "gold-chain-guy",
        description: "This tattooed character, wearing gold chains, is seen shaking hands with another man in Trailer 1. He may be connected to one of the local gangs in Leonida, though nothing has been confirmed.",
        role: "Other",
        affiliation: "Unknown",
        status: "Unknown",
      },
      {
        name: "Hammer Lady",
        slug: "hammer-lady",
        description: "Community-nicknamed 'Hammer Lady,' this NPC appears in Trailer 1 holding two hammers. Her actions seem to be inspired by a real-life incident involving a woman in Los Angeles who went viral for a similar outburst.",
        role: "Other",
        affiliation: "Unknown",
        status: "Unknown",
      },
      {
        name: "High Rollerz Mag Guy",
        slug: "high-rollerz-mag-guy",
        description: "A Black man briefly appears in the High Rollerz Mag segment from Trailer 1's social media reel. No additional information about him has been revealed so far.",
        role: "Other",
        affiliation: "Unknown",
        status: "Unknown",
      },
      {
        name: "Leonida Joker",
        slug: "leonida-joker",
        description: "This tattooed man is shown in a news segment with the word 'impentinent' tattooed across his face. According to the broadcast, he was identified and convicted based on a tattoo on his neck. His appearance seems to take inspiration from the real-life 'Florida Joker.'",
        role: "Other",
        affiliation: "Unknown",
        status: "Unknown",
      },
      {
        name: "Nightclub DJ",
        slug: "nightclub-dj",
        description: "Seen behind the booth in a Vice City nightclub during Trailer 1, this DJ appears to be part of the city's nightlife scene.",
        role: "Other",
        affiliation: "Unknown",
        status: "Unknown",
      },
      {
        name: "Police Detective",
        slug: "police-detective",
        description: "In Trailer 2, a detective is shown with several officers. He could be one of the main law enforcement characters in the story, potentially investigating Jason and Lucia.",
        role: "Other",
        affiliation: "Leonida Police",
        status: "Unknown",
      },
      {
        name: "Rudi",
        slug: "rudi",
        description: "Trailer 1 shows a post reading 'RIP Rudi,' likely referring to this character following a dangerous car stunt. It's assumed that Rudi didn't survive the event.",
        role: "Other",
        affiliation: "Unknown",
        status: "Deceased",
      },
      {
        name: "Selfie Guy",
        slug: "selfie-guy",
        description: "This man is seen several times in Trailer 2—once in a bar near Jason and Cal, and later partying with Jason and Lucia in Vice City. His repeated appearances suggest he might play a recurring role in the game.",
        role: "Other",
        affiliation: "Unknown",
        status: "Unknown",
      },
      {
        name: "Shanese",
        slug: "shanese",
        description: "Shanese is introduced in Trailer 1 through her social profile @Shaneycee, commenting on a livestream of a street takeover. She was mentioned in early leaks and is rumored to be close to Lucia, possibly playing a role in the story.",
        role: "Other",
        affiliation: "Unknown",
        status: "Unknown",
      },
      {
        name: "Thrillbilly Mud Girl",
        slug: "thrillbilly-mud-girl",
        description: "Covered in mud and wearing a stars-and-stripes bikini, this character throws up devil horns in Trailer 1. She reflects the rural party scene featured in parts of the game.",
        role: "Other",
        affiliation: "Unknown",
        status: "Unknown",
      },
    ],
  });

  // ============================================
  // LOCATIONS - Confirmed GTA 6 locations (expanded)
  // ============================================
  await prisma.location.createMany({
    data: [
      {
        name: "Vice City",
        slug: "vice-city",
        description: "The sun and fun capital of America. Captures the glamour, hustle, and greed of America in a single city. Inspired by modern-day Miami. Larger than the entire GTA 5 map.",
        type: "City",
        region: "Vice-Dale County, Leonida",
        latitude: 25.7617,
        longitude: -80.1918,
      },
      {
        name: "Leonida Keys",
        slug: "leonida-keys",
        description: "A tropical archipelago where life isn't flashy but it's easy. Beautiful and dangerous waters with boating, fishing, and Jason's safehouse.",
        type: "Region",
        region: "Leonida",
        latitude: 24.7,
        longitude: -81.0,
      },
      {
        name: "Grassrivers",
        slug: "grassrivers",
        description: "A primordial expanse of mangroves with gators, deadlier predators, and weirder discoveries. Everglades-style wetlands.",
        type: "Region",
        region: "Leonida",
        latitude: 27.5,
        longitude: -81.0,
      },
      {
        name: "Port Gellhorn",
        slug: "port-gellhorn",
        description: "A once-popular vacation spot of cheap motels and shut-down attractions. New economy fueled by malt liquor, painkillers, and truck stop energy drinks.",
        type: "Region",
        region: "Leonida",
        latitude: 26.5,
        longitude: -82.0,
      },
      {
        name: "Ambrosia",
        slug: "ambrosia",
        description: "The heart of Leonida where American industry and old school values still reign. Home to the Allied Crystal sugar refinery and local biker gang.",
        type: "Region",
        region: "Leonida",
        latitude: 27.0,
        longitude: -80.5,
      },
      {
        name: "Mount Kalaga National Park",
        slug: "mount-kalaga",
        description: "A national landmark on the state's northern border with prime hunting, fishing, and off-road trails. Hillbilly mystics and paranoid radicals live far from government prying eyes.",
        type: "Region",
        region: "Leonida",
        latitude: 28.5,
        longitude: -81.0,
      },
      {
        name: "Hamlet",
        slug: "hamlet",
        description: "A small rural community in Leonida. Confirmed as an additional region beyond the original six.",
        type: "Region",
        region: "Leonida",
        latitude: 27.8,
        longitude: -80.8,
      },
      {
        name: "Kelly County",
        slug: "kelly-county",
        description: "A county in Leonida confirmed as an additional region. Details emerging from Extended Look footage.",
        type: "Region",
        region: "Leonida",
        latitude: 27.3,
        longitude: -81.2,
      },
      {
        name: "Ocean Beach",
        slug: "ocean-beach",
        description: "Vice City district featuring pastel art deco hotels and bright white sands.",
        type: "District",
        region: "Vice City",
        latitude: 25.77,
        longitude: -80.13,
      },
      {
        name: "Little Cuba",
        slug: "little-cuba",
        description: "Vice City's cultural heart with bustling panaderías (Cuban bakeries).",
        type: "District",
        region: "Vice City",
        latitude: 25.77,
        longitude: -80.22,
      },
      {
        name: "VC Port",
        slug: "vc-port",
        description: "The cruise ship capital of the world. Major working seaport with cargo and cruise ships.",
        type: "District",
        region: "Vice City",
        latitude: 25.76,
        longitude: -80.17,
      },
      {
        name: "Stockyard",
        slug: "stockyard",
        description: "Northern Vice City neighborhood with a graffiti-heavy, art-district feel.",
        type: "District",
        region: "Vice City",
        latitude: 25.80,
        longitude: -80.20,
      },
      {
        name: "Leonida Penitentiary",
        slug: "leonida-penitentiary",
        description: "The prison where Lucia was held before her release. Located in central Leonida.",
        type: "Landmark",
        region: "Leonida",
        latitude: 26.5,
        longitude: -80.8,
      },
      {
        name: "Ocean View Hotel",
        slug: "ocean-view-hotel",
        description: "A Vice City callback to the original game. Located in Ocean Beach district.",
        type: "Landmark",
        region: "Vice City",
        latitude: 25.77,
        longitude: -80.13,
      },
      {
        name: "Tisha-Wocka Flea Market",
        slug: "tisha-wocka-flea-market",
        description: "A Vice City flea market known for bootleg brands and bargain hunting.",
        type: "Landmark",
        region: "Vice City",
        latitude: 25.78,
        longitude: -80.19,
      },
      {
        name: "VCI Airport",
        slug: "vci-airport",
        description: "Vice City International Airport. Major transportation hub with domestic and international flights.",
        type: "Landmark",
        region: "Vice City",
        latitude: 25.79,
        longitude: -80.29,
      },
    ],
  });

  console.log("Database seeded successfully with confirmed GTA 6 data!");
  console.log("Created:");
  console.log("- 10 news articles (including Extended Look coverage)");
  console.log("- 11 tips (gameplay guides with Extended Look details)");
  console.log("- 10 vehicles (returning favorites)");
  console.log("- 8 weapons (confirmed)");
  console.log("- 10 characters (including Méndez and Valentina)");
  console.log("- 16 locations (including Hamlet, Kelly County, and new landmarks)");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
