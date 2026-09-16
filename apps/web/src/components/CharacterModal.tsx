"use client";

import { useEffect } from "react";
import FavoriteButton from "./FavoriteButton";

interface CharacterModalProps {
  character: any;
  onClose: () => void;
}

const CHARACTER_SCREENSHOTS: Record<string, string[]> = {
  "Jason Duval": [
    "/GTAVI_Screenshots/People/Jason Duval/Jason_Duval_01.jpg",
    "/GTAVI_Screenshots/People/Jason Duval/Jason_Duval_02.jpg",
    "/GTAVI_Screenshots/People/Jason Duval/Jason_Duval_03.jpg",
  ],
  "Lucia Caminos": [
    "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_01.jpg",
    "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_02.jpg",
    "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_03.jpg",
  ],
  "Boobie Ike": [
    "/GTAVI_Screenshots/People/Boobie Ike/Boobie_Ike_01.jpg",
    "/GTAVI_Screenshots/People/Boobie Ike/Boobie_Ike_02.jpg",
    "/GTAVI_Screenshots/People/Boobie Ike/Boobie_Ike_03.jpg",
    "/GTAVI_Screenshots/People/Boobie Ike/Boobie_Ike_04.jpg",
  ],
  "Brian Heder": [
    "/GTAVI_Screenshots/People/Brian Heder/Brian_Heder_01.jpg",
    "/GTAVI_Screenshots/People/Brian Heder/Brian_Heder_02.jpg",
    "/GTAVI_Screenshots/People/Brian Heder/Brian_Heder_03.jpg",
    "/GTAVI_Screenshots/People/Brian Heder/Brian_Heder_04.jpg",
  ],
  "Cal Hampton": [
    "/GTAVI_Screenshots/People/Cal Hampton/Cal_Hampton_01.jpg",
    "/GTAVI_Screenshots/People/Cal Hampton/Cal_Hampton_02.jpg",
    "/GTAVI_Screenshots/People/Cal Hampton/Cal_Hampton_03.jpg",
    "/GTAVI_Screenshots/People/Cal Hampton/Cal_Hampton_04.jpg",
  ],
  "Dre'Quan Priest": [
    "/GTAVI_Screenshots/People/DreQuan Priest/DreQuan_Priest_01.jpg",
    "/GTAVI_Screenshots/People/DreQuan Priest/DreQuan_Priest_02.jpg",
    "/GTAVI_Screenshots/People/DreQuan Priest/DreQuan_Priest_03.jpg",
    "/GTAVI_Screenshots/People/DreQuan Priest/DreQuan_Priest_04.jpg",
  ],
  "Raul Bautista": [
    "/GTAVI_Screenshots/People/Raul Bautista/Raul_Bautista_01.jpg",
    "/GTAVI_Screenshots/People/Raul Bautista/Raul_Bautista_02.jpg",
    "/GTAVI_Screenshots/People/Raul Bautista/Raul_Bautista_03.jpg",
    "/GTAVI_Screenshots/People/Raul Bautista/Raul_Bautista_04.jpg",
  ],
  "Bae-Luxe": [
    "/GTAVI_Screenshots/People/Real Dimez/Real_Dimez_01.jpg",
    "/GTAVI_Screenshots/People/Real Dimez/Real_Dimez_02.jpg",
  ],
  "Roxy": [
    "/GTAVI_Screenshots/People/Real Dimez/Real_Dimez_03.jpg",
    "/GTAVI_Screenshots/People/Real Dimez/Real_Dimez_04.jpg",
  ],
  "Méndez": ["/M%C3%89NDEZ.jpg"],
  "Stefanie": ["/STEFANIE.jpg"],
  "Wyman": ["/WYMAN.jpg"],
  "Valentina": ["/VALENTINA.jpg"],
  "Crotch Grab Guy": ["/CROTCH_GRAB_GUY.jpg"],
  "High Rollerz Mag Guy": ["/HIGH%20ROLLERZ_MAGGUY.jpg"],
  "Leonida Joker": ["/LEONIDA_JOKER.png"],
  "Rudi": ["/rudi.jpg"],
  "Selfie Guy": ["/SELFIE%20GUY.jpg"],
};

