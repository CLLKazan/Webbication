/*
	Эта функция обновляет аннотацию (изменяет ее категорию)
*/

function update_annotation(ann) //параметр ann - id аннотации
{
	var str = "sel_"+ann; //получаем id блока select, соответствующего аннотации
	var ObjSel = document.getElementById(str);
	var cat; //переменная, в которой будет храниться выбранная категория
	if (ObjSel.selectedIndex != -1) //если хоть что-нибудь выбрано
	{
		cat = ObjSel.options[ObjSel.selectedIndex].value; //присваиваем cat id нужной категории
	}
	else return;
	if (cat == 0) //если cat == 0, значит, в списке выбрано "Выберите категорию"
	{
		alert("Выберите категорию!");
	}
	
	var request = AjaxRequest(); //ajax переменная
	
	params = "id="+id+"&ann_id="+ann+"&cat="+cat; //параметры
	request.open("POST", "php/update_annotation.php", false); //соединяемся с сервером
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //heider'ы, указывающие, что параметры будут переданы методом POST
	request.setRequestHeader("Content-length", params.length);
	request.setRequestHeader("Connection", "close");
	
	request.onreadystatechange = re_annotate;//функция, вызываемая при изменении состояния запроса
	
	request.send(params); //отправляем параметры
}