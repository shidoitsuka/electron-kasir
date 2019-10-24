const updateHarga = () => {
  let selectedBarang = document.getElementById("barang").value;
  let hargaBarang = db[selectedBarang].harga;
  let tipeBarang = db[selectedBarang].tipe;
  $("#jumlahBarang").attr("placeholder", `Jumlah Barang (per ${tipeBarang})`);
  $("#jumlahBarang").fadeIn(500);
};

const updateTotal = () => {
  let namaBarang = $("#barang").val();
  let jumlah = $("#jumlahBarang").val();
  let total = db[namaBarang].harga * jumlah;
  if (jumlah == 0) {
    $("#total").fadeOut(300);
    $("#proses-btn").fadeOut(300);
    $("#tambahBeli-btn").fadeOut(300);
  } else {
    $("#total").html(`Total Belanja : ${total}`);
    $("#total").fadeIn(300);
    $("#tambahBeli-btn").fadeIn(300);
  }
};

const tambahBeli = () => {
  let namaBarang = $("#barang").val();
  let jumlah = $("#jumlahBarang").val();
  let harga = db[namaBarang].harga;
  let total = harga * jumlah;
  $("table").fadeIn(300);
  $("#pembelian").append(`<tr class="unit">
    <td>${namaBarang}</td>
    <td style="text-align:center;">${harga}</td>
    <td style="text-align:center;">${jumlah}</td>
    <td style="text-align:center;" class="subtotal"><input type="number" value="${total}"></td>
    <td class="hapusBarang"><a style="cursor: pointer;" onclick="(this.parentElement).parentElement.remove();">❌</a></td>
  $("#total").fadeOut(300);
  </tr>`);
  $("#jumlahBarang").val("");
  $("#jumlahBarang").fadeOut(300);
  $("#proses-btn").fadeIn(300);
  $("#tambahBeli-btn").fadeOut(300);
};

let total = [];
const proses = () => {
  const elements = document.getElementsByClassName("subtotal");
  for (var j = 0; j < elements.length; j++) {
    total.push(parseInt(elements[j].children[0].value));
  }
  $("#pembelian").append(`<tr>
    <th style="text-align:center;" colspan="3">Total</th>
    <td style="text-align:center;">${total.reduce((a, b) => a + b)}</td>
    </tr>`);
  $(".hapusBarang").remove();
  $(".pembelian").fadeOut(250);
  $("#total").fadeOut(250);
  $("#proses-btn").fadeOut(250);
  $("#selesai-btn").fadeIn(250);
};

const nest = (obj, keys, v) => {
  if (keys.length === 1) {
    obj[keys[0]] = v;
  } else {
    var key = keys.shift();
    obj[key] = nest(typeof obj[key] === "undefined" ? {} : obj[key], keys, v);
  }

  return obj;
};

const selesai = () => {
  let nama = [],
    harga = [],
    jumlah = [],
    subtotal = [];
  const unit = document.getElementsByClassName("unit");
  const d = new Date();
  const tahun = d.getFullYear();
  const bulan =
    d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
  const tanggal = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
  const jam = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  const menit = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  const detik = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
  const fullTanggal = `${tahun}-${bulan}-${tanggal}`;
  const fullJam = `${jam}-${menit}-${detik}`;
  for (var i = 0; i < unit.length; i++) {
    nama.push(unit[i].children[0].innerHTML);
    harga.push(parseInt(unit[i].children[1].innerHTML));
    jumlah.push(parseFloat(unit[i].children[2].innerHTML));
    subtotal.push(parseInt(unit[i].children[3].children[0].value));
  }
  for (var i = 0; i < nama.length; i++) {
    nest(
      pembeliandb,
      [[fullTanggal], [fullJam], [nama[i]], "jumlah"],
      jumlah[i]
    );
    nest(pembeliandb, [[fullTanggal], [fullJam], [nama[i]], "harga"], harga[i]);
    nest(
      pembeliandb,
      [[fullTanggal], [fullJam], [nama[i]], "subtotal"],
      subtotal[i]
    );
  }
  nest(
    pembeliandb,
    [[fullTanggal], [fullJam], "total"],
    subtotal.reduce((a, b) => a + b)
  );
  fs.writeFileSync(
    "./assets/db/pembelian.json",
    JSON.stringify(pembeliandb),
    err => {
      if (err) console.log(err);
    }
  );
  window.alert("Pembelian Sukses!");
  location.reload();
};
