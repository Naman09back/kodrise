import { test, expect } from "@playwright/test";

test("technology strip moves, pauses, and respects reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const strip = page.getByRole("region", {
    name: "Technologies we work with",
    exact: true,
  });
  const viewport = page.getByRole("region", {
    name: "Technology list. Focus or hover to pause movement.",
    exact: true,
  });
  const track = strip.locator("[data-paused]");
  await strip.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const initial = await track.evaluate((el) => getComputedStyle(el).transform);
  await expect
    .poll(() => track.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(initial);
  await viewport.hover();
  await expect(track).toHaveCSS("animation-play-state", "paused");
  await page.mouse.move(0, 0);
  await expect(track).toHaveCSS("animation-play-state", "running");
  await page
    .getByRole("button", { name: "Pause technology animation" })
    .click();
  await expect(track).toHaveCSS("animation-play-state", "paused");
  await page
    .getByRole("button", { name: "Resume technology animation" })
    .click();
  await viewport.focus();
  await expect(track).toHaveCSS("animation-play-state", "paused");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(track).toHaveCSS("animation-name", "none");
  await expect(strip.locator('ul[aria-hidden="true"]')).toBeHidden();
  await expect(viewport).toHaveCSS("overflow-x", "auto");
});

test("visitors can explore expertise and prepare a project brief", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Hire pre-vetted",
  );
  await expect(page.locator(".tech-card")).toHaveCount(12);
  await page.getByRole("button", { name: "Make AI work for you" }).click();
  await expect(page.locator(".role-card").first()).toContainText("AI engineer");
  await page.getByRole("link", { name: "Start with this team" }).click();
  await expect(page.getByLabel("Technology", { exact: true })).toHaveValue(
    "Agentic AI, Python, Oracle Cloud",
  );
  await page.getByRole("button", { name: "Build a product" }).click();
  await expect(page.locator(".role-card").first()).toContainText(
    "Frontend engineer",
  );
  await page
    .getByRole("group", { name: "Filter expertise" })
    .getByRole("button", { name: "Commerce & CRM", exact: true })
    .click();
  await expect(page.locator(".tech-card")).toHaveCount(2);
  await page.locator(".tech-card").filter({ hasText: "Shopify" }).click();
  await expect(page).toHaveURL(/\/services\/ecommerce$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("eCommerce Developers");
  await page.goto("/");
  await page.getByLabel("Your name").fill("Test Person");
  await page.getByLabel("Work email").fill("test@example.com");
  await page.getByLabel("Company", { exact: true }).fill("Example Company");
  await page
    .getByLabel("A little about your needs")
    .fill("We need a Shopify specialist for our storefront.");
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Your project brief is ready" }),
  ).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download brief" }).click();
  expect((await downloadPromise).suggestedFilename()).toBe(
    "kodrise-project-brief.txt",
  );
  await page.getByRole("button", { name: "02 Dedicated teams" }).click();
  await expect(
    page.getByText("A team built around your next chapter."),
  ).toBeVisible();
  await page
    .locator("summary")
    .filter({ hasText: "Can we start with just one specialist?" })
    .click();
  await expect(
    page.getByText("Yes. Your requirement can be a single specialist", {
      exact: false,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "All expertise" }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/desktop.png", fullPage: true });
  expect(errors).toEqual([]);
});

test("mobile navigation and all layouts stay within the viewport", async ({
  page,
}) => {
  await page.goto("/");
  for (const width of [360, 390, 600, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation")).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page.getByRole("navigation")).toBeHidden();
  await expect(page).toHaveURL(/\/services$/);
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: "test-results/mobile.png", fullPage: true });
});

test("header routes, active states, and contact page work across screen sizes", async ({ page }) => {
  await page.goto("/");
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  for (const [name, path] of [["Services", "/services"], ["About Us", "/about"], ["Careers", "/careers"], ["Contact Us", "/contact"], ["Home", "/"]]) {
    await navigation.getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(`http://127.0.0.1:3000${path}`);
    await expect(navigation.getByRole("link", { name, exact: true })).toHaveAttribute("aria-current", "page");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
  await page.goto("/contact");
  await page.getByLabel("Your name").fill("Contact Test");
  await page.getByLabel("Work email").fill("test@example.com");
  await page.getByLabel("Company", { exact: true }).fill("Example");
  await page.getByLabel("Technology", { exact: true }).pressSequentially("React");
  await expect(page.getByLabel("Technology", { exact: true })).toHaveValue("React");
  await page.getByLabel("A little about your needs").fill("A specialist for a React project.");
  await page.getByRole("button", { name: "Prepare my enquiry" }).click();
  await expect(page.getByText("Your project brief is ready.")).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/services", "/about", "/careers", "/contact"]) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  await page.keyboard.press("Escape");
  await expect(navigation).toBeHidden();
  await expect(toggle).toBeFocused();
});

test("AP service routes, developer bench, and case studies are connected", async ({ page }) => {
  await page.goto("/services");
  await page.locator(".specialization-card").filter({ hasText: "ECOMMERCE" }).click();
  await expect(page).toHaveURL(/\/services\/ecommerce$/);
  await expect(page.getByText("Shopify").first()).toBeVisible();

  await page.goto("/devresources");
  await page.getByLabel("Skill / stack").selectOption({ label: "React" });
  await expect(page.locator(".developer-card")).toHaveCount(7);
  await page.locator(".developer-request").first().click();
  await expect(page).toHaveURL(/\/contact\?developer=DEV-\d+&role=/);
  await expect(page.getByLabel("Technology", { exact: true })).toHaveValue(/Developer/);

  await page.goto("/portfolio");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Real teams.");
  await expect(page.getByText("Acuity Analytics")).toBeVisible();
});