const CHARACTER_DETAILS: Record<string, { backstory: string; role: string; connections: string[]; trivia: string[] }> = {
  "Jason Duval": {
    backstory: "Jason wants an easy life, but things just keep getting harder. He grew up around grifters and crooks. After a stint in the Army trying to shake off his troubled teens, he found himself in the Keys doing what he knows best — working for local drug runners. Meeting Lucia could be the best or worst thing to ever happen to him.",
    role: "Playable Protagonist",
    connections: ["Lucia Caminos (romantic partner)", "Brian Heder (employer/landlord)", "Cal Hampton (best friend)"],
    trivia: [
      "First male protagonist in GTA since GTA V",
      "Military background gives him combat skills",
      "Lives rent-free in one of Brian's properties",
      "Works as a drug runner in the Leonida Keys"
    ]
  },
  "Lucia Caminos": {
    backstory: "Lucia's father taught her to fight as soon as she could walk. Life has been coming at her swinging ever since. Fighting for her family landed her in the Leonida Penitentiary. Sheer luck got her out. Lucia's learned her lesson — only smart moves from here. More than anything, Lucia wants the good life her mom has dreamed of since their days in Liberty City.",
    role: "Playable Protagonist",
    connections: ["Jason Duval (romantic partner)", "Stefanie (prison social worker)", "Family in Liberty City"],
    trivia: [
      "First female protagonist in a mainline GTA game",
      "Served time at Leonida Penitentiary",
      "Family originally from Liberty City",
      "Taught to fight by her father from childhood"
    ]
  },
  "Boobie Ike": {
    backstory: "It's all about heart — the Jack of Hearts. Boobie is a local Vice City legend — and acts like it. One of the few to transform his time in the streets into a legitimate empire spanning real estate, a strip club, and a recording studio. Boobie's all smiles until it's time to talk business. His biggest investment is the partnership with Dre'Quan for Only Raw Records.",
    role: "Supporting Character",
    connections: ["Dre'Quan Priest (business partner)", "Real Dimez (signed to label)", "Vice City underworld"],
    trivia: [
      "Owns the Jack of Hearts strip club",
      "Runs Only Raw Records",
      "Former street hustler turned legitimate businessman",
      "\"The club money pays for the studio, and the drug money pays for it all\""
    ]
  },
  "Brian Heder": {
    backstory: "Looks like a Leonida beach bum — moves like a great white shark. Brian's a classic drug runner from the golden age of smuggling in the Keys. Still moving product through his boat yard with his third wife, Lori. Brian's been around long enough to let others do his dirty work. He's letting Jason live rent-free at one of his properties.",
    role: "Supporting Character",
    connections: ["Jason Duval (employee)", "Cal Hampton (associate)", "Lori Heder (third wife)"],
    trivia: [
      "Owns Brian's Boat Works & Marina",
      "Veteran of the Keys smuggling scene",
      "Lets Jason live rent-free for shakedowns",
      "\"Lori's sangria\" is mentioned in his bio"
    ]
  },
  "Cal Hampton": {
    backstory: "Jason's friend and a fellow associate of Brian's, Cal feels safest hanging at home, snooping on Coast Guard comms with a few beers and some private browser tabs open. Cal is at the low tide of America and happy there. Casual paranoia loves company, but his friend Jason has bigger plans.",
    role: "Supporting Character",
    connections: ["Jason Duval (best friend)", "Brian Heder (employer)"],
    trivia: [
      "Listens to Coast Guard radio frequencies",
      "Conspiracy theorist and paranoid",
      "Could be an intelligence asset for heists",
      "\"What if everything on the internet was true?\""
    ]
  },
  "Dre'Quan Priest": {
    backstory: "Only Raw... Records. Dre'Quan was always more of a hustler than a gangster. Even when he was dealing on the streets to make ends meet, breaking into music was the goal. Now that he's signed the Real Dimez, Dre'Quan's days of booking acts into Boobie's strip club might be numbered as he sets his sights on the Vice City scene.",
    role: "Supporting Character",
    connections: ["Boobie Ike (business partner)", "Real Dimez (signed to label)", "Only Raw Records"],
    trivia: [
      "Former street dealer turned music mogul",
      "Signed Real Dimez to Only Raw Records",
      "Has legitimate ambitions in the music industry",
      "\"Dancers are like my A&Rs\""
    ]
  },
  "Raul Bautista": {
    backstory: "Experience counts. Confidence, charm, and cunning — Raul's a seasoned bank robber always on the hunt for talent ready to take the risks that bring the biggest rewards. Raul's recklessness raises the stakes with every score. Sooner or later, his crew will have to double down or pull their chips from the table.",
    role: "Supporting Character",
    connections: ["Jason Duval (potential recruit)", "Lucia Caminos (potential recruit)"],
    trivia: [
      "Professional bank robber",
      "Known for escalating risk with every score",
      "Likely the heist specialist of the crew",
      "\"Life is full of surprises, my friend\""
    ]
  },
  "Bae-Luxe": {
    backstory: "She is one half of the hip-hop group Real Dimez, along with Roxy. Friends since high school — they know how to turn their time shaking down local dealers into cold, hard cash via spicy rap tracks and a relentless social media presence.",
    role: "Supporting Character",
    connections: ["Roxy (Real Dimez partner)", "Dre'Quan Priest (label manager)", "Only Raw Records"],
    trivia: [
      "Half of Real Dimez rap duo",
      "Friends with Roxy since high school",
      "Social media influencers",
      "Signed to Only Raw Records"
    ]
  },
  "Roxy": {
    backstory: "She is one half of the hip-hop group Real Dimez, along with Bae-Luxe. Friends since high school — they know how to turn their time shaking down local dealers into cold, hard cash via spicy rap tracks and a relentless social media presence.",
    role: "Supporting Character",
    connections: ["Bae-Luxe (Real Dimez partner)", "Dre'Quan Priest (label manager)", "Only Raw Records"],
    trivia: [
      "Half of Real Dimez rap duo",
      "Friends with Bae-Luxe since high school",
      "An early hit single with DWNPLY",
      "Signed to Only Raw Records"
    ]
  },
  "Lori Heder": {
    backstory: "Lori is Brian's third wife and works alongside him at the boat yard. She is also shown handling both an assault rifle and a pistol, suggesting she's comfortable with weapons.",
    role: "Supporting Character",
    connections: ["Brian Heder (husband)", "Jason Duval (husband's employee)"],
    trivia: [
      "Brian Heder's third wife",
      "Works at Brian's Boat Works & Marina",
      "Comfortable with weapons",
      "Known for her sangria"
    ]
  },
  "Phil": {
    backstory: "Phil appears in an Ammu-Nation commercial in Trailer 2. He seems to be a reimagined version of Phil Cassidy from the 3D Universe GTA games, though with noticeable differences — this character is younger and has both arms.",
    role: "Supporting Character",
    connections: ["Ammu-Nation"],
    trivia: [
      "Reimagined Phil Cassidy from 3D Universe",
      "Appears in Ammu-Nation commercial",
      "Younger than original Phil Cassidy",
      "Has both arms (unlike original)"
    ]
  },
  "Stefanie": {
    backstory: "She appears to work at the 'Leonida Department of Corrections' state prison as a social worker. She's the first voice heard in GTA VI, speaking at the start of Trailer 1.",
    role: "Supporting Character",
    connections: ["Lucia Caminos (prison contact)", "Leonida Department of Corrections"],
    trivia: [
      "First voice heard in GTA VI",
      "Works as prison social worker",
      "Met Lucia while she was incarcerated",
      "Future involvement with Lucia unclear"
    ]
  },
  "Wyman": {
    backstory: "Wyman is a mechanic and car enthusiast who runs Wyman's World Auto Salvage Co. Rockstar Games describes him as an 'eccentric collector and local fixer.'",
    role: "Supporting Character",
    connections: ["Wyman's World Auto Salvage Co.", "Ultimate Edition content"],
    trivia: [
      "Runs Wyman's World Auto Salvage Co.",
      "Eccentric car collector",
      "Ultimate Edition exclusive content",
      "Tasks players to find abandoned classic cars"
    ]
  },
  "Méndez": {
    backstory: "A corrupt cop and one of the main antagonists of GTA 6. Uses his position to hunt Jason and Lucia while pursuing his own agenda.",
    role: "Antagonist",
    connections: ["Leonida Police", "Jason Duval (target)", "Lucia Caminos (target)"],
    trivia: [
      "Main antagonist of GTA 6",
      "Corrupt police detective",
      "Hunting Jason and Lucia",
      "Has his own hidden agenda"
    ]
  },
};

