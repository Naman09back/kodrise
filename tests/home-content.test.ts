import assert from "node:assert/strict";
import test from "node:test";
import {homepageAssetUrl, isAllowedImageUpload, isHomepageImageSlot, MAX_IMAGE_BYTES} from "../src/lib/home-content.ts";

test("accepts only supported homepage image slots", () => {
  assert.equal(isHomepageImageSlot("hero"), true);
  assert.equal(isHomepageImageSlot("portfolio3"), true);
  assert.equal(isHomepageImageSlot("logo"), false);
});

test("validates image upload type and size", () => {
  assert.equal(isAllowedImageUpload("image/webp", 1024), true);
  assert.equal(isAllowedImageUpload("text/plain", 1024), false);
  assert.equal(isAllowedImageUpload("image/png", MAX_IMAGE_BYTES + 1), false);
});

test("resolves the configured asset for a homepage slot", () => {
  assert.equal(homepageAssetUrl([{slot: "hero", image: {asset: {url: "/hero.webp"}}}], "hero"), "/hero.webp");
  assert.equal(homepageAssetUrl([{slot: "awards", image: {asset: {url: "/awards.webp"}}}], "hero"), undefined);
});
