// Net Hesaplayıcı
function hesaplaOzet() {
    const d = parseInt(document.getElementById('dogru').value) || 0;
    const y = parseInt(document.getElementById('yanlis').value) || 0;
    const b = parseInt(document.getElementById('bos').value) || 0;
    const cozulen = d + y + b;
    const net = (d - (y / 3)).toFixed(2);
    document.getElementById('toplamOzet').innerText = `Toplam Çözülen Soru: ${cozulen} | Hesaplanan Net: ${net}`;
}

document.getElementById('dogru').addEventListener('input', hesaplaOzet);
document.getElementById('yanlis').addEventListener('input', hesaplaOzet);
document.getElementById('bos').addEventListener('input', hesaplaOzet);

// Form Gönderim İşlemi
document.getElementById('studyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const statusDiv = document.getElementById('status');

    statusDiv.innerText = "Kaydediliyor...";
    statusDiv.style.color = "blue";

    const payload = {
        ogrenciNo: aktifNo,
        ogrenciIsim: aktifAd,
        gun: document.getElementById('gun').value,
        blok: document.getElementById('blok').value,
        ders: document.getElementById('ders').value,
        konuCalisildi: document.getElementById('konuCalisildi').value,
        eksikNedeni: document.getElementById('eksikNedeni').value,
        hedefSoru: parseInt(document.getElementById('hedefSoru').value) || 0,
        dogru: parseInt(document.getElementById('dogru').value) || 0,
        yanlis: parseInt(document.getElementById('yanlis').value) || 0,
        bos: parseInt(document.getElementById('bos').value) || 0
    };

    fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        if (data.result === "success") {
            statusDiv.innerText = "🎉 Başarıyla kaydedildi!";
            statusDiv.style.color = "green";
            
            document.getElementById('dogru').value = 0;
            document.getElementById('yanlis').value = 0;
            document.getElementById('bos').value = 0;
            document.getElementById('eksikNedeni').value = "";
            hesaplaOzet();

            gecmisiGetir(aktifNo);
            setTimeout(() => { statusDiv.innerText = ""; }, 2000);
        } else {
            statusDiv.innerText = "❌ Kaydedilemedi!";
            statusDiv.style.color = "red";
        }
    });
});