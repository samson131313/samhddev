"use client";

import { FormEvent, useEffect, useState } from "react";

const nav = [
  { href: "#brief", label: "درباره" },
  { href: "#loadout", label: "مهارت‌ها" },
  { href: "#ops", label: "پروژه‌ها" },
  { href: "#contact", label: "تماس" },
];

const skills = [
  { name: "Next.js / App Router", value: 96, tag: "اصلی" },
  { name: "React", value: 94, tag: "رابط کاربری" },
  { name: "TypeScript", value: 92, tag: "کیفیت کد" },
  { name: "PostgreSQL / Prisma", value: 90, tag: "داده" },
  { name: "MongoDB / Redis", value: 86, tag: "ذخیره‌سازی" },
  { name: "API / احراز هویت", value: 88, tag: "سمت سرور" },
];

const ops = [
  {
    code: "۰۱",
    title: "سامانه مالی Nexus",
    color: "panel-gold",
    blurb:
      "پلتفرم ثبت و نمایش تراکنش به‌صورت لحظه‌ای. رابط کاربری با Next.js و لایه داده با PostgreSQL طراحی شده تا گزارش‌ها سریع و قابل اتکا باشند.",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
  },
  {
    code: "۰۲",
    title: "داشبورد عملیاتی Phantom",
    color: "panel-cyan",
    blurb:
      "پنل مدیریت وضعیت سرویس‌ها برای تیم فنی. ساختار React منظم است و داده‌های پرکاربرد در Redis نگه داشته می‌شوند تا صفحه سبک بماند.",
    stack: ["React", "TypeScript", "Redis"],
  },
  {
    code: "۰۳",
    title: "معماری داده Vault",
    color: "panel-acid",
    blurb:
      "طراحی پایگاه داده و سطح دسترسی برای اطلاعاتی که حساسیت بالا دارند. ایندکس‌گذاری، احراز هویت و پشتیبان‌گیری در همین لایه دیده شده است.",
    stack: ["Node", "MongoDB", "Auth"],
  },
  {
    code: "۰۴",
    title: "موتور محتوا Spectre",
    color: "panel-gold",
    blurb:
      "سامانه مدیریت محتوا و API مشترک برای وب و اپلیکیشن. محتوا یک‌بار ثبت می‌شود و در چند محصول به‌صورت یکسان نمایش داده می‌شود.",
    stack: ["Next.js", "REST", "CDN"],
  },
];

