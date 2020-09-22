//buget controller
var bugetcontroller = (function(){
    return{
        test : function(a) {
            console.log(a)
        }
    }
});



//UI controller
var UIcontroller = (function(){

});


//controller
var controller = (function(budgetCtrl,UICtrl){

    var ctrlAddItem = function(){
         // get the input data
        console.log("thanh")
        // add add the item to the budget controller

        // add the item to the UI

        // calcular the budget 

        // display the budget on the UI

    }
    document.querySelector('.add__btn').addEventListener('click',function () {
       ctrlAddItem();
    });

    addEventListener('keypress', function(){
        if(event.keyCode === 13 || event.which ===13){
            ctrlAddItem();
        }
    })
})(bugetcontroller,UIcontroller);