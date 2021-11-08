
class SanPham{
    constructor(masp,tensp,hinhsp,giasp,danhmuc,sale){
        this.masp = masp;
        this.tensp = tensp;
        this.hinhsp = hinhsp;
        this.giasp = giasp;
        this.danhmuc = danhmuc;
        this.sale = sale;
    }
}

const sp1 = new SanPham('masp','tensp','hinhsp','giasp','danhmuc','sale');
const sp2 = new SanPham('masp','tensp','hinhsp','giasp','danhmuc','sale');
const array = [sp1,sp2]
console.log(array);
var a = "duy"
export {array};