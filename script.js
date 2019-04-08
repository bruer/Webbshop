$(function(){

    let products = 
    localStorage.products ? JSON.parse(localStorage.products) : [];

    function loadProducts(){

        $.getJSON('products.json').done(function(data){
            
            let products = data['products'];

            let content = '';

            for(const product of products){

                content += 
                '<div>' + 
                '<h2>' + product.title + '</h2>' + 
                '<img src="' + product.image + '">' + 
                '<p id="price">' + product.price + ':-</p>' + 
                '<p id="description">' + product.description + '</p>' +
                '<button id="buy-btn">Köp</button>' + 
                '</div>';
            }
            
            $('#products').html(content);

        }).fail(function(){

            console.log('cannot load JSON');

        });
    }

    function choseProduct(btn){

        let product = {
            
            title: $(btn).parent().find('h2').html(),
            image: $(btn).parent().find('img').attr('src'),
            price: $(btn).parent().find('#price').html()
        }
        
        products.push(product);
        console.log(products);

        localStorage.products = JSON.stringify(products);
    }

    function addProduct(){

        let content = '';
        
        if(localStorage.length > 0){

            $('#order-text').text('Du har valt');

            for (const product of products){

                localStorage.setItem(product.title, JSON.stringify(product));
            }

            localStorage.removeItem('products');

            for (let i = 0; i < localStorage.length; i++) {

                let product = 
                JSON.parse(localStorage.getItem(localStorage.key(i)));

                content +=
                '<div id="' + product.title + '">' + 
                '<h2>' + product.title + '</h2>' + 
                '<img src="' + product.image + '">' +
                '<input type="number" id="quantity" value="1">' +
                '<p id="price">' + product.price + '</p>' +
                '<p id="sum"></p>' +
                '<button id="remove-btn">Ta bort</button>' +
                '</div>';
            }

            content += '<button id="empty-cart-btn">töm varukorg</button>';

        }
        else {

            message();
        }

        $('#chosen-product').append(content);
    }

    // let sum = 0;

    // function updateProduct(qnt){

    //     let price = $(qnt).next();
    //     console.log(price);
    //     let n = Number(price.html().slice(0, -2));
    //     console.log(n * qnt);
    //     let sum = n;
        
    //     // let s = price.html();
    //     // console.log(s);
    //     // sum += n;
    //     // console.log(sum);
    //     // $(qnt).next().next().html(sum + ':-');
    //     // price.next().html(sum + ':-');
    // }

    function updateProduct(qnt){
    }

    function removeProduct(btn){

        localStorage.removeItem($(btn).parent().attr('id'));

        $(btn).parent().remove();

        if (localStorage.length <= 0) {

            $('#empty-cart-btn').parent().remove();

            message();
        }
    }

    function emptyCart(btn){

        $(btn).parent().remove();
        
        localStorage.clear();
        
        message();
    }

    function submitOrder(){

        if (localStorage.length > 0){

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

    function message(){

        $('#order-text').text('Du har inte valt något');
        $('#order-page').css('justify-content', 'center');
    }

    function validate(){

        switch ($(this).attr('id')) {
            case 'name':
                console.log($(this).attr('id'));
                
                if (!$(this).val().includes(' ')){
                    $(this).siblings('.message').show();
                }
                else {
                    $(this).siblings('.message').hide();
                }
                break;

            case 'phone':
                // console.log(typeof $(this).val());
                let condition = false;
                for (const c of $(this).val()) {
                    // console.log(isNaN(c));
                    if (isNaN(c)){
                        condition = true;
                    }
                }
                console.log(condition);
                if (condition){
                    $(this).siblings('.message').show();
                }
                else {
                    $(this).siblings('.message').hide();
                }
                break;

            case 'email':
                console.log($(this).attr('id'));
                break;

            case 'address':
                console.log($(this).attr('id'));
                break;

            default:
                break;
        }
    }

    $('input[required]').blur(validate);

    $('form').on('submit', function(){
        
        submitOrder();

    });

    $('#products').on('click', '#buy-btn', function(){
        
        choseProduct(this);

    });

    $('#chosen-product').on('click', '#remove-btn', function(){
        
        removeProduct(this);

    });

    $('#chosen-product').on('click', '#quantity', function(){

        // updateProduct(this);
    });

    $('#chosen-product').on('click', '#empty-cart-btn', function(){
        
        emptyCart(this);
    })

    loadProducts();

    addProduct();
});