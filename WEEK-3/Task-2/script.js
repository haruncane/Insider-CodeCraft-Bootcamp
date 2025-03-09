$(document).ready(function () {
    const init = () => {
        buildCss();
        getProducts();
    }

    const getProducts = () => {
        $("#listProducts").one("click", () => {
            $.get({
                url: "./products.json",
                dataType: "json",
                success: function (response) {
                    buildHtml(response);
                },
                error: function (error) {
                    alert(error.message);
                },
            });
        });
    }
    const buildCss = () => {
        $('<style>').html(`
           .product-card {
               border: 2px solid #fff;
               border-radius: 10px;
               margin: 10px;
               width: 200px;
               height: 200px;
               background-color: #000;
               box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
           }

            .product-card a {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
                text-decoration: none;
                color: #fff;
            }
        `).addClass('product-style').appendTo('head');
    }

    const buildHtml = (response) => {
        response.forEach(product => {
            const { name, price, link } = product;
            let productCard = `<article class="product-card">
                <a href="${link}">
                    <h3>${name}</h3>
                    <p>${price}</p>
                </a>
            </article>`;
            $("#products").append(productCard);
        });
    }

    init();
});