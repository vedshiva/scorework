var BG,BGD,greeting,database,Question;
var score = 0;
var gameState=1;
var button,button2,button3,input,password;
var inputvalue,passwordvalue;


function preload (){
BG = loadImage ("BG.jpg");
BGD = loadImage ("images.jpg");
}
function setup(){
    canvas = createCanvas (400,400);
    //button =new Botton();
    
    button2 = createButton ('iogin');
    button3 = createButton ('sinup');

    database = firebase.database();

    input = createInput("user ID");

    password = createInput("password");
    

    var QuestionRef = database.ref('myTask/Q1');
    QuestionRef.on ("value",(data)=>{
    Question = data.val();})
    console.log (Question);
}

function draw (){
    if (gameState === 1){
        background (BGD);

        input.position(40 ,80);
        password.position(40 ,120);

        button2.position(300,300);

        button3.position(350,300);
    
        passwordvalue=password.value();

        inputvalue=input.value();

        button2.mousePressed(()=>{
        database.ref("/"+input.value()).on("value",(data)=>{
             var details = data.val();
             score = details.score;
        })
        gameState = 2;
        button = createButton ('complited!!');
        });

        button3.mousePressed(()=>{    
        database.ref("/"+input.value()).set({
            pwd:password.value(),
            score:0,
            date :  Date.now()
        })
        gameState = 2;
        button = createButton ('complited!!');
        });

    }
    if (gameState === 2){
    background (BG);

    input.hide();
    password.hide();

    button3.hide();
    button2.hide();
   //button.display();
   button.position(300,300);

   button.mousePressed(()=>{
   
    button.hide();
    score = score+10;
    database.ref("/"+inputvalue).update({
        score : score,
        date : database.SeverValue.TIMESTAMP
    })
   })
    fill(255);
    
    text (Question,60,150);
}
    text ("score: "+score,20,100);
}