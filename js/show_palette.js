/*
	Эта функция отрисовывает или скрывает палитру аннотаций
*/

function show_palette()
{
	var palette = document.getElementById("palette"); //дескриптор блока #palette
	if (palette.style.display == "none") //если окно скрыто
	{
		palette.style.display = "block"; //отрисовываем
	}
	else
	{
		palette.style.display = "none"; //а иначе скрываем
	}
}