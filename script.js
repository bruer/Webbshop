$(function(){

    function loadProducts(){

        $.getJSON('products.json').done(function(data){
            
            let products = data['products'];

            let content = '';

            for(let i = 0; i < products.length; i++){
                    
                content += '<div>';
                content += '<h2>' + products[i].title + '</h2>';
                content += '<img src="' + products[i].image + '">';
                content += '<p>' + products[i].price + ':-</p>';
                content += '<p>' + products[i].description + '</p>';
                content += '<button id="buy-btn">Köp</button>';
                content += '</div>';
            }
            
            $('#products').html(content);

        }).fail(function(){

            console.log('cannot load JSON');

        });
    }

    function choseProduct(btn){

        let title = $(btn).parent().find('h2').html();
        let image = $(btn).parent().find('img').attr('src');
        
        localStorage.title = title;
        localStorage.image = image;
    }

    function removeProduct(btn){

        $(btn).parent().remove();
        
        $('#order-text').text('Du har inte valt något');

        $('#order-page').css('justify-content', 'center');
        
        localStorage.clear();
    }

    function addProduct(){

        if(localStorage.length > 0){

            $('#order-text').text('Du har valt');

            let chosenProduct =
            '<div>' + 
            '<h2>' + localStorage.title + '</h2>' + 
            '<img src="' + localStorage.image + '">' +
            '<button id="remove-btn">Ta bort</button>' +
            '</div>';
            
            $('#chosen-product').append(chosenProduct);
        }
        else {

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
});