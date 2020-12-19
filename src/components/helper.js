export function paint_calculate(val) {
    // console.log(val)

    // formula https://www.pratamabangunan.com/id/tips-and-trick/panduan-penghitungan-kebutuhan-cat

    // Hitung luas permukaan bidang dinding atau tembok yang akan dicat.
    // Tinggi x Lebar x Jumlah dinding | contoh Dinding: 4m x 5m x 4 dinding = 80m2

    const wall_num = 4
    const wall_calc = val.height * val.width * wall_num
    // console.log('wall calc: ' + wall_calc)

    // Hitung luas bidang permukaan plafon.
    // Panjang x Lebar | contoh Plafon: 3m x 4m = 12m2
    const plafon_calc = val.length * val.width
    // console.log('plafon calc: ' + plafon_calc)

    // jumlahkan total luas bidang tersebut.
    // Total luas dinding + Total luas plafon | contoh 80m2 + 12m2 = 92m2
    let surface_area = wall_calc + plafon_calc
    // console.log('surface area:' + surface_area)

    // Hitung luas bidang yang dicat dengan cara kurangi luas pintu dan jendela (jika ada).
    // Total luas dinding & plafon – Luas pintu & jendela | Contoh Luas pintu: 2m x 0.5m = 1m2 -> 92m2 – 1 m2 = 91m2
    // i'll skip this one

    // Luas bidang yang akan dicat dibagi dengan daya sebar cat per liter. 
    // Satu galon memiliki daya sebar teoritis 12m2 dengan 2 lapis pengecatan, 
    // maka jumlah yang dibutuhkan secara teoritis sebagai berikut.
    // (Total luas bidang : Daya sebar teoritis) x Jumlah lapisan pengecatan | contoh (91m2 : 12) x 2 = 15,2 liter
    const scattering = 12
    const layers = 2
    const total = (surface_area / scattering) * layers //Liter

    return {
        name: val.name,
        width: val.width,
        length: val.length,
        height: val.height,
        paintneeds: total.toFixed(1)
    }
}

export function multiLang(word) {
    const lang = window.navigator.language.slice(0, 2);
    if (lang === "id") {
        switch (word) {
            case 'Room Name':
                return 'Nama Ruangan'
            case 'Room Length':
                return 'Panjang Ruangan'
            case 'Room Width':
                return 'Lebar Ruangan'
            case 'Room Height':
                return 'Tinggi Ruangan'
            case 'Calculate':
                return 'Hitung'
            case 'Add New One':
                return 'Tambah Baru'
            case 'Update':
                return 'Ubah'
            case 'Delete':
                return 'Hapus'
            default:
                return 'undifined'
        }
    } else {
        return word;
    }
}
