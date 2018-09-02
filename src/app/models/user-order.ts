export class UserOrder {
    datePlaced: '';
    items: '';
    shippingAddress: '';
    userId: '';
    key: '';

constructor(datePlaced, items, shippingAddress, userId, key) {
    this.datePlaced = datePlaced;
    this.items = items;
    this.shippingAddress = shippingAddress;
    this.userId = userId;
    this.key = key;
}
}
