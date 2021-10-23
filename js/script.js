CONNECT_ACCOUNT = "admin";
CONNECT_PASSWORD = "123456";

//Xứ lí phần đăng nhập
function clickdangnhap(){
    document.getElementById('khungdangnhap').style.display = 'block';
}
function closedangnhap(){
    document.getElementById('khungdangnhap').style.display = 'none';
}
function form_check(){
    var frm = document.getElementById('dangnhap_form');
    if(frm.account.value == CONNECT_ACCOUNT){
        document.getElementById('check_account').innerText = '';
        result_account = true;
    }
    else{
        document.getElementById('check_account').innerText = 'Tài khoản đăng nhập sai';
        result_account = false;
    }
    if(frm.password.value == CONNECT_PASSWORD){
        document.getElementById('check_password').innerText = '';
        result_password = true;
    }
    else{
        document.getElementById('check_password').innerText = 'Mật khẩu đăng nhập sai';
        result_password = false;
    }
    if(result_account == true && result_password == true){
        alert('Bạn là admin !!!') 
        document.getElementById('khungdangnhap').style.display = 'none';
    }
}


//---------------------------------------------------------------------------------------------
//xử lí nhấn xem sản phẩm
function clicksanpham(id){
    var childrens = document.getElementById(id).children;
    localStorage.setItem("product_img",JSON.stringify(childrens[0].attributes[0].value))
    localStorage.setItem("product_title",JSON.stringify(childrens[1].innerText))
    localStorage.setItem("product_gia",JSON.stringify(childrens[2].innerText))
    window.location.href = '../html/product_page.html' //Chuyển sang trang product_page.html 
}