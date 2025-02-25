let user = {}

user.name = prompt("Adınız Nedir?");
user.age = prompt("Yaşınız kaç?")
user.job = prompt("Mesleğiniz Nedir?");

let cart = [];

function addProduct() {
    let product = {}

    product.name = prompt("Ürünün Adı Nedir?");

    if (!product.name || product.name.trim() === "") {
        alert("Geçersiz Ürün Adı");
        return;
    }

    product.price = parseFloat(prompt("Ürünün Fiyatı Nedir?"));

    if (isNaN(product.price) || product.price <= 0) {
        alert("Geçersiz Fiyat");
        return;
    }

    alert(product.name + " ürünü sepete eklendi. Fiyat: " + product.price + " TL");

    cart.push(product);
}

function removeProduct() {
    let productName = prompt("Silinecek ürünün adı nedir?");

    if (!productName || productName.trim() === "") {
        alert("Geçersiz Ürün Adı");
        return;
    }

    let index = cart.findIndex(product => product.name === productName);

    if (index === -1) {
        alert(productName + " ürünü sepetinizde bulunmuyor.");
        return;
    }

    cart.splice(index, 1);

    alert(productName + " ürünü sepetten silindi.");
}

function listCart() {
    if (cart.length === 0) {
        alert("Sepetiniz boş!");
        return;
    }

    const cartList = cart.map(product => `${product.name} - ${product.price} TL`).join("\n");

    alert("Sepeniniz:\n" + cartList);
}

function totalPrice() {
    let total = cart.reduce((acc, product) => acc + product.price, 0);

    if (cart.length === 0) {
        return;
    }

    alert("Toplam Fiyat: " + total + " TL");
}

if (!user.name || user.name.trim() === "" || !user.age || isNaN(user.age) || user.age <= 0 || !user.job || user.job.trim() === "") {
    alert("Geçersiz Bilgi");

} else {
    let userInfo = "Adınız: " + user.name + ", Yaşınız: " + user.age + ", Mesleğiniz: " + user.job;
    alert("Kullanıcı Bilgileri: " + userInfo);

    while (confirm("Sepete ürün eklemek istiyor musunuz?")) {
        addProduct();
    }
    
    listCart();
    
    totalPrice();
    
    if (cart.length > 0 && confirm("Sepetten ürün silmek istiyor musunuz?")) {
        removeProduct();
        listCart();
        totalPrice();
    }
}   