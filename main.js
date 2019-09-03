var body = document.querySelector('body');
//main page
if(body.classList.contains('main')){
    const ToDoContainer = document.querySelector('.boxs');
    const addItem = document.querySelector('.addcontiner');
    //create elments and render data
    function renderList(doc){
        
        let li = document.createElement('li');
        let inputChake =document.createElement('input');
        let label =document.createElement('label');
        let i =document.createElement('i');
        let inputVal =document.createElement('div');
        let closebutton = document.createElement('span');
        //append
        li.appendChild(inputChake);
        li.appendChild(label);
        label.appendChild(i);
        li.appendChild(inputVal);
        li.appendChild(closebutton);
        //set attr
        inputChake.setAttribute('type','checkbox');
        inputChake.setAttribute('name','checkbox');
        inputChake.setAttribute('class','checkbox');
        inputChake.setAttribute('id',doc.id);
        // inputVal.setAttribute('type','text');
        inputVal.setAttribute('class','inputVal');
        inputVal.setAttribute('name','inputVal');
        li.setAttribute('data-id',doc.id);
        i.setAttribute('class','flaticon-check');
        label.setAttribute('class','box');
        label.setAttribute('for',doc.id);
        closebutton.setAttribute('class','close');
        closebutton.textContent = 'x';
        //get value
        inputVal.textContent = doc.data().itemVal;
        inputChake.checked = doc.data().chaked;

        ToDoContainer.appendChild(li)
        // deleting data
        closebutton.addEventListener('click', (e) =>{
            e.stopPropagation()
           let id = e.target.parentElement.getAttribute('data-id');
            db.collection('ToDo').doc(id).delete();
        })
    }
    //get Data
    // db.collection('ToDo').get().then((snapshot) => {
    //     snapshot.docs.forEach(doc => {
    //         renderList(doc)
    //     });
    // });
    addItem.addEventListener('submit',e => {
        e.preventDefault()
        if(addItem.inputValue.value != ''){
            db.collection('ToDo').add({
            itemVal : addItem.inputValue.value,
            // chaked : ToDoContainer.checkbox.checked
            });            addItem.inputValue.value = '';
        }
    })

        
    db.collection('ToDo').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change =>{
            if(change.type == 'added'){
                renderList(change.doc)
            } else if (change.type == 'removed') {
                let li = ToDoContainer.querySelector('[data-id="'+ change.doc.id + '"]');
                ToDoContainer.removeChild(li)
            }
        })
    }); 

}

/*

else if
            change.update({
                itemVal : ToDoContainer.inputVal.value
            })


*/
//     var footerLine = document.querySelector('.footer-line'),
//         footerName = document.querySelector('.footer-name .line'),
//         toDay = document.querySelector('.box-left-top span'),
//         textArea = document.querySelector('.textar'),
//         boxs = document.querySelector('.boxs'),
//         addInput = document.querySelector('.addInput'),
//         toDobox = document.querySelectorAll('li'),
//         toDoLine = document.querySelectorAll('.toDoinput'),
//         box = document.querySelectorAll('.box'),
//         checkbox = document.querySelectorAll('.checkbox'),
//         addCheckbox = document.querySelector('.addCheckbox');
//     //add to do
//     function addItem () {
//         var countToDo = boxs.childElementCount;
//         var items={
//             id: countToDo, 
//             Value: addInput.value,
//         }
//         if(addInput.value != ''){
//             var html = `<div class='toDobox'><input type='checkbox' id='checkbox_${items.id}' class='checkbox'><label class='box' for='checkbox_${items.id}'><i class='flaticon-check'></i></label><span class='toLine'><input type='text' id='input_${items.id}' class='toDoinput' value='${items.Value}'></span><button class='close'>DEL</button></div>`;
//             // items.contentHtml = html;
//             boxs.insertAdjacentHTML('beforeend', html);
//             // localStorage.setItem('htmlObj_'+countToDo, JSON.stringify(items));
//         }
                
//     }
//     addEventListener("keyup", function (e) {
//         if(e.target === addInput && e.keyCode == 13){
//             addItem();
//             addInput.value = '';
//         }
//     });
//     addEventListener("click", function (e) {
//         if(e.target === addCheckbox ){
//             addItem();
//             addInput.value = '';
//         }
//     });
//     function checkWatch (e) {
//         var tdo =document.querySelectorAll('.toDobox');
//         if(tdo){
//             for(i = 0 ;i<=  boxs.childElementCount -1 ; i++){
//                 var cha =   document.getElementById('checkbox_'+i);
//                 var input =   document.getElementById('input_'+i);
//                 var opj ={ 
//                     mychecked: cha.checked,
//                     val : input.value,
//                     content: tdo[i].outerHTML,
//                     id : i
//                 }
//                 localStorage.setItem('checkboxOpj_'+i, JSON.stringify(opj));
//             }
//           }
//     }
//     addEventListener('keyup',checkWatch)
//     addEventListener('click',checkWatch)
//     //add note to local storage
//     function noteLocal(){
//         localStorage.setItem('to_day' , toDay.textContent);
//         localStorage.setItem('footerLine' , footerLine.textContent);
//         localStorage.setItem('footerName' , footerName.textContent);
//         localStorage.setItem('textArea' , textArea.value);
//     }
//     addEventListener("keyup", noteLocal);
//     //get todo data
//     function getLocal() {
//             for(var i=0 ; i<=  boxs.childElementCount ; i++ ){
//                 var item =  JSON.parse(localStorage.getItem('checkboxOpj_'+i));
//                 if(item){
//                     boxs.insertAdjacentHTML('beforeend', item.content);
//                 }
//             }
//             for(var j =0 ; j<=  boxs.childElementCount -1  ; j++ ){
//                 var cha =   document.getElementById('checkbox_'+j);
//                 var chakOpj = JSON.parse(localStorage.getItem('checkboxOpj_'+j));
//                 var input =   document.getElementById('input_'+j);
//                 input.value = chakOpj.val;
//                 cha.checked = chakOpj.mychecked;
//             }
//             //get note data
//             toDay.textContent = localStorage.getItem('to_day');
//             textArea.value = localStorage.getItem('textArea');
//             footerLine.textContent = localStorage.getItem('footerLine');
//             footerName.textContent = localStorage.getItem('footerName');
//         }
//     }
//     getLocal()
//     //remove
//     var removeToDo = function (e) {   
//     document.querySelectorAll('.close').forEach(el => {
//         // console.log(el)        
//         if(e.target == el){
//             el.parentElement.remove()
//             localStorage.clear();
//             noteLocal();
//             checkWatch();
//         }
//     });    
// }  
// document.addEventListener('click', removeToDo);

// // about page 
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
    addEventListener("keyup", enterToLcal)
    name.textContent = localStorage.getItem('name');
    date.textContent = localStorage.getItem('date');
    work.textContent = localStorage.getItem('work');
    city.textContent = localStorage.getItem('city');
}
// localStorage.clear()

// if(e.target == close[i]){
//     close.parentElement.parentElement.remove();
//     console.log(JSON.parse(localStorage.getItem('checkboxOpj_'+i)))
//     localStorage.removeItem('Todo_'+i)
// }