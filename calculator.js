$(document).ready(function() {
  
   var input = '';
   var lastClass='number';

  $('button').click(function() {
    entry = $(this).attr("value");
    var clase = $(this).attr("class");
    if (entry=="C")
    {
    	 input='';
    	 document.getElementById("secondaryinput").value='';
    }
    else if (lastClass=='op' && clase=='op')
    {
       input=input.substring(0, input.length-1)+entry;
    }
    else
     {
       //Si el anterior botón fue '=', meter un número reiniciará el número
       if (document.getElementById("maininput").value==  document.getElementById("secondaryinput").value && clase=='number')
       {
           input=entry;
          document.getElementById("secondaryinput").value='';
       }
       else
       {
         input=input+entry;
       }
     }
    lastClass=clase;
    document.getElementById("maininput").value= input;
    if (entry=='=')
    {
        document.getElementById("maininput").value= obtainResult(input);
        document.getElementById("secondaryinput").value= document.getElementById("maininput").value;
        input=document.getElementById("maininput").value;
      lastClass='number';
    }
  });
  
  function obtainResult(input)
  {
    var number1="";
    var number2="";
    var operation="";
    for (i in input)
    {
      if (isNumber(input[i]))
       {
    	  if (operation=="")
    	{
    		  number1=number1.toString().concat(input[i]);
    	}
    	  else
    	{
    	  number2=number2.toString().concat(input[i]);
    	}
    }
      else
       {
    	 if (operation!="")
         {
    		 if (operation=="+" && number1!="")
	         {
	           number2=parseFloat(number1)+parseFloat(number2);
	           number1=number2;
	         }
	         else if (operation=="-" && number1!="")
	        {
	           number2=parseFloat(number1)-parseFloat(number2);
	           number1=number2;
	        }
	         else if (operation=="X" && number1!="")
	        {
	           number2=parseFloat(number1)*parseFloat(number2);
	           number1=number2;
	        }
	         else if (operation=="/" && number1!="")
	        {
	           number2=parseFloat(number1)/parseFloat(number2);
	           number2=Math.round(number2 * 10000) / 10000;
	           number1=number2;
	        }
         }
    	 operation=input[i];
       }
    }
    return number1==''?'0':number1;
  }
  
});
  
   function isNumber(c)
  {
    return (c >= '0' && c <= '9');
  };

