// @ts-ignore

document.addEventListener('DOMContentLoaded', exec);

function exec(){
    let btn = document.getElementById("btn-test");
    let loader = document.getElementById("loader");
    
    let name = "";
    let phone = "";
    let email = "";

    document.getElementById("input-name").addEventListener('change', (e) => {
        name = e.target.value;
    });

    document.getElementById("input-phone").addEventListener('change', (e) => {
        phone = e.target.value;
    });

    document.getElementById("input-email").addEventListener('change', (e) => {
        email = e.target.value;
    });

    if(btn){
        btn.addEventListener('click', () => {
            if(name.length == 0 || phone.length == 0 || email.length == 0){
                alert("Пожалуйста, заполните все поля");
                return;
            }

            loader.classList.add("active");

            fetch(`./contacts/updateOrCreate/${name}/${phone}/${email}`, {
                method: 'GET',
                headers: {'Content-Type' : 'application/json; charset=UTF-8'}
            }).then(res => {
                if(res.ok){
                    alert("Запрос отправлен. Пожалуйста, проверьте изменения в amoCRM.");
                }else{
                    alert("Ошибка отправки запроса.");
                }
            }).catch(() => {
                alert("Ошибка отправки запроса.");
            }).finally(() => {
                loader.classList.remove("active");
            });
        });
    }
}