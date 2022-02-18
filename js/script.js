CONNECT_ADMIN = "admin";
CONNECT_PASSWORD_ADMIN = "123456";
CONNECT_CUSTOMER = "khachhang";
CONNECT_PASSWORD_CUSTOMER = "123456";

//Xứ lí phần đăng nhập ---------------------------------------------------------------
/**
 * Khi người dùng click vào đăng nhập khung đăng nhập sẽ hiện thị
 * Ngược lại khi click vào close, khung đăng nhập sẽ ẩn đi
 */
function clickdangnhap(){
    document.getElementById('khungdangnhap').style.display = 'block';
}
function closedangnhap(){
    document.getElementById('khungdangnhap').style.display = 'none';
}
/**
 * Khi người dùng click đăng nhập form_check sẽ kích hoạt
 */
form_check = () => {    
    var frm = document.getElementById('dangnhap_form');// lấy thẻ form đăng nhập
    //Kiểm tra có đúng như tài khoản hoặc mật khẩu hay không, nếu đùng thì ẩn khung đăng nhập
    if(frm.account.value == CONNECT_ADMIN){
        if(frm.password.value == CONNECT_PASSWORD_ADMIN){
            alert('Bạn là admin !!!') 
            document.getElementById('khungdangnhap').style.display = 'none';
            window.location.href = '../html/admin_page.html' //Chuyển sang trang admin_page.html 
        }
        else{
            document.getElementById('check_account').innerText = 'Tài khoản hoặc mật khẩu đăng nhập sai';// ngược lại thông báo sai tài khoản.
        }
    }
    // Kiểm tra xem đúng tài khoản khách hàng không
    if(frm.account.value == CONNECT_CUSTOMER){
        if(frm.password.value == CONNECT_PASSWORD_CUSTOMER){
            alert('Bạn là khách hàng !!!')
            window.location.href = '../html/giohang.html' //Chuyển sang trang giohang.html 
        }
        else{
            document.getElementById('check_password').innerText = 'Tài khoản hoặc mật khẩu đăng nhập sai';
        }
    }
    else{
        document.getElementById('check_password').innerText = 'Tài khoản hoặc mật khẩu đăng nhập sai';
    }

    return false;
}


//---------------------------------------------------------------------------------------------
/**
 * Phương thức xử lí khi khách hàng nhấn vào sản phẩm
 * @param {*} id -- đưa id sản phẩm vào
 */
function clicksanpham(id){
    var childrens = document.getElementById(id).children;// truy xuất đến thẻ chứ sản phẩm để lấy thẻ con.
    localStorage.setItem("product_img",JSON.stringify(childrens[0].attributes[0].value))// lưu giá trị thuộc tính đầu tiền của thẻ con đầu tiên là src của img lưu vào biến product_img lưu trên localstorage
    localStorage.setItem("product_title",JSON.stringify(childrens[1].innerText))// lưu tên sản phẩm vào localstorage
    localStorage.setItem("product_gia",JSON.stringify(childrens[2].innerText))// lưu giá sản phẩm vào localstorage
    window.location.href = '../html/product_page.html' //Chuyển sang trang product_page.html
    //Phần code còn lại được viết bên trong file product_page.html để khi load trang mới cập nhật thông tin. 
}
//----------------------------------------------------------------------------------------------
/**
 * Phướng thức xử lí lọc sản phẩm theo danh mục
 * Tham số đưa vào là giá trị của từng danh mục
 * ví dụ loai = 'casio'
 */
locsp = (loai) => {// loai = casio
    var sanpham = document.getElementsByClassName('sp');
    // vòng lặp đầu tiên sẽ cho tất cả các sản phẩm ẩn đi hết
    for(let x of sanpham){
        x.style.display = "none";
    }
    var sanphamloc = document.getElementsByClassName('sp ' + loai);
    //vòng lặp thứ hai sẽ cho những sản phẩm có class chứa 'sp casio' như  ví dụ hiển thị trở lại
    for(let x of sanphamloc){
        x.style.display = "block";
    }
    //Nếu tham số đưa vào là tất cả thì cho tất cả những div chứ sp hiển thị trở lại
    if(loai == "tatca"){
        for(let x of sanpham){
            x.style.display = "block";
        }
    }
}
//--------------------------------------------------------------------
//xử lí phần thêm giỏ hàng
// if này được viết ra và chạy duy nhất một lần trên máy tính để đảm báo có một mảng được lưu trên localstorage, vì nếu không đặt trong if mỗi lần load trang web dữ liệu sẽ bị reset lại mảng rỗng.
if(JSON.parse(localStorage.getItem('giohang_mang')) == undefined){
    localStorage.setItem('giohang_mang',JSON.stringify([]))
}   
/**
 * phương thức thêm sản phẩm vào giỏ hàng.
 */
