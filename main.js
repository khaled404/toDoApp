var body = document.querySelector('body');
//main page
if(body.classList.contains('main')){
    var toDoLine =[];
    toDoLine = document.querySelectorAll('.toLine');
    var checkbox = document.querySelectorAll('.checkbox'),
        footerLine = document.querySelector('.footer-line'),
        footerName = document.querySelector('.footer-name .line'),
        toDay = document.querySelector('.box-left-top span'),
        textArea = document.querySelector('.textar');

    function mainlocal (){
        localStorage.setItem('to_day' , toDay.textContent);
        localStorage.setItem('footerLine' , footerLine.textContent);
        localStorage.setItem('footerName' , footerName.textContent);
        localStorage.setItem('textArea' , textArea.value);
        for(i=0; i <= toDoLine.length - 1 ; i++){
            var todo = {
                id : checkbox[i].id,
                titel :  toDoLine[i].innerText,
                checked: checkbox[i].checked
            };
            if(todo.checked === true && todo.titel === '' || todo.titel === '\xa0' || todo.titel.length < 3){
                var getIte = document.getElementById(todo.id);
                getIte.checked = false;
            }
            localStorage.setItem('toDoObj_'+i, JSON.stringify(todo));
            localStorage.setItem('to_do_line_'+i, toDoLine[i].innerText);
        }
    }
    addEventListener("keydown", mainlocal);
    addEventListener("click", mainlocal);
    toDay.textContent = localStorage.getItem('to_day');
    footerLine.textContent = localStorage.getItem('footerLine');
    footerName.textContent = localStorage.getItem('footerName');
    textArea.value = localStorage.getItem('textArea');
    for(i=0; i <= toDoLine.length - 1 ; i++){
        var myopj = JSON.parse(localStorage.getItem('toDoObj_'+i))
        checkbox[i].checked = myopj.checked;
        toDoLine[i].innerText = localStorage.getItem('to_do_line_'+ i);
    }
}
// about page 
if(body.classList.contains('page-about')){
    let name = document.getElementById('name'),
        date = document.getElementById('date'),
        work = document.getElementById('work'),
        city = document.getElementById('city');
    function enterToLcal (){
        localStorage.setItem('name', name.textContent);
        localStorage.setItem('date', date.textContent);
        localStorage.setItem('work', work.textContent);
        localStorage.setItem('city', city.textContent);
    }
    addEventListener("keydown", enterToLcal)
    name.textContent = localStorage.getItem('name');
    date.textContent = localStorage.getItem('date');
    work.textContent = localStorage.getItem('work');
    city.textContent = localStorage.getItem('city');
}
