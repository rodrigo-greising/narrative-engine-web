import { Button } from "@/components/ui/button";
import Link from "next/link";
import LandingMenu from "@/components/LandingMenu";
import {auth} from "@clerk/nextjs"
import { redirect } from 'next/navigation'




export default function Home() {
  const user = auth();
  
  if (!!user.userId) {
    redirect('/dashboard')
  }

  return (
    <main className="bg-gradient-to-r from-slate-50 to-blue-violet-100">
      <LandingMenu/>
      <div className="flex h-full flex-col items-center justify-between p-24">
        <h1 className="text-6xl text-blue-violet-500 font-bold mb-4">Narrative Engine</h1>
        <h2>Unleash the Power of AI in Your RPG Universe</h2>
        <p className="text-slate-600  mb-8">
          A platform for creating and managing worlds for your stories and games. 
        </p>
        <Link href={'/create campaign'} className="p-2 bg-blue-violet-900 text-blue-violet-50 shadow hover:bg-blue-violet-900/90 dark:bg-blue-violet-50 dark:text-blue-violet-900 dark:hover:bg-blue-violet-50/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-violet-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-blue-violet-300">Get Started</Link>
 
        <div className="w-1/2 my-8">
          <h4 className="text-2xl h-6 text-blue-violet-500 font-bold mb-4">Upload, Understand, Unfold:</h4>
          <p className="text-slate-600 h-20  mb-8 ">We're not just building a tool; we're crafting an AI-powered revolution for role-playing games. Begin by uploading your RPG rule sets – whether it's the classic Dungeons & Dragons or your unique creation. Our AI delves deep into the rules, using advanced vector space and embedding techniques to create a cohesive, interactive rule set.</p>
          <Button>Learn More</Button>
        </div>

        <div className="w-1/2 my-8">
          <h4 className="text-2xl h-6 text-blue-violet-500 font-bold mb-4">Clarity at Your Command:</h4>
          <p className="text-slate-600 h-20 mb-8 ">Gone are the days of flipping through pages for rule clarifications. Ask your questions directly through Discord, and get instant, accurate responses. This seamless integration means less time searching, more time adventuring.</p>
        </div>

        <div className="w-1/2 my-8">
          <h4 className="text-2xl h-6 text-blue-violet-500 font-bold mb-4">Relive Your Adventures:</h4>
          <p className="text-slate-600 h-20  mb-8 ">Never miss a beat of your epic campaigns. Record your matches for an immersive playback experience. Whether you prefer aural storytelling or searchable transcriptions, Narrative Engine remembers so you can revisit every thrilling moment.</p>
        </div>


        <div>
          <h1 className="text-4xl text-blue-violet-500 font-bold mb-4">Feature Roadmap</h1>

          <div className="w-1/2 my-8">
            <h4 className="text-2xl h-6 text-blue-violet-500 font-bold mb-4">Dynamic Lore Development:</h4>
            <p className="text-slate-600 h-20  mb-8 ">From side characters to political figures, from hidden locations to legendary weaponry, our AI expands your world, adhering to the templates and relations you define. You set the foundation; we build the universe.</p>
          </div>

          <div className="w-1/2 my-16">
            <h4 className="text-2xl h-6 text-blue-violet-500 font-bold mb-4">Your World, Our Canvas:</h4>
            <p className="text-slate-600 h-20  mb-8 ">We are working on our World Editor – a hex-based mapping tool. Craft your world’s geography with precision and creativity. From mountains to rivers to star systems, shape every inch of your realm. This isn't just for visual appeal; these maps serve as a ground truth for calculating travel distances, accessing resources, and understanding the strategic importance of locations.</p>
          </div>

          <div className="w-1/2 my-16">
            <h4 className="text-2xl h-6 text-blue-violet-500 font-bold mb-4">Faction Simulation with Agents:</h4>
            <p className="text-slate-600 h-20  mb-8 ">Introduce complex societies and organizations. Watch as factions interact dynamically, each with their own agendas and characters that react to the evolving world.</p>
          </div>

          <div className="w-1/2 my-8">
            <h4 className="text-2xl h-6 text-blue-violet-500 font-bold mb-4">Dynamic World State Updates:</h4>
            <p className="text-slate-600 h-20  mb-8 ">As your players make their moves, the world changes with them. Our system tracks these actions, ensuring the world's state is always up-to-date, reflecting the ongoing saga of your adventure.</p>
          </div>

        </div>

      </div>
      <div className="bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#7171e3" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,170.7C384,181,480,171,576,160C672,149,768,139,864,144C960,149,1056,171,1152,160C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    
    </main>
  );
}
