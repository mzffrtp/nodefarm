// file system ozelliklerini kullanmak icin 
const fs = require("fs");
const http = require("http");


//! fs.readFileSync()
const text = fs.readFileSync("./txt/input.txt", "utf-8");
// senkronize olarak verilen dosyanin icinin okunmasin saglar
// params --> dosya yolu, karakter codu

console.log(text);
//node index.js
// suan input text icerisindeki bir texti okuyorsun

//! DOSYA Yazma
//! Senkron > Blocking > Dosya Okuma
// params --> dosya yolu, dosyanin icerigi hangi yazi!
const addedText = `Yeni eklenen metin:\n ${text}. \n Olusturulma Tarihi:${Date.now()}`;
fs.writeFileSync("./txt/output.txt", addedText)

//! Senkron > Blocking > Dosya Okuma
// Senkron islemler sirayla calisir. Yani birbiri ardina calisir. Bu nedenle tekbir islem icin uzun sure bekleme gerektirir.
// Dosya veri tabani, kullanici dogrulama islemleri esnasinda kullanici baska islemler yapamaz.
//! single thread --> ayni anda bir islemi yapacak sekilde
//todo async islemleri kullanilarak bu sorun cozulur. 
//todo fs.readFile("dosya ismi",(okuma isleminden sonra calisacak fonksiyon)=>{single treadi engelleme} )

//! Asenkron > Non Blocking > Dosya Okuma
fs.readFile("./txt/readMe.txt", "utf-8", (err, fileName) => {
    // islemin bitiminden sonra calisan fonksiyonlar --> call back
    // call back --> fonksiyon donderen fonksiyon
    if (err) return console.log("error");
    console.log("first action:", fileName);
    //todo ikinci bir asenkron event
    // read the file from after the first one
    fs.readFile(`./txt/${fileName}.txt, "utf-8"`, (err, data) => {
        console.log("second async action", data)
    })
    //! burada calback hell olusuyor --> callbacklerin arda cok fazla kullanilmasi
    //todo kurtulmak icin async await kullanilir.
})

console.log("which one first? me or readedFile at?");

//! SERVER
// API --> Application Programing Interface
// belirli bir yazilim ve hizmetin islevselligini farkli bir yazilim tarafindan kullanilmasini saglar.
//! JSON
//! Response 
// uygulamalar yuku hafif oldugu icin genelde JSON verisi gonderir.
//! ornek JSON  
//todo {"json" : ["key":"value"]}

/*
{
    "users": [
        {
            "id" : "12345",
            "name": "John",
            "age": 35,
            "userType": "customer",
            "isPremium": true
            "location" : [{
            "city": "ankara"
            "cityCode": 06
            }]
        }
    ]
}
*/
//! REQUEST
//! HTML Metodlari
// GET --> veri cekme istegi
// POST --> Ekleme istegi
// PUT --> bir elemanin butun degerlerini gumcellemek icin
// PATCH -->  kismi guncelleme
// DELETE --> veri silme
//! isteklerin bolumleri
// body: istekle ile ilgili temel veriler , POST, PUT, PATCH
// header: istekle ilgili temel bilgiler
//ekstra biligiler, hangi cihazdan attik, icerigin uzunlugu
// hepsinde bir header vardir


const server = http.createServer((req, res) => {
    console.log((req.url));
    if (req.url === "/") {
        res.end("here is main page ....")
    }
});

server.listen(5500, "127.0.0.1", () => {
    console.log("port 5500 listening");
})