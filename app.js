//buget controller
var bugetcontroller = (function(){
  var income = function(id,des,val){
      this.description = des
      this.value       = val
      this.id          = id
  };

var expense = function(id,des,val){
      this.description = des
      this.value       = val
      this.id          = id
  };

var data = {
      allItem : {
          exp : [],
          inc : []
      },
      total : {
          exp : 0,
          inc : 0
      }
}

  
  return{
      addItem : function(type, des , val){
        var newItem, id;
        //create new id
        if (data.allItem[type].length>0) {
            id = data.allItem[type][data.allItem[type].length-1].id + 1;
        }else{
            id = 0;
        }
        
        // create new item based on inc or exp

        if(type === 'exp'){
        
        newItem = new expense(id , des , val);

        }else if(type === 'inc'){
        
        newItem = new income(id , des , val);
        
        }
        //push item to data
        data.allItem[type].push(newItem);
        return newItem;

      },
  }
})();



//UI controller
var UIcontroller = (function(){
     var DOMString ={
        type       : '.add__type',
        description: '.add__description',
        value      : '.add__value',
        btn        : '.add__btn'
    };
    return{
        // get input data 
        getInput : function(){
            return{
                Type        : document.querySelector(DOMString.type).value,
                description : document.querySelector(DOMString.description).value,
                Value       : document.querySelector(DOMString.value).value
            };
        },
        getDOMString : function(){
            return DOMString;
        }
    };
})();


//controller
var controller = (function(budgetCtrl,UICtrl){
    
    var setUpEventListener = function(){
        document.querySelector(getDOMString.btn).addEventListener('click',ctrlAddItem);

    
    addEventListener('keypress', function(event){
        if(event.keyCode === 13 || event.which ===13){
            ctrlAddItem();
        }
    });
    }

    var getDOMString = UICtrl.getDOMString();

    var ctrlAddItem = function(){
         // get the input data
        var input = UICtrl.getInput();
        console.log(input);
        // add the item to the budget controller
        var dataInput = UICtrl.getInput();
        budgetCtrl.addItem(dataInput.Type , dataInput.description , dataInput.value);
        // add the item to the UI

        // calcular the budget 

        // display the budget on the UI

    }
    return{
        init : setUpEventListener
    }
})(bugetcontroller,UIcontroller);

controller.init();

