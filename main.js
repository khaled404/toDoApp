var body = document.querySelector('body');
//main page
if(body.classList.contains('main')){
    var bageCount ;
    var rabdId = db.collection('userData').doc().id;
    function app(){
        const ToDoContainer = document.querySelector('.boxs');
        const addItem = document.querySelector('.addcontiner');
        const textArea = document.getElementById('textarea');
        const today = document.getElementById('today');
        const footerLine = document.getElementById('footerLine');
        const songName = document.getElementById('songName');
        const titel = document.getElementById('titel');
        function renderList(doc){
            let li = document.createElement('li');
            let inputChake =document.createElement('input');
            let label =document.createElement('label');
            let i =document.createElement('i');
            let inputVal =document.createElement('div');
            let closebutton = document.createElement('span');
            const getUserName = document.querySelector('.userName');
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
                db.collection(auth.O+'_chake_'+bageCount).doc(id).delete();
            })
            // ToDoContainer.innerHTML = '';
        }
        function addPageLink(doc){
            const addPageLinkCon =document.querySelector('#addPageLinkCon');
            let pali = document.createElement('li');
            let a = document.createElement('a');
            a.setAttribute('href',doc.data().hrefVal);
            a.textContent = 'Page ' + doc.data().countNum;
            pali.appendChild(a);

            addPageLinkCon.appendChild(pali);
        }
        const addPage = document.querySelector('.addNewDay');
        page.base('/notes');
        page('/', '/note/0');
        page('/note/:page',callNote)
        page();
        addPage.addEventListener('click', () =>{
            let count = bageCount+1;
            addPage.setAttribute('href','/notes/note/' + count);
            db.collection(auth.O+'_bages').doc(auth.O+'_page_'+bageCount).set({
                hrefVal : addPage.getAttribute('href'),
                countNum: count
            });
        }); 
        
        function callNote(ctx){
            textArea.value = '';
            today.value = '';
            footerLine.value = '';
            songName.textContent = '';
            titel.textContent = '';
            ToDoContainer.innerHTML = '';
            db.collection('userData').doc(auth.O+'_page_'+bageCount).get().then((docSnapshot) => {
                if (docSnapshot.exists) {
                    getData()
                }else{
                    db.collection('userData').doc(auth.O+'_page_'+bageCount).set({
                        textArea : '',
                        toDay : '',
                        songQuoces : '',
                        songName : '',
                        titel : 'Titel',
                    });    
                }
            })
            addChake()
            if (ToDoContainer.innerHTML = '') {
                db.collection(auth.O+'_chake_'+bageCount).onSnapshot(snapshot => {
                    let changes = snapshot.docChanges();
                    changes.forEach((change) =>{
                        renderList(change.doc)
                    })
                });
            }else{
                db.collection(auth.O+'_chake_'+bageCount).onSnapshot(snapshot => {
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

            }
    
            if(ctx.params.page){
                return bageCount = ~~ctx.params.page;
            }
        }
        
        if (bageCount == undefined) {
            bageCount ='0';
        }
        db.collection(auth.O+'_bages').onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach((change) =>{
                addPageLink(change.doc)
            })
        });
        function addChake(){
            // add item
            addItem.addEventListener('submit',e => {
                e.preventDefault()
                if(addItem.inputValue.value != ''){
                    db.collection(auth.O+'_chake_'+bageCount).add({
                        itemVal : addItem.inputValue.value,
                    });
                    addItem.inputValue.value = '';
                }
            })
        }
        // remove data
        // db.collection(auth.O+'_chake_'+bageCount).onSnapshot(snapshot => {
        //     let changes = snapshot.docChanges();
        //     changes.forEach((change) =>{
        //         if(change.type == 'added'){
        //             renderList(change.doc)
        //         } else if (change.type == 'removed') {
        //             let li = ToDoContainer.querySelector('[data-id="'+ change.doc.id + '"]');
        //             ToDoContainer.removeChild(li)
        //         }
        //     })
        // });
        // checked
        ToDoContainer.addEventListener('click',e => {
            chak = document.querySelectorAll('.checkbox');
            for(let i = 0 ; i < chak.length  ; i++){
                let chkid = chak[i].id; 
                db.collection(auth.O+'_chake_'+bageCount).doc(chkid).update({
                    itemChakebox : chak[i].checked
                });
            }
        });
        const getUserName = document.querySelector('.userName');
        db.collection('userData').doc(auth.O+'_page_0').get().then((doc) => {
            getUserName.textContent = doc.data().userName;
        })
        function getData(){
            db.collection('userData').doc(auth.O+'_page_'+bageCount).get().then((doc) => {
                textArea.value = doc.data().textArea;
                today.value = doc.data().toDay;
                footerLine.value = doc.data().songQuoces;
                songName.textContent = doc.data().songName;
                titel.textContent = doc.data().titel;
            }).catch(()=>{
                db.collection('userData').doc(auth.O+'_page_'+bageCount).set({
                    textArea : '',
                    toDay : '',
                    songQuoces : '',
                    songName : '',
                    titel : 'Titel',
                });
            })
        }
        document.addEventListener('keyup',e => {
            db.collection('userData').doc(auth.O+'_page_'+bageCount).get().then((doc) => {
                if (doc.exists && auth.O) {
                    db.collection('userData').doc(auth.O+'_page_'+bageCount).update({
                        textArea : textArea.value,
                        toDay : today.value,
                        songQuoces : footerLine.value,
                        songName : songName.textContent,
                        titel : titel.textContent,
                    })
                }
            })
        })
    
    
    }      


    //open and close bobUp
    let navItem = document.querySelectorAll('.navItem');
    const overlay = document.querySelector('.overlay');
    navItem.forEach(e => {
        e.addEventListener('click', el => {
            const bobup = document.getElementById(el.target.getAttribute('data-id'));
            bobup.classList.add('activebob');
            overlay.classList.add('active');
        })
    })
    overlay.addEventListener('click',()=>{
        overlay.classList.remove('active');
        navItem.forEach((el , index) => {
            let clabob = document.querySelector('.bobup');
            let closeSingUp = document.querySelector('.bobup-singUp');
            clabob.classList.remove('activebob');
            closeSingUp.classList.remove('activebob');
        })
    })
    document.addEventListener('click', () =>{
        if(overlay.classList.contains('active')){
            body.classList.add('over');
        }else{
            body.classList.remove('over');
        }
    });
    //listen for auth status changes
    auth.onAuthStateChanged(user =>{
        if(user){
            showData();
            setupUI(user);
            app()
        }else{
            content.innerHTML = '';
            Applog()
            setupUI()
            loginFb()
        }
    });
    //sin up
    const singUpForm = document.querySelector('#singUp-form');
    singUpForm.addEventListener('submit', (e) =>{
        e.preventDefault()
        const email = singUpForm['singUp-email'].value;
        const password = singUpForm['singUp-pass'].value;
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            const userName = singUpForm['singUp-name'];
            return db.collection('userData').doc(cred.user.uid+'_page_0').set({
                userName: userName.value,
                textArea : '',
                toDay : '',
                songQuoces : '',
                songName : '',
                titel : 'Titel' ,
            }).then(()=>{
                return db.collection(cred.user.uid)
            }).then(()=>{
                overlay.click()
                singUpForm.reset();
            })
        }).catch(err =>{
            const errMassage = document.querySelector('.singerr');
            errMassage.textContent = err.message;
            errMassage.classList.add('activebob')
            setTimeout(() => {
                errMassage.classList.remove('activebob')
            }, 3000);
        })
    });
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
        'display': 'popup'
    });      
    const fbBtn = document.querySelector('.fbBtn');
    fbBtn.addEventListener('click', (e) =>{
        e.preventDefault();
        auth.signInWithPopup(provider).then((cred) => {
            const userName = singUpForm['singUp-name'];
            return db.collection('userData').doc(cred.user.uid).set({
                userName: 'Default User Name',
                textArea : '',
                toDay : '',
                songQuoces : '',
                songName : '',
                titel : 'Title Here',
            }).then(()=>{
                return db.collection(cred.user.uid)
            }).then(()=>{
                overlay.click()
                singUpForm.reset();
            })
        })
    });
    //log out
    const logOut = document.querySelector('#logOut');
    logOut.addEventListener('click', e =>{
        e.preventDefault();
        auth.signOut();
    })
    //log in
    function logInForm (){  
        const logInForm = document.querySelector('#logIn-form');
        logInForm.addEventListener('submit', (e) =>{
            e.preventDefault()
            const email = logInForm['logIn-email'].value;
            const password = logInForm['logIn-pass'].value;
            
            auth.signInWithEmailAndPassword(email, password).then(cred => {
                overlay.click()
                singUpForm.reset();
            }).catch(err =>{
                const errMassage = document.querySelector('.logerr');
                errMassage.textContent = err.message;
                errMassage.classList.add('activebob')
                setTimeout(() => {
                    errMassage.classList.remove('activebob')
                }, 3000);
            })
        });
    }
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
