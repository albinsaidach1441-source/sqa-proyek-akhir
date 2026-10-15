const { test, expect } = require('@playwright/test');

test.describe('SauceDemo E2E Automation Tests (10 Scenarios)', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
    });

    test('1. Login berhasil dengan standard_user', async ({ page }) => {
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await expect(page).toHaveURL(/inventory/);
    });

    test('2. Login gagal dengan password salah', async ({ page }) => {
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'wrong_password');
        await page.click('#login-button');
        const error = page.locator('[data-test="error"]');
        await expect(error).toBeVisible();
    });

    test('3. Login gagal dengan locked_out_user', async ({ page }) => {
        await page.fill('#user-name', 'locked_out_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await expect(page.locator('[data-test="error"]')).toContainText('locked out');
    });

    test('4. Membuka halaman dashboard / katalog produk', async ({ page }) => {
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await expect(page.locator('.title')).toHaveText('Products');
    });

    test('5. Menambahkan data produk ke keranjang', async ({ page }) => {
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    });

    test('6. Mengedit/menghapus data produk dari keranjang', async ({ page }) => {
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="remove-sauce-labs-backpack"]');
        await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
    });

    test('7. Fitur Search / Sorting produk (A-Z ke Z-A)', async ({ page }) => {
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.selectOption('.product_sort_container', 'hilo');
        await expect(page.locator('.active_option')).toHaveText('Price (high to low)');
    });

    test('8. Validasi form checkout kosong', async ({ page }) => {
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');
        await page.click('[data-test="checkout"]');
        await page.click('[data-test="continue"]');
        await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
    });

    test('9. Complete end-to-end transaction', async ({ page }) => {
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('.shopping_cart_link');
        await page.click('[data-test="checkout"]');
        await page.fill('[data-test="firstName"]', 'Achmad');
        await page.fill('[data-test="lastName"]', 'Fauzi');
        await page.fill('[data-test="postalCode"]', '60293');
        await page.click('[data-test="continue"]');
        await page.click('[data-test="finish"]');
        await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
    });

    test('10. Logout dari aplikasi', async ({ page }) => {
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await page.click('#react-burger-menu-btn');
        await page.click('#logout_sidebar_link');
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

});
