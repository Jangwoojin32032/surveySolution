<!doctype html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>+/- row</title>
<script type="text/javascript" charset="utf-8" src="/resources/lib/jquery-1.11.1/jquery-1.11.1.min.js" ></script>
<script type="text/javascript" charset="utf-8" src="/resources/lib/jquery/jquery.floatThead.min.js" ></script>

<style>
table {
  width: 600px;
  border: 1px solid #444444;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #444444;
  padding: 4px 6px;
  text-align: center;
  vertical-align: middle;
}
</style>

<script type="text/javascript">
var pageObject = {

	init : function(){
        pageObject.buttonEvent();
	}
    , buttonEvent : function(){

        $(document).on("click",".btPlus3",function(){
			
			var ar = $('.addRowspan').attr('rowspan');
            // this row index
			var trNum = $(this).closest('tr').prevAll().length;

            var tbody = $(this).closest('tbody');
			var trs = tbody.children();
		
		    var startIndex = parseInt(trNum);
		    var endIndex = startIndex + parseInt(ar) -1;

            var setHtml = '';
			for(var i=startIndex; i<=endIndex; i++){
                
				var tr = trs.eq(i).closest('tr');
				var trParent = tr.clone().wrapAll("<tr/>").parent();
				var trHtml = trParent.html();

                setHtml = setHtml + trHtml;
			}
			
            trs.eq(endIndex).after(setHtml);

		});

        $(document).on("click",".btMinus3",function(){
			
            var ar = $('.addRowspan').attr('rowspan');
            var trNum = $(this).closest('tr').prevAll().length;

            var startIndex = parseInt(trNum);
		    var endIndex = startIndex + parseInt(ar) -1;

            var tbody = $(this).closest('tbody');
			var trs = tbody.children();

            for(var i=startIndex; i<=endIndex; i++){
                var tr = trs.eq(i).closest('tr');
                tr.remove();
            }

		});
    }
}
$(function(){
	pageObject.init();
});
</script>

<body>
    <table>
        <colgroup>
        
        </colgroup>
        <thead>
            <tr>
                <th>No</th>
                <th>title1</th>
                <th>title2</th>
                <th>title3</th>
                <th>button</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="addRowspan" rowspan="2">1</td>
                <td>content1-1</td>
                <td>content2-2</td>
                <td>content3-1</td>
                <td  rowspan="2">
                    <div class="btn-group">
                        <button class="btPlus3">+</button>
                        <button class="btMinus3">-</button>
                    </div>
                </td>
            </tr>
            <tr>
                <td>content1-2</td>
                <td>content2-2</td>
                <td>content3-2</td>
            </tr>
        </tbody>
    </table>
</body>
</html>