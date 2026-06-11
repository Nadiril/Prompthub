import Link from "next/link";
import FooterClient from "./FooterClient";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a12]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <FooterClient />
        <div className="mt-8 border-t border-white/5 pt-6 text-center text-xs text-zinc-700">
          © {new Date().getFullYear()} PromptHub.
        </div>
      </div>
    </footer>
  );
}
