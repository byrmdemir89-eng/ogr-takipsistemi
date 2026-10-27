// Ortak Yapılandırma ve Global Değişkenler
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwiMDQ5FWyDBfhJAHW0s26QBubxGhSs2oK8exQFesSeVPdqq_agaVNiKK__5KcoMv8/exec";

const aktifNo = sessionStorage.getItem("girisYapanNo") || localStorage.getItem("ogrNo");
const aktifAd = sessionStorage.getItem("girisYapanAd") || localStorage.getItem("adSoyad");

let aktifSinif = "";
let aktifSube = "";

// Oturum kontrolü ve başlık güncellemesi
if (!aktifNo || !aktifAd) {
    window.location.replace("indexLogin.html");
} else {
    const userInfoHeader = document.getElementById("userInfoHeader");
    if (userInfoHeader) {
        userInfoHeader.innerText = `Öğrenci: ${aktifAd} (${aktifNo})`;
    }
    
    const profilOgrNo = document.getElementById("profilOgrNo");
    if (profilOgrNo) {
        profilOgrNo.value = aktifNo;
    }
    
    // Sayfa yüklendiğinde profil ve ödevleri çeken fonksiyon (profil.js içinde tanımlı olmalı)
    if (typeof ogrenciGercekBilgileriniGetir === "function") {
        ogrenciGercekBilgileriniGetir(aktifNo);
    }
}

// Sekmeler Arası Geçiş ve Menü Yönetimi
function switchTab(tabId) {
    document.querySelectorAll('.card').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    const targetCard = document.getElementById(tabId);
    if (targetCard) targetCard.classList.add('active');
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

function menuAc() { 
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('menuOverlay');
    if (sidebar) sidebar.classList.add('active'); 
    if (overlay) overlay.classList.add('active'); 
}

function menuKapat() { 
    const sidebar = document.getElementById('mobileSidebar');
    const overlay = document.getElementById('menuOverlay');
    if (sidebar) sidebar.classList.remove('active'); 
    if (overlay) overlay.classList.remove('active'); 
}

function cikisYap() { 
    sessionStorage.clear(); 
    localStorage.clear(); 
    window.location.replace("indexLogin.html"); 
}