addgiohang = () => {
    var giohangcu = JSON.parse(localStorage.getItem('giohang_mang'))// lấy biến giohang_mang trên localstorage về để push sản phẩm vừa thêm giỏ hàng vào
    const sanpham = {
        hinhsp: document.getElementById('product_daidien').attributes[0].value,
        giasp: document.getElementById('product_gia').innerText,
        tensp: document.getElementById('product_title').innerText
    }
    
    giohangcu.push(sanpham)// push sản phẩm mới vào giỏ hàng
    localStorage.setItem('giohang_mang',JSON.stringify(giohangcu))// sau khi push thì update lại giohang_mang trên localstorage
}
//---------------------------------------------------------------------
// xử lí tìm kiếm sản phẩm
var number_click_search = 1;
/**
 * phương thức click vào icon search
 */
function click_search(){
    if(number_click_search%2 == 0){// nếu number_click_search là số chẳn, thì ẩn form tìm kiếm
        document.getElementById('khungtimkiem').style.display = 'none';
        number_click_search++;
    }
    else{// ngược lại là số lẻ, thì hiển form tìm kiếm
        document.getElementById('khungtimkiem').style.display = 'block';
        number_click_search++;
    }
}

var search_input = document.getElementById('search_input');// lấy ra thẻ input search
// khi nhập một kí tự vào search_input sẽ chạy function bên dưới
search_input.oninput = function(){  
    var mangsp = JSON.parse(localStorage.getItem('sanphammoi_array'))// lấy mảng sản phẩm mà admin đăng lên bán
    var noidung_search = search_input.value.toLocaleUpperCase();// bởi vì sản phẩm bán đề là chữ hoa, nên khi người dùng nhập kí tự phải chuyển về dang Hoa để so sánh.
    var mangketqua_search = []// khai báo mảng kết quả
    //chạy vòng lặp for duyệt mảng sản phẩm
    for(let x of mangsp){
        if(x.tensp.includes(noidung_search)){// nếu phần tử sản phẩm nào có tensp chứ bất kì kí tự nào mà người dùng nhập sẽ được push vào mảng kết quả
            mangketqua_search.push(x);
        }
    }
    
    document.getElementById('ketqua_search').innerText = '';//sau đó phần kết quả phải được reset để tránh mỗi lần lập thì cứ lặp kết quả đế nổi dài vô tận
    //một vòng lặp for chạy quanh mảng kết quả, tạo ra Node Elements.
    for(let x of mangketqua_search){
        let nodecha = document.createElement("DIV");// tạo thẻ div
        nodecha.className = "bg-light mt-1 sp_search w-100 pr-1"; // tạo class cho thẻ div có liên quan đến bootstrap 4
        nodecha.id = x.masp + '_search';// tạo id theo mã sản phẩm + _search để khi click vào sản phẩm có thể chạy function clicksanpham(id)
        nodecha.setAttribute('style',"box-shadow: 0px 0px 10px 1px black;border-radius:5px;animation: sp_search_animetion linear .4s forwards;");//tạo css
        nodecha.setAttribute('onclick',"clicksanpham('"+ x.masp + '_search' +"')");// tạo thuộc tính onclick vơi tham số chính là id sản phẩm

        let nodecon_img = document.createElement("IMG"); // tạo thẻ img
        nodecon_img.setAttribute('src',x.hinhsp);// value src chính là dẫn chứ hình ảnh
        nodecon_img.style = 'float: left;'// css cho  thẻ img
        nodecon_img.setAttribute('height','70px')

        let nodecon_title = document.createElement("H4") // tạo thẻ h4
        nodecon_title.setAttribute('style',"color: #334862;font-family: Arial, Helvetica, sans-serif;font-size: 14px;") // css cho thẻ h4
        nodecon_title.className = "ml-3 mt-2";// thuộc tính của bootstrap
        nodecon_title.innerText = x.tensp;// điền tên sản phẩm vào thẻ h4

        let nodecon_gia = document.createElement("h4");// tạo thẻ h4
        nodecon_gia.setAttribute('style',"color: #334862;font-family: Arial, Helvetica, sans-serif;font-size: 14px;") // css thẻ h4
        nodecon_gia.className = "ml-3 mt-2";
        nodecon_gia.innerText = x.giasp;// điền giá sản phẩm vào thẻ h4

        nodecha.appendChild(nodecon_img);// đẩy thẻ img vào thẻ div
        nodecha.appendChild(nodecon_title);// đẩy thẻ h4 chứa tên sản phẩm vào div
        nodecha.appendChild(nodecon_gia);// đẩy thẻ h4 chứa giá sản phẩm vào div
        document.getElementById('ketqua_search').appendChild(nodecha);// tại ketqua_search bên file html đẩy thẻ div vào
        /**
         * tạo được một thẻ div có cấu trúc như sau
         * <div class="bg-light mt-1 sp_search w-100 pr-1" id="DH01_search" style="box-shadow: 0px 0px 10px 1px black;border-radius:5px;animation: sp_search_animetion linear .4s forwards;" onclick="clicksanpham('DH01_search')">
         *    <img src="../img/sanpham/sp1.jpg" height="70px" style="float: left;">
         *    <h4 style="color: #334862;font-family: Arial, Helvetica, sans-serif;font-size: 14px;" class="ml-3 mt-2">CARTIER W6920071 BALLON BLEU DE CERTIER WATCH</h4>
         *    <h4 style="color: #334862;font-family: Arial, Helvetica, sans-serif;font-size: 14px;" class="ml-3 mt-2">156,980,000 ₫</h4>
         * </div>
         */

    }
    // trường hợp người dùng xóa form tìm kiếm đến trống kí tự thì thẻ chứa kết qua search sẽ trống element bởi vì nếu không làm vậy. khi không còn kí tự vẫn hiện thị kết quả search lúc ban đầu
    if( search_input.value == ""){
        document.getElementById('ketqua_search').innerText = '';
    }     
   
}
//----------------------------------------------------------------------------------------
    //xử lí phần sale
    // sau 3 giây kể từ khi load trang index.html, sẽ xuất hiện một thông báo giảm giá chạy từ gốc dưới bên phải màn hình trượt lên theo trục y
    setTimeout(function(){
        document.getElementById('sale').style.animation = 'sale linear 1s forwards'
    },3000)
    // sau 10 giây kể từ khi load trang index.html hay 7 giây kể từ lúc đã xuất hiện thông báo sale , thì sẽ ẩn khung sale, khách hàng nào nhanh tay click vào khung sale sẽ nhận được mã giảm giá 50%
    setTimeout(function(){
        document.getElementById('sale').style.animation = 'saleoff linear 1s forwards'
    },10000)
//----------------------------------------------------------------------------------------

//xử lí phần thanh toán có gửi mail

    document.getElementById('maqr').style.display = 'none'// ẩn phẩm mã QR

    /**
     * Phương thức khi nhấn tiến hành đặt hàng
     */
    function tienhanhdathang(){
        document.getElementById('tongthanhtoan').innerText = document.getElementById('tongtien').innerText // thẻ tổng thanh toán trong phần khung nhập thông tin thanh toán là số tổng tiền ban đầu
        document.getElementById('khungthanhtoan').style.display = 'block'// khung thanh toán hiển thị
        

    }
    /**
     * Phương thức xử lí khi close bảng nhập thông tin thanh toán
     */
    function closethanhtoan(){
        document.getElementById('khungthanhtoan').style.display = 'none'
    }
    
    document.getElementById('momo').onclick = function(){
        document.getElementById('maqr').style.display = 'block'
    }
    document.getElementById('tienmat').onclick = function(){
        document.getElementById('maqr').style.display = 'none'
    }

    
