$(function(){

    let products;

    function loadProducts(){
        $.getJSON('products.json').done(function(data){

            products = data['products'];
            console.log(products);
    
        }).fail(function(){
            console.log('d blev fel');
        });
    }

    loadProducts();

    $('#content').on('click', '#products-btn', function(){
        
        $(this).remove();

        let content = '';

        for(let i = 0; i < products.length; i++){
                
            content += '<div>';
            content += '<h2>' + products[i].title + '</h2>';
            content += '<p>price: ' + products[i].price + '</p>';
            content += '<p>' + products[i].description + '</p>';
            content += '</div>'
            content += '<button id="buy-btn">buy</button>';
        }

        $('#products').html(content);
    });

    $('#content').on('click', '#buy-btn', function(){

        if($('#chosen-product')[0].childElementCount <= 0){
            $('#chosen-product').append($(this).prev().html());
        }
    });

    $('header a').on('click', function(e){

        e.preventDefault();
        let url = this.href;
        
        $('#container').remove();
        $('#content').load(url + ' #container');
    });
});