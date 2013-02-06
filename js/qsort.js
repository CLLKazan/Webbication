/*
	Быстрая сортирвка массива points[]
*/

function qsort(a, l, r)
{
	var i = l;
	var j = r;
	var x;
	if (a[Math.floor((i+j)/2)])
	{
		x = a[Math.floor((i+j)/2)]['position'];
	}
	do
	{
		while (a[i]['position'] < x) i++;
		while (a[j]['position'] > x) j--;
		
		if (i <= j)
		{
			var temp = a[i]['position'];
			a[i]['position'] = a[j]['position'];
			a[j]['position'] = temp;
			temp = a[i]['type'];
			a[i]['type'] = a[j]['type'];
			a[j]['type'] = temp;
			temp = a[i]['category'];
			a[i]['category'] = a[j]['category'];
			a[j]['category'] = temp;
			temp = a[i]['r'];
			a[i]['r'] = a[j]['r'];
			a[j]['r'] = temp;
			temp = a[i]['g'];
			a[i]['g'] = a[j]['g'];
			a[j]['g'] = temp;
			temp = a[i]['b'];
			a[i]['b'] = a[j]['b'];
			a[j]['b'] = temp;
			i++;
			j--;
		}
	}while(i <= j);
	if (j > l) qsort(a, l, j);
	if (i < r) qsort(a, i, r);
}
