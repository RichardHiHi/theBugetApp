//buget controller
var bugetcontroller = (function(){
  
})();



//UI controller
var UIcontroller = (function(){
     var DOMString ={
        type : '.add__type',
        description: '.add__description',
        value : '.add__value',
        btn : '.add__btn'
        }  ;
     
    return{
        // get input data 
        getInput : function(){
            return{
                Type : document.querySelector(DOMString.type).value,
                description : document.querySelector(DOMString.description).value,
                Value : document.querySelector(DOMString.value).value
            };        
        },

        getDOMString : function(){
            return DOMString;
        }
    };
})();


//controller
var controller = (function(budgetCtrl,UICtrl){
    
    var getDOMString = UICtrl.getDOMString();

    var ctrlAddItem = function(){
         // get the input data
        var input = UICtrl.getInput();
        console.log(input);
        // add the item to the budget controller
        
        // add the item to the UI

        // calcular the budget 

        // display the budget on the UI

    }
    
    document.querySelector(getDOMString.btn).addEventListener('click',ctrlAddItem);

    
    addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which ===13){
            ctrlAddItem();
        }
    });
})(bugetcontroller,UIcontroller);