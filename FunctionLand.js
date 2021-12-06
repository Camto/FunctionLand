function map_x_to_y(val, min1, max1, min2, max2) {
	return (val - min1) / (max1 - min1) * (max2 - min2) + min2;
}

function hue(given) {
	color = given;
	
	for(var count = 0; count < 100; count++) {
		if(color > 360) {
			color -= 360;
		} else if(color < 0) {
			color += 360;
		} else {
			break;
		}
	}
	
	var red = green = blue = 0;
	if(color <= 60 || color >= 300) {
		red = 255;
	}
	if(color >= 60 && color <= 180) {
		green = 255;
	}
	if(color >= 180 && color <= 300) {
		blue = 255;
	}
	
	if(color >= 60 && color <= 120) {
		red = map_x_to_y(color, 60, 120, 255, 0);
	} else if(color <= 300 && color >= 240) {
		red = map_x_to_y(color, 240, 300, 0, 255);
	}
	if(color >= 0 && color <= 60) {
		green = map_x_to_y(color, 0, 60, 0, 255);
	} else if(color >= 180 && color <= 240) {
		green = map_x_to_y(color, 180, 240, 255, 0);
	}
	
	if(color >= 120 && color <= 180) {
		blue = map_x_to_y(color, 120, 180, 0, 255);
	} else if(color >= 300 && color <= 360) {
		blue = map_x_to_y(color, 300, 360, 255, 0);
	}
	
	return [Math.round(red), Math.round(green), Math.round(blue)];
}

screen = document.getElementById("FLand");
ctx = screen.getContext("2d");

FLand = ctx.createImageData(screen.width, screen.height);

w = FLand.width;
h = FLand.height;

function flatten_func() {
	func = prompt("What should be put in FunctionLand?", "[0, 0, 0]");
	if(func) render((x, y) => eval(func));
}

function render(func) {
	for(var y = 0; y < h; y++) {
		for(var x = 0; x < w; x++) {
			colors = func(x, y);
			FLand.data[(x * 4) + (y * w * 4)] = colors[0];
			FLand.data[(x * 4) + (y * w * 4) + 1] = colors[1];
			FLand.data[(x * 4) + (y * w * 4) + 2] = colors[2];
			FLand.data[(x * 4) + (y * w * 4) + 3] = colors[3] || 255;
		}
	}
	
	ctx.putImageData(FLand, 0, 0);
}

render(() => [0, 0, 0])