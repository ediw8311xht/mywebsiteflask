
var queue = [];

function piece_print_html(x, y, value) {
	if (value === 0) {
		value = "-";
	}
	$("#position" + x + "-" + y).text(value);
}

function queue_callback() {
	if (queue.length > 0) {
		let current_element = queue.shift();
		piece_print_html(current_element[0], current_element[1], current_element[2]);
	}
}


function SudokuBoard(initial_arr) {
	
	this.board_from_string = function(string) {
		string = string.replace(/[^0-9^\n]/g, "");
		let rows = string.split("\n");
		let board = rows.map((row) => { return row.split("").map((num) => Number(num));});
		return board;
	}
	
	if (typeof initial_arr === "string") {
		this.arr = this.board_from_string(initial_arr);
	}
	else {
		this.arr = initial_arr;
	}
	
	this.initiate_html = function() {
		$("#board").empty();
		for (let i = 0; i < 3; i++) {
			$("#board").append("<div class='row' id='column" + i + "' ></div>");
			for (let j = 0; j < 3; j++) {
				$("#column" + i).append("<div class='cell' id='cell" + i + "-" + j + "' ></div>");
				for (let width = 0; width < 3; width++) {
					for (let height = 0; height < 3; height++) {
						let value = this.arr[(i * 3) + width][(j * 3) + height];
						if (value === 0) {
							$("#cell" + i + "-" + j).append("<p class='space change' id='position"	+ ((i * 3) + width) + "-" + ((j * 3) + height) + "' '>" + "-" + "</p>");
						}
						else {
							$("#cell" + i + "-" + j).append("<p class='space non-change' id='position"	+ ((i * 3) + width) + "-" + ((j * 3) + height) + "' '>" + value + "</p>");
						}
					}
				}
			}
		}
	}
			
	this.print_board = function() {
		for (let i = 0; i < this.arr.length; i++) {
			console.log(this.arr[i].join(" "));
		}	
	}
	
	this.next_open = function() {
		for (let i = 0; i < 9; i++) {
			for (let j = 0; j < 9; j++) {
				if (this.arr[i][j] === 0) return [i, j];}}
		return 0;
	}
	
	this.is_valid = function() 
	{
		//Checks columns and rows.
		for (let k = 0; k < 9; k++) {
			let column_numbers = [], row_numbers = [];
			for (let j = 0; j < 9; j++) {
				var col_num = this.arr[k][j], row_num = this.arr[j][k];
				if ((column_numbers.includes(col_num) && col_num !== 0) || (row_numbers.includes(row_num) && row_num !== 0)) return false;
				else column_numbers.push(col_num), row_numbers.push(row_num);}}
		//Check each cell.
		for (let i = 0; i < 3; i ++) {
			for (let j = 0; j < 3; j++) {
				let numbers = [];
				for (let k = 0; k < 3; k++) {
					for (let c = 0; c < 3; c++) {
						let current_number = this.arr[(i * 3) + k][(j * 3) + c]
						if (numbers.includes(current_number) && current_number !== 0) return false;
						else numbers.push(this.arr[(i * 3) + k][(j * 3) + c]);}}}}
		return true;
	}
}


function SudokuGame(arr) {
	var tried = [];
	var game_board = new SudokuBoard(arr);
	
	this.backtrack = function() {
		game_board.initiate_html();
		do {
			while (!game_board.is_valid()) {
				var position = tried[tried.length - 1];
				while (game_board.arr[position[0]][position[1]] === 9) {
					tried.pop();
					game_board.arr[position[0]][position[1]] = 0;
					queue.push([position[0], position[1], 0])
					position = tried[tried.length - 1];
				}
				game_board.arr[position[0]][position[1]] += 1;
				queue.push([position[0], position[1], game_board.arr[position[0]][position[1]]]);
			}
			var open_space = game_board.next_open();
			if (open_space !== 0) {
				tried.push(open_space.slice());
				game_board.arr[open_space[0]][open_space[1]] = 1;
				queue.push([open_space[0], open_space[1], 1])
			}
		} while(game_board.next_open() !== 0 || !game_board.is_valid());
		game_board.print_board();
		return true;
	}
	
}


var test_board = "200080300\n060070084\n030500209\n000105408\n000000000\n402706000\n301007040\n720040060\n004010003";

var test_board2 = "3 8 0 0 0 0 0 0 0\n0 0 0 4 0 0 7 8 5 \n0 0 9 0 2 0 3 0 0 \n0 6 0 0 9 0 0 0 0 \n8 0 0 3 0 2 0 0 9 \n0 0 0 0 4 0 0 7 0 \n0 0 1 0 7 0 5 0 0 \n4 9 5 0 0 6 0 0 0 \n0 0 0 0 0 0 0 9 2";


$(document).ready(function() {
	var test = new SudokuGame(test_board);
	console.time('someFunction');
	console.log(test.backtrack());
	console.timeEnd('someFunction');
	setInterval(queue_callback, 1);
});

