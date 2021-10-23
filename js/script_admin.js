function clickadd(){
    document.getElementById('addproduct').style.display = 'block';
    document.getElementById('products').style.display = 'none';
}
function clickproduct(){
    document.getElementById('addproduct').style.display = 'none';
    document.getElementById('products').style.display = 'block';
}
// Xử lí phần thêm sản phẩm
function xemketqua(){
    document.getElementById('phanketquahienthi').style.display = 'block';
    var form__addproduct =document.getElementById('addproduct__form');
    document.getElementById('title__ketqua').innerText = (form__addproduct.ten.value).toLocaleUpperCase();
    document.getElementById('ma__ketqua').innerText = form__addproduct.ma.value;
    document.getElementById('gia__ketqua').innerText = form__addproduct.gia.value + " đ";
    document.getElementById('hinh__ketqua').attributes[0].value = "../img/sanpham/" + document.getElementById("hinhanh_input").files[0].name;
}
var product_array = []
function dangsanpham(){
    const sanpham = {
        masp: document.getElementById('ma__ketqua').innerText,
        tensp: document.getElementById('title__ketqua').innerText,
        hinhsp: document.getElementById('hinh__ketqua').attributes[0].value,
        giasp: document.getElementById('gia__ketqua').innerText
    }
    product_array.push(sanpham);
    localStorage.setItem("sanphammoi_array",JSON.stringify(product_array))
    loadkhunggiohang();
}

var table = document.getElementById('caibang')
loadkhunggiohang = () => {
    var mangsp = JSON.parse(localStorage.getItem('sanphammoi_array'))
    for (var i = table.rows.length - 1; i > 0; i--) {
      table.deleteRow(i);
    }
        for (let x of mangsp) {
            row = table.insertRow();
            cell1 = row.insertCell();
            cell1.innerHTML = '<img src="' + x.hinhsp + '" style="width: 50px;">';
            cell2 = row.insertCell();
            cell2.innerText = x.tensp;
            cell3 = row.insertCell();
            cell3.innerText = x.masp;
            cell4 = row.insertCell();
            cell4.innerText = x.giasp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            cell5 = row.insertCell();
            cell5.innerText = "Không";
            cell6 = row.insertCell();
            cell6.innerText = "Delete";
        }
    }



    

