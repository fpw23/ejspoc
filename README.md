## Purpose
This is a proof of concept for embedding EJS in a web app.

### Summary
(EJS)[https://ejs.co/] is a templating language for Javascript that works like old school ASP and PHP where you use tags to transition in and out of code regions.  Anything inside of <% %> blocks will be executed and everything else will just be rendered.  Data can be passed in and is accessible within the script blocks.

### Findings
* (React-Ace)[https://github.com/securingsincity/react-ace] is the best way to go for template and code editing.  They have built in support for json and EJS formating.  The json is pretty go, the EJS is ok but could be better. 

* To get the worker js stuff in React-Ace going I had to copy the js files out of the node folder directly to the public folder.  I discovered this by seeing the errors in the console log.  There is a way to do this by including them in webpack but I could not figure this out.  It has something to do with create-react-app.  When I move this to the main project I will try harder with webpack.

### Conclusion
It is possible and pretty easy to a basic report designer working using EJS and React-Ace.  Here is a demo:

https://fpw23.github.io/ejspoc/

