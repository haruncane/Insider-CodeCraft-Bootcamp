## Code Changes

### addItem() Fonksiyonu

#### Eski Kod
```js
if (product.stock <= quantity) {
    throw new Error('Yetersiz stok!');
}
```

#### Yeni Kod
```js
if (product.stock < quantity) { // <= değiştirildi yerine < geldi.
    throw new Error('Yetersiz stok!');
}

product.stock -= quantity; // stok değerinde azalma olması sağlandı.
```

### removeItem() Fonksiyonu

#### Eski Kod
```js
if (product) {
    product.stock += 1; 
}
```

#### Yeni Kod
```js
if (product) {
    product.stock += item.quantity; // sabit değer item.quantity ile değiştirildi.
}

document.dispatchEvent(new Event('stockUpdate')); // stok değerinin kullanıcıya güncel olarak gösterilmesi sağlandı.
```

### calculateTotal() Fonksiyonu

#### Eski Kod
```js
calculateTotal() {
    this.total = this.items.reduce((sum, item) => {
        return sum + item.price;
    }, 0);

    if (this.discountApplied && this.total > 0) {
        this.total *= 0.1;
    }
}
```

#### Yeni Kod
```js
calculateTotal() {
    //debugger;
    this.total = this.items.reduce((sum, item) => {
        return sum + item.price * item.quantity; // quantity çarpımı eklendi.
    }, 0);

    if (this.discountApplied && this.total > 0) {
        this.total -= 0.1 * this.total; // *= ifadesi -= ile değiştirildi ve yüzdeye total çarpımı eklendi.
    }
}
```

### showError() Fonksiyonu

#### Eski Kod
```js
showError(message) {
    const errorElement = document.getElementById('error');
    if (errorElement) {
        errorElement.textContent += message + '\n';
    }
}
```

#### Yeni Kod
```js
showError(message) {
    const errorElement = document.getElementById('error');
    if (errorElement) {
        errorElement.textContent += message + '\n';
        setTimeout(() => { // timeout fonksiyonu eklenerek hata mesajının kısa süre gösterilip sonrasında kaybolması sağlandı.
            errorElement.textContent = '';
        }, 3000);
    }
}
```