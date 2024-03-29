const content = document.querySelector('.content');
const LoggedInLink =  document.querySelectorAll('.Logged-in');
const LoggedOutLink =  document.querySelectorAll('.Logged-out');
const account = document.querySelector('#account #dataInfo');

let setupUI = (user) =>{
    if(user){
        const userEmail = document.querySelector('.userEmail');
        userEmail.textContent =  user.email;
        LoggedInLink.forEach(item => item.style.display = 'block');
        LoggedOutLink.forEach(item => item.style.display = 'none');
        
    }else{
        // userEmail.textContent = '';
        LoggedInLink.forEach(item => item.style.display = 'none');
        LoggedOutLink.forEach(item => item.style.display = 'block');
    }
}

let showData = () =>{
    let dataHTML = `
    <!-- top title -->
    <div class="title-top">
        <h2 contenteditable="true" id="titel"></h2>
        <!-- <h2 contenteditable="true" id="subTitel">sub title</h2> -->
    </div>
    
    <!-- top body -->
    <div class="note-body-top">
        <div class="left">
                <div class="box-left-top">
                        <p>today is</p>
                        <textarea id="today" name="day"></textarea>
                        <!-- <img src="font/custom.svg" alt="custom icon"> -->
                    </div>
                    <div class="box-left-bottom">
                        <fieldset>
                            <legend>To Do List</legend>
                            <form class="addcontiner">
                                <input type="text"  name="inputValue" placeholder="Add To Do List" class="addInput" autocomplete="off">
                                <button class="addCheckbox">Add</button>
                            </form>
                            <ul class="boxs">
                            </ul>
                        </fieldset>
                    </div>
                    
                </div>
            <div class="lines" >
                <textarea name="note" id="textarea" class="textar"></textarea>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>    
        </div>
        
    <!-- footer -->
    <footer>
        <textarea id="footerLine" class="footer-line"></textarea>
        <div class="footer-title">
            <p>Todays Song Quoces</p>
        </div>    
        <div class="icons">
            <div class="icon-box">
                <i class="flaticon-quote-1"></i>
            </div>
            <div class="icon-box">
                <i class="flaticon-quote"></i>
            </div>
        </div>
        <div class="footer-name">
            <span class="name"> Song name</span>
            <span id="songName" class="line" contenteditable></span>
        </div>
        <div class="logo">
            <h2>دَوَّنَهَا</h2>
        </div> 
    </footer>
    <a href="/" class="addNewDay">Add Page</a>
`
content.innerHTML = dataHTML;
}

function Applog(){
    let dataHTML = ` 
        <div class="logInBadge">
        <img src="logo.png" alt="logo" class="logoImg"> 
            <div class="logInmain bobup-logIn active " id="login" >
                <h2>LogIn</h2>
                <p class="errMassage logerr"></p>
                <form id="logIn-form">
                    <input type="email" id="logIn-email" placeholder="Email" required>
                    <input type="password" id="logIn-pass" placeholder="Password" required>
                    <button>Log In</button>
                    <div class="fbDiv"> LogIn With <a href="#" class="fbBtnlog">Facebook</a> </div>
                </form>
            </div>
        </div>    
    `
    content.innerHTML = dataHTML;
    logInForm ()
}
function loginFb (){
    const fbBtnlog = document.querySelector('.fbBtnlog');
    fbBtnlog.addEventListener('click', (e) =>{
        e.preventDefault();
        auth.signInWithPopup(provider)
    })
}
