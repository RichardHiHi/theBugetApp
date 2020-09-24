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
        btn        : '.add__btn',
        list       :{
                     inc : '.income__list',
                     exp : '.expenses__list'
        } 
    };
    return{
        // get input data 

        getInput : function(){
            return{
                type        : document.querySelector(DOMString.type).value,
                description : document.querySelector(DOMString.description).value,
                value       : document.querySelector(DOMString.value).value
            };
        },
        getDOMString : function(){
            return DOMString;
        },
        addItemUI : function(obj ,type ){
            var html , newHtml; 
            //create html and new html

            if(type === 'inc'){
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
    
            }else if( type === 'exp'){
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            // replace id val des to html to newhtml

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%',obj.description );
            newHtml = newHtml.replace('%value%',obj.value);
            //insert the html into the DOM

            document.querySelector('.income__list').insertAdjacentHTML('beforeend', newHtml);
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
            var dataInput = UICtrl.getInput();
            console.log(dataInput);
        // add the item to the budget controller
            var obj = budgetCtrl.addItem(dataInput.type , dataInput.description , dataInput.value);
        
        // add the item to the UI
            console.log(obj)
            UICtrl.addItemUI(obj,dataInput.type);

        // calcular the budget 

        // display the budget on the UI

    }
    return{
        init : setUpEventListener
    }
})(bugetcontroller,UIcontroller);

controller.init();

