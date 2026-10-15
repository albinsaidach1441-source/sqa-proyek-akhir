class OrderService {
    constructor(paymentService, inventoryService) {
        this.paymentService = paymentService;
        this.inventoryService = inventoryService;
    }
    
    async checkout(itemId, amount) {
        const hasStock = await this.inventoryService.checkStock(itemId);
        if (!hasStock) { 
            throw new Error('Stok barang habis'); 
        }
        
        const paymentSuccess = await this.paymentService.processPayment(amount);
        if (!paymentSuccess) { 
            throw new Error('Pembayaran gagal'); 
        }
        
        await this.inventoryService.deductStock(itemId);
        return { status: 'SUCCESS', itemId, amount };
    }
}

module.exports = OrderService;
