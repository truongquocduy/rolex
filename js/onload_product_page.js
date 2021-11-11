//JS NÀY CHẠY KHI TRANG CHI TIẾT SẢN PHẨM ĐƯỢC LOAD-- TỨC LÀ product_page.html
window.onload = function(){
    //lấy giá trị từ biến trên localstorage để load vào trang web...vì lí do chỉ có 1 trang chi tiết để hiện thị chung cho tất cả sản phẩm.
    document.getElementById('product_daidien').attributes[0].value = JSON.parse(localStorage.getItem("product_img"));
    document.getElementById('product_title').innerText = JSON.parse(localStorage.getItem("product_title"));
    document.getElementById('product_gia').innerText = JSON.parse(localStorage.getItem("product_gia"));

    //Xứ lí tính tính tổng tiền phái tay trái icon giỏ hàng trên header
    //Nguyên lí: gọi mảng giỏ hàng từ locals, duyệt mảng và tính tổng tiền sau đó kết hợp DOM xuất ra màn hình
    var giohang_mangsp = JSON.parse(localStorage.getItem('giohang_mang'))
    var tong = 0;
    for(let x of giohang_mangsp){
        tong += parseInt(x.giasp.split(',').join('').split('₫').join('').split('đ').join(''));
    }
    document.getElementById('tong').innerText = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '₫';
}