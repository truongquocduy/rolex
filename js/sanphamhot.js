window.onload = function(){
    var mangsp = JSON.parse(localStorage.getItem('sanphammoi_array'))
    // alert(mangsp[7].sale)
    for(let x of mangsp){
        if(x.sale != 'sale'){
            var nodecha = document.createElement("div");
            nodecha.className = "sp col-6 col-lg-4 pl-3 pr-3 text-center pb-4 pt-4 " + x.danhmuc ;
            nodecha.id = x.masp;
            nodecha.setAttribute('onclick',"clicksanpham('"+ x.masp + "')");

            var nodecon_img = document.createElement("IMG");
            nodecon_img.setAttribute('src',x.hinhsp);
            nodecon_img.className = "w-100";

            var nodecon_title = document.createElement("H6")
            nodecon_title.setAttribute('style','color: #334862;font-family: Arial, Helvetica, sans-serif;font-size: 14px;')
            nodecon_title.className = "mt-3";
            nodecon_title.innerText = x.tensp;

            var nodecon_gia = document.createElement("strong");
            nodecon_gia.innerText = x.giasp;

            nodecha.appendChild(nodecon_img);
            nodecha.appendChild(nodecon_title);
            nodecha.appendChild(nodecon_gia);
            document.getElementById('khungsp').appendChild(nodecha);
       }

    }
    var giohang_mangsp = JSON.parse(localStorage.getItem('giohang_mang'))
    var tong = 0;
    for(let x of giohang_mangsp){
        tong += parseInt(x.giasp.split(',').join('').split('₫').join('').split('đ').join(''));
    }
    document.getElementById('tong').innerText = tong.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '₫';

}
var hienthi = document.getElementById('hienthi');
hienthi.onchange = function(){
    var khungsp = document.getElementById('khungsp').children;
    if(hienthi.options[hienthi.selectedIndex].value == "moinhat"){
        document.getElementById('khungsp').innerHTML = "";
        var mangloc= JSON.parse(localStorage.getItem('sanphammoi_array'))
        // console.log(mangsp[0].masp)
        for(let i = mangloc.length-1; i>=0; i--){
            var nodecha = document.createElement("div");
            nodecha.className = "sp col-6 col-lg-4 pl-3 pr-3 text-center pb-4 pt-4 mt-3 " + mangloc[i].danhmuc;
            nodecha.id = mangloc[i].masp;
            nodecha.setAttribute('onclick',"clicksanpham('"+ mangloc[i].masp + "')");

            var nodecon_img = document.createElement("IMG");
            nodecon_img.setAttribute('src',mangloc[i].hinhsp);
            nodecon_img.className = "w-100";

            var nodecon_title = document.createElement("H6")
            nodecon_title.setAttribute('style','color: #334862;font-family: Arial, Helvetica, sans-serif;font-size: 14px;')
            nodecon_title.className = "mt-3";
            nodecon_title.innerText = mangloc[i].tensp;

            var nodecon_gia = document.createElement("strong");
            nodecon_gia.innerText = mangloc[i].giasp;

            nodecha.appendChild(nodecon_img);
            nodecha.appendChild(nodecon_title);
            nodecha.appendChild(nodecon_gia);
            document.getElementById('khungsp').appendChild(nodecha);

        }
    }
    if(hienthi.options[hienthi.selectedIndex].value == "macdinh"){
        document.getElementById('khungsp').innerHTML = "";
        var mangsp = JSON.parse(localStorage.getItem('sanphammoi_array'))

        for(let x of mangsp){
            var nodecha = document.createElement("div");
            nodecha.className = "sp col-6 col-lg-4 pl-3 pr-3 text-center pb-4 pt-4 mt-3 " + x.danhmuc;
            nodecha.id = x.masp;
            nodecha.setAttribute('onclick',"clicksanpham('"+ x.masp + "')");

            var nodecon_img = document.createElement("IMG");
            nodecon_img.setAttribute('src',x.hinhsp);
            nodecon_img.className = "w-100";

            var nodecon_title = document.createElement("H6")
            nodecon_title.setAttribute('style','color: #334862;font-family: Arial, Helvetica, sans-serif;font-size: 14px;')
            nodecon_title.className = "mt-3";
            nodecon_title.innerText = x.tensp;

            var nodecon_gia = document.createElement("strong");
            nodecon_gia.innerText = x.giasp;

            nodecha.appendChild(nodecon_img);
            nodecha.appendChild(nodecon_title);
            nodecha.appendChild(nodecon_gia);
            document.getElementById('khungsp').appendChild(nodecha);

        }
    }
}