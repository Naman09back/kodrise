import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const origin = "https://www.apconsultancy.in";
const paths = ["/", "/services", "/services/ecommerce", "/services/devops-cloud-security", "/services/agentic-ai-software", "/services/qa-testing", "/services/mobile-app-web", "/services/ai-ml-automation", "/about", "/careers", "/contact", "/contact?intent=vendor", "/portfolio", "/devresources"];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
try {
  for (let i = 0; i < paths.length; i += 3) {
    await Promise.all(paths.slice(i, i + 3).map(async path => {
      const page = await browser.newPage();
      try {
        await page.goto(origin + path, { waitUntil: "networkidle" });
        const data = await page.evaluate(() => {
          const main = document.querySelector("main") ?? document.body;
          return {
            title: document.title, text: main.innerText,
            headings: Array.from(main.querySelectorAll("h1,h2,h3,h4")).map(el => ({ tag: el.tagName, text: el.innerText })),
            links: Array.from(main.querySelectorAll("a")).map(a => ({ text: a.innerText, href: a.href })),
            buttons: Array.from(main.querySelectorAll("button")).map(b => ({ text: b.innerText, type: b.type })),
            forms: Array.from(main.querySelectorAll("form")).map(f => ({ action: f.action, method: f.method, fields: Array.from(f.querySelectorAll("input,textarea,select")).map(el => ({ name: el.name, type: el.type, placeholder: el.getAttribute("placeholder"), required: el.required, options: el.tagName === "SELECT" ? Array.from(el.options).map(o => o.text) : undefined })) })),
            sections: Array.from(main.querySelectorAll("section")).map(s => ({ id: s.id, text: s.innerText, html: s.innerHTML })),
            scripts: Array.from(document.scripts).map(s => s.src).filter(Boolean),
          };
        });
        results.push({ path, ...data });
        console.log(path, data.text.length, "chars", data.links.length, "links", data.forms.length, "forms");
      } finally { await page.close(); }
    }));
  }
  await mkdir("reference", { recursive: true });
  await writeFile("reference/ap-consultancy.json", JSON.stringify(results, null, 2));
} finally { await browser.close(); }
