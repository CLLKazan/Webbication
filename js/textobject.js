var textObject = {
		id: "",
		document: new Object(),
		annotations: new Array(),
		
		update: function() {
			this.getPostData("php/get_document.php", "id="+this.id, document);
			this.getPostData("php/get_annotations.php", "id="+this.id. annotations);
		}
		
		getPostData: function(url, params, object) {
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
		    
		    ajaxRequest.open("POST", url, false);
		    ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ajaxRequest.setRequestHeader("Content-length", params.length);
			ajaxRequest.setRequestHeader("Connection", "close");
			
			ajaxRequest.send(params);
			
			if (ajaxRequest.status == 200) {
				object = JSON.parse(ajaxRequest.responseText);
			}
		}
		
		annotateText: function() {
			
		},
		addAnnotation: function() {
			
		},
	};
textObject.id = 9;
//textObject.getAnnotations();
//console.log(JSON.stringify(textObject.annotations));