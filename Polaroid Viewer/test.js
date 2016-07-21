$(function() {
	var currentImage = 0;
	$images = $('#slideshow IMG');
	var imageCount = $images.length;
	
	$.each($images, function(key) {
		var width = $(this).width();
		if (key == 0)
		{
			$(this).css({
				"left" : "0px"
			});
		}
		else if (key == imageCount-1)
		{
			$(this).css({
				"left" : -width+"px"
			});
		}
		else if (key == 1)
		{
			$(this).css({
				"left" : width+"px"
			});
		}
		else
		{
			$(this).css({
				"left" : width+"px"
			});
		}
		$('#bullets').append("<a href='#' id='"+key+"'>&bull;</a>");
	});
	
	//Make sure the first bullet is highlighted
	checkHighlight();
	
	//Center bullets against the Slideshow
	resize();
	
	$("#nextLink").click(function() {
		shuffleImages(1);
		resize();
		checkHighlight();
	});
	
	$("#prevLink").click(function() {
		shuffleImages(-1);
		resize();
		checkHighlight();
	});
	
	var shuffleImages = (function(index) {
		currentImage += index;
		if (currentImage >= imageCount)
		{
			currentImage -= imageCount;
		}
		if (currentImage < 0)
		{
			currentImage += imageCount;
		}
		var setInvisible = (function(value) {
			$.each($images, function(key) {
				if (value == 0)
				{
					if (value == key || imageCount-1 == key || value+1 == key)
					{
						$(this).show();
					} else
					{
						$(this).hide();
					}
				} else if (value == imageCount-1)
				{
					if (value == key || value-1 == key || key == 0)
					{
						$(this).show();
					} else
					{
						$(this).hide();
					}
				} else
				{
					if (value == key || value-1 == key || value+1 == key)
					{
						$(this).show();
					}
					else
					{
						$(this).hide();
					}
				}
			});
		});
		setInvisible(currentImage, index);
		var halfWay = imageCount/2;
		$.each($images, function(key) {
			var width = $(this).width();
			if (currentImage == 0)
			{
				if (key == currentImage)
				{
					$(this).animate({
						"left" : "0px"
					});
				} else if (key == currentImage+1)
				{
					$(this).animate({
						"left" : width+"px"
					});
				} else if (key == imageCount-1)
				{
					$(this).animate({
						"left" : -width+"px"
					});
				} else if (key > currentImage+1 && key < halfWay)
				{
					$(this).animate({
						"left" : width+"px"
					});
				} else if (key < imageCount-1 && key >= halfWay)
				{
					$(this).animate({
						"left" : -width+"px"
					});
				}
			} 
			else if (currentImage == imageCount-1)
			{
				if (key == currentImage)
				{
					$(this).animate({
						"left" : "0px"
					});
				} else if (key == 0)
				{
					$(this).animate({
						"left" : width+"px"
					});
				} else if (key == currentImage-1)
				{
					$(this).animate({
						"left" : -width+"px"
					});
				} else if (key > 0 && key < halfWay)
				{
					$(this).animate({
						"left" : width+"px"
					});
				} else if (key < imageCount-2 && key >= halfWay)
				{
					$(this).animate({
						"left" : -width+"px"
					});
				}
			} 
			else if (currentImage == 1)
			{
				if (key == currentImage)
				{
					$(this).animate({
						"left" : "0px"
					});
				} else if (key == currentImage-1)
				{
					$(this).animate({
						"left" : -width+"px"
					});
				} else if (key == imageCount-1)
				{
					$(this).animate({
						"left" : -width+"px"
					});
				} else if (key == currentImage+1)
				{
					$(this).animate({
						"left" : width+"px"
					});
				}
			}
			else if (currentImage == imageCount-2)
			{
				if (key == currentImage)
				{
					$(this).animate({
						"left" : "0px"
					});
				} else if (key == currentImage-1)
				{
					$(this).animate({
						"left" : -width+"px"
					});
				} else if (key == 0)
				{
					$(this).animate({
						"left" : width+"px"
					});
				} else if (key == currentImage+1)
				{
					$(this).animate({
						"left" : width+"px"
					});
				}
			}
			else
			{
				if (key == currentImage)
				{
					$(this).animate({
						"left" : "0px"
					});
				} else if (key > currentImage)
				{
					$(this).animate({
						"left" : width+"px"
					});
				} else if (key < currentImage)
				{
					$(this).animate({
						"left" : -width+"px"
					});
				}
			}
		});
	});
	
	function checkHighlight() {
		var $dots = $('#bullets a');
		for (var i = 0; i < imageCount; i++)
		{
			if (i == currentImage)
			{
				$('#'+i).css({
					"color" : "darkgrey"
				});
			} else
			{
				$('#'+i).css({
					"color" : "black"
				});
			}
		}
	}
	
	function resize() {
		var img = null;
		$.each($images, function(key) {
			if (key == currentImage) {
				img = $(this);
			}
		});
		
		var image_width = img.width();
		var image_height = img.height();
		
		var padding = parseInt($('#slideshow_border').css("padding"));
		var padding_bot = parseInt($('#slideshow_border').css("padding-bottom"));
		var $bullets = $('#bullets');
		var bullets_width = parseInt($bullets.innerWidth());
		var left = (128 + ((image_width + padding*2)/2 - bullets_width/2));
		var height = (47 + image_height + padding + padding_bot);
		console.log(image_width);
		console.log(image_height);
		console.log(padding);
		console.log(bullets_width);
		$bullets.animate({
			"left" :  left + "px",
			"top" : height + "px"
		});
		
		$('#slideshow_border').animate({
			"width" : image_width+"px",
			"height" : image_height+"px"
		});
		
		$('#slideshow').animate({
			"width" : image_width+"px",
			"height" : image_height+"px"
		});
		
		$('#c_slideshow').animate({
			"width" : (image_width + 256 + padding*2) + "px",
			"height" : (image_height + padding + padding_bot) + "px"
		});
		
	}
});