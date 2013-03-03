function get_annotations_list(pos1, pos2) {
	var childs = new Array(); //здесь будут храниться побочные аннотации, которые расположены в позиции, на которую указывает курсор (pos)
	var k = 0; //кол-во побочных аннотаций
	var min = 1000000000; //инициализация
	var max = -1000000000;
	for (var i = 0; i < count_of_points/2; i++)
	{
		if (annotations[i]['start'] <= pos1 && annotations[i]['end'] >= pos1) //если pos1 находится между концом и началом аннотации
		{
			if (annotations[i]['start'] < min) min = annotations[i]['start']; //запоминаем самую левую точку
			if (annotations[i]['end'] > max) max = annotations[i]['end']; //запоминаем самую правую точку
			childs[k] = annotations[i]; //добавляем аннотацию в побочные
			k++;
		}
		else if (annotations[i]['start'] <= pos2 && annotations[i]['end'] >= pos2) //если pos2 находится между концом и началом аннотации
		{
			if (annotations[i]['start'] < min) min = annotations[i]['start']; //запоминаем самую левую точку
			if (annotations[i]['end'] > max) max = annotations[i]['end']; //запоминаем самую правую точку
			childs[k] = annotations[i]; //добавляем аннотацию в побочные
			k++;
		}
		else if (annotations[i]['start'] >= pos1 && annotations[i]['start'] <= pos2) { //если начало находится между pos1 и pos2
			if (annotations[i]['start'] < min) min = annotations[i]['start']; //запоминаем самую левую точку
			if (annotations[i]['end'] > max) max = annotations[i]['end']; //запоминаем самую правую точку
			childs[k] = annotations[i]; //добавляем аннотацию в побочные
			k++;
		}
		else if (annotations[i]['start'] >= pos2 && annotations[i]['start'] <= pos1) { //если начало находится между pos1 и pos2
			if (annotations[i]['start'] < min) min = annotations[i]['start']; //запоминаем самую левую точку
			if (annotations[i]['end'] > max) max = annotations[i]['end']; //запоминаем самую правую точку
			childs[k] = annotations[i]; //добавляем аннотацию в побочные
			k++;
		}
	}
	
	var p = 20;
	var ann_list = new Object();
	for (var i = 0; i < k; i++) {
		var str = get_complex_annotation(childs[i]["start"], childs[i]["end"]);
		if (str.length > p) {
			str = "["+childs[i]["category"]+"]["+str.length+"]"+str.substr(0, 17)+"...";
		}
		else {
			str = "["+childs[i]["category"]+"]"+str;
		}
		str +="&nbsp;&nbsp;&nbsp;";
		ann_list[childs[i]['id']] = {
			name: str
		}
		ann_list[childs[i]['id']].items = new Object();
		ann_list[childs[i]['id']].items["edit"+childs[i]['id']] = {
			name: "edit",
			icon: "edit",
			callback: function(key, opt) {
				
			}
		}
		ann_list[childs[i]['id']].items["delete"+childs[i]['id']] = {
			name: "delete",
			icon: "delete",
			callback: function(key, opt) {
				var s = key;
				s = s.substr(s.indexOf("delete")+6);
				delete_annotation(s);
			}
		}
	}
	return ann_list;
}