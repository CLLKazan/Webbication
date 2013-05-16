//эта функция возвращает переменную ajax

function AjaxRequest()
{
    var ajaxRequest;
    
    try
    {
        ajaxRequest = new XMLHttpRequest(); //стандартный способ
    }
    catch (e)
    {
        try
        {
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP"); //для IE
        }
        catch (e)
        {
            try
            {
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP"); //тоже IE
            }
            catch (e)
            {
                alert("Ваш браузер не поддерживает AJAX"); //Браузер не поддерживает Ajax
                document.location.href = "catalog.php";
                return false;
            }
        }
    }
    return ajaxRequest;
}