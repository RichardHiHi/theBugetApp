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
    percentExp: [],
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
  var deleteItemIN = function (id, type) {
    var nameArray;
    console.log(typeof id);
    console.log(id);
    console.log(type);
    if (type === "income") {
      nameArray = "inc";
    } else if (type === "expense") {
      nameArray = "exp";
    }
    data.allItem[nameArray].forEach(function (value, index, array) {
      if (value.id === id) {
        data.allItem[nameArray].splice(index, 1);
      }
      console.log(value);
    });
    console.log(data.allItem[nameArray]);
  };
  var calculatePercentExpIn = function (expen) {};
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
    calculatePercentExp: function (expen) {
      var per = Math.round((expen / data.total.inc) * 100);
      data.percentExp.push(per);
      return per;
    },
    //get data budget
    getBudget: function () {
      return {
        arrExp: data.allItem.exp,
        exp: data.total.exp,
        inc: data.total.inc,
        percent: data.percent,
        budget: data.budget,
        percentExp: data.percentExp,
      };
    },
    test: function () {
      console.log(data);
    },
    //delete item of budget
    deleteItem: function (id, type) {
      deleteItemIN(id, type);
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
    listItem: ".container",
    itemPercent: ".item__percentage",
    month: ".budget__title--month",
  };
  var formatNumberIn = function (num, type) {
    var numSplit, int, dec;

    num = Math.abs(num);
    num = num.toFixed(2);
    numSplit = num.split(".");

    int = numSplit[0];

    if (int.length > 3) {
      int =
        int.substr(0, int.length - 3) +
        "," +
        int.substr(int.length - 3, int.length);
    }

    dec = numSplit[1];

    type === "inc" ? (sign = "+") : (sign = "-");
    return sign + " " + int + "." + dec;
  };
  var nodeListForEach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
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
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMString.list.exp;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // replace id val des to html to newhtml

      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", formatNumberIn(obj.value, type));
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
    //update UI of budget
    disPlayUIBudget: function (obj) {
      obj.budget > 0
        ? (budget = formatNumberIn(obj.budget, "inc"))
        : (budget = formatNumberIn(obj.budget, "exp"));

      document.querySelector(DOMString.budget.value).innerHTML = budget;

      document.querySelector(DOMString.budget.inc).innerHTML = formatNumberIn(
        obj.inc,
        "inc"
      );
      document.querySelector(DOMString.budget.exp).innerHTML = formatNumberIn(
        obj.exp,
        "exp"
      );
      document.querySelector(DOMString.budget.percent).innerHTML =
        obj.percent + "%";
    },
    //delete item of UI
    deleteItemUI: function (id) {
      console.log(id);
      document.querySelector("#" + id).remove();
    },
    updatePercentItem: function (percent) {
      var fields = document.querySelectorAll(DOMString.itemPercent);

      nodeListForEach(fields, function (current, index) {
        console.log(percent[index]);
        current.textContent = percent[index] + "%";
      });
    },
    updateMoth: function () {
      var now, year;
      now = new Date();
      year = now.getFullYear();
      document.querySelector(DOMString.month).innerHTML = year;
    },
    changeColor: function () {
      var field = document.querySelectorAll(
        DOMString.input.val + "," + DOMString.input.des + "," + DOMString.type
      );
      nodeListForEach(field, function (cur) {
        cur.classList.add("red-focus");
      });
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
    document
      .querySelector(getDOMString.listItem)
      .addEventListener("click", ctrlDeleteItem);
    document
      .querySelector(getDOMString.type)
      .addEventListener("change", UICtrl.changeColor);
  };

  var getDOMString = UICtrl.getDOMString();

  var updateBudget = function () {
    //calculate total expen and income
    budgetCtrl.calculateTotals();
    //calculate budget
    budgetCtrl.calculateBudget();
    //calculate percentage
    budgetCtrl.calculatePercent();
    //get budget
    var getBudget = budgetCtrl.getBudget();

    // update IU budget
    UICtrl.disPlayUIBudget(getBudget);
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
      //update percent of expen
      if (dataInput.type === "exp") {
        updatePercent(dataInput.value, obj.id);

        console.log(budgetCtrl.getBudget().percentExp);
      }
    }
  };
  var ctrlDeleteItem = function (event) {
    var id, idSlpit, type;
    idSlpit = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (idSlpit) {
      array = idSlpit.split("-");
      id = parseInt(array[1]);
      type = array[0];
    }
    //delete item from data
    budgetCtrl.deleteItem(id, type);
    //delete item from UI
    UICtrl.deleteItemUI(idSlpit);
    //caculate budget
    budgetCtrl.calculateTotals();
    budgetCtrl.calculatePercent();
    budgetCtrl.calculateBudget();
    //update UI after delete item
    UICtrl.disPlayUIBudget(budgetCtrl.getBudget());
  };
  var updatePercent = function (exp, id) {
    //caculate percent
    budgetCtrl.calculatePercentExp(exp);
    //read data from budget
    var percentExp = budgetCtrl.getBudget().percentExp;
    //update percent of UI
    UICtrl.updatePercentItem(percentExp);
  };
  return {
    init: function () {
      setUpEventListener();
      UICtrl.disPlayUIBudget({
        budget: 0,
        inc: 0,
        exp: 0,
        percent: 0,
      });
      UICtrl.updateMoth();
    },
  };
})(budgetcontroller, UIcontroller);

controller.init();