export default function CharacterModal({ character, onClose }: CharacterModalProps) {
  const details = CHARACTER_DETAILS[character.name] || {
    backstory: character.description,
    role: character.role,
    connections: [],
    trivia: []
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <div
        className="relative bg-[#0d0020] rounded-2xl border-2 border-pink-500/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-pink-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header image */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          {CHARACTER_SCREENSHOTS[character.name]?.[0] ? (
            <img
              src={CHARACTER_SCREENSHOTS[character.name][0]}
              alt={character.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-pink-900/30" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0020] via-transparent to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-pink-500/30 transition-all"
          >
            ✕
          </button>

          {/* Role badge */}
          <div className="absolute bottom-4 left-4">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider ${
              character.role === "Protagonist"
                ? "bg-pink-500 text-white"
                : character.role === "Antagonist"
                ? "bg-red-500 text-white"
                : "bg-purple-500/80 text-white"
            }`}>
              {character.role === "Protagonist" ? "PROTAGONIST" : character.role === "Antagonist" ? "ANTAGONIST" : "SUPPORTING"}
            </span>
          </div>

          {/* Favorite */}
          <div className="absolute bottom-4 right-4">
            <FavoriteButton id={character.id} name={character.name} slug={character.slug} type="character" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-3xl font-black text-white mb-2 tracking-wide">{character.name.toUpperCase()}</h2>

          {/* Backstory */}
          <div className="mb-6">
            <h3 className="text-pink-400 text-sm font-bold tracking-wider mb-2">BACKSTORY</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{details.backstory}</p>
          </div>

          {/* Connections */}
          {details.connections.length > 0 && (
            <div className="mb-6">
              <h3 className="text-pink-400 text-sm font-bold tracking-wider mb-2">CONNECTIONS</h3>
              <div className="flex flex-wrap gap-2">
                {details.connections.map((conn, i) => (
                  <span key={i} className="bg-purple-500/20 border border-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-xs">
                    {conn}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Trivia */}
          {details.trivia.length > 0 && (
            <div className="mb-6">
              <h3 className="text-pink-400 text-sm font-bold tracking-wider mb-2">DID YOU KNOW?</h3>
              <ul className="space-y-2">
                {details.trivia.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400 text-xs">
                    <span className="text-pink-400 mt-0.5">•</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Info */}
          <div className="flex items-center gap-6 pt-4 border-t border-purple-500/10 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-pink-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
              {character.affiliation}
            </span>
            <span>Status: {character.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
