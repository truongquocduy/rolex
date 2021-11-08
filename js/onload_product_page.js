window.onload = function(){
    document.getElementById('product_daidien').attributes[0].value = JSON.parse(localStorage.getItem("product_img"));
    document.getElementById('product_title').innerText = JSON.parse(localStorage.getItem("product_title"));
    document.getElementById('product_gia').innerText = JSON.parse(localStorage.getItem("product_gia"));

    var giohang_mangsp = JSON.parse(localStorage.getItem('giohang_mang'))
    var tong = 0;
    for(let x of giohang_mangsp){
        tong += parseInt(x.giasp.split(',').join('').split('₫').join('').split('đ').join(''));
    }
    document.getElementById('tong').innerText = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '₫';
}