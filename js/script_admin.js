/**
 * phương thức khi click thêm sản phẩm
 * Vì các phần được viết trên cùng một trang nên nếu addproduct xuất hiện thì các phần còn lại ẩn đi và ngược lại
 */
function clickadd(){
    document.getElementById('addproduct').style.display = 'block';
    document.getElementById('products').style.display = 'none';
    document.getElementById('khachhang').style.display = 'none';

}
function clickproduct(){
    document.getElementById('addproduct').style.display = 'none';
    document.getElementById('products').style.display = 'block';
    document.getElementById('khachhang').style.display = 'none';

}
function clickcustomer(){
    document.getElementById('addproduct').style.display = 'none';
    document.getElementById('products').style.display = 'none';
    document.getElementById('khachhang').style.display = 'block';
}

// Xử lí phần xem kết quả khi nhập form đăng sản phẩm
function xemketqua(){
    document.getElementById('phanketquahienthi').style.display = 'block';// hiển thị khung kết quả
    var form__addproduct =document.getElementById('addproduct__form');
    //tên sản phẩm gán giá trị của ten từ form__addproduct và in hoa
    document.getElementById('title__ketqua').innerText = (form__addproduct.ten.value).toLocaleUpperCase();
    //mã sản phẩm gán giá trị ma từ form
    document.getElementById('ma__ketqua').innerText = form__addproduct.ma.value;
    //giá gán giá trị gia từ form sau đó cứ mỗi phân đơn vị cứ 3 chữ số tính từ phải vào có dấu phẩy + 'đ'
    document.getElementById('gia__ketqua').innerText = (form__addproduct.gia.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' ₫';
    //Hình sản phẩm gán một img có src lấy từ form
    document.getElementById('hinh__ketqua').attributes[0].value = "../img/sanpham/" + document.getElementById("hinhanh_input").files[0].name;
}

    
    //Tạo sản phẩm đối tượng
    var sp1 = {
        masp: "DH01",
        tensp: "CARTIER W6920071 BALLON BLEU DE CERTIER WATCH",
        hinhsp: "../img/sanpham/sp1.jpg",
        giasp: "156,980,000 ₫",
        danhmuc: "omega"
    }
    var sp2 = {
        masp: "DH02",
        tensp: "MICHAEL KORS BRECKEN CHRONOGRAPH WATCH 44MM",
        hinhsp: "../img/sanpham/sp2.jpg",
        giasp: "6,470,000 ₫",
        danhmuc: "casio"
    }
    var sp3 = {
        masp: "DH03",
        tensp: "OMEGA DE VILLE PRESTIGE WATCH 39.5MM",
        hinhsp: "../img/sanpham/sp3.jpg",
        giasp: "119,000,000 ₫",
        danhmuc: "movado"
    }
    var sp4 = {
        masp: "DH04",
        tensp: "BULOVA MARINE STAR DIAMOND WATCH 32 MM",
        hinhsp: "../img/sanpham/sp4.jpg",
        giasp: "12,530,000 ₫",
        danhmuc: "omega"
    }
    var sp5 = {
        masp: "DH05",
        tensp: "MOVADO MUSEUM 70TH ANNIVERSARY SPECIAL EDITION WATCH 35MM",
        hinhsp: "../img/sanpham/sp5.jpg",
        giasp: "8,330,000 ₫",
        danhmuc: "movado"
    }
    var sp6 = {
        masp: "DH06",
        tensp: "LONGINES MASTER WATCH 38.5MM",
        hinhsp: "../img/sanpham/sp6.jpg",
        giasp: "75,640,000 ₫",
        danhmuc: "rolex"
    }
    //---------------------------------------------------------------------


    //nếu trên localstorage không có biến sanphammoi_array thì tạo một biến trên localstorage để chứa sản phẩm
    // vì nếu không đặt trong if thì cứ mỗi lần load trang thì sản phẩm cũ sẽ mất hết vì reset lại code là một mảng rỗng
    
    if(JSON.parse(localStorage.getItem('sanphammoi_array')) == undefined){
        localStorage.setItem('sanphammoi_array',JSON.stringify([sp1,sp2,sp3,sp4,sp5,sp6]))// mặc định tự tạo 6 sản phẩm có sẳn
    }

var sale = ""
//nếu thẻ selecttion có sự thay đổi về giá trị và bằng 'sale' thì biến sale được ghi đè..nhằm phục vụ cho function ở dưới
document.getElementById('sale').onchange = function(){
    sale = "sale";
}
/**
 * Phương thức khi nhấn nút đăng sản phẩm
 */
function dangsanpham(){
    var localcu = JSON.parse(localStorage.getItem('sanphammoi_array'))
    var danhmuc = document.getElementById('danhmuc');
    const sanpham = {
        masp: document.getElementById('ma__ketqua').innerText,// DOM từ trang admin_page.html, mã sản phẩm
        tensp: document.getElementById('title__ketqua').innerText,// DOM từ trang admin_page.html, tên sản phẩm
        hinhsp: document.getElementById('hinh__ketqua').attributes[0].value,// DOM từ trang admin_page.html, hình sản phẩm
        giasp: document.getElementById('gia__ketqua').innerText,// DOM từ trang admin_page.html, giá sản phẩm
        danhmuc: danhmuc.options[danhmuc.selectedIndex].value,// DOM từ trang admin_page.html, danh mục sản phẩm
        sale // DOM từ trang admin_page.html, sale = sale;
    }
    localcu.push(sanpham);// push đối tượng sản phẩm vào mảng localcu (localstorage Cũ), sau đó update lại biến sản phẩm trên local, nhằm xử lí cho các function sau này.
    localStorage.setItem('sanphammoi_array',JSON.stringify(localcu))
    loadkhungsanpham();//sau đó phải load lại bảng sản phẩm
}
var table = document.getElementById('caibang')
/**
 * phương thức load tất cả sản phẩm đã đăng ra bảng sản phẩm để admin dễ quản lí kho
 */
loadkhungsanpham = () => {
    //đầu tiên phải xóa tất cả các dòng trong bảng, nếu không cứ đăng sản phẩm sẽ cứ load lại các sản phẩm đã load
    var mangsp = JSON.parse(localStorage.getItem('sanphammoi_array'))//lấy mảng sản phẩm từ local
    for (var i = table.rows.length - 1; i > 0; i--) {
      table.deleteRow(i);
    }
        //xuất bảng
        for (let i = 0; i < mangsp.length; i++) {
            row = table.insertRow();
            cell1 = row.insertCell();
            cell1.innerHTML = '<img src="' + mangsp[i].hinhsp + '" style="width: 50px;">';
            cell2 = row.insertCell();
            cell2.innerText = mangsp[i].tensp;
            cell3 = row.insertCell();
            cell3.innerText = mangsp[i].masp;
            cell4 = row.insertCell();
            cell4.innerText = mangsp[i].giasp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            cell5 = row.insertCell();
            cell5.innerText = mangsp[i].danhmuc;
            cell6 = row.insertCell();
            cell6.innerHTML ='<button type="button" class="btn btn-danger" onclick="xoasp('+ i +');">Xóa</button>';
        }
    }
    
/**
 * Phương thức khi nhất nút xóa sản phẩm
 * tại vị trí đưa vào, xóa sản phẩm tại vị trí đó của mảng sản phẩm, sau đó update lại mảng sản phẩm trên local và load lại bảng sản phẩm
 */

xoasp= (vitri) => {
    var mangsp = JSON.parse(localStorage.getItem('sanphammoi_array'))
    mangsp.splice(vitri,1);
    localStorage.setItem('sanphammoi_array',JSON.stringify(mangsp))
    loadkhungsanpham();
}


//----------------------------------------------------------------------------------------
//XỬ LÍ PHẦN KHÁCH HÀNG
var khachhang = {
    tenkh: 'Trương Quốc Duy',
    email: 'quocduy13579113@gmail.com',
    diachi: 'Thành phố Bạc Liêu',
    sdt: '0369082061',
    sanpham: [
        {
            "hinhsp": "../img/sanpham/sp1.jpg",
            "giasp": "156,980,000 ₫",
            "tensp": "CARTIER W6920071 BALLON BLEU DE CERTIER WATCH"
        },
        {
            "hinhsp": "../img/sanpham/sp3.jpg",
            "giasp": "119,000,000 ₫",
            "tensp": "OMEGA DE VILLE PRESTIGE WATCH 39.5MM"
        },
    ],
}
// code dưới đây chỉ chạy một lần trên máy tính để tạo biến lưu mảng trên localstore
if(JSON.parse(localStorage.getItem('khachhang_array')) == undefined){
    localStorage.setItem('khachhang_array',JSON.stringify([khachhang]))
}



/**
 * phương thức load tất cả thông tin khách hàng đã mua hàng
 */
function loadkhungkhachhang(){
    
    var tablekh = document.getElementById('bangkhachhang')
    var mangkhachhang = JSON.parse(localStorage.getItem('khachhang_array'))//lấy mảng sản phẩm từ local

    //đầu tiên phải xóa tất cả các dòng trong bảng, cứ load trang thì bảng khách hàng sẽ load thêm giá trị đã load

    for (var i = tablekh.rows.length - 1; i > 0; i--) {
      tablekh.deleteRow(i);
    }
        //xuất bảng
        for (let i = 0; i < mangkhachhang.length; i++) {
            let row = tablekh.insertRow();
            let cell1 = row.insertCell();
            cell1.innerHTML = i+1;
            let cell2 = row.insertCell();
            cell2.innerText = mangkhachhang[i].tenkh;
            let cell3 = row.insertCell();
            cell3.innerText = mangkhachhang[i].sdt;
            let cell4 = row.insertCell();
            cell4.innerText = mangkhachhang[i].sanpham.length + ' sản phẩm';
            let cell5 = row.insertCell();
            cell5.innerHTML = '<button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="loadkhungchitiet('+ i +')">Xem</button>';
            let cell6 = row.insertCell();
            cell6.innerHTML ='<button type="button" class="btn btn-danger" onclick="xoakh('+ i +');">Xóa</button>';
        }
}
    loadkhungkhachhang()

    //Phương thức xóa khách hàng...tương tự xóa sản phẩm
    function xoakh(vitri){
        var mangkhachhang = JSON.parse(localStorage.getItem('khachhang_array'))
        mangkhachhang.splice(vitri,1);
        localStorage.setItem('khachhang_array',JSON.stringify(mangkhachhang))
        loadkhungkhachhang();
    }

    /**
     * Phương thức load khi bấm vào xem chi tiết sản phẩm
     * @param {vitri} vitri 
     */
    function loadkhungchitiet(vitri){
        var tablekh = document.getElementById('bangchitiet')
        //đầu tiên phải xóa tất cả các dòng trong bảng, nếu không cứ đăng sản phẩm sẽ cứ load lại các sản phẩm đã load
        var mangkhachhang = JSON.parse(localStorage.getItem('khachhang_array'))//lấy mảng sản phẩm từ local
        document.getElementById('tenchitiet').innerText = mangkhachhang[vitri].tenkh
        document.getElementById('sdtchitiet').innerText = mangkhachhang[vitri].sdt
        document.getElementById('diachichitiet').innerText = mangkhachhang[vitri].diachi
        document.getElementById('gmailchitiet').innerText = mangkhachhang[vitri].email
        
        mangkhachhang = mangkhachhang[vitri].sanpham
        console.log(mangkhachhang)
        for (var i = tablekh.rows.length - 1; i > 0; i--) {
          tablekh.deleteRow(i);
        }
            //xuất bảng
            for (let i = 0; i < mangkhachhang.length; i++) {
                let row = tablekh.insertRow();
                let cell1 = row.insertCell();
                cell1.innerHTML = '<img src="' + mangkhachhang[i].hinhsp + '" style="width: 50px;">'
                let cell2 = row.insertCell();
                cell2.innerText = mangkhachhang[i].tensp;
                let cell3 = row.insertCell();
                cell3.innerText =  mangkhachhang[i].giasp;
            }
    }





    

