function NoOp()
{}

var btnSelected;
var blockSelected;
var pastBlock;


function FindInfoBlock(btn, cls)
{
	var obj;
	obj = btn.parentNode;
	if (obj && obj.tagName == "LI") obj = obj.parentNode;
	if (obj && obj.tagName == "UL") obj = obj.parentNode;
	if (obj && obj.tagName == "LI")
	{
		// Search children
		for (i=0; i < obj.childNodes.length; i++)
		{
			if (obj.childNodes[i].className == cls)
				return obj.childNodes[i]
		}
	}
	return null;
	
}

var unscrollCount;

function UnselectBtn()
{
	btnSelected.className = "";
	unscrollCount = 5;
	pastBlock = blockSelected;
	blockSelected = null;
	
	pastBlock.style.overflow = 'hidden';
	
	setTimeout('ScrollClose()',10);
}


function ScrollClose()
{
	if (!pastBlock) return;
	
	var l = pastBlock.style.height.length;
	var h = pastBlock.style.height.substring(0, l-2);
	
	l = 1*h - 20;


	h = l+"px";
	
	if (l < 0)
	{
		pastBlock.style.display='none';
		pastBlock=null;
		return;
	}
	pastBlock.style.height = h;
	setTimeout('ScrollClose()',10);
	
}

function ScrollOpen()
{
	if (!blockSelected) return;
	
	if (blockSelected.style.display != "block") {
		blockSelected.style.display = "block";
	}
	
	var l = blockSelected.style.height.length;
	var h = blockSelected.style.height.substring(0, l-2);
	
	l = 1*h + 20;
	h = l+"px";
	if (l < 200) {
		blockSelected.style.height = h;
		setTimeout('ScrollOpen()', 10);
	}
	else
		blockSelected.style.overflow = 'auto';

	//else
	//	blockSelected.style.height = '';
}

function SelectBtn(btn, cls)
{
	var timeout = 10;
	if (btnSelected) {
		UnselectBtn();
		timeout = 110;
	}
	
	if (btnSelected != btn) {
		btnSelected = null;
		
		// Find the parent div with class name "bibtex"
		var block = FindInfoBlock(btn, cls);
		
		if (!block) {
			return;
		}
		
		btn.className = "selected";
		block.style.height = "0px";

		btnSelected = btn;
		blockSelected = block;
		
		setTimeout('ScrollOpen()', timeout);
		
	}
	else {
		btnSelected = null;
		blockSelected = null;
	}
}
	