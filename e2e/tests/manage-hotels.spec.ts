import path from "path";
import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign in" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("test@test.com");
  await page.locator("[name=password]").fill("password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign  in Successful")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}/add-hotel`);
  await page.locator("[name=name]").fill("Test hotel");
  await page.locator("[name=city]").fill("Boston");
  await page.locator("[name=country]").fill("USA");
  await page.locator("[name=description]").fill("this is a test description");
  await page.locator("[name=pricePerNight]").fill("100");
  await page.selectOption("select[name='starRating']", "3");
  await page.getByText("Budget").click();
  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();
  await page.locator("[name=adultCount]").fill("2");
  await page.locator("[name=childCount]").fill("1");

  await page.setInputFiles("[name='imageFiles']", [
    path.join(__dirname, "files", "hotel1.jpg"),
    path.join(__dirname, "files", "hotel2.jpg"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved")).toBeVisible();
});
