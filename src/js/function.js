$(function(){
    /*****************************************************************
	 * Creates a directory of htmls. To remove when deploying to prod.
	 *****************************************************************/
	$.get("./files.json", function(data){
		// console.log(data);
		if($(".file-names").length){
			$(data).each(function(){
				var fileName = this.replace("src/html/","");
				var anchor = `
					<a href="/${fileName}" style="display:block">${fileName}</a>
				`;
				$(".file-names").append(anchor);

			});
		}
	});
});