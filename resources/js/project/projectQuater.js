
var loading = "";
var projectQuaterJs = {
		
	init : function(){
		loading = $('<div id="loading" class="loading"></div><img id="loading_img" alt="loading" src="/resources/img/loading2.gif" />').appendTo(document.body).hide();
		var projectId = $('[name="projectId"]').val();
		//console.log('projectId',projectId);
		
		projectQuaterJs.getProjectQuater(projectId);
	},
	getProjectQuater : function (projectId) {
		loading.show();
		var urlVal = '/project/getProjectQuater';
		$.ajax({
			url   		: urlVal,
			type  		: "post",
			dataType    : "json",
			contentType : "application/json",
			data  		: JSON.stringify( {projectId:projectId} ),
			success     : function(responseData){
				console.log("setQuater data",responseData);
				console.log("setQuater data null",null != responseData && null != responseData.listSlQuestion);				
				if (null != responseData && null != responseData.listSlQuestion) {
					projectQuaterJs.setQuestionHtml(responseData);
				}
				loading.hide();
			},
			error : function(e){
				//console.log("error",e);
				loading.hide();
			}
		});
	},
	setQuestionHtml : function (data) {
		
		if (null != data.listSlQuestion) {
			
			var listSlQuestion = data.listSlQuestion;
			var questionLength = data.listSlQuestion.length;
			
			$('#setBody').html('');
			var setBodyHtml = "";
			$.each(listSlQuestion, function(index, value){
				
				var questionName = value.questionName;
				var questionType = value.questionType;
				if ('QQ' != questionName) {
					
					var questionId = value.questionId;
					var questionName = value.questionName;
					var questionTitle = value.questionTitle;
					setBodyHtml = setBodyHtml + '<div>'
											  + '	<div><b>'+ questionName +'</b></div>'
											  + '	<div>['+ questionType +'] '+ questionTitle +'</div>'	
											  + '</div>';
				}
			});
			$('#setBody').html(setBodyHtml);
			
			var listSlQuestionSin = new Array();
			var setListIndex = 0;
			$.each(data.listSlQuestion, function(index, value){
				var questionType = value.questionType;
				if ('sin' == questionType) {
					listSlQuestionSin[setListIndex] = value;
					setListIndex++;
				}
			});
			data.listSlQuestionSin = listSlQuestionSin;
			
			var setRowSelectHtml = "";
			var setColSelectHtml = "";
			var setIndex = 1;
			$('#selectCol').html('');
			$('#selectRow').html('');
			
			//console.log("listSlQuestionSin",listSlQuestionSin);
			
			$.each(listSlQuestionSin, function(index, value){

				var questionName = value.questionName;
				if ('QQ' != questionName) {
					
					if (0 == index) {
						setColSelectHtml = setColSelectHtml + '<option value="">select</option>';
						setRowSelectHtml = setRowSelectHtml + '<option value="">select</option>';
					}
					setColSelectHtml = setColSelectHtml + '<option value="'+setIndex+'">'+setIndex+'</option>';
					setRowSelectHtml = setRowSelectHtml + '<option value="'+setIndex+'">'+setIndex+'</option>';
					//setColSelectHtml = setColSelectHtml + '<option value="'+questionId+'" qname="'+questionName+'">'+questionName+'. '+questionTitle+'</option>';
					//setRowSelectHtml = setRowSelectHtml + '<option value="'+questionId+'" qname="'+questionName+'">'+questionName+'. '+questionTitle+'</option>';
					setIndex++;
				}
			});
			
			$('#selectCol').append(setColSelectHtml);
			$('#selectRow').append(setRowSelectHtml);
			
			//console.log("setColSelectHtml",setColSelectHtml);
			//console.log("setRowSelectHtml",setRowSelectHtml);
			
			// 단독 쿼터 설정
			var listSlQuestionSin = data.listSlQuestionSin;
			projectQuaterJs.setSingleBody('setSingleBody', listSlQuestionSin, 'selectQuestionSingle');
			
			// 완료 쿼터 설정
			var listSlQuestionSin = data.listSlQuestionSin;
			projectQuaterJs.setFinishBody('setFinishBody', listSlQuestionSin);
			
			$('#selectRow').on('change',function(){
				var selectValue = $(this).val();
				projectQuaterJs.setRowColBody(selectValue, 'setRowBody', listSlQuestionSin, 'selectQuestionRow');
			});
			
			$('#selectCol').on('change',function(){
				var selectValue = $(this).val();
				projectQuaterJs.setRowColBody(selectValue, 'setColBody', listSlQuestionSin, 'selectQuestionCol');
			});
			
			$('#selectBoost').on('change',function(){
				var selectValue = $(this).val();
				projectQuaterJs.setRowColBody(selectValue, 'setBoostQuestion', listSlQuestion, 'selectBoostQuestion');
			});
			
			/*var setRowSelectHtml = "";
			$('#selectRow').on('change',function(){
				var selectValue = $(this).val();
				$.each(listSlQuestion, function(index, value){
					var questionId = value.questionId;
					var questionName = value.questionName;
					var questionTitle = value.questionTitle;
					if (null != selectValue && '' != selectValue && index == (selectValue-1)) {
						$('#selectRow').append('<input type="text" name="textRow" id="textRow_'+index+'" value="'+questionId+'" qname="'+questionName+'" />');
					}
				});
			});*/
						
			if (null != data.selectSlQuater) {
				projectQuaterJs.setSelectSlQuater(data);
			}					
			
			$('#bt_setQuater').on('click',function(){
				projectQuaterJs.checkValidation(data);
			});
			$('#bt_delQuater').on('click',function(){	// 쿼터 삭제 (DB 삽입이 두번씩 됨 ㅡ,.ㅡ)
				projectQuaterJs.deleteQuater(data);
			});
			$('#bt_setBoost').on('click',function(){
				projectQuaterJs.checkValidationBoost(data,'save');
			});
			$('#bt_delBoost').on('click',function(){	// 쿼터 삭제 (DB 삽입이 두번씩 됨 ㅡ,.ㅡ)
				projectQuaterJs.delBoost(data);
			});
			$('#bt_quaterCancel').on('click',function(){ location.href='/project/projectList'; });
			$('#bt_quaterPop').on('click',function(){ 
				var openUrl = '/popup/projectQuaterPopup?projectId='+ $('[name="projectId"]').val(); 
				popStatus = window.open(openUrl, "Quater Popup", "width=1200, height=1000, toolbar=no, menubar=no, scrollbars=no, resizable=yes");
				popStatus.focus();
			});
		}
	},
	setRowColBody : function (selectValue, setBodyId, setList, setName) {
		
		console.log('setList',setList);
		$('#'+setBodyId).html('');
		var setColSelectHtml = "";
		for (var i=0; i<parseInt(selectValue); i++) {
			
			var setColOption = '';
			var setIndex = 1;
			$.each(setList, function(index, value){
				var questionId = value.questionId;
				var questionName = value.questionName;
				var questionTitle = value.questionTitle;
				if (null != selectValue && '' != selectValue && 'QQ' != questionName) {
					setColOption = setColOption + '<option value="'+setIndex+'" qid="'+questionId+'" qname="'+questionName+'">'+questionName+'. '+questionTitle+'</option>';
					setIndex++;
				}
			});
			var setColSelect = '<div><select name="'+ setName +'_'+i+'" id="'+ setName +'_'+i+'">'+setColOption+'</select></div>';
			setColSelectHtml = setColSelectHtml + setColSelect;
		}
		$('#'+setBodyId).html(setColSelectHtml);
	},
	setSingleBody : function (setBodyId, setList, setName) {
		
		console.log('setList',setList);
		$('#'+setBodyId).html('');
		var setColSelectHtml = "";			
		var setColOption = '<option value="">select</option>';
		var setIndex = 1;
		
		$.each(setList, function(index, value){
			var questionId = value.questionId;
			var questionName = value.questionName;
			var questionTitle = value.questionTitle;
			setColOption = setColOption + '<option value="'+setIndex+'" qid="'+questionId+'" qname="'+questionName+'">'+questionName+'. '+questionTitle+'</option>';
			setIndex++;
		});
		
		var setColSelect = '<div><select name="'+ setName +'" id="'+ setName +'">'+setColOption+'</select></div>';
		setColSelectHtml = setColSelectHtml + setColSelect;
		
		$('#'+setBodyId).html(setColSelectHtml);
	},
	setFinishBody : function (setBodyId, setList) {
		
		console.log('setList',setList);
		$('#'+setBodyId).html('');
		
		var setCheckboxHtml = "";			
		setCheckboxHtml = '<div><label style="padding: 0px;">'
			+ '<input type="checkbox" id="finishQuota" name="finishQuota" value="2">응답완료 쿼터 제어'
			+ '</label></div>';
		
		$('#'+setBodyId).html(setCheckboxHtml);
	},
	checkValidation : function(data) {
		
		var checkselect = false;
		//var selectLen = $('[name^="selectQuestion"]').length;
		var selectRow = $('[name="selectRow"] option:selected').val();
		var selectCol = $('[name="selectCol"] option:selected').val();
		var selectSingle = $('[name="selectQuestionSingle"] option:selected').val();
		var checkboxFinish = $('[name="finishQuota"]:checked').val();
		
		if ('' != selectRow && '' != selectCol) {
			
			var setArray = new Array();
			$.each($('[name^="selectQuestion"]'), function(index, value){
				var selectVal = $(this).val();
				$.each(setArray, function(index2, value2){
					if (value2 == selectVal) {
						//console.log('setArray',value2);
						checkselect = true;
					}
				});
				setArray[index] = $(this).val();
			});
			if (checkselect) {
				//alert('No duplicates selected');
				alert("중복 선택되었습니다. 다시 선택하세요.");
				return false;
			} else {
				projectQuaterJs.setQuaterHtml(data);
			}
			
		} else if ('' != selectSingle) {
			projectQuaterJs.setSingleQuaterHtml(data);
		} else if ('' != checkboxFinish) {
			projectQuaterJs.setFinishQuaterHtml(data);
		} else {
			//alert('please select');
			alert('선택하세요');
			return false;
		}
	},
	checkValidationBoost : function(data,type) {
		
		var checkselect = false;
		var selectBoost = $('[name="selectBoost"] option:selected').val();
		console.log('boost selectBoost selected',selectBoost);
		
		if ('' != selectBoost) {
			
			var setArray = new Array();
			$.each($('[name^="selectBoostQuestion"]'), function(index, value){
				var selectVal = $(this).val();
				$.each(setArray, function(index2, value2){
					if (value2 == selectVal) {
						//console.log('setArray',value2);
						checkselect = true;
					}
				});
				setArray[index] = $(this).val();
			});
			if (checkselect) {
				//alert('No duplicates selected');
				alert('중복된 선택입니다. 다시 선택하세요.');
				return false;
			} else {
				
				console.log('boost checkselect',checkselect);
				projectQuaterJs.setBoost(data,type);
				
			}
		}
	},
	setBoost : function(data,type) {
		
		var projectId = $('[name="projectId"]').val();
		
		var setArray = new Array();
		$.each($('[name^="selectBoostQuestion"]'), function(index, value){
			var selectName = $(this).attr('name');
			var questionId = $('[name="'+selectName+'"] option:selected').attr('qid');
			var questionName = $('[name="'+selectName+'"] option:selected').attr('qname');
			
			var setObject = new Object();
			setObject.projectId = projectId;
			setObject.questionId = questionId;
			setObject.boosterInfo = questionName;
			setObject.boosterPosition = index;
			setArray.push(setObject);
		});
		//console.log('setBoost setArray',setArray);
		
		if (null != setArray && 0 < setArray.length) {
			loading.show();
			var urlVal = '/project/setProjectBooster';
			$.ajax({
				url   		: urlVal,
				type  		: "post",
				dataType    : "json",
				contentType : "application/json",
				data  		: JSON.stringify( {projectId:projectId, checkSave:type, listSlBooster:setArray} ),
				success     : function(responseData){
					console.log("setQuater data",responseData);
					if (null != responseData) {
						projectQuaterJs.setBoostHtml(data, responseData);
					}
				},
				error : function(e){
					//console.log("error",e);
				}
			});
		}
	},	
	delBoost : function(data,type) {
		
		var projectId = $('[name="projectId"]').val();
						
		if (null != projectId && 0 < projectId) {
			loading.show();
			var urlVal = '/project/delProjectBooster';
			$.ajax({
				url   		: urlVal,
				type  		: "post",
				dataType    : "json",
				contentType : "application/json",
				data  		: JSON.stringify( {projectId:projectId} ),
				success     : function(responseData){
					console.log("delBoost data",responseData);
					if (null != responseData) {
						if(responseData.deleteBooster) {
							alert('부스트쿼터 삭제 성공!');
							loading.hide();
							location.reload();
							//projectQuaterJs.init();
						}						
					}
				},
				error : function(e){
					//console.log("error",e);
				}
			});
		}
	},
	setBoostHtml : function(data, responseData) {
		
		var setHtml = '';
		var boostArray = new Array();
		var boostindex = 0;
		var boostExampleLen = 0;
		$.each($('[name^="selectBoostQuestion"]'), function(index, value){
			
			var selectVal = $(this).val();
			var selectName = $(this).attr('name');
			var questionId = $('[name="'+selectName+'"] option:selected').attr('qid');
			var questionName = $('[name="'+selectName+'"] option:selected').attr('qname');
			var questionText = $('[name="'+selectName+'"] option:selected').text();
			
			var listSlExample = projectQuaterJs.setExample(questionId, questionName, data.listSlQuestion);
			if (null != listSlExample) {
				
				var setTitleHtml = '';
				var setContentHtml = '';
				var lseLen = listSlExample.length
				var widthNum = 100 / lseLen; 
				var checkEText = true;
				
				$.each(listSlExample, function(index2, value2){
					
					var checkIndex2 = index2+1;
					var exampleText = value2.exampleText;
					var questionName = value2.questionName;
					var questionType = value2.questionType;
					
					if ('att' == questionType) {
						
						if ('$$@@$$' == exampleText) {
							checkEText = false;
						}
						if (checkEText) {
							setTitleHtml = setTitleHtml + '		<td style="width:'+widthNum+'%;">'+ exampleText + '</td>';
							
							var setContentHtml2 = '';
							var checkEText2 = true;
							//for (var i=0; i<lseLen; i++) {
							$.each(listSlExample, function(index3, value3){
								
								var checkIndex3 = index3+1;
								var exampleText2 = value3.exampleText;
								if ('$$@@$$' == exampleText2) {
									checkEText2 = false;
								}
								if (checkEText2) {
									setContentHtml2 = setContentHtml2 + '<p id="'+ questionName + '_e_' + checkIndex2 + '_' + checkIndex3 +'"></p>' 
								}
							});
							
							setContentHtml = setContentHtml + '		<td style="width:'+widthNum+'%;">'
							+ 	setContentHtml2
							+ '		</td>';
						}
						
					} else {
						
						setTitleHtml = setTitleHtml + '		<td style="width:'+widthNum+'%;">'+ exampleText + '</td>';
						
						if ('sin' == questionType || 'sca' == questionType || 'mul' == questionType) {
							
							setContentHtml = setContentHtml + '		<td style="width:'+widthNum+'%;" id="'+ questionName + '_e_' + checkIndex2 +'"></td>'
							
						} else if ('ord' == questionType) {
							
							var setContentHtml2 = '';
							for (var i=0; i<lseLen; i++) {
								setContentHtml2 = setContentHtml2 + '<p id="'+ questionName + '_e_' + checkIndex2 + '_' + i +'"></p>' 
							}
							setContentHtml = setContentHtml + '		<td style="width:'+widthNum+'%;">'
							+ 	setContentHtml2
							+ '		</td>';
						}
					}
				});
				
				setHtml = setHtml + '<div style="margin-bottom:20px;">'
						+ '	<p>'+ questionText + '</p>'
						+ '	<table style="float:left; border:1px solid black;" name="tableBoot_'+ (index+1) +'">'
						+ '		<tr>'
						+	setTitleHtml
						+ '		</tr>'
						+ '		<tr>'
						+	setContentHtml
						+ '		</tr>'
						+ '	</table>'
						+ '</div>';
			}
		});
		
		$('#setBoostBody').html(setHtml);
		
		if (null != responseData) {
			var listSlBooster = responseData.listSlBooster;
			if (null != listSlBooster) {
				var lsbLen = listSlBooster.length;
				if (0 < lsbLen) {
					
					$.each(listSlBooster, function(index, value){
						
						var boosterInfo = value.boosterInfo;
						var boosterType = value.boosterType;
						var listBoosterData = value.listBoosterData;
						
						$.each(listBoosterData, function(index2, value2){
							
							if ('mul' == boosterType) {

								var cVal = value2.cVal;
								var cCount = value2.cCount;
								$('#'+ boosterInfo +'_e_'+ cVal).text(cVal +' : '+ cCount);
								
							} else {
								
								$.each(value2, function(key, val){
									var arrayKeyName = key.split('_');
									var setKeyName = '';
									
									if (null != arrayKeyName[2]) {
										setKeyName = arrayKeyName[2] +' : ';
									} else if (null != arrayKeyName[1]) {
										setKeyName = arrayKeyName[1] +' : ';
									}
									$('#'+ boosterInfo +'_'+ key).text(setKeyName + val);
								});
							}
						});
					});
				}
			}
		}

		loading.hide();
	},
	setQuaterHtml : function(data) {
		
		var colLenArray = new Array();
		var rowLenArray = new Array();
		var colLen = 0;
		var rowLen = 0;
		var colExampleLen = 0;
		var rowExampleLen = 0;
		$.each($('[name^="selectQuestion"]'), function(index, value){
			
			var selectVal = $(this).val();
			var selectName = $(this).attr('name');
			var questionId = $('[name="'+selectName+'"] option:selected').attr('qid');
			var questionName = $('[name="'+selectName+'"] option:selected').attr('qname');
			
			if (null != selectName.match('selectQuestionCol')) {
				//console.log('col name',selectName);
				//console.log('col questionName',questionName);
				
				var listSlExample = projectQuaterJs.setExample(questionId, questionName, data.listSlQuestionSin);
				//console.log('col listSlExample',listSlExample);
				if (null != listSlExample) {
					colExampleLen = listSlExample.length;
					//colLenArray[colLen]=exampleLen
					colLenArray[colLen]=listSlExample
					colLen++;
				}
				
			} else if (null != selectName.match('selectQuestionRow')) {
				//console.log('row name',selectName);
				//console.log('row questionName',questionName);
				
				var listSlExample = projectQuaterJs.setExample(questionId, questionName, data.listSlQuestionSin);
				//console.log('row listSlExample',listSlExample);
				if (null != listSlExample) {
					rowExampleLen = listSlExample.length;
					//rowLenArray[rowLen]=exampleLen;
					rowLenArray[rowLen]=listSlExample;
					rowLen++;
				}
			}
		});
		
		var colObject = new Object();
		var rowObject = new Object();
		
		//console.log('rowLen',rowLen);
		//console.log('colLen',colLen);
		//console.log('rowLenArray',rowLenArray);
		//console.log('colLenArray',colLenArray);
		
		$('#setquaterBody').html('');
		setquaterBodyHtml = '<div id="divQuote">'
						+ ' <label onclick="javascript:projectQuaterJs.regQuota(\'normal\');"> <input type="radio" id="normal" name="regQuota" value="1" checked=""> 일반 등록</label>'
						+ ' <label onclick="javascript:projectQuaterJs.regQuota(\'paste\');"><input type="radio" id="paste" name="regQuota" value="2"> 엑셀 값 붙여넣기 등록</label>'
			 			+ ' </div>';
		
		setquaterBodyHtml += '<textarea id="textareaQuote" name="textareaQuote" rows="10" cols="168" style="display: none;"></textarea>'
			
		setquaterBodyHtml += '<table name="tableQuater" class="tableQuater">';
		
		//setquaterBodyHtml = '<table style="float:left; border:1px solid black;" name="tableQuater">';
		// 		
				
		
		var setColNextCount = 1;
		
		var colspan = 1;
		for (var rowIndex=0; rowIndex < colLen; rowIndex++) {
			
			setquaterBodyHtml = setquaterBodyHtml + '<tr>';
			
			for (var i=0; i<rowLen; i++) {
				setquaterBodyHtml = setquaterBodyHtml + '<td>'+ ((rowIndex+1)*(i+1)) +'</td>';
			}
				
			var listSlExample = colLenArray[rowIndex];
			var exampleLen = listSlExample.length;
			
			for (var sapnIndex=0; sapnIndex < colLen; sapnIndex++) {
				if (rowIndex < sapnIndex) {
					colspan = colspan * colLenArray[sapnIndex].length;
				} else {
					colspan = 1;
				}
			}
			
			for (var j=0; j<setColNextCount; j++) {
				
				$.each(listSlExample, function(index, value){
					var exampleId = value.exampleId;
					var exampleText = value.exampleText;
					setquaterBodyHtml = setquaterBodyHtml + '<td colspan="'+ colspan +'">'+ exampleText +'</td>';
				});
			}
			setColNextCount = setColNextCount * exampleLen;
			
			setquaterBodyHtml = setquaterBodyHtml + '</tr>';
		}
		//console.log('setColNextCount',setColNextCount);
		
		var rowCount = 1;
		for (var rIndex=0; rIndex < rowLen; rIndex++) {
			var exampleLen = rowLenArray[rIndex].length;
			rowCount = rowCount * exampleLen;
		}
		console.log('rowCount',rowCount);
		
		var colCount = 1;
		for (var cIndex=0; cIndex < colLen; cIndex++) {
			var exampleLen = colLenArray[cIndex].length;
			colCount = colCount * exampleLen;
		}
		console.log('colCount',colCount);
		
		
		for (var rowIndex=0; rowIndex < rowCount; rowIndex++) {
			
			/*var rowspan = 1;
			for (var sapnIndex=0; sapnIndex < colLen; sapnIndex++) {
				if (rowIndex < sapnIndex) {
					rowspan = rowspan * rowLenArray[sapnIndex].length;
				} else {
					rowspan = 1;
				}
			}*/
			
			setquaterBodyHtml = setquaterBodyHtml + '<tr>';
			
			for (var i=0; i<rowLen; i++) {
				
				var rowspan = 1;
				for (var spanIndex=0; spanIndex < rowLen; spanIndex++) {
					
					if (i < spanIndex) {
						rowspan = rowspan * rowLenArray[spanIndex].length;
					} else {
						rowspan = 1;
					}
				}
				//console.log('rowspan'+i,rowspan);
				
				if ( 0 == (rowIndex % rowspan) ) {
					
					var checkIndex = rowIndex / rowspan ;
					//console.log('checkIndex '+rowIndex+ ' '+i,checkIndex);
					
					var listSlExample = rowLenArray[i];
					var exampleLen = listSlExample.length;
					
					// 이거 어렵다.
					if (checkIndex >= exampleLen) {
						checkIndex = checkIndex % exampleLen;
					}
					
					$.each(listSlExample, function(index, value){
						var exampleId = value.exampleId;
						var exampleText = value.exampleText;
						
						if (checkIndex == index) {
							//setquaterBodyHtml = setquaterBodyHtml + '<td rowspan="'+ rowspan +'">'+ exampleText +'_'+index +'_'+rowIndex +'_'+rowspan +'</td>';
							setquaterBodyHtml = setquaterBodyHtml + '<td rowspan="'+ rowspan +'">'+ exampleText +'</td>';
						}
					});
				}
			} 
			
			for (var i=1; i<(setColNextCount+1); i++) {
				var checkRowIndex = rowIndex + 1;
				setquaterBodyHtml = setquaterBodyHtml + '<td><span id="dq_'+ checkRowIndex +'_'+ i +'"></span> / <input style="width:50px;" type="text" name="textQuater" id="q_'+ checkRowIndex +'_'+ i +'" ci="'+ i +'" ri="'+ checkRowIndex +'" onlynumber /></td>';
			}
		}
		setquaterBodyHtml = setquaterBodyHtml + '</tr>';
		
		// 전체입력 제어
		setquaterBodyHtml = setquaterBodyHtml 
						+ '<tr>'
						+ '<td rowspan="1">전체입력</td>'
						+ '<td colspan="'+colCount+'"><input style="width:50px;" type="text" name="allQuater" onlynumber="" onkeyup="projectQuaterJs.allQuater();"></td>'
						+ '</tr>';
		
		$('#setquaterBody').html(setquaterBodyHtml);
		
		projectQuaterJs.setAttr();
		$('#bt_quaterInsert').on('click',function(){
			var regQuota = $('[name="regQuota"]:checked').val();
			//console.log('regQuota', regQuota);
			
			$('html').scrollTop(0);
			if(regQuota == 1) {		
				var taQuoteArray = "";
				projectQuaterJs.setQuaterData(colLenArray, rowLenArray, colCount, rowCount, regQuota, taQuoteArray, '');
			} else if(regQuota == 2) {
				// 모든 값 배열에 담아버리고 차례로 값 꺼내기
				var taQuote = $('#textareaQuote').val();
				//console.log('texta', texta);				
				var taQuoteArray = taQuote.replace(/(?:\r\n|\r|\n)/g, '	').split('	');
				console.log('taQuoteArray', taQuoteArray);
				projectQuaterJs.setQuaterData(colLenArray, rowLenArray, colCount, rowCount, regQuota, taQuoteArray, '');
				/*
				 * var textf = "";
				textf = texta.replace(/(?:\r\n|\r|\n)/g, '	');
				console.log('textf', textf);
				var textarray = textf.split('	');
				console.log('textarray', textarray);
				 */
			}
		});
	},
	setSingleQuaterHtml : function(data) {
		var colLenArray = new Array();
		var rowLenArray = new Array();
		var colLen = 0;
		var rowLen = 0;
		var colExampleLen = 0;
		var rowExampleLen = 0;
		
		var listSlExample = '';
		var setquaterBodyHtml = '<table name="tableQuater" class="tableQuater">';
		$('#setquaterBody').html('');
		
		$.each($('[name^="selectQuestion"]'), function(index, value){
			
			var selectVal = $(this).val();
			var selectName = $(this).attr('name');
			var questionId = $('[name="'+selectName+'"] option:selected').attr('qid');
			var questionName = $('[name="'+selectName+'"] option:selected').attr('qname');			
			
			console.log('selectVal',selectVal);
			console.log('selectName',selectName);
			console.log('questionId',questionId);
			console.log('questionName',questionName);
			
			if (null != selectName.match('selectQuestionSingle')) {
				
				listSlExample = projectQuaterJs.setExample(questionId, questionName, data.listSlQuestionSin);
				if (null != listSlExample) {
					colExampleLen = listSlExample.length;
					//colLenArray[colLen]=exampleLen
					colLenArray[colLen]=listSlExample
					colLen++;
				}
				console.log('listSlExample',listSlExample);
			}
		});
		
		var rowCount = 1;
		for (var rIndex=0; rIndex < rowLen; rIndex++) {
			var exampleLen = rowLenArray[rIndex].length;
			rowCount = rowCount * exampleLen;
		}
		console.log('rowCount',rowCount);
		
		var colCount = 1;
		for (var cIndex=0; cIndex < colLen; cIndex++) {
			var exampleLen = colLenArray[cIndex].length;
			colCount = colCount * exampleLen;
		}
		console.log('colCount',colCount);
		
		// 보기 값
		var cnt = 1;
		setquaterBodyHtml += '<tr>';
		$.each(listSlExample, function(index, value){
			var exampleId = value.exampleId;
			var exampleText = value.exampleText;
			setquaterBodyHtml = setquaterBodyHtml + '<td colspan="">'+ exampleText +'</td>';
			cnt++;
			//'+ colspan +'
		});
		setquaterBodyHtml += '</tr>';
		
		// 입력
		setquaterBodyHtml += '<tr>';		
		for (var i=1; i<cnt; i++) {
			var checkRowIndex = 1;
			setquaterBodyHtml = setquaterBodyHtml + '<td><span id="dq_'+ checkRowIndex +'_'+ i +'"></span> / <input style="width:50px;" type="text" name="textQuater" id="q_'+ checkRowIndex +'_'+ i +'" ci="'+ i +'" ri="'+ checkRowIndex +'" onlynumber /></td>';
		}
		setquaterBodyHtml += '</tr>';
		
		// 전체입력 제어
		setquaterBodyHtml = setquaterBodyHtml 
						+ '<tr>'
						+ '<td rowspan="1">전체입력</td>'
						+ '<td colspan="'+(cnt-1)+'"><input style="width:50px;" type="text" name="allQuater" onlynumber="" onkeyup="projectQuaterJs.allQuater();"></td>'
						//'+colCount+'
						+ '</tr>';
		
		$('#setquaterBody').html(setquaterBodyHtml);
		
		projectQuaterJs.setAttr();
		$('#bt_quaterInsert').on('click',function(){
			
			$('html').scrollTop(0);
			
			var taQuoteArray = "";
			projectQuaterJs.setQuaterData(colLenArray, rowLenArray, colCount, rowCount, 1, taQuoteArray,'single');
			
		});
	},
	setFinishQuaterHtml : function(data) {		
		var setquaterBodyHtml = '<table name="tableQuater" class="tableQuater">';
		$('#setquaterBody').html('');
		var colLenArray = new Array();
		var rowLenArray = new Array();
		var colCount = 1;
		var rowCount = 1;
		
		// 입력
		setquaterBodyHtml += '<tr><td colspan="">완료자 쿼터 설정</td></tr>';
		setquaterBodyHtml += '<tr>';
		setquaterBodyHtml += '<td><span id="dq_finish"></span> / <input style="width:50px;" type="text" name="textQuater" id="q_finish" onlynumber /></td>';	
		setquaterBodyHtml += '</tr>';
		
		$('#setquaterBody').html(setquaterBodyHtml);
		
		projectQuaterJs.setAttr();
		$('#bt_quaterInsert').on('click',function(){
			
			$('html').scrollTop(0);
			
			var taQuoteArray = "";
			projectQuaterJs.setFinishQuaterData();
			
		});
	},	
	setQuaterData : function (colLenArray, rowLenArray, colCount, rowCount, regQuota, taQuoteArray, quaterType) {
		
		console.log('rowLenArray',rowLenArray);
		console.log('colLenArray',colLenArray);
		console.log('rowCount',rowCount);
		console.log('colCount',colCount);
		
		var taQuoteArrayCnt = 0; // 복붙 배열 꺼내기 위한 카운트
		var colLen = colLenArray.length;
		var rowLen = rowLenArray.length;
		
		var setArrayColCount = new Array();
		for (var i=0; i<colLen; i++) {
			
			var addIndex = 1; 
			for (var j=(i+1); j<colCount; j++) {
				if (null != colLenArray[j]) {
					var checkIndex = colLenArray[j].length;
					addIndex = addIndex * checkIndex;
				}
			}
			setArrayColCount[i] = addIndex;
			console.log('addIndex',addIndex);
		}
		
		var setArrayRowCount = new Array();
		for (var i=0; i<rowLen; i++) {
			
			var addIndex = 1; 
			for (var j=(i+1); j<rowCount; j++) {
				if (null != rowLenArray[j]) {
					var checkIndex = rowLenArray[j].length;
					addIndex = addIndex * checkIndex;
				}
			}
			setArrayRowCount[i] = addIndex;
		}
		
		console.log('setArrayRowCount',setArrayRowCount);
		console.log('setArrayColCount',setArrayColCount);
		
		var setQuaterArray = new Array();
		var setIndex = 1;
		
		for(var i=0; i<rowCount; i++){
			
			for(var j=0; j<colCount; j++){
				
				var setQuestionText = '';
				
				$.each(setArrayRowCount, function(rIndex,rValue){
					
					var listSlExample = rowLenArray[rIndex];
					var questionName = '';
						
					
					var checkIndex = parseInt(i / rValue) ;
					var exampleLen = listSlExample.length;
					
					if (checkIndex >= exampleLen) {
						checkIndex = checkIndex % exampleLen;
					}
					
					questionName = rowLenArray[rIndex][checkIndex].questionName;
					setQuestionText = setQuestionText + '>' + questionName + ':' + (checkIndex+1);
						
				});
				
				$.each(setArrayColCount, function(cIndex,cValue){
					
					var listSlExample = colLenArray[cIndex];
					var questionName = '';
					
					var checkIndex = parseInt(j / cValue) ;
					var exampleLen = listSlExample.length;
					
					if (checkIndex >= exampleLen) {
						checkIndex = checkIndex % exampleLen;
					}
					
					questionName = colLenArray[cIndex][checkIndex].questionName;
					setQuestionText = setQuestionText + '>' + questionName + ':' + (checkIndex+1);
					
				});
				
				// 쿼터 값
				var getIdText = getIdText = 'q_'+ (i+1) +'_'+ (j+1) ;
				//console.log('getIdText',getIdText);
				//console.log('setQuestionText',setQuestionText);
				var quaterVal = "";
				if(regQuota == 1) {
					quaterVal = $('#'+getIdText).val();
				} else if(regQuota == 2) {
					quaterVal = taQuoteArray[taQuoteArrayCnt];
				} 
				
				if (null != quaterVal && "" != quaterVal) {
					
					var projectId = $('[name="projectId"]').val();
					var setObject = new Object();
					setObject.projectId = projectId;
					setObject.quaterTotalCount = quaterVal;
					setObject.quaterContent= setQuestionText;
					setObject.quaterPosition= getIdText;
					setObject.quaterOrder = setIndex;
					setQuaterArray.push(setObject);
					setIndex++;
				}
			}
		}
		console.log('setQuaterArray',setQuaterArray);
		
		var setQuaterSingleInfo = '';
		var setQuaterSingleQueName = '';
		var setQuaterSingleQueId = '';
		var singleTotal = 1;
		$.each($('[name^=selectQuestionSingle]'),function(index){
			var selectName = $(this).attr('name');
			var singleQueName = $('[name="'+selectName+'"] option:selected').attr('qname');
			//var questionName = $('[name="'+selectName+'"] option:selected').attr('qname');
			var singleQueId = $('[name="'+selectName+'"] option:selected').attr('qid');			
			
			console.log('select single qname',singleQueName);
			//setQuaterRowInfo = setQuaterRowInfo + '>' + questionName;
			
			setQuaterSingleQueName += singleQueName;
			setQuaterSingleQueId += singleQueId;
				
			setQuaterSingleInfo = setQuaterSingleInfo + '>' + singleQueName;
		});
		
		var setQuaterRowInfo = '';
		var setQuaterRowQueName = '';
		var setQuaterRowQueId = '';
		var rowTotal = $('[name^=selectQuestionRow]').length;
		$.each($('[name^=selectQuestionRow]'),function(index){
			var selectName = $(this).attr('name');
			var rowQueName = $('[name="'+selectName+'"] option:selected').attr('qname');
			//var questionName = $('[name="'+selectName+'"] option:selected').attr('qname');
			var rowQueId = $('[name="'+selectName+'"] option:selected').attr('qid');			
			
			console.log('select row qname',rowQueName);
			//setQuaterRowInfo = setQuaterRowInfo + '>' + questionName;
			
			if(index == rowTotal -1) {
				setQuaterRowQueName += rowQueName;
				setQuaterRowQueId += rowQueId;
			} else {
				setQuaterRowQueName += rowQueName + ',';
				setQuaterRowQueId += rowQueId + ',';
			}			
			setQuaterRowInfo = setQuaterRowInfo + '>' + rowQueName;
		});
		
		var setQuaterColInfo = '';
		var setQuaterColQueName = '';
		var setQuaterColQueId = '';
		var colTotal = $('[name^=selectQuestionCol]').length;
		$.each($('[name^=selectQuestionCol]'),function(index){
			var selectName = $(this).attr('name');
			var colQueName = $('[name="'+selectName+'"] option:selected').attr('qname');
			//var questionName = $('[name="'+selectName+'"] option:selected').attr('qname');
			var colQueId = $('[name="'+selectName+'"] option:selected').attr('qid');

			console.log('select col qname',colQueName);
			//setQuaterColInfo = setQuaterColInfo + '>' + questionName;
			if(index == colTotal -1) {
				setQuaterColQueName += colQueName;
				setQuaterColQueId += colQueId;
			} else {
				setQuaterColQueName += colQueName + ',';
				setQuaterColQueId += colQueId + ',';
			}
			setQuaterColInfo = setQuaterColInfo + '>' + colQueName;
		});
		
		var projectId = $('[name="projectId"]').val();
		if (null != projectId && '' != projectId
			&& null != setQuaterRowInfo && '' != setQuaterRowInfo
			&& null != setQuaterRowQueName && '' != setQuaterRowQueName
			&& null != setQuaterRowQueId && '' != setQuaterRowQueId
			&& null != setQuaterColInfo && '' != setQuaterColInfo
			&& null != setQuaterColQueName && '' != setQuaterColQueName
			&& null != setQuaterColQueId && '' != setQuaterColQueId
			&& null != setQuaterArray) {
			
			var returnObject = new Object();
			returnObject.projectId = projectId;
			returnObject.quaterRowInfo = setQuaterRowInfo;
			returnObject.quaterRowQueName = setQuaterRowQueName;
			returnObject.quaterRowQueId = setQuaterRowQueId;
			returnObject.quaterColInfo = setQuaterColInfo;
			returnObject.quaterColQueName = setQuaterColQueName;
			returnObject.quaterColQueId = setQuaterColQueId;
			returnObject.quaterType = 0;
			returnObject.listSlQuaterCount = setQuaterArray;
			
			console.log('returnObject',returnObject);
			projectQuaterJs.insertQuater(returnObject);
		} else if (null != projectId && '' != projectId
				&& null != setQuaterSingleInfo && '' != setQuaterSingleInfo
				&& null != setQuaterSingleQueName && '' != setQuaterSingleQueName
				&& null != setQuaterSingleQueId && '' != setQuaterSingleQueId) {
			
			var returnObject = new Object();
			returnObject.projectId = projectId;
			returnObject.quaterRowInfo = '';
			returnObject.quaterRowQueName = '';
			returnObject.quaterRowQueId = '';
			returnObject.quaterColInfo = setQuaterSingleInfo;
			returnObject.quaterColQueName = setQuaterSingleQueName;
			returnObject.quaterColQueId = setQuaterSingleQueId;
			returnObject.quaterType = 1;
			returnObject.listSlQuaterCount = setQuaterArray;
			
			console.log('returnObject',returnObject);
			projectQuaterJs.insertQuater(returnObject);
			
		}
	},
	setFinishQuaterData : function () {
		// 완료자 수로 쿼터 제어
		var projectId = $('[name="projectId"]').val();
		var quaterVal = $('[name="textQuater"]').val();
		
		if (null != projectId && '' != projectId) {
			var setQuaterArray = new Array();		
			var setObject = new Object();
			
			setObject.projectId = projectId;
			setObject.quaterTotalCount = quaterVal;
			setObject.quaterContent= 'Finish';
			setObject.quaterPosition= 'q_finish';
			setObject.quaterOrder = 1;
			setQuaterArray.push(setObject);
			
			var returnObject = new Object();
			
			returnObject.projectId = projectId;
			returnObject.quaterRowInfo = '';
			returnObject.quaterRowQueName = '';
			returnObject.quaterRowQueId = '';
			returnObject.quaterColInfo = '';
			returnObject.quaterColQueName = '';
			returnObject.quaterColQueId = '';
			returnObject.quaterType = 2;
			returnObject.listSlQuaterCount = setQuaterArray;
			
			console.log('returnObject',returnObject);
			projectQuaterJs.insertQuater(returnObject);
		}
		
		
	},
	insertQuater : function (returnObject) {
		console.log('insertQuater',returnObject);		
		if (null != returnObject) {
			loading.show();
			var urlVal = '/project/setProjectQuater';
			$.ajax({
				url   		: urlVal,
				type  		: "post",
				dataType    : "json",
				contentType : "application/json",
				data  		: JSON.stringify( returnObject ),
				success     : function(responseData){
					console.log("setQuater data",responseData);
					if (null != responseData) {
						if (responseData.insertSlQuater && responseData.insertSlQuaterCount) {
							//alert('save success!!');
							alert('저장 성공');
							loading.hide();
							projectQuaterJs.init();
						}
					}
					
				},
				error : function(e){
					//console.log("error",e);
					loading.hide();
				}
			});
		}		
	},
	deleteQuater : function () {
		
		var projectId = $('[name="projectId"]').val();
		
		if (null != projectId && 0 < projectId) {
			loading.show();
			var urlVal = '/project/delProjectQuater';
			$.ajax({
				url   		: urlVal,
				type  		: "post",
				dataType    : "json",
				contentType : "application/json",
				data  		: JSON.stringify( {projectId:projectId} ),
				success     : function(responseData){
					console.log("deleteQuater data",responseData);
					if (null != responseData) {
						if (responseData.deleteSlQuater && responseData.deleteSlQuaterCount) {
							alert('삭제 성공');
							loading.hide();
							location.reload();
							//projectQuaterJs.init();
						}
					}
					
				},
				error : function(e){
					//console.log("error",e);
					loading.hide();
				}
			});
		}		
	},
	setExample : function (qId, qName, listData) {
		
		var returnVal = null;
		if (null != listData) {
			
			$.each(listData, function(index, value){
				
				var questionId = value.questionId;
				var questionName = value.questionName;
				var questionType = value.questionType;
				
				if (qId == questionId && qName == questionName) {
					
					var listSlExample = value.listSlExample;
					if (null != listSlExample) {
						
						$.each(listSlExample, function(index2, value2){
							value2.questionId=questionId;
							value2.questionName=questionName;
							value2.questionType=questionType;
						});
						returnVal = value.listSlExample;
						//console.log('returnVal',returnVal);
					}
				}
			});
		}
		return returnVal;
	},
	setSelectSlQuater : function (data) {
		
		var selectSlQuater = data.selectSlQuater;
		console.log('selectSlQuater.quaterType', selectSlQuater.quaterType);
		if (null != selectSlQuater){
			
			if(selectSlQuater.quaterType == 0) { 
				// 복수 쿼터				
				var quaterRowInfo = selectSlQuater.quaterRowInfo;
				var quaterColInfo = selectSlQuater.quaterColInfo;
				
				var arrQRow = quaterRowInfo.split('>');
				var arrQCol = quaterColInfo.split('>');
				var arrQRowLen = arrQRow.length -1;
				var arrQColLen = arrQCol.length -1;
				
				$('[name="selectRow"]').val(arrQRowLen);
				$('[name="selectCol"]').val(arrQColLen);
				
				var listSlQuestionSin = data.listSlQuestionSin;
				projectQuaterJs.setRowColBody(arrQRowLen, 'setRowBody', listSlQuestionSin, 'selectQuestionRow');
				projectQuaterJs.setRowColBody(arrQColLen, 'setColBody', listSlQuestionSin, 'selectQuestionCol');
				
				$.each(arrQRow, function(index, value){
					if (0 < index) {
						var setName = 'selectQuestionRow_'+ (index -1);
						$.each($('[name="'+ setName +'"] option'), function(index2, value2){
							var qName = $(this).attr('qname');
							if (value == qName) {
								$(this).attr("selected","selected");
							}
						});
					}
				});
				$.each(arrQCol, function(index, value){
					if (0 < index) {
						var setName = 'selectQuestionCol_'+ (index -1);
						$.each($('[name="'+ setName +'"] option'), function(index2, value2){
							var qName = $(this).attr('qname');
							if (value == qName) {
								$(this).attr("selected","selected");
							}
						});
					}
				});
				
				projectQuaterJs.setQuaterHtml(data);
				projectQuaterJs.setQuaterActiveCount(data);
			} else if(selectSlQuater.quaterType == 1) {
				// 단수 쿼터
				var quaterColInfo = selectSlQuater.quaterColInfo;				
				var arrQCol = quaterColInfo.split('>');
				var arrQColLen = arrQCol.length -1;
								
				var listSlQuestionSin = data.listSlQuestionSin;
				projectQuaterJs.setSingleBody('setSingleBody', listSlQuestionSin, 'selectQuestionSingle');
				
				$.each(arrQCol, function(index, value){
					if (0 < index) {
						//var setName = 'selectQuestionCol_'+ (index -1);
						$.each($('[name="selectQuestionSingle"] option'), function(index2, value2){							
							var qName = $(this).attr('qname');
							//console.log('$(this)', $(this));
							//console.log('this', this);
							//console.log('value2', value2);
							//console.log('value', value);
							//console.log('qName', qName);
							//console.log('value == qName', value == qName);
							//console.log('$(this).val()', $(this).val());
							if (value == qName) {
								$(this).attr("selected","selected");
								//$('#selectQuestionSingle option:eq('+$(this).val()+')').attr("selected","selected");
								console.log('value', value);
								console.log('qName', qName);
							}
						});
					}
				});
				
				projectQuaterJs.setSingleQuaterHtml(data);
				projectQuaterJs.setQuaterActiveCount(data);
			} else if(selectSlQuater.quaterType == 2) {
				// 완료 쿼터								
				var listSlQuestionSin = data.listSlQuestionSin;
				projectQuaterJs.setFinishBody('setFinishBody', listSlQuestionSin);
								
				// 체크박스 checked $(this).attr('checked',false);
				$('[name="finishQuota"]').attr('checked', true);
				
				projectQuaterJs.setFinishQuaterHtml(data);
				projectQuaterJs.setQuaterActiveCount(data);
			}
		}
		
		var listSlBooster = data.listSlBooster;
		if (null != listSlBooster) {
			
			var listSlQuestion = data.listSlQuestion;
			var boosterLen = listSlBooster.length
			$('[name="selectBoost"]').val(boosterLen);
			projectQuaterJs.setRowColBody(boosterLen, 'setBoostQuestion', listSlQuestion, 'selectBoostQuestion');
			
			$.each(listSlBooster, function(index, value){
				
				var boosterInfo = value.boosterInfo;
				$.each($('[name="selectBoostQuestion_'+ index +'"] option'), function(index2, value2){
					var qName = $(this).attr('qname');
					if (boosterInfo == qName) {
						$(this).attr("selected","selected");
						console.log('boosterInfo', boosterInfo);
						console.log('qName', qName);
					}
				});
			});
			console.log('null != listSlBooster', null != listSlBooster);
			projectQuaterJs.checkValidationBoost(data,'select');
		}
	},
	// 쿼터 input text value 값 삽입하는 함수
	setQuaterActiveCount : function (data) {
		
		var selectSlQuater = data.selectSlQuater
		console.log('setQuaterActiveCount selectSlQuater', selectSlQuater);
		if (null != selectSlQuater) {
			var listSlQuaterCount = selectSlQuater.listSlQuaterCount;
			console.log('setQuaterActiveCount listSlQuaterCount', listSlQuaterCount);
			if (null != listSlQuaterCount) {
				
				$.each(listSlQuaterCount, function(index, value){
					
					var quaterPosition = value.quaterPosition;
					var quaterActiveCount = value.quaterActiveCount;
					var quaterTotalCount = value.quaterTotalCount;
					
					console.log('quaterPosition', quaterPosition);
					console.log('quaterActiveCount', quaterActiveCount);
					console.log('quaterTotalCount', quaterTotalCount);
					
					$('#d'+quaterPosition).html(quaterActiveCount);
					$('#'+quaterPosition).val(quaterTotalCount);
				});
			}
		}
	},
	setAttr : function () {
		
		$.each($('[onlynumber]'), function(index, value){
			var $onlynumber = $(this);
			$onlynumber.keyup(function(){
				$(this).val($(this).val().replace(/[^0-9]/g,""));
			});
		});
		
		$('[name="textQuater"]').keydown(function(e){
			
			var key = e.which;
			var direction = '';
			switch(key){
				case 38:
					direction = 'up';
					break;
				case 37:
					direction = 'left';
					break;
				case 39:
					direction = 'rigth';
					break;
				case 40:
					direction = 'down';
					break;
				default:
					direction = 'none';
					break;
			}
			//console.log('direction',direction);
			//console.log('e',e);
			//console.log('e id',e.target.id);
			
			var textId = e.target.id;
			var textIdArray = textId.split('_');
			var textVal = textIdArray[0]; 
			var textRow = textIdArray[1]; 
			var textCol = textIdArray[2];
			
			if ('up' == direction) {
				textRow = parseInt(textRow) - 1;
				if (0 > textRow) {
					textRow = 0;
				}
			} else if ('down' == direction) {
				textRow = parseInt(textRow) + 1;
			} else if ('left' == direction) {
				textCol = parseInt(textCol) - 1;
				if (0 > textCol) {
					textCol = 0;
				}
			} else if ('rigth' == direction) {
				textCol = parseInt(textCol) + 1;
			}
			
			var returnId = textVal+'_'+textRow+'_'+textCol;
			//console.log('returnId',returnId);
			
			$('#'+returnId).focus();
		});
	},
	recursiveFunction : function (arrLen, setList1) {
		
		for (var i=0; i<arrLen; i++) {
			
			var iArray = setList1[i];
			console.log('iArray',iArray);
			console.log('iArray.length',iArray,length);
			
			for (var j=0; j<iArray.length; j++) {
				
				var jArray = setList1[i+1];
				console.log('jArray',jArray);
				console.log('jArray.length',jArray.length);
				
				for (var z=0; z<jArray.length; z++) {
					
					var zArray = jArray[z];
					for (var y=0; y<zArray.length; z++) {
						
						console.log('zArray',zArray);
					}
				}
			}
		}
	},
	allQuater : function () {
		//console.log(this);
		//console.log($(this));		
		//console.log($('[name="allQuater"]').val());
		
		var allQuater = $('[name="allQuater"]').val();		
		$('[name="textQuater"]').val(allQuater);
	},
	regQuota : function (type) {
		if(type=='normal') {
			//alert('일반 등록!!');
			$('[name="tableQuater"]').css('display','');
			$('[name="textareaQuote"]').css('display','none');
		} else if(type=='paste') {
			//alert('수동 등록!!');
			$('[name="tableQuater"]').css('display','none');
			$('[name="textareaQuote"]').css('display','');
			
		}
	}
}

$(function(){
	projectQuaterJs.init();
});