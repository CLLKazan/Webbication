/*
	Эта функция возвращает true, если на цвет фона слишком темный, чтобы на нем можно было разобрать черный шрифт, а иначе false
*/
function IsDark(r, g, b)
{
	if (0.213*(r/255) + 0.715*(g/255) + 0.072*(b/255) < 0.6)
	{
		return true;
	}
	else return false;
}