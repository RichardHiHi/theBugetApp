//buget controller
var budgetcontroller = (function () {
  var income = function (id, des, val) {
    this.description = des;
    this.value = val;
    this.id = id;
  };

  var expense = function (id, des, val) {
    this.description = des;
    this.value = val;
    this.id = id;
  };
  var data = {
    allItem: {
      exp: [],
      inc: [],
    },
    total: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percent: -1,
  };

  var calculateTotal = function (type) {
    var sum = 0;
    data.allItem[type].forEach(function (cur) {
      sum += +cur.value;
    });
    data.total[type] = sum;
  };

  var calculateBudgetIn = function (expense, income) {
    data.budget = income - expense;
  };
  var calculatePercentIn = function (expense, income) {
    if (income !== 0) {
      data.percent = Math.round((expense / income) * 100);
    }
  };
  return {
    addItem: function (type, des, val) {
      var newItem, id;
      //create new id
      if (data.allItem[type].length > 0) {
        id = data.allItem[type][data.allItem[type].length - 1].id + 1;
      } else {
        id = 0;
      }

      // create new item based on inc or exp

      if (type === "exp") {
        newItem = new expense(id, des, val);
      } else if (type === "inc") {
        newItem = new income(id, des, val);
      }
      //push item to data
      data.allItem[type].push(newItem);

      return newItem;
    },
    calculateTotals: function () {
      calculateTotal("exp");
      calculateTotal("inc");
    },
    calculateBudget: function () {
      calculateBudgetIn(data.total.inc, data.total.exp);
    },
    calculatePercent: function () {
      calculatePercentIn(data.total.exp, data.total.inc);
    },
    test: function () {
      console.log(data);
    },
  };
})();

//UI controller
var UIcontroller = (function () {
  var DOMString = {
    type: ".add__type",
    description: ".add__description",
    value: ".add__value",
    btn: ".add__btn",
    list: {
      inc: ".income__list",
      exp: ".expenses__list",
    },
    input: {
      des: ".add__description",
      val: ".add__value",
    },
    budget: {
      value: ".budget__value",
      inc: ".budget__income--value",
      exp: ".budget__expenses--value",
      percent: " .budget__expenses--percentage",
    },
  };
  return {
    // get input data

    getInput: function () {
      return {
        type: document.querySelector(DOMString.type).value,
        description: document.querySelector(DOMString.description).value,
        value: parseFloat(document.querySelector(DOMString.value).value),
      };
    },
    getDOMString: function () {
      return DOMString;
    },

    addItemUI: function (obj, type) {
      var html, newHtml, element;
      //create html and new html

      if (type === "inc") {
        element = DOMString.list.inc;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMString.list.exp;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // replace id val des to html to newhtml

      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);
      //insert the html into the DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
      //
    },
    //clear form after done
    clearField: function () {
      var array = document.querySelectorAll(
        DOMString.input.des + "," + DOMString.input.val
      );

      var arrField = Array.prototype.slice.call(array);
      arrField.forEach((element) => {
        element.value = "";
      });
      array[0].focus();
    },
  };
})();

//controller
var controller = (function (budgetCtrl, UICtrl) {
  var setUpEventListener = function () {
    document
      .querySelector(getDOMString.btn)
      .addEventListener("click", ctrlAddItem);

    addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var getDOMString = UICtrl.getDOMString();

  var updateBudget = function () {
    //calculate total expen and income
    budgetCtrl.calculateTotals();
    budgetCtrl.test();
    //calculate budget
    budgetCtrl.calculateBudget();
    //calculate percentage
    budgetCtrl.calculatePercent();
  };

  var ctrlAddItem = function () {
    // get the input data

    var dataInput = UICtrl.getInput();
    console.log(dataInput);
    if (
      dataInput.description !== "" &&
      !isNaN(dataInput.value) &&
      dataInput.value > 0
    ) {
      // add the item to the budget controller
      var obj = budgetCtrl.addItem(
        dataInput.type,
        dataInput.description,
        dataInput.value
      );
      // add the item to the UI
      console.log(obj);
      UICtrl.addItemUI(obj, dataInput.type);
      //clear field
      UICtrl.clearField();
      //update budgetcontroller
      updateBudget();
    }
  };
  return {
    init: setUpEventListener,
  };
})(budgetcontroller, UIcontroller);

controller.init();
