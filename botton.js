class Botton {

  constructor() {
    this.button = createButton('Complited!!');
   }
  hide(){
    this.button.hide();
  }

  display(){
    this.button.position(300,300);

    this.button.mousePressed(()=>{
      this.button.hide();
    });
  }
}