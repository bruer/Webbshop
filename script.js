$(function(){

    let products;

    function loadProducts(){
        $.getJSON('products.json').done(function(data){
            
            console.log(data);
            products = data['products'];
            console.log(products);

            let content = '';

            for(let i = 0; i < products.length; i++){
                    
                content += '<div>';
                content += '<h2>' + products[i].title + '</h2>';
                content += '<img src="' + products[i].image + '">';
                content += '<p>price: ' + products[i].price + '</p>';
                content += '<p>' + products[i].description + '</p>';
                content += '<button id="buy-btn">buy</button>';
                content += '</div>'
            }
            
            $('#products').html(content);

        }).fail(function(){
            console.log('error');
        });
    }

    loadProducts();

    // $('#content').on('click', '#products-btn', function(){
        
    //     $(this).remove();

    //     let content = '';

    //     for(let i = 0; i < products.length; i++){
                
    //         content += '<div>';
    //         content += '<h2>' + products[i].title + '</h2>';
    //         content += '<p>price: ' + products[i].price + '</p>';
    //         content += '<p>' + products[i].description + '</p>';
    //         content += '</div>'
    //         content += '<button id="buy-btn">buy</button>';
    //     }

    //     $('#products').html(content);
    // });

    let chosenProduct = '';

    $('#content').on('click', '#buy-btn', function(){

        // if($('#chosen-product')[0].childElementCount <= 0){
        //     $('#chosen-product').append($(this).prev().html());
        // }
        console.log($(this).siblings());
        localStorage.chosenProduct = $(this).prev().html();
    });

    localStorage.name = 'fred';
    localStorage.age = '1';
    
    // console.log(localStorage.chosenProduct);
    $('#chosen-product').append(localStorage.chosenProduct);
});