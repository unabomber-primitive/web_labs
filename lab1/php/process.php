<?php

if (isset($_POST["x_value"]) && isset($_POST["y_value"]) && isset($_POST["r_value"])) {

    $x = $_POST["x_value"];

    $y = trim($_POST["y_value"]);
    if ($y == 0) {
    $y = 0;
    }
    $r = $_POST["r_value"];

    date_default_timezone_set('Europe/Moscow');
    $startTime = microtime(true);
    $currentTime = date("H:i:s");

    if (validateX($x)=="" and validateY($y)=="" and validateR($r)=="") {

        if (circleHitted($x, $y, $r) or rectangleHitted($x, $y, $r) or triangleHitted($x, $y, $r)) {

            sendAnswer("true", $x, $y, $r, $currentTime, $startTime);

        } else {

            sendAnswer("false", $x, $y, $r, $currentTime, $startTime);

        }

    } else {
    http_response_code(400);
    echo "Data is not valid.".validateX($x).validateY($y).validateR($r);
    }

} else {
    http_response_code(400);
    echo "Data is incorrect. Не все значения отправлены.";
}

function validateX($x)
{
    $xValues = ['-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3'];
    return in_array($x, $xValues) ? "" : "Значение Х должно быть целым числом от -5 до 3. ";
}

function validateY($y)
{
    if ($y =='') {
    return "Вы отправили пустую строку вместо Y. ";
    }

    if (count(explode(' ', $y)) > 1) {
    return "Уберите пробелы в Y. ";
    }

    if (strlen($y > 10)) {

    return "Введено больше 10 символов в Y. ";
    }

    if ($y >= 5 or $y <= -3) {
    return "Значение Y выходит за пределы промежутка. ";
    }

    return "";
}

function validateR($r)
{
    $rValues = ['1', '1.5', '2', '2.5', '3'];
    return in_array($r, $rValues) ? "" : "Выберите одно из пяти значений R. ";
}

function rectangleHitted($x, $y, $r)
{
    return (0  <= $x and $x <= $r) and (0 >= $y and $y >= - $r);
}

function circleHitted($x, $y, $r)
{
    return $x <= 0 and $y <= 0 and sqrt($x * $x + $y * $y) <= $r;
}

function triangleHitted($x, $y, $r)
{
    return $x <= 0 and $y >= 0 and $y <= 2 * $x + $r;
}

function sendAnswer($isHitted, $x, $y, $r, $currentTime, $startTime)
{

    $executionTime = (int)((microtime(true) - $startTime) * 1000000);

    echo "<tr>
    <td>$x</td>
    <td>$y</td>
    <td>$r</td>
    <td>$currentTime</td>
    <td>$executionTime ms</td>
    <td>$isHitted</td>
    </tr>";
}

?>
