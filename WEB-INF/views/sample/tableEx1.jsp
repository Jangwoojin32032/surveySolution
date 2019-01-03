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

var setRow = 2;

var pageObject = {

	init : function(){
        pageObject.buttonEvent();
	}
    , buttonEvent : function(){

        $(document).on("click",".btPlus3",function(){
			
            var setHtml = ""
            +'<tr class="tr_'+ setRow +'">'
            +'    <td class="addRowspan" rowspan="2">1</td>'
            +'    <td>content1-1</td>'
            +'    <td>content2-2</td>'
            +'    <td>content3-1</td>'
            +'    <td  rowspan="2">'
            +'        <div class="btn-group">'
            +'            <button class="btPlus3">+</button>'
            +'            <button class="btMinus3">-</button>'
            +'        </div>'
            +'    </td>'
            +'</tr>'
            +'<tr class="tr_'+ setRow +'">'
            +'    <td>content1-2</td>'
            +'    <td>content2-2</td>'
            +'    <td>content3-2</td>'
            +'</tr>';

            $('.table1').append(setHtml);

            setRow = setRow + 1;

            var setRow2 = $('[name="setRow"]').val();
            setRow2 = setRow2 + 1;
            $('[name="setRow"]').val(setRow2);

		});

        $(document).on("click",".btMinus3",function(){
			
            var tr = $(this).closest('tr');
            var className = tr.attr('class');
            console.log('className',className);
            $('.'+className).remove();
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
        <input type="hidden" name="setRow" value="2" />
        <tbody class="table1">
            <tr class="tr_1">
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
            <tr class="tr_1">
                <td>content1-2</td>
                <td>content2-2</td>
                <td>content3-2</td>
            </tr>

        </tbody>
    </table>
</body>
</html>