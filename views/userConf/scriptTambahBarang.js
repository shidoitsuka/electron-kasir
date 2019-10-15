const tambah = () => {
  const namaBarang = document.getElementById("namaBarang").value.toLowerCase();
  const hargaBarang = document.getElementById("hargaBarang").value;
  const tipeBarang = document.getElementById("tipeBarang").value;
  if (namaBarang == "" || hargaBarang == "" || tipeBarang == "")
    return window.alert("Mohon Lengkapi Form!");
  if (Object.keys(db).includes(namaBarang))
    return window.alert("Barang sudah ada!");
  else {
    db[namaBarang] = {
      nama: namaBarang,
      harga: hargaBarang,
      tipe: tipeBarang
    };
    fs.writeFileSync("./assets/db/barang.json", JSON.stringify(db), err => {
      if (err) console.log(err);
    });
    window.alert(`Berhasil Menambahkan ${namaBarang}`);
    location.reload();
  }
};
