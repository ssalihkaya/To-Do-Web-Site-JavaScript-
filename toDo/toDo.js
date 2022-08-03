const yeniGorev = document.querySelector(".input-gorev");
const yeniGorevEkleBtn = document.querySelector(".gorev-ekle");
const gorevListesi = document.querySelector(".gorev-listesi");

yeniGorevEkleBtn.addEventListener("click", gorevekle);
gorevListesi.addEventListener("click", gorevSil);
document.addEventListener("DOMContentLoaded", localStorrageOku);

function gorevekle(e) {
  e.preventDefault();

  if (yeniGorev.value.length > 0) {
    gorevItemOlustur(yeniGorev.value);
    //Local Storage'a kaydet
    localStorageKaydet(yeniGorev.value);
    yeniGorev.value = "";
  } else {
    alert("Boş görev tanımı olmaz");
  }
}
function gorevSil(e) {
  const tiklanilanEleman = e.target;

  if (tiklanilanEleman.classList.contains("gorev-tmm")) {
    tiklanilanEleman.parentElement.classList.toggle("gorev-tamamlandi");
  }
  if (tiklanilanEleman.classList.contains("gorev-sil")) {
    tiklanilanEleman.parentElement.classList.toggle("kaybol");

    const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
    localStorageSil(silinecekGorev);

    tiklanilanEleman.parentElement.addEventListener(
      "transitionend",
      function () {
        tiklanilanEleman.parentElement.remove();
      }
    );
  }
}

function localStorageArrayeDonustur() {
  let gorevler;
  if (localStorage.getItem("gorevler") === null) {
    gorevler = [];
  } else {
    gorevler = JSON.parse(localStorage.getItem("gorevler"));
  }

  return gorevler;
}

function localStorageKaydet(yeniGorev) {
  let gorevler = localStorageArrayeDonustur();

  gorevler.push(yeniGorev);
  localStorage.setItem("gorevler", JSON.stringify(gorevler));
}

function localStorrageOku() {
  let gorevler = localStorageArrayeDonustur();

  gorevler.forEach(function (gorev) {
    gorevItemOlustur(gorev);
  });
}

function gorevItemOlustur(gorev) {
  //div olusturma
  const gorevDiv = document.createElement("div");
  gorevDiv.classList.add("gorev-item");

  //li olusturma
  const gorevLi = document.createElement("li");
  gorevLi.classList.add("gorev-tanim");

  //button olusturma
  const gorevTmmBttn = document.createElement("button");
  gorevTmmBttn.classList.add("btn");
  gorevTmmBttn.classList.add("gorev-tmm");
  gorevTmmBttn.innerHTML = '<i class="fa-regular fa-square-check"></i>';

  const gorevSilBttn = document.createElement("button");
  gorevSilBttn.classList.add("btn");
  gorevSilBttn.classList.add("gorev-sil");
  gorevSilBttn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

  gorevLi.innerText = gorev;
  gorevDiv.appendChild(gorevLi);
  gorevDiv.appendChild(gorevTmmBttn);
  gorevDiv.appendChild(gorevSilBttn);

  //ul'ye olusturdugumuz divi ekleyleim
  gorevListesi.appendChild(gorevDiv);
}

function localStorageSil(gorev) {
  let gorevler = localStorageArrayeDonustur();

  //splice ile item sil
  const silinecekElemanIndex = gorevler.indexOf(gorev);
  gorevler.splice(silinecekElemanIndex, 1);

  localStorage.setItem("gorevler", JSON.stringify(gorevler));
}
