// Xử lí trước khi trang web được load
window.onload = function(){
    var giohang_mangsp = JSON.parse(localStorage.getItem('giohang_mang'))
    var tong = 0;
    for(let x of giohang_mangsp){
        tong += parseInt(x.giasp.split(',').join('').split('₫').join('').split('đ').join(''));
    }
    document.getElementById('tong').innerText = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '₫';
}