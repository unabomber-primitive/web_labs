function start() {

  let x = $('#x_value').val();
  let y = $('#y_value').val().trim();
  let r = $('#r_value').val();


  cleanErrorMessages();

  if (validateY(y) & validateX() & validateR()) {
    console.log($('form').serialize());
    $.ajax({
            type: "POST",
            url: './php/process.php',
            data: $('form').serialize(),
            console.log(data);
            success: function (data) {
              if (data != 'Data is not valid.') {
                let storage = window.sessionStorage;
                storage.setItem('table_data', (storage.getItem('table_data') != null ? storage.getItem('table_data') : '') + data);
                $('#result-table tr:last').after(data);
              }
            },
        });
  }
}

function validateY(y) {
    if (y === "") {
      setErrorFor("y", "Введена пустая строка!");
      return false;
    }

    if (y.split(' ').length > 1) {
      setErrorFor("y", "Введите число!");
      return false;
    }



    if (isNaN(parseInt(y)) || y.length > 10) {
      setErrorFor("y", "Пожалуйста, вводите число, состоящее не более чем из 10 знаков.");
      return false;
    }

    if (y >= 5 || y <= -3) {
      setErrorFor("y", "Пожалуйста, введите число, соответствующее промежутку.");
      return false;
    }

    return true;
  }
  //return true;

function validateX() {
  checkboxes = $('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      return true;
    }
  }

  setErrorFor("x", "Выберите одно из девяти значений!")
  return false;
}

function validateR() {
  radios = $('input[type="radio"]');
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return true;
    }
  }

  setErrorFor("r", "Выберите одно из пяти значений!")
  return false;
}

function cleanErrorMessages() {
    setErrorFor("x", "");
    setErrorFor("y", "");
    setErrorFor("r", "")
}

function setErrorFor(input, message) {
  $("." + input + "-error-message").html("<span>" + message + "</span>");
}
