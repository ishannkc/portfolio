import Image from "next/image";
import { site } from "@/data/site";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";
import { MobileNav } from "./MobileNav";

function SocialIcon({ icon }: { icon: "mail" | "github" | "linkedin" }) {
  if (icon === "mail") return <MailIcon className="h-6 w-6 sm:h-7 sm:w-7" />;
  if (icon === "github") return <GitHubIcon className="h-6 w-6 sm:h-7 sm:w-7" />;
  return <LinkedInIcon className="h-6 w-6 sm:h-7 sm:w-7" />;
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-[1.5px] border-[#3B2A20] bg-[#F7EEDB] transition-all">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:px-12">
        <div className="flex items-center gap-6 xl:gap-10">
          <a
            aria-label="Ishan Kc — back to top"
            className="group inline-flex items-center gap-2"
            href="#"
          >
            <Image
              alt=""
              aria-hidden="true"
              className="h-11 w-auto shrink-0 select-none"
              height={435}
              priority
              src="/images/temple-sigil.png"
              width={337}
            />
            <span className="whitespace-nowrap font-headline-lg text-2xl font-extrabold tracking-tight text-[#3B2A20] transition-colors group-hover:text-[#800020] sm:text-3xl">
              Ishan Kc
            </span>
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-4 lg:flex xl:gap-8"
          >
            {site.navItems.map((item) => (
              <a
                aria-current={item.href === "#" ? "page" : undefined}
                className={
                  item.href === "#"
                    ? "whitespace-nowrap font-headline-md text-[17px] font-extrabold text-[#800020] underline decoration-[#800020]/60 decoration-1 underline-offset-4 transition-colors xl:text-lg"
                    : "whitespace-nowrap font-headline-md text-[17px] font-extrabold text-[#3B2A20] transition-colors hover:text-[#800020] hover:underline hover:decoration-[#800020]/60 hover:decoration-1 hover:underline-offset-4 xl:text-lg"
                }
                href={item.href}
                key={item.label}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex items-center gap-3 sm:gap-4">
            {site.navSocials.map((social) => (
              <a
                aria-label={social.label}
                className="flex items-center justify-center p-1 text-[#3B2A20] transition-colors hover:text-[#800020]"
                href={social.href}
                key={social.label}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                target={social.href.startsWith("http") ? "_blank" : undefined}
                title={social.label}
              >
                <SocialIcon icon={social.icon as "mail" | "github" | "linkedin"} />
              </a>
            ))}
          </div>

          <MobileNav navItems={site.navItems} />
        </div>
      </div>
    </header>
  );
}
