/*
	Эта функция возвращает строку с цветом в формате #XXXXXX.
*/
function GetColor(r, g, b)
{
	r = parseInt(r);
	g = parseInt(g);
	b = parseInt(b);
	var rs = "", gs = "", bs = "";
	if (r < 16)
	{
		rs = "0"+Number(r).toString(16);
	}
	else
	{
		rs = Number(r).toString(16)
	}
	if (g < 16)
	{
		gs = "0"+Number(g).toString(16);
	}
	else
	{
		gs = Number(g).toString(16)
	}
	if (b < 16)
	{
		bs = "0"+Number(b).toString(16);
	}
	else
	{
		bs = Number(b).toString(16)
	}
	var result = "#"+rs+gs+bs;
	return result;
}