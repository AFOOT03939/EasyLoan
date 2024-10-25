document.addEventListener('DOMContentLoaded', function() {
    let Card2 = document.getElementById('containerBtn');
    function adjustBtn() {
        if (window.innerWidth < 768) {
            Card2.classList.add("mt-5");
        }else{
            Card2.classList.remove("mt-5");
        }
        }
        window.addEventListener("resize", adjustBtn);
        adjustBtn();
});