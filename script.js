$(function(){

    function loadProducts(){

        $.getJSON('products.json').done(function(data){
            
            let products = data['products'];

            let content = '';

            for(const product of products){

                content += 
                '<div>' + 
                '<h2>' + product.title + '</h2>' + 
                '<img src="' + product.image + '">' + 
                '<p>' + product.price + ':-</p>' + 
                '<p>' + product.description + '</p>' + 
                '<button id="buy-btn">Köp</button>' + 
                '</div>';
            }
            
            $('#products').html(content);

        }).fail(function(){

            console.log('cannot load JSON');

        });
    }

    let products = 
    localStorage.products ? JSON.parse(localStorage.products) : [];

    function choseProduct(btn){

        let productTitle = $(btn).parent().find('h2').html();
        let productImage = $(btn).parent().find('img').attr('src');

        let product = {
            title: productTitle,
            image: productImage
        }
        
        products.push(product);
        console.log(products);

        localStorage.products = JSON.stringify(products);
    }

    function addProduct(){

        if(localStorage.length > 0){

            $('#order-text').text('Du har valt');

            for (const product of products){

                localStorage.setItem(product.title, JSON.stringify(product));
            }

            localStorage.removeItem('products');

            let content = '';

            for (let i = 0; i < localStorage.length; i++) {

                let product = 
                JSON.parse(localStorage.getItem(localStorage.key(i)));

                content +=
                '<div id="' + product.title + '">' + 
                '<h2>' + product.title + '</h2>' + 
                '<img src="' + product.image + '">' +
                '<button id="remove-btn">Ta bort</button>' +
                '</div>';
            }
            
            $('#chosen-product').append(content);
        }
        else {

            $('#order-text').text('Du har inte valt något');

            $('#order-page').css('justify-content', 'center');
        }
    }

    function removeProduct(btn){

        localStorage.removeItem($(btn).parent().attr('id'));

        $(btn).parent().remove();

        console.log(localStorage.length);

        if (localStorage.length <= 0) {
            
            $('#order-text').text('Du har inte valt något');
            
            $('#order-page').css('justify-content', 'center');
        }
    }

    function submitOrder(){

        if(localStorage.length > 0){

            $('#order-page').html('<h1>Tack för din beställning</h1>');
            
            $('#order-page').css('justify-content', 'center');
            
            localStorage.clear();

        }
        else {
            
            // $('#order-text')
            // .after('<p>Välj en produkt för att göra en beställning</p>');
            alert('Välj en produkt för att göra en beställning');

        }
    }

    $('form').on('submit', function(){
        
        submitOrder();

    });

    $('#products').on('click', '#buy-btn', function(){
        
        choseProduct(this);

    });

    $('#chosen-product').on('click', '#remove-btn', function(){
        
        removeProduct(this);

    });

    loadProducts();

    addProduct();

    var getSandwich = function (useMayo) {
        // var sandwich = 'peanut butter & jelly';
        // if (useMayo) {
        //     sandwich = 'turkey';
        // }
        let sandwich = useMayo ? 'a' : 'b';
        return sandwich;
    };
    // console.log(getSandwich(1));

    // let arr = ['a', 'b', 'c'];
    // console.log(arr);
    // localStorage.arr = arr;
    // console.log(localStorage.arr);
    // arr = arr.toString();
    // console.log(arr.split());
    // console.log(arr.split(','));
});