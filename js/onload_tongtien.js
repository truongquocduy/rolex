// Xử lí trước khi trang web được load
/**
 * xử lí phần tự in tổng tiền ngay bên trái giỏ hàng tại hearder -- dùng chung tất cả các trang.
 * Nguyên tắc hoạt động: Trước khi trang web load..tại mảng giỏ hàng trên localstorage duyệt mảng và tính tổng tiền sau đó in ra màn hình
 */
window.onload = function(){
    var giohang_mangsp = JSON.parse(localStorage.getItem('giohang_mang'))//gọi mảng giỏ hàng từ localstorage
    var tong = 0;
    for(let x of giohang_mangsp){
        //do tổng tiền là một chuỗi có chứa kí tự như 'đ' và ',' nên phải loại bỏ trước khi cộng và parseInt chuyển về kiểu int.
        tong += parseInt(x.giasp.split(',').join('').split('₫').join('').split('đ').join(''));
    }
    //gán tổng tiền tính được và Html, có phẩy tại các đơn vị.
    document.getElementById('tong').innerText = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '₫';
}