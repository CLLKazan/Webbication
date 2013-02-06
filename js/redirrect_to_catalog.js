function redirrect_to_catalog()
{
	if (this.readyState == 4)
	{
		if (this.status == 200)
		{
			document.location.href = "catalog.php";
		}
	}
}