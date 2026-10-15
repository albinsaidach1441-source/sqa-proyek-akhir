const OrderService = require('../src/orderService');
const PaymentService = require('../src/paymentService');
const InventoryService = require('../src/inventoryService');

jest.mock('../src/paymentService');
jest.mock('../src/inventoryService');

describe('OrderService Integration Tests', () => {
    let orderService, mockPayment, mockInventory;

    beforeEach(() => {
        mockPayment = new PaymentService();
        mockInventory = new InventoryService();
        orderService = new OrderService(mockPayment, mockInventory);
    });

    test('1. checkout sukses ketika stok ada dan pembayaran berhasil', async () => {
        mockInventory.checkStock.mockResolvedValue(true);
        mockPayment.processPayment.mockResolvedValue(true);
        mockInventory.deductStock.mockResolvedValue(true);

        const result = await orderService.checkout('ITEM-01', 150000);
        expect(result.status).toBe('SUCCESS');
        expect(mockInventory.deductStock).toHaveBeenCalledWith('ITEM-01');
    });

    test('2. checkout gagal jika stok barang habis', async () => {
        mockInventory.checkStock.mockResolvedValue(false);

        await expect(orderService.checkout('ITEM-02', 50000)).rejects.toThrow('Stok barang habis');
        expect(mockPayment.processPayment).not.toHaveBeenCalled();
    });

    test('3. checkout gagal jika pembayaran ditolak', async () => {
        mockInventory.checkStock.mockResolvedValue(true);
        mockPayment.processPayment.mockResolvedValue(false);

        await expect(orderService.checkout('ITEM-03', 75000)).rejects.toThrow('Pembayaran gagal');
    });

    test('4. verifikasi pemanggilan checkStock pada inventory', async () => {
        mockInventory.checkStock.mockResolvedValue(true);
        mockPayment.processPayment.mockResolvedValue(true);

        await orderService.checkout('ITEM-04', 10000);
        expect(mockInventory.checkStock).toHaveBeenCalledTimes(1);
    });

    test('5. verifikasi jumlah total parameter pembayaran diteruskan dengan benar', async () => {
        mockInventory.checkStock.mockResolvedValue(true);
        mockPayment.processPayment.mockResolvedValue(true);

        await orderService.checkout('ITEM-05', 250000);
        expect(mockPayment.processPayment).toHaveBeenCalledWith(250000);
    });
});
