import { test, expect } from '@playwright/test';
import FlipkartPage from '../pages/FlipkartPage.js';

class FlipkartTests {
    constructor(page) {
        this.page = page;
        this.flipkartPage = new FlipkartPage(page);
    }

    async setupBeforeEach() { 
        await this.flipkartPage.navigateToFlipkart();
        await this.flipkartPage.closePopup();
    }

    async testSearchForProduct() {
        await this.flipkartPage.searchProduct('Laptop');
        expect(this.flipkartPage.page).toHaveURL(/search/);
        console.log('✓ Search for product test passed');
    }

    async testAddProductToCart() {
        await this.flipkartPage.searchProduct('Mobile Phone');
        await this.flipkartPage.selectProduct(0);
        await this.flipkartPage.addProductToCart();
        
        const successMsg = await this.flipkartPage.getSuccessMessage();
        expect(successMsg).toBeTruthy();
        console.log('✓ Add product to cart test passed');
    }

    async testViewCartAndCheckout() {
        await this.flipkartPage.searchProduct('Headphones');
        await this.flipkartPage.selectProduct(0);
        await this.flipkartPage.addProductToCart();
        
        await this.flipkartPage.viewCart();
        const itemCount = await this.flipkartPage.getCartItemCount();
        expect(itemCount).toBeGreaterThan(0);
        
        await this.flipkartPage.proceedToCheckout();
        console.log('✓ View cart and checkout test passed');
    }

    async testApplyFiltersAndSearch() {
        await this.flipkartPage.searchProduct('Shoes');
        await this.flipkartPage.applyBrandFilter('Nike');
        
        expect(this.flipkartPage.page).toHaveURL(/filter/);
        console.log('✓ Apply filters and search test passed');
    }

    async testCheckProductDelivery() {
        await this.flipkartPage.searchProduct('Shoes');
        await this.flipkartPage.selectProduct(0);
        await this.flipkartPage.checkDelivery('560001');
        
        console.log('✓ Check product delivery test passed');
    }

    async testAddProductToWishlist() {
        await this.flipkartPage.searchProduct('Books');
        await this.flipkartPage.selectProduct(0);
        await this.flipkartPage.addProductToWishlist();
        console.log('✓ Add product to wishlist test passed');
    }

    async testGetProductDetails() {
        await this.flipkartPage.searchProduct('Shoes');
        await this.flipkartPage.selectProduct(0);
        
        const title = await this.flipkartPage.getProductTitle();
        const price = await this.flipkartPage.getProductPrice();
        const rating = await this.flipkartPage.getProductRating();
        
        expect(title).toBeTruthy();
        expect(price).toBeTruthy();
        console.log(`Product: ${title}, Price: ${price}, Rating: ${rating}`);
    }

    async testCompleteCheckoutFlow() {
        await this.flipkartPage.searchProduct('Laptop');
        await this.flipkartPage.selectProduct(0);
        await this.flipkartPage.addProductToCart();
        await this.flipkartPage.viewCart();
        await this.flipkartPage.proceedToCheckout();
        
        await this.flipkartPage.fillAddressDetails(
            '123 Main Street',
            'Bangalore',
            'Karnataka',
            '560001'
        );
        
        await this.flipkartPage.selectPaymentMethod('Credit Card');
        const totalPrice = await this.flipkartPage.getTotalPrice();
        console.log(`Total Price: ${totalPrice}`);
        console.log('✓ Complete checkout flow test passed');
    }
}

test.describe('Flipkart Page Object Model Tests', () => {

    let flipkartTests;

    test.beforeEach(async ({ page }) => {
        flipkartTests = new FlipkartTests(page);
        await flipkartTests.setupBeforeEach();
    });

    test('Search for a product', async () => {
        await flipkartTests.testSearchForProduct();
    });

    test('Add product to cart', async () => {
        await flipkartTests.testAddProductToCart();
    });

    test('View cart and proceed to checkout', async () => {
        await flipkartTests.testViewCartAndCheckout();
    });

    test('Apply filters and search', async () => {
        await flipkartTests.testApplyFiltersAndSearch();
    });

    test('Check product delivery', async () => {
        await flipkartTests.testCheckProductDelivery();
    });

    test('Add product to wishlist', async () => {
        await flipkartTests.testAddProductToWishlist();
    });

    test('Get product details', async () => {
        await flipkartTests.testGetProductDetails();
    });

    test('Complete checkout flow', async () => {
        await flipkartTests.testCompleteCheckoutFlow();
    });
});
