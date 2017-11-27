var jsreport = require('jsreport-core')();
var fs = require('fs');
var path = require('path');
jsreport.use(require('jsreport-xlsx')());
jsreport.use(require('jsreport-html-to-xlsx')());
jsreport.use(require('jsreport-jsrender')());
var template = path.join(__dirname,'template');

jsreport.init().then(function () {     
   return jsreport.render({
	   template: {
		   content: '<table><tr><td>Hello {{:foo}}</td></tr></table>',
		   engine: 'jsrender',
		   recipe: 'html-to-xlsx'
		},
		data: {
			foo: "world"
		}
	}).then(function(resp) {
	 //prints pdf with headline Hello world
     resp.result.pipe(fs.createWriteStream(path.join(template,"myexcel.xlsx")));
   });
}).catch(function(e) {
  console.log(e)
})