export function Home() {
  const [boot, setBoot] = useState(true);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [sent, setSent] = useState(false);
  const [active, setActive] = useState("#brief");

  useEffect(() => {
    const t = setTimeout(() => setBoot(false), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const ids = ["brief", "loadout", "ops", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { threshold: 0.35 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const mail = String(data.get("email") || "");
    const msg = String(data.get("message") || "");
    const body = encodeURIComponent(`${msg}\n\n— ${name} (${mail})`);
    window.location.href = `mailto:hello@samhddev.com?subject=درخواست%20همکاری%20با%20SAMHDDEV&body=${body}`;
    setSent(true);
  }

  return (
    <div className="relative hud-corners hud-floor">
      {boot && (
        <div className="boot">
          <div className="text-center px-6">
            <p className="tag justify-center mb-5">در حال بارگذاری</p>
            <h2 className="text-3xl md:text-5xl tracking-[0.18em]" dir="ltr">
              SAMHDDEV
            </h2>
            <div className="mt-8 mx-auto h-1 w-56 overflow-hidden bg-black/10">
              <span className="block h-full w-full origin-right bg-gradient-to-l from-magenta via-gold to-acid animate-[loadIn_1.4s_ease_forwards]" />
            </div>
          </div>
        </div>
      )}

      <div className="mesh" />
      <div
        className="glow-cursor hidden md:block"
        style={{ left: pos.x, top: pos.y }}
      />
      <div className="scanlines" />
      <div className="vignette" />

      <header className="sticky top-0 z-50 border-b border-[#cfc4e2]/50 bg-[#f3eef8]/92 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
          <a href="#brief" className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-sm bg-[#5c4a78] text-[11px] font-semibold tracking-[0.08em] text-white">
              SH
            </span>
            <span className="min-w-0 leading-tight">
              <strong className="block truncate text-[13px] font-semibold tracking-[0.16em] text-[#2f2544]" dir="ltr">
                SAMHDDEV
              </strong>
              <small className="block truncate text-[11px] font-medium text-[#6b6280]">
                توسعه‌دهنده فول‌استک
              </small>
            </span>
          </a>
          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link ${active === item.href ? "active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a className="nav-cta shrink-0" href="#contact">
            تماس
          </a>
        </div>
        <nav className="flex items-center justify-center gap-6 border-t border-[#cfc4e2]/40 px-5 md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link shrink-0 ${active === item.href ? "active" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="relative z-10">
        <section
          id="brief"
          className="mx-auto grid max-w-6xl scroll-mt-28 gap-10 px-4 pb-20 pt-10 md:grid-cols-[1.2fr_0.8fr] md:px-5 md:pt-20"
        >
          <div className="rise">
            <p className="tag mb-5">پورتفولیو</p>
            <p className="mb-3 text-sm font-bold text-[#8a5a00]">معرفی</p>
            <h1 className="text-4xl leading-[1.2] tracking-[0.04em] sm:text-6xl md:text-7xl" dir="ltr">
              SAMHDDEV
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-9 text-[#1c2230]">
              توسعه‌دهنده فول‌استک هستم. وب‌اپلیکیشن را از رابط کاربری تا پایگاه داده طراحی و پیاده‌سازی می‌کنم.
              تمرکز من روی Next.js، React و معماری داده است؛ محصول باید سریع، خوانا و قابل نگهداری باشد.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn btn-primary" href="#contact">
                درخواست همکاری
              </a>
              <a className="btn btn-ghost" href="#ops">
                مشاهده پروژه‌ها
              </a>
            </div>
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">
              {[
                ["۷+", "سال تجربه"],
                ["۳ لایه", "فرانت، بک، داده"],
                ["سرتاسری", "از طراحی تا انتشار"],
              ].map(([k, v]) => (
                <div key={k} className="panel p-4 text-center">
                  <div className="hud-type text-lg text-[#8a5a00]" dir="ltr">
                    {k}
                  </div>
                  <div className="mt-1 text-xs font-medium text-[#3a4254]">{v}</div>
                </div>
              ))}
            </div>
          </div>

          <aside className="panel min-w-0 overflow-hidden p-5 md:p-6 rise" style={{ animationDelay: "0.15s" }}>
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="w-full">
                <p className="tag mb-3">خلاصه خدمات</p>
                <h2 className="text-xl">حوزه کار</h2>
              </div>
              <div className="radar shrink-0">
                <span className="radar-dot" style={{ top: "28%", left: "62%" }} />
                <span className="radar-dot" style={{ top: "58%", left: "34%", background: "var(--magenta)" }} />
                <span className="radar-dot" style={{ top: "72%", left: "70%", background: "var(--cyan)" }} />
              </div>
            </div>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-[#1c2230]">
              <li>طراحی و توسعه رابط کاربری با React و Next.js</li>
              <li>پیاده‌سازی API، احراز هویت و منطق سمت سرور</li>
              <li>مدل‌سازی و بهینه‌سازی پایگاه داده PostgreSQL و MongoDB</li>
            </ul>
            <div className="mt-6 grid grid-cols-2 gap-2 text-[11px]" dir="ltr">
              <span className="chip text-magenta">NEXT.JS</span>
              <span className="chip text-cyan">REACT</span>
              <span className="chip text-acid">POSTGRES</span>
              <span className="chip text-gold">MONGODB</span>
            </div>
          </aside>
        </section>

        <div className="marquee mb-16">
          <div className="marquee-track">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i}>
                فول‌استک · Next.js · React · پایگاه داده · طراحی محصول · توسعه وب ·
              </span>
            ))}
          </div>
        </div>

        <section id="loadout" className="mx-auto max-w-6xl scroll-mt-28 px-4 pb-24 md:px-5">
          <p className="tag mb-4">تخصص</p>
          <h2 className="mb-3 text-3xl md:text-4xl">مهارت‌ها</h2>
          <p className="mb-10 max-w-2xl leading-8 text-[#1c2230]">
            ابزارها را بر اساس نیاز پروژه انتخاب می‌کنم. اولویت با کدی است که تیم بتواند آن را بخواند، توسعه دهد و نگهداری کند.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {skills.map((s) => (
              <article key={s.name} className="panel p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="hud-type text-sm tracking-[0.08em]" dir="ltr">
                    {s.name}
                  </h3>
                  <span className="text-[12px] font-bold text-[#8a5a00]">{s.tag}</span>
                </div>
                <div className="meter">
                  <span style={{ width: `${s.value}%` }} />
                </div>
                <p className="mt-2 text-left text-xs font-bold text-[#0b7d4a]" dir="ltr">
                  {s.value}%
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="ops" className="mx-auto max-w-6xl scroll-mt-28 px-4 pb-24 md:px-5">
          <p className="tag mb-4">نمونه کار</p>
          <h2 className="mb-3 text-3xl md:text-4xl">پروژه‌ها</h2>
          <p className="mb-10 max-w-2xl leading-8 text-[#1c2230]">
            چند نمونه از کارهایی که ساختار محصول، رابط کاربری و لایه داده در آن‌ها هم‌زمان دیده شده است.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {ops.map((op) => (
              <article key={op.code} className={`panel ${op.color} p-6`}>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0b6f86]">پروژه {op.code}</span>
                  <span className="h-2 w-2 rounded-full bg-[#0b7d4a]" />
                </div>
                <h3 className="text-2xl">{op.title}</h3>
                <p className="mt-4 leading-8 text-[#1c2230]">{op.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2" dir="ltr">
                  {op.stack.map((st) => (
                    <span key={st} className="chip">
                      {st}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl scroll-mt-28 px-4 pb-28 md:px-5">
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="tag mb-4">ارتباط</p>
              <h2 className="mb-4 text-3xl md:text-4xl">تماس با من</h2>
              <p className="leading-8 text-[#1c2230]">
                اگر برای طراحی محصول، توسعه وب‌اپلیکیشن یا بازبینی معماری داده نیاز به همکاری دارید، توضیح کوتاه پروژه را ارسال کنید.
                در پاسخ، محدوده کار، فناوری پیشنهادی و زمان تقریبی را اعلام می‌کنم.
              </p>
              <p className="mt-6 text-sm font-bold text-[#8a5a00]" dir="ltr">
                hello@samhddev.com
              </p>
            </div>
            <form className="panel space-y-4 p-6" onSubmit={onSubmit}>
              <label className="block text-sm font-bold text-[#3a4254]">
                نام
                <input name="name" required className="mt-2" placeholder="نام و نام خانوادگی" />
              </label>
              <label className="block text-sm font-bold text-[#3a4254]">
                ایمیل
                <input name="email" type="email" required className="mt-2" placeholder="you@domain.com" dir="ltr" />
              </label>
              <label className="block text-sm font-bold text-[#3a4254]">
                شرح پروژه
                <textarea name="message" required rows={5} className="mt-2" placeholder="موضوع و هدف پروژه را بنویسید." />
              </label>
              <button className="btn btn-primary w-full" type="submit">
                {sent ? "آماده ارسال شد" : "ارسال پیام"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-black/10 px-5 py-8 text-center text-sm text-[#3a4254]">
        SAMHDDEV © ۱۴۰۵ — طراحی و توسعه وب
      </footer>
    </div>
  );
}
