// profil.js içerisindeki fonksiyonun son hali:
/*
function ogrenciGercekBilgileriniGetir(no) {
    fetch(`${SCRIPT_URL}?action=ogrenciGuncelBilgiGetir&ogrNo=${encodeURIComponent(no)}&t=${Date.now()}`)
    .then(res => res.json())
    .then(data => {
        if (data.success && data.ogrenci) {
            if (data.ogrenci.adSoyad) document.getElementById("profilAdSoyad").value = data.ogrenci.adSoyad;
            if (data.ogrenci.sifre) document.getElementById("profilSifre").value = data.ogrenci.sifre;
            if (data.ogrenci.sinif) document.getElementById("profilSinif").value = data.ogrenci.sinif;
            if (data.ogrenci.sube) document.getElementById("profilSube").value = data.ogrenci.sube;
            
            // Global değişkenlere atıyoruz
            aktifSinif = data.ogrenci.sinif || "";
            aktifSube = data.ogrenci.sube || "";
        }
        
        // Bilgiler gelsin veya gelmesin geçmişi ve ödevleri mutlaka tetikleyelim
        gecmisiGetir(aktifNo);
        ogrenciOdevleriniGetir();
    })
    .catch(err => {
        console.error("Bağlantı hatası:", err);
        gecmisiGetir(aktifNo);
        ogrenciOdevleriniGetir();
    });
}
*/
function ogrenciGercekBilgileriniGetir(no) {
    console.log("Öğrenci bilgileri çekiliyor... No:", no);
    
    fetch(`${SCRIPT_URL}?action=ogrenciGuncelBilgiGetir&ogrNo=${encodeURIComponent(no)}&t=${Date.now()}`)
    .then(res => res.json())
    .then(data => {
        console.log("Gelen profil bilgisi:", data);
        if (data.success && data.ogrenci) {
            // HTML input alanlarını dolduruyoruz
            if (document.getElementById("profilOgrNo")) {
                document.getElementById("profilOgrNo").value = data.ogrenci.ogrNo || no;
            }
            if (document.getElementById("profilAdSoyad")) {
                document.getElementById("profilAdSoyad").value = data.ogrenci.adSoyad || "";
            }
           if (document.getElementById("profilSifre")) {
    document.getElementById("profilSifre").value = data.ogrenci.sifre || data.ogrenci.Sifre || ""; 
}
            if (document.getElementById("profilSinif")) {
                document.getElementById("profilSinif").value = data.ogrenci.sinif || "";
            }
            if (document.getElementById("profilSube")) {
                document.getElementById("profilSube").value = data.ogrenci.sube || "";
            }
            
            // Global değişkenleri güncelle
            aktifSinif = data.ogrenci.sinif || "";
            aktifSube = data.ogrenci.sube || "";
        }
        
        // Diğer sekmeleri de tetikle
        if (typeof gecmisiGetir === "function") gecmisiGetir(aktifNo);
        if (typeof ogrenciOdevleriniGetir === "function") ogrenciOdevleriniGetir();
    })
    .catch(err => {
        console.error("Profil bilgisi getirme hatası:", err);
    });
}
function sifreGosterGizle() {
    var sifreInput = document.getElementById("profilSifre");
    var btn = document.getElementById("sifreToggleBtn");
    
    if (sifreInput.type === "password") {
        sifreInput.type = "text";
        btn.textContent = "Gizle";
    } else {
        sifreInput.type = "password";
        btn.textContent = "Göster";
    }
}
// profil.js dosyasına ait fonksiyonlar (yukarıda zaten vardı):
function ogrenciGercekBilgileriniGetir(no) {
    console.log("Öğrenci gerçek bilgileri isteniyor... No:", no);
    fetch(`${SCRIPT_URL}?action=ogrenciGuncelBilgiGetir&ogrNo=${encodeURIComponent(no)}&t=${Date.now()}`)
    .then(res => res.json())
    .then(data => {
        console.log("Sunucudan gelen profil verisi:", data);
        if (data.success && data.ogrenci) {
            if (data.ogrenci.adSoyad) document.getElementById("profilAdSoyad").value = data.ogrenci.adSoyad;
            if (data.ogrenci.sifre) document.getElementById("profilSifre").value = data.ogrenci.sifre;
            if (data.ogrenci.sinif) document.getElementById("profilSinif").value = data.ogrenci.sinif;
            if (data.ogrenci.sube) document.getElementById("profilSube").value = data.ogrenci.sube;
            
            aktifSinif = data.ogrenci.sinif || "";
            aktifSube = data.ogrenci.sube || "";
        }
        
        gecmisiGetir(aktifNo);
        ogrenciOdevleriniGetir();
    })
    .catch(err => {
        console.error("Profil yükleme hatası:", err);
        gecmisiGetir(aktifNo);
        ogrenciOdevleriniGetir();
    });
}

function profilBilgiGuncelle() {
    // ... (eski güncelleme kodlarınız burada kalmaya devam edecek)
}

// ==========================================
// SAYFA AÇILDIĞINDA BURASI TETİKLenecek
// ==========================================
if (aktifNo) {
    ogrenciGercekBilgileriniGetir(aktifNo);
}
