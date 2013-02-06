/*
	Эта функция удаляет лишнюю аннотацию из списка
*/

function delete_cat(str, cat)
{
	var res = ''; 
	var arr = str.split('\n'); //разделяем строку на массив
	var i;
	var add;
	var k = 0;
	for (i = 0; i < arr.length; i++)
	{
		if (arr[i].charAt(arr[i].length-1) == "\n") 
		{
			arr[i] = arr[i].substr(0, arr[i].length-1);
		}
		if (arr[i] == cat && k == 0)
		{
			add = '';
			k++;
		}
		else 
		{
			add = arr[i]+"\n";
		}
		res += add;
	}
	res = res.substr(0, res.length-1);
	return res;
}