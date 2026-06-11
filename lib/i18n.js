"use client";

import { createContext, useContext, useState, useEffect } from "react";

/* ── Translation strings ── */
export const translations = {
  en: {
    // Navbar
    nav: {
      home: "Home",
      browse: "Browse",
      profiles: "Profiles",
      submit: "Submit",
      submitPrompt: "+ Submit Prompt",
    },
    // Footer
    footer: {
      tagline: "The community prompt library for AI power users.",
      copyright: "Built with Next.js & Tailwind CSS.",
    },
    // Home page
    home: {
      badge: "85,000+ Prompts Shared",
      headline1: "Find prompts",
      headline2: "worth saving.",
      subheading:
        "Discover thousands of curated prompts for coding, design, marketing, business, productivity, and AI automation.",
      searchPlaceholder: "Search prompts, categories, tools...",
      exploreBtn: "Explore Prompts",
      submitBtn: "Submit Prompt",
      featuredLabel: "Featured",
      featuredTitle: "Trending this week",
      featuredSub: "Hand-picked by the community",
      viewAll: "View all",
      viewAllPrompts: "View all prompts →",
      whyLabel: "Why PromptHub",
      whyTitle: "Everything you need to get more out of AI",
      ctaLabel: "Join the community",
      ctaTitle: "Have a great prompt?",
      ctaSub:
        "Share it with thousands of AI users and build your reputation in the community.",
      ctaSubmit: "Submit Your Prompt",
      ctaBrowse: "Browse Prompts",
    },
    // Browse page
    browse: {
      title: "Browse Prompts",
      subtitle: (count, cats) => `${count} prompts across ${cats} categories`,
      searchPlaceholder: "Search prompts by title, description, or tag…",
      showing: (n) => `Showing ${n} prompt${n !== 1 ? "s" : ""}`,
      noPrompts: "No prompts found",
      inCategory: (cat) => ` in ${cat}`,
      forQuery: (q) => ` for "${q}"`,
      tryDifferent: "Try a different search term or category.",
      clearFilters: "Clear filters",
    },
    // Submit page
    submit: {
      title: "Submit a Prompt",
      subtitle: "Share your best prompts with the PromptHub community.",
      successTitle: "Prompt Submitted!",
      successMsg: (title) =>
        `Thanks for contributing to PromptHub. Your prompt "${title}" has been received and will be reviewed shortly.`,
      submitAnother: "Submit Another",
      browsePrompts: "Browse Prompts",
      fields: {
        title: "Prompt Title",
        titlePlaceholder: "e.g. Expert Code Reviewer",
        category: "Category",
        categoryPlaceholder: "Select a category…",
        description: "Short Description",
        descriptionPlaceholder:
          "Briefly describe what this prompt does and when to use it…",
        content: "Prompt Content",
        contentPlaceholder:
          "Paste your full prompt here. Use [PLACEHOLDERS] for variable parts…",
        contentHint:
          "Use [BRACKETS] for parts users should replace, e.g. [TOPIC], [AUDIENCE].",
        tags: "Tags",
        tagsHint: "Comma-separated, e.g. coding, review, python",
        tagsPlaceholder: "coding, review, python",
        author: "Your Name / Handle",
        authorPlaceholder: "e.g. devmaster",
      },
      clear: "Clear",
      submitBtn: "Submit Prompt",
      tipsTitle: "💡 Tips for a great prompt",
      tips: [
        "Be specific about the task and expected output format",
        "Use [PLACEHOLDERS] for parts users should customize",
        "Include context about when and how to use the prompt",
        "Test your prompt before submitting to ensure it works well",
        "Add relevant tags to help others discover your prompt",
      ],
      errors: {
        titleRequired: "Title is required.",
        categoryRequired: "Please select a category.",
        descriptionRequired: "Description is required.",
        descriptionShort: "Description must be at least 20 characters.",
        contentRequired: "Prompt content is required.",
        contentShort: "Prompt must be at least 30 characters.",
        authorRequired: "Author name is required.",
      },
    },
    // Prompt card
    card: {
      featured: "⭐ Featured",
      uses: "uses",
      copy: "Copy",
      copied: "Copied!",
    },
    // Categories
    categories: {
      All: "All",
      Writing: "Writing",
      Coding: "Coding",
      Marketing: "Marketing",
      Design: "Design",
      Research: "Research",
      Business: "Business",
      Education: "Education",
    },
  },

  id: {
    // Navbar
    nav: {
      home: "Beranda",
      browse: "Jelajahi",
      profiles: "Profil",
      submit: "Kirim",
      submitPrompt: "+ Kirim Prompt",
    },
    // Footer
    footer: {
      tagline: "Pustaka prompt komunitas untuk pengguna AI.",
      copyright: "Dibuat dengan Next.js & Tailwind CSS.",
    },
    // Home page
    home: {
      badge: "85.000+ Prompt Dibagikan",
      headline1: "Temukan prompt",
      headline2: "yang layak disimpan.",
      subheading:
        "Temukan ribuan prompt pilihan untuk coding, desain, pemasaran, bisnis, produktivitas, dan otomasi AI.",
      searchPlaceholder: "Cari prompt, kategori, alat...",
      exploreBtn: "Jelajahi Prompt",
      submitBtn: "Kirim Prompt",
      featuredLabel: "Unggulan",
      featuredTitle: "Trending minggu ini",
      featuredSub: "Dipilih langsung oleh komunitas",
      viewAll: "Lihat semua",
      viewAllPrompts: "Lihat semua prompt →",
      whyLabel: "Mengapa PromptHub",
      whyTitle: "Semua yang kamu butuhkan untuk memaksimalkan AI",
      ctaLabel: "Bergabung dengan komunitas",
      ctaTitle: "Punya prompt yang bagus?",
      ctaSub:
        "Bagikan ke ribuan pengguna AI dan bangun reputasimu di komunitas.",
      ctaSubmit: "Kirim Prompt Kamu",
      ctaBrowse: "Jelajahi Prompt",
    },
    // Browse page
    browse: {
      title: "Jelajahi Prompt",
      subtitle: (count, cats) => `${count} prompt di ${cats} kategori`,
      searchPlaceholder: "Cari prompt berdasarkan judul, deskripsi, atau tag…",
      showing: (n) => `Menampilkan ${n} prompt`,
      noPrompts: "Tidak ada prompt ditemukan",
      inCategory: (cat) => ` di ${cat}`,
      forQuery: (q) => ` untuk "${q}"`,
      tryDifferent: "Coba kata kunci atau kategori yang berbeda.",
      clearFilters: "Hapus filter",
    },
    // Submit page
    submit: {
      title: "Kirim Prompt",
      subtitle: "Bagikan prompt terbaikmu ke komunitas PromptHub.",
      successTitle: "Prompt Terkirim!",
      successMsg: (title) =>
        `Terima kasih telah berkontribusi ke PromptHub. Prompt "${title}" sudah diterima dan akan segera ditinjau.`,
      submitAnother: "Kirim Lagi",
      browsePrompts: "Jelajahi Prompt",
      fields: {
        title: "Judul Prompt",
        titlePlaceholder: "mis. Peninjau Kode Ahli",
        category: "Kategori",
        categoryPlaceholder: "Pilih kategori…",
        description: "Deskripsi Singkat",
        descriptionPlaceholder:
          "Jelaskan secara singkat apa yang dilakukan prompt ini dan kapan menggunakannya…",
        content: "Isi Prompt",
        contentPlaceholder:
          "Tempel prompt lengkap di sini. Gunakan [PLACEHOLDER] untuk bagian yang bervariasi…",
        contentHint:
          "Gunakan [TANDA KURUNG] untuk bagian yang perlu diganti pengguna, mis. [TOPIK], [AUDIENS].",
        tags: "Tag",
        tagsHint: "Dipisahkan koma, mis. coding, ulasan, python",
        tagsPlaceholder: "coding, ulasan, python",
        author: "Nama / Handle Kamu",
        authorPlaceholder: "mis. devmaster",
      },
      clear: "Kosongkan",
      submitBtn: "Kirim Prompt",
      tipsTitle: "💡 Tips untuk prompt yang bagus",
      tips: [
        "Jelaskan tugas dan format output yang diharapkan secara spesifik",
        "Gunakan [PLACEHOLDER] untuk bagian yang dapat dikustomisasi pengguna",
        "Sertakan konteks tentang kapan dan bagaimana menggunakan prompt",
        "Uji promptmu sebelum mengirim untuk memastikan hasilnya baik",
        "Tambahkan tag yang relevan agar orang lain mudah menemukannya",
      ],
      errors: {
        titleRequired: "Judul wajib diisi.",
        categoryRequired: "Pilih kategori terlebih dahulu.",
        descriptionRequired: "Deskripsi wajib diisi.",
        descriptionShort: "Deskripsi minimal 20 karakter.",
        contentRequired: "Isi prompt wajib diisi.",
        contentShort: "Prompt minimal 30 karakter.",
        authorRequired: "Nama / handle wajib diisi.",
      },
    },
    // Prompt card
    card: {
      featured: "⭐ Unggulan",
      uses: "penggunaan",
      copy: "Salin",
      copied: "Tersalin!",
    },
    // Categories
    categories: {
      All: "Semua",
      Writing: "Penulisan",
      Coding: "Coding",
      Marketing: "Pemasaran",
      Design: "Desain",
      Research: "Riset",
      Business: "Bisnis",
      Education: "Pendidikan",
    },
  },
};

/* ── Context ── */
const LangContext = createContext({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LangProvider({ children }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    const saved = localStorage.getItem("ph-lang");
    if (saved === "en" || saved === "id") setLangState(saved);
  }, []);

  function setLang(l) {
    setLangState(l);
    localStorage.setItem("ph-lang", l);
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
