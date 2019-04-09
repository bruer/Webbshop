$(function(){

    let checkName = false, 
        checkPhone = false, 
        checkEmail = false, 
        checkAddress = false;

    let products = 
    localStorage.products ? JSON.parse(localStorage.products) : [];

    function loadProducts(){

        $.getJSON('products.json').done(function(data){
            
            let products = data['products'];

            let content = '';

            for(const product of products){

                content += 
                '<div class="product">' + 
                '<h2>' + product.title + '</h2>' + 
                '<img src="' + product.image + '">' + 
                '<p id="price">' + product.price + ':-</p>' + 
                '<p id="description">' + product.description + '</p>' +
                '<a href="order.html">' + 
                '<button id="buy-btn">Köp</button>' + 
                '</a>' +
                '</div>';
            }
            
            $('#products').html(content);

        }).fail(function(){

            alert('cannot load JSON');

        });
    }

    function choseProduct(btn){

        let product = {
            
            title: $(btn).closest('div').find('h2').html(),
            image: $(btn).closest('div').find('img').attr('src'),
            price: $(btn).closest('div').find('#price').html()
        }
        
        products.push(product);

        localStorage.products = JSON.stringify(products);
    }

    function addProduct(){

        let content = '<div id="basket">';
        
        if(localStorage.length > 0){

            content += '<button id="empty-cart-btn">Töm varukorg</button>';
            
            content += '<div id="chosen-products">';

            $('#order-text').text('Du har valt');

            for (const product of products){

                localStorage.setItem(product.title, JSON.stringify(product));
            }

            localStorage.removeItem('products');

            for (let i = 0; i < localStorage.length; i++) {

                let product = 
                JSON.parse(localStorage.getItem(localStorage.key(i)));

                content +=
                '<div class="product" id="' + product.title + '">' + 
                '<h2>' + product.title + '</h2>' + 
                '<img src="' + product.image + '">' +
                // '<input type="number" id="quantity" value="1">' +
                '<p id="price">' + product.price + '</p>' +
                // '<p id="sum"></p>' +
                '<button id="remove-btn">Ta bort</button>' +
                '</div>';
            }

            content += '</div></div>';

            $('form').show();

        }
        else {

            $('#order-text').text('Du har inte valt något');
            $('#order-page').css('justify-content', 'center');

        }

        $('#order-page').find('#order-text').after(content);
        
    }

    function removeProduct(btn){

        localStorage.removeItem($(btn).parent().attr('id'));

        $(btn).parent().remove();

        if (localStorage.length <= 0) {

            $('form').hide();

            $('#empty-cart-btn').parent().remove();

            $('#order-text').text('Du har inte valt något');
            $('#order-page').css('justify-content', 'center');
        }
    }

    function emptyCart(btn){

        $('form').hide();

        $(btn).parent().remove();
        
        localStorage.clear();
        
        $('#order-text').text('Du har inte valt något');
        $('#order-page').css('justify-content', 'center');
    }

    function submitOrder(){

        if (validate()){

            $('#order-page').html('<h1>Tack för din beställning</h1>');
            
            $('#order-page').css('justify-content', 'center');
            
            localStorage.clear();

        }
        else {

            $('#order-btn').siblings('.message').show();

        }
    }

    function validate(){

        let letters = /^[A-Öa-ö]+$/;
        let numbers = /^[0-9]+$/;

        switch ($(this).attr('id')) {
            
            case 'name':
                
                if ($(this).val().includes(' ') &&
                    !$(this).val().startsWith(' ') &&
                    !$(this).val().endsWith(' ')){

                    checkName = true;

                    $(this).siblings('.message').hide();

                }
                else {

                    checkName = false;

                    $(this).siblings('.message').show();

                }
                break;

            case 'phone':

                let number = $(this).val();

                if (number.match(numbers) && number.length >= 6){

                    checkPhone = true;

                    $(this).siblings('.message').hide();

                }
                else {

                    checkPhone = false;

                    $(this).siblings('.message').show();

                }
                break;

            case 'email':

                if ($(this).val().includes('@') &&
                    !$(this).val().startsWith('@') &&
                    !$(this).val().endsWith('@')){

                    checkEmail = true;
    
                    $(this).siblings('.message').hide();

                }
                else {

                    checkEmail = false;

                    $(this).siblings('.message').show();

                }
                break;

            case 'address':
                
                if ($(this).val().includes(' ')){

                    let street = $(this).val().split(' ')[0];
                    let house = $(this).val().split(' ')[1];
    
                    if (street.match(letters) && house.match(numbers)){

                        checkAddress = true;

                        $(this).siblings('.message').hide();

                    }
                    else {

                        checkAddress = false;

                        $(this).siblings('.message').show();

                    }
                }

                else {

                    checkAddress = false;

                    $(this).siblings('.message').show();

                }
                break;

            default:
                break;
        }

        return checkName && checkPhone && checkEmail && checkAddress;

    }

    $('input[required]').blur(validate);

    $('form').on('submit', function(e){

        e.preventDefault();
        
        submitOrder();

    });

    $('#products').on('click', '#buy-btn', function(){
        
        choseProduct(this);

    });

    $('#order-page').on('click', '#remove-btn', function(){
        
        removeProduct(this);

    });

    $('#order-page').on('click', '#quantity', function(){

        // updateProduct(this);

    });

    $('#order-page ').on('click', '#empty-cart-btn', function(){
        
        emptyCart(this);
    })

    loadProducts();

    addProduct();
});