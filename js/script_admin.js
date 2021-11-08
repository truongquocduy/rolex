/**
 * phương thức khi click thêm sản phẩm
 * Vì các phần được viết trên cùng một trang nên nếu addproduct xuất hiện thì các phần còn lại ẩn đi và ngược lại
 */
function clickadd(){
    document.getElementById('addproduct').style.display = 'block';
    document.getElementById('products').style.display = 'none';
}
function clickproduct(){
    document.getElementById('addproduct').style.display = 'none';
    document.getElementById('products').style.display = 'block';
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


    //nếu trên localstorage không có biến sanphammoi_array thì tạo một biến trên localstorage để chứa sản phẩm
    // vì nếu không đặt trong if thì cứ mỗi lần load trang thì sản phẩm cũ sẽ mất hết vì reset lại code là một mảng rỗng
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
    if(JSON.parse(localStorage.getItem('sanphammoi_array')) == undefined){
        localStorage.setItem('sanphammoi_array',JSON.stringify([sp1,sp2,sp3,sp4,sp5,sp6]))
    }

var sale = "";
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
        masp: document.getElementById('ma__ketqua').innerText,
        tensp: document.getElementById('title__ketqua').innerText,
        hinhsp: document.getElementById('hinh__ketqua').attributes[0].value,
        giasp: document.getElementById('gia__ketqua').innerText,
        danhmuc: danhmuc.options[danhmuc.selectedIndex].value,
        sale
    }
    localcu.push(sanpham);
    localStorage.setItem('sanphammoi_array',JSON.stringify(localcu))
    loadkhunggiohang();
}
var table = document.getElementById('caibang')
loadkhunggiohang = () => {
    var mangsp = JSON.parse(localStorage.getItem('sanphammoi_array'))
    for (var i = table.rows.length - 1; i > 0; i--) {
      table.deleteRow(i);
    }
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
    
xoasp= (vitri) => {
    var mangsp = JSON.parse(localStorage.getItem('sanphammoi_array'))
    mangsp.splice(vitri,1);
    localStorage.setItem('sanphammoi_array',JSON.stringify(mangsp))
    loadkhunggiohang();
}


    

