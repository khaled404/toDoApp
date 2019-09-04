var body = document.querySelector('body');
//main page
if(body.classList.contains('main')){
    const ToDoContainer = document.querySelector('.boxs');
    const addItem = document.querySelector('.addcontiner');
    const textArea = document.getElementById('textarea');
    const today = document.getElementById('today');
    const footerLine = document.getElementById('footerLine');
    const songName = document.getElementById('songName');
    const titel = document.getElementById('titel');
    const subTitel = document.getElementById('subTitel');
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
        inputChake.setAttribute('name','toDochack');
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
        inputChake.checked = doc.data().itemChakebox;

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

    // add item
    addItem.addEventListener('submit',e => {
        e.preventDefault()
        if(addItem.inputValue.value != ''){
            db.collection('ToDo').add({
                itemVal : addItem.inputValue.value,
            });
            addItem.inputValue.value = '';
        }
    })
    // remove data
    db.collection('ToDo').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach((change) =>{
            if(change.type == 'added'){
                renderList(change.doc)
            } else if (change.type == 'removed') {
                let li = ToDoContainer.querySelector('[data-id="'+ change.doc.id + '"]');
                ToDoContainer.removeChild(li)
            }
        })
    });
    // checked
    ToDoContainer.addEventListener('click',e => {
        chak = document.querySelectorAll('.checkbox');
        for(let i = 0 ; i < chak.length  ; i++){
            let chkid = chak[i].id; 
            db.collection('ToDo').doc(chkid).update({
                itemChakebox : chak[i].checked
            });
        }
    });

    //main textArea 
    db.collection('documentText').onSnapshot(snapshot => {
        snapshot.docs.forEach(doc => {
            textArea.value = doc.data().textArea
        })

    }); 
    // db.collection('documentText').get().then((snapshot) => {
    //     snapshot.docs.forEach(doc => {
    //         textArea.value = doc.data().textArea
    //     })
    // });

    textArea.addEventListener('keyup',e => {
        db.collection('documentText').doc('textArea_1').update({
            textArea : textArea.value,
        });
    })
    //subText
    db.collection('subText').onSnapshot(snapshot => {
        snapshot.docs.forEach(doc => {
            today.value = doc.data().toDay
            footerLine.value = doc.data().songQuoces
            songName.textContent = doc.data().songName
            titel.textContent = doc.data().titel
            subTitel.textContent = doc.data().subTitel
        });
    });
    document.addEventListener('keyup',e =>{
        db.collection('subText').doc('text').update({
            toDay : today.value,
            songQuoces : footerLine.value,
            songName : songName.textContent,
            titel : titel.textContent,
            subTitel : subTitel.textContent,
        });
    })

}

// // about page 
if(body.classList.contains('page-about')){
    const name = document.getElementById('name');
    const date = document.getElementById('date');
    const work = document.getElementById('work');
    const city = document.getElementById('city');
    db.collection('about').onSnapshot(snapshot => {
        snapshot.docs.forEach(doc => {
            name.textContent = doc.data().name
            date.textContent = doc.data().date
            work.textContent = doc.data().work
            city.textContent = doc.data().city
        });
    });
    document.addEventListener('keyup',e =>{
        db.collection('about').doc('about').update({
            name : name.textContent,
            date : date.textContent,
            work : work.textContent,
            city : city.textContent,
        });
    })
}
