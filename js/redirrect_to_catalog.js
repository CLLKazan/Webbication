function redirrect_to_catalog()
{
	if (this.readyState == 4)
	{
		if (this.status == 200)
		{
			//alert(this.responseText);
			document.location.href = "catalog.php";
		}
	}
}