import { About } from "@/components/main/about";
import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { Skills } from "@/components/main/skills";
import { Experience } from "@/components/main/experience";
import { Contact } from "@/components/main/contact";
import { Footer } from "@/components/main/footer";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-0">
        <Hero />
        <About />
        <Skills />
        <Encryption />
        <Experience />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
