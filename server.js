var fs = require('fs');
var data = fs.readFileSync('todoList.json');
var tasks = JSON.parse(data);

console.log(tasks);

console.log("Server is starting up");

var express = require('express');

var app = express();

var server = app.listen(3000, listening); 

app.get('/', showTasks);
app.get('/add/:task/:priority?', addTask);


app.get('/tasks', showTasks);
app.get('/tasks/:task/', viewTask);

function showTasks (request, response){
		response.send(tasks);
}

function viewTask (request, response){
	var data = request.params;
	var task = data.task;
	response.send(tasks[task]);
}
	
function listening(){
	console.log("listening...");
}

function addTask (request, response){
	var data = request.params;
	var task = data.task;
	var priority = Number(data.priority);
	var reply;

	if(!priority){
		reply = {
			msg: "Priority is required."
		}
		response.send(reply);
	} else {
		tasks[task] = priority;
		var data = JSON.stringify(tasks, null, 2);
		fs.writeFile('toDoList.json', data, finished);

		function finished(err) {
			console.log('all set.');
		}

		reply = {
			task: task, 
			priority: "Priority Level: " + priority,
			success: "Success"
		}
	}

	response.send(reply);

}
