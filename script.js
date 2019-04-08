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
                '<div>' + 
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

            console.log('cannot load JSON');

        });
    }

    function choseProduct(btn){

        let product = {
            
            title: $(btn).closest('div').find('h2').html(),
            image: $(btn).closest('div').find('img').attr('src'),
            price: $(btn).closest('div').find('#price').html()
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

            $('form').show();

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

            $('form').hide();

            $('#empty-cart-btn').parent().remove();

            message();
        }
    }

    function emptyCart(btn){

        $('form').hide();

        $(btn).parent().remove();
        
        localStorage.clear();
        
        message();
    }

    function submitOrder(){

        if (localStorage.length > 0 && validate()){

            $('#order-page').html('<h1>Tack för din beställning</h1>');
            
            $('#order-page').css('justify-content', 'center');
            
            localStorage.clear();

        }
        else {
            
            $('input[type=submit]').after(
            '<p id="order-btn-message">' +
            'Fyll i samtliga fält för att göra en beställning' +
            '</p>');

        }
    }

    function message(){

        $('#order-text').text('Du har inte valt något');
        $('#order-page').css('justify-content', 'center');
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